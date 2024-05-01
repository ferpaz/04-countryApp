import { Component } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {

  public countries : Country[] = [];

  constructor(private countriesService: CountriesService) {}

  public searchByCountry(criteria: string): void {
    this.countriesService.searchByCountry(criteria)
      .subscribe( {
        next: data => this.countries = data
      });
  }
}
