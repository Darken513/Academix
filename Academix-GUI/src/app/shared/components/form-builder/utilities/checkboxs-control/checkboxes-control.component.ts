import { Component, Input } from '@angular/core';
import { BaseFormFieldComponent } from '../base-form-field-component/base-form-field.component';

@Component({
  selector: 'app-checkboxes-control',
  templateUrl: './checkboxes-control.component.html',
  styleUrls: [
    '../base-form-field-component/base-form-field.component.scss',
    './checkboxes-control.component.scss'
  ]
})
export class CheckboxesControlComponent extends BaseFormFieldComponent {
  @Input() options: string[] = [];
  // For multiple checkbox, the value will be an array of selected values
  constructor() {
    super();
    if (!this.value) {
      this.value = [];  // Ensure the value is an array for multi-checkbox
    }
  }
  onCheckboxChange(option: string, event: any) {
    const checked = event.target.checked;
    if (!this.value) {
      this.value = [];
    }
    if (checked) {
      this.value.push(option);
    } else {
      const index = this.value.indexOf(option);
      if (index > -1) {
        this.value.splice(index, 1);
      }
    }
    this.valueChange.emit({ value: this.value });
  }

  isChecked(option: string): boolean {
    return this.value && this.value.includes(option);
  }
}