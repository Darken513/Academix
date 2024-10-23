import { Component } from '@angular/core';
import { UserForm } from './user.model';

@Component({
  selector: 'app-user-edition',
  templateUrl: './user-edition.component.html',
  styleUrl: './user-edition.component.scss'
})
export class UserEditionComponent {
  public entity:UserForm = new UserForm();
  onSubmit(){
    console.log(this.entity);
  }
}
