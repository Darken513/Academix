import { Component, OnInit } from '@angular/core';
import { SubjectForm } from './subject.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-subject-edition',
  templateUrl: './subject-edition.component.html',
  styleUrl: './subject-edition.component.scss'
})
export class SubjectEditionComponent implements OnInit {
  entity: SubjectForm = new SubjectForm()
  isNew: boolean = true;
  displayMap = undefined
  /*[
    [
      "regexLimited",
      "password",
      "text"
    ],
    [
      "autocompleteField",
      "timeField",
      "calendarField",
    ],
    [
      "textareaRegex",
    ],
    [
      "checkboxOptions",
    ],
    [
      "radioOptions"
    ],
    [
      "selectOptions",
      "multiSelectOptions"
    ]
  ] */

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    //this.entity.parseJSON({ textareaRegex: 'description here, some long text', regexLimited: '123', password: 'HelloWorld', radioOptions: 'first value' })
    //it should fetch the data from server or cache
    return;
  }

  public onSubmit() {
    console.log(this.entity);
    this.http.post<any>('http://localhost:8080/subjects/create', this.entity).subscribe({
      next: (next) => {
        console.log(next);
      }
    });
  }
}
