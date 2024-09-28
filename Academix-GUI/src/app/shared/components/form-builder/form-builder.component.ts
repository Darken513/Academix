import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormEntity } from './utilities/FormEntity';
import { TextControlComponent } from './utilities/text-control/text-control.component';
import { SelectControlComponent } from './utilities/select-control/select-control.component';
import { TextAreaControlComponent } from './utilities/text-area-control/text-area-control.component';
import { CheckboxesControlComponent } from './utilities/checkboxs-control/checkboxes-control.component';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss'
})
export class FormBuilderComponent {
  @Input() targetClass: FormEntity = new FormEntity();
  formFields = FormEntity.getFormFields(this.targetClass);
  formData: any = {};
  validation: any = {};

  @ViewChild('formFieldHost', { read: ViewContainerRef, static: true }) formFieldHost!: ViewContainerRef;

  constructor() {
    this.formFields.forEach((field: any) => {
      this.validation[field.key] = { valid: true, errorMessage: '' };
    });
  }

  ngOnInit() {
    this.renderFormFields();
  }

  renderFormFields() {
    this.formFields.forEach((field: any) => {
      let componentRef;

      if (field.type === 'text') {
        componentRef = this.formFieldHost.createComponent(TextControlComponent);
      } else if (field.type === 'textarea') {
        componentRef = this.formFieldHost.createComponent(TextAreaControlComponent);
      } else if (field.type === 'select') {
        componentRef = this.formFieldHost.createComponent(SelectControlComponent);
      } else if (field.type === 'checkboxes') {
        componentRef = this.formFieldHost.createComponent(CheckboxesControlComponent);
      }

      if (componentRef) {
        this.setupComponentInstance(componentRef, field);
      }
    });
  }

  setupComponentInstance(componentRef: any, field: any) {
    componentRef.instance.label = field.label;
    componentRef.instance.required = field.required;
    componentRef.instance.valid = this.validation[field.key].valid;
    componentRef.instance.errorMessage = this.validation[field.key].errorMessage;
    componentRef.instance.options = field.options || [];  // Pass options to checkbox
    componentRef.instance.value = this.formData[field.key] || [];

    // Listen for value changes and update formData
    componentRef.instance.valueChange.subscribe((newValue: any) => {
      this.onValueChange(field.key, newValue);
    });
  }

  onValueChange(key: string, value: any) {
    this.formData[key] = value;
  }

  onSubmit() {
    const validationResults = FormEntity.validateForm(this.targetClass, this.formData);
    this.formFields.forEach((field: any) => {
      const isValid = validationResults.errors.find(err => err.includes(field.label)) === undefined;
      this.validation[field.key].valid = isValid;
      this.validation[field.key].errorMessage = !isValid ? 'Invalid field' : '';
    });

    if (validationResults.valid) {
      console.log('Form is valid!', this.formData);
    }
  }
}
