import { Component } from '@angular/core';
import { RoomForm } from './room.model';

@Component({
  selector: 'app-room-edition',
  templateUrl: './room-edition.component.html',
  styleUrl: './room-edition.component.scss'
})
export class RoomEditionComponent {
  entity: RoomForm = new RoomForm()
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
