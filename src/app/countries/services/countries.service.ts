import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private httClient: HttpClient) { }

  // Retorna un Observable con un array de objetos de tipo Country
  // hasta que no hay algun componente suscrito a este Observable
  // no se realiza la petición HTTP

  public searchByCapital(criteria: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${criteria}`;
    return this.httClient.get<Country[]>(url)
      .pipe(
        catchError(() => of([]))
      );
  }

  public searchByRegion(criteria: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${criteria}`;
    return this.httClient.get<Country[]>(url)
      .pipe(
        catchError(() => of([]))
      );
  }

  public searchByCountry(criteria: string): Observable<Country[]> {
    const url = `${this.apiUrl}/alpha/${criteria}`;
    return this.httClient.get<Country[]>(url)
      .pipe(
        catchError(() => of([]))
      );
  }
}
