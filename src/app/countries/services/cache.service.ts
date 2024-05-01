import { Injectable } from '@angular/core';

import { CountriesStore } from '../interfaces/cache-store.interface';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() {
    this.loadFromLocalStorage();
  }

  public countriesStore: CountriesStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: null, countries: [] }
  };

  public loadFromLocalStorage() {
    if (!localStorage.getItem('countriesStore')) return;
    this.countriesStore = JSON.parse(localStorage.getItem('countriesStore')!);
  }

  public saveToLocalStorage() {
    localStorage.setItem('countriesStore', JSON.stringify(this.countriesStore));
  }


}
