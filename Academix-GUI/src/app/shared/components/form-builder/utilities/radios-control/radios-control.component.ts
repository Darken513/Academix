import { Component, Input } from '@angular/core';
import { BaseFormFieldComponent } from '../base-form-field-component/base-form-field.component';

@Component({
  selector: 'app-radios-control',
  templateUrl: './radios-control.component.html',
  styleUrl: './radios-control.component.scss'
})
export class RadiosControlComponent extends BaseFormFieldComponent {
  @Input() options: string[] = [];
}
