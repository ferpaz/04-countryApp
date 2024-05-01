import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-searchbox',
  templateUrl: './searchbox.component.html',
  styles: ``
})
export class SearchboxComponent implements OnInit {

  // En la práctica es un observable, solo que esta creado manualmente
  private debouncer: Subject<string> = new Subject<string>();

  ngOnInit(): void {
    this.debouncer
      .pipe(
        // Espera 300 ms antes de emitir el valor
        debounceTime(300)
      )
      .subscribe( value => {
        // Emite el valor del stream de datos (los caracteres digitados en el input)
        this.onDebounce.emit(value);
      });
  }

  // Evento para emitir el valor cuando se presiona una tecla (el debounceTime se encarga de emitir el valor después de 300 ms)
  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  public placeholder:string = '';

  @ViewChild('txtSearchValue')
  public searchValue!: ElementRef<HTMLInputElement>;

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
