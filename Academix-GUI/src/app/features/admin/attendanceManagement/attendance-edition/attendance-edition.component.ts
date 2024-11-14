import { Component } from '@angular/core';
import { AttendanceForm } from './attendance.model';

@Component({
  selector: 'app-attendance-edition',
  templateUrl: './attendance-edition.component.html',
  styleUrl: './attendance-edition.component.scss'
})
export class AttendanceEditionComponent {
  entity: AttendanceForm = new AttendanceForm()
  displayMap = undefined

  ngOnInit(): void {
    //this.entity.parseJSON({ textareaRegex: 'description here, some long text', regexLimited: '123', password: 'HelloWorld', radioOptions: 'first value' })
    //it should fetch the data from server or cache
    return;
  }

  public onSubmit() {
    //it should send the data to server and save cache version if succeeded
    console.log(this.entity);
  }
}
