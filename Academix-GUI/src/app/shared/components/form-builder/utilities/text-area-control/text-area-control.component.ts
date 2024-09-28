import { Component } from '@angular/core';
import { BaseFormFieldComponent } from '../base-form-field-component/base-form-field.component';

@Component({
  selector: 'app-text-area-control',
  templateUrl: './text-area-control.component.html',
  styleUrl: './text-area-control.component.scss'
})
export class TextAreaControlComponent extends BaseFormFieldComponent {
  override onValueChange(event: any) {
    this.valueChange.emit(event.target.value);
  }
}
