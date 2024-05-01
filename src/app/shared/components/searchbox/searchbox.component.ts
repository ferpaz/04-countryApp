import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-searchbox',
  templateUrl: './searchbox.component.html',
  styles: ``
})
export class SearchboxComponent implements OnInit, OnDestroy {

  @Input()
  public placeholder:string = '';

  @ViewChild('txtSearchValue')
  public searchValue!: ElementRef<HTMLInputElement>;

  // En la práctica es un observable, solo que esta creado manualmente
  private debouncer: Subject<string> = new Subject<string>();

  // Almacena la suscripción al observable para poderla destruir cuando el componente se destruya
  // Esto es necesario porque este observable no sabe cuando va a dejar de monitorear el input
  // por lo tanto se va a quedar monitoreando el input y va a seguir emitiendo valores
  private debouncerSuscription?: Subscription;

  // Inicializa el debouncer que da seguimiento a los caracteres digitados en el input
  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(
        // Espera 300 ms antes de emitir el valor
        debounceTime(300)
      )
      .subscribe( value => {
        // Emite el valor del stream de datos (los caracteres digitados en el input)
        this.onDebounce.emit(value);
      });
  }

  // Se ejecuta cuando el componente se destruye
  ngOnDestroy(): void {
    // Se desuscribe el observable cuando el componente se destruye
    this.debouncerSuscription?.unsubscribe();
  }

  // Evento para emitir el valor cuando se presiona una tecla (el debounceTime se encarga de emitir el valor después de 300 ms)
  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter<string>();


  // Evento para emitir el valor cuando se presiona el botón de buscar
  @Output()
  public onSearch: EventEmitter<string> = new EventEmitter<string>();

  public searchCriteria(criteria: string):void {
    this.onSearch.emit(criteria);
  }

  public onKeyPress( criteria: string): void {
    // cada tecla presionada se agrega al observable (es como un stream de dos continuos)
    this.debouncer.next(criteria);
  }
}
