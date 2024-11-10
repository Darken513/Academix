import { Component } from '@angular/core';
import { BasicTableConfig } from '../../../../shared/components/table-builder/utilities/TableConfig';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss'
})
export class RoomListComponent {
  constructor(private httpService: HttpService) {
  }

  data: any = [];

  tableConfig: BasicTableConfig = {
    columns: [
      {
        field: 'name',
        header: 'Name',
        type: 'text',
        sortable: true,
        filterable: true,
        width: '60%'
      },
      {
        field: 'capacity',
        header: 'Capacity',
        type: 'text',
        sortable: true,
        filterable: true,
        width: '30%'
      }
    ],
    add: true,
    delete: true,
    clear: true,
    edit: true,
    pagination: true,
    rowSelection: 'multiple',
  };

  ngOnInit(): void {
    this.httpService.get("/rooms/getAll").subscribe({
      next: (res: any) => {
        this.data = res.defs;
      },
    })
  }
}
