import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormEntity } from './utilities/FormEntity';
import { TextControlComponent } from './utilities/text-control/text-control.component';
import { SelectControlComponent } from './utilities/select-control/select-control.component';
import { TextAreaControlComponent } from './utilities/text-area-control/text-area-control.component';
import { CheckboxesControlComponent } from './utilities/checkboxs-control/checkboxes-control.component';
import { RadiosControlComponent } from './utilities/radios-control/radios-control.component';


//todo-achraf validators should be disabled if not displayed ngIf
@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss'
})
export class FormBuilderComponent {
  @Input() entity: FormEntity = new FormEntity();
  formFields: any[] = [];

  @ViewChild('formFieldHost', { read: ViewContainerRef, static: true }) formFieldHost!: ViewContainerRef;

  constructor() {
  }

  ngOnInit() {
    this.formFields = FormEntity.getFormFields(this.entity).map((formField: any) => {
      return {
        formField,
        componentRef: undefined
      }
    });
    this.renderFormFields();
  }

  renderFormFields() {
    this.formFields.forEach((field: any) => {
      let componentRef;

      if (field.formField.type === 'text') {
        componentRef = this.formFieldHost.createComponent(TextControlComponent);
      } else if (field.formField.type === 'textarea') {
        componentRef = this.formFieldHost.createComponent(TextAreaControlComponent);
      } else if (field.formField.type === 'select') {
        componentRef = this.formFieldHost.createComponent(SelectControlComponent);
      } else if (field.formField.type === 'checkboxes') {
        componentRef = this.formFieldHost.createComponent(CheckboxesControlComponent);
      } else if (field.formField.type === 'radios') {
        componentRef = this.formFieldHost.createComponent(RadiosControlComponent);
      }

      if (componentRef) {
        field.componentRef = componentRef;
        this.setupComponentInstance(field);
      }
    });
  }

  setupComponentInstance(field: any) {
    field.componentRef.instance.label = field.formField.label;
    field.componentRef.instance.required = field.formField.required;
    field.componentRef.instance.options = field.formField.options || [];
    field.componentRef.instance.value = (this.entity as any)[field.formField.key] || undefined;
    field.componentRef.instance.displayCondition = field.formField.displayCondition || (() => { return true });
    field.componentRef.instance.errorEmitter = field.formField.errorEmitter;

    field.componentRef.instance.valueChange.subscribe((event: any) => {
      this.onValueChange(field.formField.key, event);
    });
    field.componentRef.instance.checkVisibility();
  }

  onValueChange(key: string, event: any) {
    (this.entity as any)[key] = event.value;
    if (event.avoidCheck) {
      return;
    }
    this.formFields.forEach(field => {
      if (field.componentRef && field.componentRef.instance.displayCondition) {
        field.componentRef.instance.checkVisibility();
      }
    });
  }

  onSubmit() {
    const validationResults = FormEntity.validateForm(this.entity);
    if (validationResults.valid) {
      console.log('Form is valid!', this.entity);
    }
  }
}