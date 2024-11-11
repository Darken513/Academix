import { Component } from '@angular/core';
import { SessionForm } from './session.model';

@Component({
  selector: 'app-session-edition',
  templateUrl: './session-edition.component.html',
  styleUrl: './session-edition.component.scss'
})
export class SessionEditionComponent {
    entity: SessionForm = new SessionForm()
    displayMap = [
      [
        "sessionDate"
      ],
      [
        "startTime",
        "endTime",
      ]
    ]

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
