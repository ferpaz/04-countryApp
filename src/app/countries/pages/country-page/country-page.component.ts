import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  public isLoading : boolean = false;
  public country?: Country;

  constructor(
    private activatedRoute : ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService
  ) { }

  // Método que se ejecuta cuando el componente se inicializa (no se utiliza el constructor)
  ngOnInit(): void {
    this.isLoading = true;

    this.activatedRoute.params
      .pipe(
        // switchMap: obtiene el valor del observale, cancela la suscripción anterior y se suscribe a una nueva
        // que en este caso es la petición HTTP del pais.
        // Importante que el argumento del labmda retorna el objeto 'parmas' del observable activatedRoute
        // se está deconstruyendo para obtener el id.
        switchMap( ({ id }) => this.countriesService.searchByAlphaCode(id) )
      )
      .subscribe( {
        next: data => {
          if (!data) {
            // Cuando data es null, tenemos que sacar al usuario de la página, porque el pais requerido no existe.
            this.router.navigate(['']);
            return;
          }

          this.country = data;
          this.isLoading = false;
        }
      });
  }

  // Propiedad computada para obtener las traducciones únicas del país.
  public get uniqueTranslations(): string[] {
    const keys = Object.keys(this.country?.translations || {});

    const uniqueValues: string[] = [];
    keys.forEach( key => {
      const value = this.country?.translations[key].common;
      if (value && !uniqueValues.includes(value) && value !== this.country?.name.common) {
        uniqueValues.push(value);
      }
    });

    return uniqueValues;
  }
}
