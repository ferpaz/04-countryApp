import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-table',
  templateUrl: './countries-table.component.html',
  styles: `
    img {
      min-width: 16px;
      max-width: 48px;
    }
  `
})
export class CountriesTableComponent {

  @Input()
  public countries: Country[] = [];

}
