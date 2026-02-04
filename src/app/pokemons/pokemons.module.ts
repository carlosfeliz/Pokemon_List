import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonsRoutingModule } from './pokemons-routing.module';
import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';
import { FavoritesPokemonsComponent } from './favorites-pokemons/favorites-pokemons.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HoloCardDirective } from './directives/holo-card/holo-card.directive';


@NgModule({
  declarations: [
    PokemonsListComponent,
    FavoritesPokemonsComponent,
    HoloCardDirective
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
