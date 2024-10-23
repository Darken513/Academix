import { Component, EventEmitter, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
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

  @ViewChild('formFieldHost', { read: ViewContainerRef, static: true }) formFieldHost!: ViewContainerRef;
  @Output() submitEvent = new EventEmitter<any>();

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
    field.componentRef.instance.fetchOptionsFrom = field.formField.fetchOptionsFrom || undefined;
    field.componentRef.instance.value = (this.entity as any)[field.formField.key] || undefined;
    field.componentRef.instance.inputRegex = field.formField.inputRegex || undefined;
    field.componentRef.instance.helpers = field.formField.helpers || undefined;
    field.componentRef.instance.displayCondition = field.formField.displayCondition || (() => { return true });
    field.componentRef.instance.errorEmitter = field.formField.errorEmitter;

    field.componentRef.instance.valueChange.subscribe((event: any) => {
      this.onValueChange(field.formField.key, event);
    });
    field.componentRef.instance.blur.subscribe(() => {
      this.onFieldBlur(field.formField.key);
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
  onFieldBlur(key: string) {
    const fieldValue = (this.entity as any)[key];
    FormEntity.validateField(this.entity, key, fieldValue);
  }

  onSubmit() {
    const validationResults = FormEntity.validateForm(this.entity);
    if (validationResults.valid) {
      this.submitEvent.emit();
    }
  }
}