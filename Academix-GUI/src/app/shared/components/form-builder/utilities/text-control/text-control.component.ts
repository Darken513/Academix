import { Component } from '@angular/core';
import { BaseFormFieldComponent } from '../base-form-field-component/base-form-field.component';

@Component({
  selector: 'app-text-control',
  templateUrl: './text-control.component.html',
  styleUrls: [
    '../base-form-field-component/base-form-field.component.scss',
    './text-control.component.scss'
  ]
})
export class TextControlComponent extends BaseFormFieldComponent {
  /*
  params could contain the following :
    type:string, this is an option that forces the input field ( DOM level ) into a certain type
  */
  override onValueChange(event: any, avoidCheck?: boolean) {
    let hasValue = event && event.target && typeof event.target.value == "string";
    if (!hasValue)
      return;
    let val = event.target.value;
    if (this.isConformToRegex(val))
      this.valueChange.emit({ value: val, avoidCheck: avoidCheck });
    else {
      event.target.value = val.slice(0, -1);
      this.valueChange.emit({ value: event.target.value, avoidCheck: avoidCheck });
    }
  }
}
