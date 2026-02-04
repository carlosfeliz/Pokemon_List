import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFavorites, IPokemon } from 'src/app/services/interfaces';
import { PokemonsServiceService } from 'src/app/services/pokemons-service.service';
declare const $: any;

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.css']
})
export class PokemonsListComponent implements OnInit {
  pokemons: IPokemon[] = []
  pokemonsCopy: IPokemon[] = [];
  isInvalid: boolean = false
  isCaptured: boolean = false;
  selectedPokemonForRelease: any;
  isSwallowing: boolean = false;
  isVomiting: boolean = false;
  isEating: boolean = false;
  isOpening: boolean = false;

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
    this.getData()
  }

  getData() {
    this._pokemonService.getPokemonList().subscribe((data: any) => {
      this.pokemons = data.results;
      this.pokemonsCopy = [...data.results];
      this.getFavorites();

    })
  }


  getFavorites() {
    let values = this._pokemonService.getFavoritesList();

    this.pokemons.forEach((element) => {
      element.isFavorite = false;
      values.forEach((session) => {
        if (element.name == session.name) {
          element.isFavorite = true;
        }
      })
    })

    this.resetForm();
  }


  // No changes needed to isReleasing/isSucking here as they are replaced above

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

  handleCardClick(item: IPokemon) {
    if (item.isFavorite) {
      this.deleteFavorite(item);
    } else {
      this.setFavorite(item);
    }
  }

  setFavorite(item) {
    this.favoriteForm.patchValue(item);
    this.favoriteForm.controls.createdAt.setValue(new Date());
    this.isCaptured = false;
    this.isSwallowing = false;
    this.isOpening = false;
  }

  saveFavorite() {
    if (!this.favoriteForm.valid) {
      this.isInvalid = true
      return;
    }

    this.isInvalid = false

    // Phase 1: Open Pokeball mouth
    setTimeout(() => {
      this.isSwallowing = true; // Digital cage active

      // Phase 2: Start sucking (slightly after opening)
      setTimeout(() => {
        this.isEating = true; // Chomp / Close mouth

        setTimeout(() => {
          this.isEating = false;

          // Start shaking after eating
          setTimeout(() => {
            let response = this._pokemonService.addToFavorites(this.favoriteForm.value);
            if (response) {
              this.isCaptured = true;
              setTimeout(() => {
                this.closeModal('addFavoritePokemon');
                this.getFavorites();
              }, 2000);
            } else {
              alert('Pokemon no se pudo agregar')
              this.isSwallowing = false;
            }
          }, 1500); // Shaking duration
        }, 400); // Belly stretch / Chomp closing duration
      }, 300); // Delay so mouth is open before pokemon moves
    }, 100);
  }

  private closeModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      // Use Bootstrap's own method if available, otherwise fallback
      if ((window as any).bootstrap && (window as any).bootstrap.Modal) {
        const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
      } else {
        $(modalElement).modal('hide');
      }
      // Force remove backdrop if it stays
      setTimeout(() => {
        $('.modal-backdrop').remove();
        $('body').removeClass('modal-open').css('overflow', '').css('padding-right', '');
      }, 300);
    }
  }

  resetForm() {
    this.isInvalid = false
    this.favoriteForm.reset()
    this.isSwallowing = false;
    this.isVomiting = false;
    this.isCaptured = false;
    this.isEating = false;
  }

  fillData() {
    this.pokemons = this.pokemonsCopy
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

    this.pokemons = this.pokemons.filter(x => {
      if (x?.name.toLowerCase().trim().includes(this.searchKey.toString().toLowerCase().trim())) {
        return true;
      }
    });

  }


}
