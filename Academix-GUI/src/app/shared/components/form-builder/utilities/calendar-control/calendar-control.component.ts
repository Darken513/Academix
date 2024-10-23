import { Component } from '@angular/core';
import { BaseFormFieldComponent } from '../base-form-field-component/base-form-field.component';

@Component({
  selector: 'app-calendar-control',
  templateUrl: './calendar-control.component.html',
  styleUrls: [
    '../base-form-field-component/base-form-field.component.scss',
    './calendar-control.component.scss'
  ]
})
export class CalendarControlComponent extends BaseFormFieldComponent {
  override onValueChange(event: any, avoidCheck?:boolean) {
    console.log(event);
    let hasValue = event && event.target && typeof event.target.value == "string";
    if (!hasValue)
      return;
    this.valueChange.emit({ value: event.target.value, avoidCheck: avoidCheck });
  }
  onValueSelect(event: any) {
    console.log('onValueSelect');
    this.valueChange.emit({ value: event.value, avoidCheck: false });
  }
}
