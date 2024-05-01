import { Component, Output } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public countries : Country[] = [];

  constructor(private countriesService: CountriesService) {}

  public searchByCapital(criteria: string): void {
    this.countriesService.searchByCapital(criteria)
      .subscribe( {
        next: data => this.countries = data
      });
  }
}
