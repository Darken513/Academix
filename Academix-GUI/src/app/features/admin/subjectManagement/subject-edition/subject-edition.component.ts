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
    this.entity.parseJSON({ textareaRegex: 'description here, some long text', regexLimited:'123', password: 'HelloWorld', radioOptions: 'first value' })
    //it should fetch the data from server or cache
    return;
  }

  public onSubmit() {
    //it should send the data to server and save cache version if succeeded
    console.log(this.entity);
  }
}
