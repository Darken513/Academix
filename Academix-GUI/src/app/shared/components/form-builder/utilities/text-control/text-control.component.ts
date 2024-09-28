import { Component } from '@angular/core';
import { BaseFormFieldComponent } from '../base-form-field-component/base-form-field.component';

@Component({
  selector: 'app-text-control',
  templateUrl: './text-control.component.html',
  styleUrl: './text-control.component.scss'
})
export class TextControlComponent extends BaseFormFieldComponent {

  override onValueChange(event: any) {
    this.valueChange.emit(event.target.value);
  }
}
