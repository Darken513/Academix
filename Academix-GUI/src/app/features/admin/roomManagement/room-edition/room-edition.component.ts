import { Component } from '@angular/core';
import { RoomForm } from './room.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-room-edition',
  templateUrl: './room-edition.component.html',
  styleUrl: './room-edition.component.scss'
})
export class RoomEditionComponent {
  entity: RoomForm = new RoomForm()
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
    this.http.post<any>('http://localhost:8080/rooms/create', this.entity).subscribe({
      next: (next) => {
        console.log(next);
      }
    });
  }
}
