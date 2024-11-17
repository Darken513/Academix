import { Component } from '@angular/core';
import { CoursForm } from './cours.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cours-edition',
  templateUrl: './cours-edition.component.html',
  styleUrl: './cours-edition.component.scss'
})
export class CoursEditionComponent {
  entity: CoursForm = new CoursForm()
  isNew: boolean = true;
  displayMap = [
    ['subject_id', 'teacher_id'],
    ['managed_by_center'],
    ['studentPaymentType'],
    ['student_price_per_session', 'student_price_flat_rate'],
    ['teacherPaymentType'],
    ['teacher_price_per_session', 'teacher_price_per_student', 'teacher_price_flat_rate'],
    ['unpaid_total']
  ]

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    //this.entity.parseJSON({ textareaRegex: 'description here, some long text', regexLimited: '123', password: 'HelloWorld', radioOptions: 'first value' })
    //it should fetch the data from server or cache
    return;
  }

  public onSubmit() {
    console.log(this.entity);
    this.http.post<any>('http://localhost:8080/courses/create', this.entity).subscribe({
      next: (next) => {
        console.log(next);
      }
    });
  }
}

