import { Injectable } from '@angular/core';

import { CountriesStore } from '../interfaces/cache-store.interface';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  public countriesStore: CountriesStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: null, countries: [] }
  };

}
