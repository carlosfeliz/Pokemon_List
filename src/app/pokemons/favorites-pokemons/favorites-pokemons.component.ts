import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFavorites, IPokemon } from 'src/app/services/interfaces';
import { PokemonsServiceService } from 'src/app/services/pokemons-service.service';
declare const $: any;

@Component({
  selector: 'app-favorites-pokemons',
  templateUrl: './favorites-pokemons.component.html',
  styleUrls: ['./favorites-pokemons.component.css']
})
export class FavoritesPokemonsComponent implements OnInit {

  favorites: IFavorites[] = []
  favoritesCopy: IFavorites[] = []
  isInvalid: boolean = false
  selectedPokemonForRelease: any;

  public p = 1;
  public searchKey;
  public oldSearchKey;

  favoriteForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    image: new FormControl(''),
    alias: new FormControl('', Validators.required),
    createdAt: new FormControl(new Date(), Validators.required),
  });

  constructor(private _pokemonService: PokemonsServiceService) { }

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites() {
    this.favorites = this._pokemonService.getFavoritesList();
    this.favoritesCopy = [...this.favorites];
  }

  getFavorite(pokemon) {
    this.favoriteForm.patchValue(pokemon)
    console.log(this.favoriteForm.value)
  }

  editFavoriteAlias() {
    console.log(this.favoriteForm.value)

    if (!this.favoriteForm.valid) {
      this.isInvalid = true
      return;
    }

    this.isInvalid = false
    let response = this._pokemonService.editFavorite(this.favoriteForm.get('name').value, this.favoriteForm.get('alias').value);

    if (response) {
      this.getFavorites();
      this.resetForm()
      $('#btn-close-model').click();

    } else {
      alert('Pokemon no se pudo editar')
    }
  }

  resetForm() {

    this.favoriteForm.reset()
  }

  isVomiting: boolean = false;
  isSwallowing: boolean = false;
  isEating: boolean = false;

  deleteFavorite(item) {
    this.selectedPokemonForRelease = item;
    this.isVomiting = false;
  }

  confirmRelease() {
    if (!this.selectedPokemonForRelease) return;

    this.isVomiting = true; // Trigger spit out animation

    setTimeout(() => {
      let response = this._pokemonService.deleteFromFavorites(this.selectedPokemonForRelease.name);
      if (response) {
        this.getFavorites();
        this.closeModal('releaseModal');
      }
      this.isVomiting = false;
    }, 800);
  }

  private closeModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      if ((window as any).bootstrap && (window as any).bootstrap.Modal) {
        const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
      } else {
        $(modalElement).modal('hide');
      }
      setTimeout(() => {
        $('.modal-backdrop').remove();
        $('body').removeClass('modal-open').css('overflow', '').css('padding-right', '');
      }, 300);
    }
  }

  fillData() {
    this.favorites = this.favoritesCopy
  }

  searchOn() {

    if (this.searchKey == this.oldSearchKey) {
      return;
    }

    this.fillData();

    if (!this.searchKey) {

      return;
    }

    this.oldSearchKey = this.searchKey;

    this.favorites = this.favorites.filter(x => {
      if (x?.name.toLowerCase().trim().includes(this.searchKey.toString().toLowerCase().trim())) {
        return true;
      }

      if (x?.alias.toLowerCase().trim().includes(this.searchKey.toString().toLowerCase().trim())) {
        return true;
      }
    });

  }

}
