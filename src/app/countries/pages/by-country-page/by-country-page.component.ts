import { Component } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {

  public isLoading : boolean = false;
  public countries : Country[] = [];

  constructor(private countriesService: CountriesService) {}

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
