import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, output } from '@angular/core';

@Component({
  selector: 'shared-searchbox',
  templateUrl: './searchbox.component.html',
  styles: ``
})
export class SearchboxComponent {

  @Input()
  public placeholder:string = '';

  @ViewChild('txtSearchValue')
  public searchValue!: ElementRef<HTMLInputElement>;

  @Output()
  public onSearch: EventEmitter<string> = new EventEmitter<string>();

  public searchCriteria():void {
    const criteria = this.searchValue.nativeElement.value;
    //if (criteria.length === 0) return;

    this.onSearch.emit(criteria);
  }

}
