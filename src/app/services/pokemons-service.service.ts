import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IFavorites } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonsServiceService {
  url = environment.pokemonsUlr

  constructor(private _http: HttpClient) { }

  getPokemonList() {
    return this._http.get(`${this.url}/pokemon?limit=1500&offset=0`).pipe(
      map((res: any) => {
        res.results = res.results.map(pokemon => {
          const id = pokemon.url.split('/').filter(Boolean).pop();
          return {
            ...pokemon,
            id: parseInt(id),
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
          };
        });
        return res;
      })
    );
  }

  getFavoritesList(): IFavorites[] {
    let values = JSON.parse(sessionStorage.getItem('favorites'))

    if (!values) {
      values = [];
    }

    return values;
  }

  deleteFromFavorites(name: string): boolean {

    try {
      let items: any[] = this.getFavoritesList();

      let isThere = items.find(x => x.name == name);

      if (isThere == false) {
        return false;
      }

      for (let i = 0; i < items.length; i++) {
        if (items[i].name == name) {
          items.splice(i, 1);
          break;
        }
      }

      sessionStorage.setItem('favorites', JSON.stringify(items))
    } catch (e) {
      console.log(e);
      return false;
    }


    return true;
  }
  editFavorite(name: string, alias: string): boolean {

    try {
      let items: any[] = this.getFavoritesList();

      let isThere = items.find(x => x.name == name);

      if (isThere == false) {
        return false;
      }

      for (let i = 0; i < items.length; i++) {
        if (items[i].name == name) {
          items[i].alias = alias
          break;
        }
      }

      sessionStorage.setItem('favorites', JSON.stringify(items))
    } catch (e) {
      console.log(e);
      return false;
    }


    return true;
  }

  addToFavorites(item: IFavorites): boolean {

    try {
      let items: any[] = this.getFavoritesList();

      let isThere = items.find(x => x.name == item.name);

      if (isThere == true) {
        return false;
      }

      items.push(item);
      sessionStorage.setItem('favorites', JSON.stringify(items))
    } catch (e) {
      console.log(e);
      return false;
    }


    return true;
  }

}
