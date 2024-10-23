import { Component } from '@angular/core';
import { BaseFormFieldComponent } from '../base-form-field-component/base-form-field.component';

@Component({
  selector: 'app-auto-complete-control',
  templateUrl: './auto-complete-control.component.html',
  styleUrls: [
    '../base-form-field-component/base-form-field.component.scss',
    './auto-complete-control.component.scss'
  ]
})
export class AutoCompleteControlComponent extends BaseFormFieldComponent {
  filteredOptions: any[] = []; // Filtered options based on input

  filterOptions(event: any) {
    const query = event.query.toLowerCase();
    this.filteredOptions = this.options!.filter(option =>
      option.toLowerCase().includes(query)
    );
  }
  override onValueChange(event: any, avoidCheck?: boolean) {
    let hasValue = event && event.target && typeof event.target.value == "string";
    if (!hasValue)
      return;
    this.valueChange.emit({ value: event.target.value, avoidCheck: avoidCheck });
  }
  onValueSelect(event: any) {
    this.valueChange.emit({ value: event.value, avoidCheck: false });
  }
}