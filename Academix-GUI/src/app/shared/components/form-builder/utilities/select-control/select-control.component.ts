import { Component, Input } from '@angular/core';
import { BaseFormFieldComponent } from '../base-form-field-component/base-form-field.component';

@Component({
  selector: 'app-select-control',
  templateUrl: './select-control.component.html',
  styleUrl: './select-control.component.scss'
})
export class SelectControlComponent extends BaseFormFieldComponent {
  @Input() options: string[] = [];

  override onValueChange(event: any) {
    this.valueChange.emit(event.target.value);
  }
}
