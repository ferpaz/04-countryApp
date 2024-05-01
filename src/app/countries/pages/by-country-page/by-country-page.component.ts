import { Component, OnInit } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { CacheService } from '../../services/cache.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {

  public isLoading : boolean = false;
  public countries : Country[] = [];
  public initialValue: string = '';

  constructor(
    private countriesService: CountriesService,
    private cache: CacheService
  ) {}

  ngOnInit(): void {
    this.countries = this.cache.countriesStore.byCountry.countries;
    this.initialValue = this.cache.countriesStore.byCountry.term;
  }

  public searchByCountry(criteria: string): void {
    this.isLoading = true;

    this.countriesService.searchByCountry(criteria)
      .subscribe( {
        next: data => {
          this.countries = data;
          this.isLoading = false;
        }
      });
  }
}
