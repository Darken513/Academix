import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormEntity } from './utilities/FormEntity';
import { TextControlComponent } from './utilities/text-control/text-control.component';
import { SelectControlComponent } from './utilities/select-control/select-control.component';
import { TextAreaControlComponent } from './utilities/text-area-control/text-area-control.component';
import { CheckboxesControlComponent } from './utilities/checkboxs-control/checkboxes-control.component';
import { RadiosControlComponent } from './utilities/radios-control/radios-control.component';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss'
})
export class FormBuilderComponent {
  @Input() entity: FormEntity = new FormEntity();
  formFields: any[] = [];
  formData: any = {};
  validation: any = {};

  @ViewChild('formFieldHost', { read: ViewContainerRef, static: true }) formFieldHost!: ViewContainerRef;

  constructor() {
    this.formFields.forEach((field: any) => {
      this.validation[field.key] = { valid: true, errorMessage: '' };
    });
  }

  ngOnInit() {
    this.formFields = FormEntity.getFormFields(this.entity);
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
      } else if (field.type === 'radios') {
        componentRef = this.formFieldHost.createComponent(RadiosControlComponent);
      }

      if (componentRef) {
        this.setupComponentInstance(componentRef, field);
      }
    });
  }

  setupComponentInstance(componentRef: any, field: any) {
    componentRef.instance.label = field.label;
    componentRef.instance.required = field.required;
    componentRef.instance.options = field.options || [];  // Pass options to checkbox
    componentRef.instance.value = this.formData[field.key] || [];

    // Listen for value changes and update formData
    componentRef.instance.valueChange.subscribe((event: any) => {
      this.onValueChange(field.key, event);
    });
  }

  onValueChange(key: string, value: any) {
    this.formData[key] = value;
  }

  onSubmit() {
    const validationResults = FormEntity.validateForm(this.entity, this.formData);
    this.formFields.forEach((field: any) => {
      const isValid = validationResults.errors.find(err => err.includes(field.label)) === undefined;
      if (this.validation[field.key]) {
        this.validation[field.key].valid = isValid;
        this.validation[field.key].errorMessage = !isValid ? 'Invalid field' : '';
      }
    });

    if (validationResults.valid) {
      console.log('Form is valid!', this.formData);
    }
  }
}