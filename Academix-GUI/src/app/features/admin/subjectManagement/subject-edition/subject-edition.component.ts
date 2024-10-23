import { Component, OnInit } from '@angular/core';
import { SubjectForm } from './subject.model';

@Component({
  selector: 'app-subject-edition',
  templateUrl: './subject-edition.component.html',
  styleUrl: './subject-edition.component.scss'
})
export class SubjectEditionComponent implements OnInit {
  entity: SubjectForm = new SubjectForm()

  ngOnInit(): void {
    console.log(this.entity);
    this.entity.parseJSON({ name: 'achraf', description: 'Hello world', radioOptions: 'first value', checkboxOptions: ['second value'] })
    //it should fetch the data from server or cache
    return;
  }

  public onSubmit() {
    //it should send the data to server and save cache version if succeeded
    console.log(this.entity);
  }
}
