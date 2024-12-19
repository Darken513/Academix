import { Component } from '@angular/core';
import { EstablishmentForm } from './establishment.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-establishment-edition',
  templateUrl: './establishment-edition.component.html',
  styleUrl: './establishment-edition.component.scss'
})
export class EstablishmentEditionComponent {
  entity: EstablishmentForm = new EstablishmentForm()
  isNew: boolean = true;
  displayMap = undefined

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    //it should fetch the data from server or cache
    return;
  }

  public onSubmit() {
    console.log(this.entity);
    this.http.post<any>('http://localhost:8080/establishments/create', this.entity).subscribe({
      next: (next) => {
        console.log(next);
      }
    });
  }
}
