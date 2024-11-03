import { Component, Input } from '@angular/core';
import { BaseFormFieldComponent } from '../base-form-field-component/base-form-field.component';

@Component({
  selector: 'app-radios-control',
  templateUrl: './radios-control.component.html',
  styleUrls: [
    '../base-form-field-component/base-form-field.component.scss',
    './radios-control.component.scss'
  ]
})
export class RadiosControlComponent extends BaseFormFieldComponent {
  /*
  params could contain the following :
    optionLabel:string, this is an option that maps the displayed value to a certain prop in your object
  */
}
