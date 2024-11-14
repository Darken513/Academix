import { Component } from '@angular/core';
import { UserForm } from './user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-edition',
  templateUrl: './user-edition.component.html',
  styleUrl: './user-edition.component.scss',
})
export class UserEditionComponent {
  entity: UserForm = new UserForm();
  isNew: boolean = true;
  displayMap = [
    ['first_name', 'last_name'],
    ['phone_number'],
    ['password'],
    ['passwordConfirmation'],
    ['note'],
    ['imgURL'],
    ['walletBalance'],
    ['role'],
    ['establishment', 'yearLevel'],
  ];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    //this.entity.parseJSON({ textareaRegex: 'description here, some long text', regexLimited: '123', password: 'HelloWorld', radioOptions: 'first value' })
    //it should fetch the data from server or cache
    return;
  }

  public onSubmit() {
    console.log(this.entity);
    this.http.post<any>('http://localhost:8080/auth/register', this.entity).subscribe({
      next: (next) => {
        console.log(next);
      }
    });
  }
}
