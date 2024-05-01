import { Component, OnInit } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { CacheService } from '../../services/cache.service';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {

  public isLoading: boolean = false;

  public countries: Country[] = [];

  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  public selectedRegion?: Region | null = null;

  constructor(
    private countriesService: CountriesService,
    private cache : CacheService
  ) { }

  ngOnInit(): void {
    this.countries = this.cache.countriesStore.byRegion.countries;
    this.selectedRegion = this.cache.countriesStore.byRegion.region ;
  }

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
