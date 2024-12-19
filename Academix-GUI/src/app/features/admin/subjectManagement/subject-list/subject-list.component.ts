import { Component, OnInit } from '@angular/core';
import { BasicTableConfig, TableConfig } from '../../../../shared/components/table-builder/utilities/TableConfig';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.scss'
})
export class SubjectListComponent implements OnInit {
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
        width: '30%'
      },
      {
        field: 'description',
        header: 'Description',
        type: 'text',
        sortable: true,
        filterable: true,
        width: '60%'
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
    this.httpService.get("/subjects/getAll").subscribe({
      next: (res: any) => {
        this.data = res;
      },
    })
  }
}