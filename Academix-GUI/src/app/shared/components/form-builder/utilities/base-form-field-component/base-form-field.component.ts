import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-base-form-field',
  template: ''
})
export abstract class BaseFormFieldComponent {
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() value: any = '';
  @Input() valid: boolean = true;
  @Input() errorMessage: string = '';
  @Output() valueChange = new EventEmitter<any>();

  // Emit value changes from form field
  onValueChange(value: any) {
    this.valueChange.emit(value);
  }
}