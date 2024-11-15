import { Component } from '@angular/core';
import { SessionForm } from './session.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-session-edition',
  templateUrl: './session-edition.component.html',
  styleUrl: './session-edition.component.scss',
})
export class SessionEditionComponent {
  entity: SessionForm = new SessionForm();
  isNew: boolean = true;
  displayMap = [
    ['session_date'],
    ['start_time', 'end_time'],
    ['cours_id', 'room_id'],
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    //this.entity.parseJSON({ textareaRegex: 'description here, some long text', regexLimited: '123', password: 'HelloWorld', radioOptions: 'first value' })
    //it should fetch the data from server or cache
    return;
  }

  public onSubmit() {
    console.log(this.entity);
    this.http
      .post<any>('http://localhost:8080/sessions/create', this.entity)
      .subscribe({
        next: (next) => {
          console.log(next);
        },
      });
  }
}
