import { Component } from '@angular/core';
import { AttendanceForm } from './attendance.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-attendance-edition',
  templateUrl: './attendance-edition.component.html',
  styleUrl: './attendance-edition.component.scss'
})
export class AttendanceEditionComponent {
  entity: AttendanceForm = new AttendanceForm()
  isNew: boolean = true;
  displayMap = undefined

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    //this.entity.parseJSON({ textareaRegex: 'description here, some long text', regexLimited: '123', password: 'HelloWorld', radioOptions: 'first value' })
    //it should fetch the data from server or cache
    return;
  }

  public onSubmit() {
    console.log(this.entity);
    this.http.post<any>('http://localhost:8080/attendances/create', this.entity).subscribe({
      next: (next) => {
        console.log(next);
      }
    });
  }
}
