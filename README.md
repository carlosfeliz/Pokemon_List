# Poke List - Documentación del Proyecto

## 📖 Descripción General
Este es un proyecto de portafolio desarrollado en **Angular** que permite a los usuarios explorar una lista completa de Pokémon y gestionar una lista personalizada de favoritos. La aplicación consume datos de la API pública de Pokémon (PokeAPI) y ofrece funcionalidades para agregar, editar (asignar alias) y eliminar Pokémon de una lista de favoritos, persistiendo estos datos durante la sesión del usuario.

## 🚀 Características Principales
- **Listado de Pokémon:** Visualización de una lista paginada de Pokémon obtenida de una API externa.
- **Gestión de Favoritos:**
  - Agregar Pokémon a favoritos.
  - Asignar y editar alias personalizados para los favoritos.
  - Eliminar Pokémon de la lista.
- **Persistencia de Datos:** Uso de `sessionStorage` para mantener los favoritos mientras el navegador está abierto.
- **Paginación:** Navegación eficiente a través de la gran cantidad de registros utilizando `ngx-pagination`.

## 🛠️ Tecnologías y Herramientas Utilizadas
El proyecto está construido sobre un stack moderno de desarrollo web:

- **Angular (v17):** Framework principal actualizado para la estructura SPA (Single Page Application).
- **TypeScript:** Lenguaje principal para la lógica de negocio, ofreciendo tipado estático y mayor robustez.
- **RxJS:** Manejo de flujos de datos asíncronos (Observables), especialmente para las peticiones HTTP.
- **HTML5 & CSS3:** Maquetación y estilos de la interfaz de usuario.
- **ngx-pagination:** Librería externa para manejar la paginación de datos de manera sencilla.

## 📂 Estructura del Proyecto

La estructura del proyecto sigue las mejores prácticas de modularización de Angular:

```
src/
├── app/
│   ├── services/            # Lógica de negocio y comunicación de datos
│   │   ├── pokemons-service.service.ts  # Servicio principal
│   │   └── interfaces.ts                # Modelos de datos
│   ├── pokemons/            # Módulo funcional "Feature Module"
│   │   ├── pokemons-list/   # Componente para el listado general
│   │   └── favorites-pokemons/ # Componente para listado de favoritos
│   ├── app.module.ts        # Módulo raíz
│   └── app.component.ts     # Componente raíz
├── assets/                  # Recursos estáticos (imágenes, iconos)
└── environments/            # Configuraciones de entorno (URLs de API)
```

## 🧠 Análisis del Código y Decisiones de Diseño

El código ha sido estructurado para ser mantenible, escalable y fácil de leer. A continuación se detallan las decisiones técnicas más importantes:

### 1. Arquitectura Modular (`PokemonsModule`)
En lugar de declarar todo en el `AppModule`, se creó un módulo específico `PokemonsModule`.
- **Por qué:** Esto encapsula toda la funcionalidad relacionada con los Pokémon en un solo lugar, facilitando la carga diferida (lazy loading) si fuera necesario en el futuro y manteniendo el módulo raíz limpio.

### 2. Patrón de Servicios (`PokemonsServiceService`)
Toda la lógica de acceso a datos y gestión de estado se centralizó en `PokemonsServiceService`.
- **Clases usadas:** `HttpClient` para peticiones web y métodos para manipular `sessionStorage`.
- **Por qué:** Separación de preocupaciones (Separation of Concerns). Los componentes (`pokemons-list`, `favorites-pokemons`) solo se encargan de la presentación (UI), mientras que el servicio maneja la lógica de negocio "sucia" (llamadas API, parseo de JSON, almacenamiento). Esto hace que los componentes sean ligeros y más fáciles de testear.

### 3. Persistencia con `sessionStorage`
- **Por qué:** Para un portafolio o demo simple, no siempre se requiere una base de datos backend compleja. Usar `sessionStorage` permite diferenciar una experiencia persistente (no se borra al recargar) sin la complejidad de autenticación y bases de datos reales.

### 4. Interfaces TypeScript (`IFavorites`)
- **Por qué:** Se definen contratos claros para los datos. Esto evita errores comunes de tipado y asegura que sabemos exactamente qué propiedades tiene un objeto Pokémon en toda la aplicación.

## 💻 Instalación y Ejecución

Para correr este proyecto localmente:

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar servidor de desarrollo:**
   ```bash
   ng serve
   ```
   Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias algún archivo fuente.

3. **Construir para producción:**
   ```bash
   ng build
   ```
