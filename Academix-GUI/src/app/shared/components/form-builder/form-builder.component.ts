import { Component, EventEmitter, Input, Output, ViewChildren, ViewContainerRef, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormEntity } from './utilities/FormEntity';
import { TextControlComponent } from './utilities/text-control/text-control.component';
import { SelectControlComponent } from './utilities/select-control/select-control.component';
import { TextAreaControlComponent } from './utilities/text-area-control/text-area-control.component';
import { CheckboxesControlComponent } from './utilities/checkboxs-control/checkboxes-control.component';
import { RadiosControlComponent } from './utilities/radios-control/radios-control.component';
import { AutoCompleteControlComponent } from './utilities/auto-complete-control/auto-complete-control.component';
import { CalendarControlComponent } from './utilities/calendar-control/calendar-control.component';
import { MultiSelectControlComponent } from './utilities/multi-select-control/multi-select-control.component';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements AfterViewInit {
  @Input() entity: FormEntity = new FormEntity();
  @Input() displayMap?: string[][];

  formFields: any[] = [];

  @ViewChildren('dynamicFieldHost', { read: ViewContainerRef }) dynamicFieldHosts!: QueryList<ViewContainerRef>;
  @Output() submitEvent = new EventEmitter<any>();

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    const allFields = FormEntity.getFormFields(this.entity).map((formField: any) => ({
      formField,
      componentRef: undefined
    }));

    if (this.displayMap) {
      this.formFields = this.displayMap.map(rowFields =>
        rowFields.map(fieldKey => allFields.find((f: any) => f.formField.key === fieldKey))
          .filter(field => field !== undefined)
      );
    } else {
      this.formFields = allFields.map((field: any) => [field]);
    }
  }

  ngAfterViewInit() {
    this.renderFormFields();
    this.cdr.detectChanges();
  }

  renderFormFields() {
    let currIdx = 0
    this.formFields.forEach((row) => {
      row.forEach((field: any, colIndex: number) => {
        const viewContainerRef = this.dynamicFieldHosts.toArray()[currIdx];
        currIdx += 1;
        if (viewContainerRef) {
          this.createComponentForField(field, viewContainerRef);
        }
      });
    });
  }

  createComponentForField(field: any, viewContainerRef: ViewContainerRef) {
    let componentRef;
    switch (field.formField.type) {
      case 'text':
        componentRef = viewContainerRef.createComponent(TextControlComponent);
        break;
      case 'textarea':
        componentRef = viewContainerRef.createComponent(TextAreaControlComponent);
        break;
      case 'autocomplete':
        componentRef = viewContainerRef.createComponent(AutoCompleteControlComponent);
        break;
      case 'calendar':
        componentRef = viewContainerRef.createComponent(CalendarControlComponent);
        break;
      case 'select':
        componentRef = viewContainerRef.createComponent(SelectControlComponent);
        break;
      case 'checkboxes':
        componentRef = viewContainerRef.createComponent(CheckboxesControlComponent);
        break;
      case 'radios':
        componentRef = viewContainerRef.createComponent(RadiosControlComponent);
        break;
      case 'multiselect':
        componentRef = viewContainerRef.createComponent(MultiSelectControlComponent);
        break;
      default:
        console.warn(`Unknown form field type: ${field.formField.type}`);
        break;
    }

    if (componentRef) {
      field.componentRef = componentRef;
      this.setupComponentInstance(field);
    } else {
      console.error(`Component for field type ${field.formField.type} could not be created.`);
    }
  }

  setupComponentInstance(field: any) {
    field.componentRef.instance.label = field.formField.label;
    field.componentRef.instance.required = field.formField.required;
    field.componentRef.instance.options = field.formField.options || [];
    field.componentRef.instance.fetchOptionsFrom = field.formField.fetchOptionsFrom || undefined;
    field.componentRef.instance.params = field.formField.params || undefined;
    field.componentRef.instance.value = (this.entity as any)[field.formField.key] || undefined;
    field.componentRef.instance.inputRegex = field.formField.inputRegex || undefined;
    field.componentRef.instance.helpers = field.formField.helpers || undefined;
    field.componentRef.instance.displayCondition = field.formField.displayCondition || (() => true);
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
    this.formFields.forEach(rowFields => {
      rowFields.forEach((field: any) => {
        if (field.componentRef && field.componentRef.instance.displayCondition) {
          field.componentRef.instance.checkVisibility();
        }
      });
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
