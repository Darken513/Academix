import { Component } from '@angular/core';
import { EstablishmentForm } from './establishment.model';

@Component({
  selector: 'app-establishment-edition',
  templateUrl: './establishment-edition.component.html',
  styleUrl: './establishment-edition.component.scss'
})
export class EstablishmentEditionComponent {
  entity: EstablishmentForm = new EstablishmentForm()
  displayMap = undefined

  ngOnInit(): void {
    //it should fetch the data from server or cache
    return;
  }

  public onSubmit() {
    //it should send the data to server and save cache version if succeeded
    console.log(this.entity);
  }
}
