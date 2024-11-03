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
  //todo-achraf : add the concept of optionLabel and keyLabel
  override onValueChange(event: any, avoidCheck?:boolean) {
    this.valueChange.emit({ value: event && event.target && event.target.value, avoidCheck: avoidCheck});
  }
}
