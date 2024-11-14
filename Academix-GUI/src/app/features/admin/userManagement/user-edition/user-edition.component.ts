import { Component } from '@angular/core';
import { UserForm } from './user.model';

@Component({
  selector: 'app-user-edition',
  templateUrl: './user-edition.component.html',
  styleUrl: './user-edition.component.scss'
})
export class UserEditionComponent {
  entity: UserForm = new UserForm()
  displayMap = [
    [
      "firstName",
      "lastName"
    ],
    [
      "phoneNumber"
    ],
    [
      "password"
    ],
    [
      "passwordConfirmation"
    ],
    [
      "note"
    ],
    [
      "imgURL"
    ],
    [
      "walletBalance"
    ],
    [
      "userType"
    ],
    [
      "Establishment",
      "yearLevel"
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
