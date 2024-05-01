import { Component, Output } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public isLoading : boolean = false;

  public countries : Country[] = [];

  constructor(private countriesService: CountriesService) {}

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
