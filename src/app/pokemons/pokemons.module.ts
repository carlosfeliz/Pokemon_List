import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonsRoutingModule } from './pokemons-routing.module';
import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';
import { FavoritesPokemonsComponent } from './favorites-pokemons/favorites-pokemons.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    PokemonsListComponent,
    FavoritesPokemonsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PokemonsRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class PokemonsModule { }
