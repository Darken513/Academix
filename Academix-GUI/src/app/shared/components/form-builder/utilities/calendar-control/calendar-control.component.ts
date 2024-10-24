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
  /*
  params could contain the following :
  timeOnly:boolean
  */

  override onValueChange(event: any, avoidCheck?: boolean) {
    if (!event)
      return;
    let toret = event;
    if (this.params && this.params.timeOnly) {
      const date = new Date(event);
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      toret = `${hours}:${minutes}`;
    } else {
      const date = new Date(event);
      toret = date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    }
    this.valueChange.emit({ value: toret, avoidCheck: avoidCheck });
  }
}
