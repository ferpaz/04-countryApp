import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private httClient: HttpClient) { }


  public searchByCapital(criteria: string): Observable<Country[]> {
    return this.searchBy(criteria, 'capital');
  }

  public searchByCountry(criteria: string): Observable<Country[]> {
    return this.searchBy(criteria, 'name');
  }

  public searchByRegion(criteria: string): Observable<Country[]> {
    return this.searchBy(criteria, 'region');
  }


  // Retorna un Observable con un array de objetos de tipo Country
  // hasta que no hay algun componente suscrito a este Observable
  // no se realiza la petición HTTP

  private searchBy(criteria: string, endpoint: string): Observable<Country[]> {
    const url = `${this.apiUrl}/${endpoint}/${criteria}`;
    return this.httClient.get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
        map(countries => countries.sort((a, b) => a.name.common.localeCompare(b.name.common)))
      );
  }
}
