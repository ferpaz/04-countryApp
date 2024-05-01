import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { Country } from '../interfaces/country.interface';
import { CacheService } from './cache.service';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(
    private httClient: HttpClient,
    private cache: CacheService,
  ) { }


  public searchByCapital(criteria: string): Observable<Country[]> {
    return this.searchBy(criteria, 'capital')
      .pipe(
        // Tap permite interceptar el resultado del flujo de datos sin modificarlo y antes que llegue al suscriptor
        tap(countries => this.cache.countriesStore.byCapital = { term: criteria, countries }),
        tap(() => this.cache.saveToLocalStorage()),
      );
  }

  public searchByCountry(criteria: string): Observable<Country[]> {
    return this.searchBy(criteria, 'name')
      .pipe(
        tap(countries => this.cache.countriesStore.byCountry = { term: criteria, countries }),
        tap(() => this.cache.saveToLocalStorage()),
      );
  }

  public searchByRegion(criteria: Region): Observable<Country[]> {
    return this.searchBy(criteria.toString(), 'region')
      .pipe(
        tap(countries => this.cache.countriesStore.byRegion = { region: criteria, countries }),
        tap(() => this.cache.saveToLocalStorage()),
      );
  }

  public searchByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.httClient.get<Country[]>(url)
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null)),
      );
  }


  // Retorna un Observable con un array de objetos de tipo Country
  // hasta que no hay algun componente suscrito a este Observable
  // no se realiza la petición HTTP

  private searchBy(criteria: string, endpoint: string): Observable<Country[]> {
    const url = `${this.apiUrl}/${endpoint}/${criteria}`;
    return this.httClient.get<Country[]>(url)
      .pipe(
        map(countries => countries.sort((a, b) => a.name.common.localeCompare(b.name.common))),
        catchError(() => of([])),
      );
  }
}
