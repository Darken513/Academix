import { Component } from '@angular/core';
import { CoursForm } from './cours.model';

@Component({
  selector: 'app-cours-edition',
  templateUrl: './cours-edition.component.html',
  styleUrl: './cours-edition.component.scss'
})
export class CoursEditionComponent {
  entity: CoursForm = new CoursForm()
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

