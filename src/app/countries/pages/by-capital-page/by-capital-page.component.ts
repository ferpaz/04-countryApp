import { Component, OnInit, Output } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { CacheService } from '../../services/cache.service';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {

  public isLoading : boolean = false;

  public countries : Country[] = [];

  public initialValue: string = '';

  constructor(
    private countriesService: CountriesService,
    private cache: CacheService
  ) {}

  ngOnInit(): void {
    this.countries = this.cache.countriesStore.byCapital.countries;
    this.initialValue = this.cache.countriesStore.byCapital.term;
  }

  public searchByCapital(criteria: string): void {
    this.isLoading = true;

    this.countriesService.searchByCapital(criteria)
      .subscribe( {
        next: data => {
          this.countries = data;
          this.isLoading = false;
        }
      });
  }
}
