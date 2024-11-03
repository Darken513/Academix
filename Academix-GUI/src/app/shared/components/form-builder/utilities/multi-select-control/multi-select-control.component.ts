import { Component } from '@angular/core';
import { BaseFormFieldComponent } from '../base-form-field-component/base-form-field.component';

@Component({
  selector: 'app-multi-select-control',
  templateUrl: './multi-select-control.component.html',
  styleUrls: [
    '../base-form-field-component/base-form-field.component.scss',
    './multi-select-control.component.scss'
  ]
})
export class MultiSelectControlComponent extends BaseFormFieldComponent {
  /*
  params could contain the following :
    optionLabel:string, this is an option that maps the displayed value to a certain prop in your object
  */
  override onValueChange(event: any, avoidCheck?: boolean) {
    if (!event)
      return;
    this.valueChange.emit({ value: event, avoidCheck: avoidCheck });
  }
}
