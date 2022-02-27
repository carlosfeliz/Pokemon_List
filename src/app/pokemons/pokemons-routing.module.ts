import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesPokemonsComponent } from './favorites-pokemons/favorites-pokemons.component';
import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';

const routes: Routes = [
  {
    path:'',
    component:PokemonsListComponent
  },
  {
    path:'favorites',
    component:FavoritesPokemonsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonsRoutingModule { }
