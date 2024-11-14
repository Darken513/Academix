import { Component, Input } from '@angular/core';
import { BaseFormFieldComponent } from '../base-form-field-component/base-form-field.component';

@Component({
  selector: 'app-select-control',
  templateUrl: './select-control.component.html',
  styleUrls: [
    '../base-form-field-component/base-form-field.component.scss',
    './select-control.component.scss'
  ]
})
export class SelectControlComponent extends BaseFormFieldComponent {
  /*
  params could contain the following :
    optionLabel:string, this is an option that maps the displayed value to a certain prop in your object
    returnKey:any, this is an option that maps the selectred value to a certain prop in your object to be returned
  */
  override onValueChange(event: any, avoidCheck?:boolean) {
    this.valueChange.emit({ value: event && event.target && event.target.value, avoidCheck: avoidCheck});
  }
}
