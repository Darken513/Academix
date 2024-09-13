import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormEntity } from './utilities/FormEntity';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss'
})
export class FormBuilderComponent {
  formGroup?: FormGroup;
  formFields: any[] = [];
  @Input() model?: FormEntity;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formFields = this.model ? Reflect.getMetadata('formFields', this.model) || [] : [];

    // Create FormGroup dynamically
    const formGroupConfig = this.formFields.reduce((acc, field) => {
      acc[field.key] = [null];
      return acc;
    }, {});

    this.formGroup = this.fb.group(formGroupConfig);
  }

  // wip-achraf : Check if multicheckbox option is selected
  isChecked(fieldKey: string, option: string): boolean {
    const field = this.formGroup!.get(fieldKey)?.value || [];
    return field.includes(option);
  }

  // wip-achraf : Toggle multicheckbox selection
  toggleSelection(fieldKey: string, option: string) {
    const control = this.formGroup!.get(fieldKey);
    const currentSelection = control?.value || [];
    const newSelection = currentSelection.includes(option)
      ? currentSelection.filter((item: string) => item !== option)
      : [...currentSelection, option];
    control?.setValue(newSelection);
  }
}
