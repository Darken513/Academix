import { Component } from '@angular/core';
import { FormEntity } from '../../../../shared/components/form-builder/utilities/FormEntity';
import { SubjectForm } from './subject.model';

@Component({
  selector: 'app-subject-edition',
  templateUrl: './subject-edition.component.html',
  styleUrl: './subject-edition.component.scss'
})
export class SubjectEditionComponent {
  entity: FormEntity = new SubjectForm()

  public onSubmit() {
    console.log(this.entity);
  }
}
