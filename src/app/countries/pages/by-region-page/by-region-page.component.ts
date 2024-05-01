import { Component } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  public isLoading: boolean = false;

  public countries: Country[] = [];

  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  public selectedRegion?: Region;

  constructor(private countriesService: CountriesService) { }

  public onRegionSelected(region: Region): void {
    this.selectedRegion = region;
    this.isLoading = true;

    this.countriesService.searchByRegion(region)
      .subscribe({
        next: data => {
          this.countries = data;
          this.isLoading = false;
        }
      });
  }
}
