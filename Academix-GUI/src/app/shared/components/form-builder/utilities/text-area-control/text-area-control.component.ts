import { Component } from '@angular/core';
import { BaseFormFieldComponent } from '../base-form-field-component/base-form-field.component';

@Component({
  selector: 'app-text-area-control',
  templateUrl: './text-area-control.component.html',
  styleUrl: './text-area-control.component.scss'
})
export class TextAreaControlComponent extends BaseFormFieldComponent {
  override onValueChange(event: any, avoidCheck?:boolean) {
    this.valueChange.emit({ value: event && event.target && event.target.value, avoidCheck: avoidCheck});
  }
}
