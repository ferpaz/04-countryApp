import { Component } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  public countries : Country[] = [];

  constructor(private countriesService: CountriesService) {}

  public searchByRegion(criteria: string): void {
    this.countriesService.searchByRegion(criteria)
      .subscribe( {
        next: data => this.countries = data
      });
  }
}
