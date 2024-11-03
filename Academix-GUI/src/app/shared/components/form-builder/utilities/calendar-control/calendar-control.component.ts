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
  //todo-achraf : fix the case where user ctrl+a and deletes the content, it keeps returning old value
  /*
  params could contain the following :
    timeOnly:boolean, this is an option to force the input to accept only time format HH:MM
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
