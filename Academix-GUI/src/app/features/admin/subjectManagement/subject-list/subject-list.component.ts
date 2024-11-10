import { Component } from '@angular/core';
import { BasicTableConfig, TableConfig } from '../../../../shared/components/table-builder/utilities/TableConfig';

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.scss'
})
export class SubjectListComponent {
  data = [
    { id: 1, name: 'John Doe', age: 28, date: new Date('1995-07-15'), status: 'Active' },
    { id: 2, name: 'Jane Smith', age: 34, date: new Date('1989-02-10'), status: 'Inactive' },
    { id: 3, name: 'Emily Johnson', age: 22, date: new Date('2001-08-25'), status: 'Active' },
    { id: 4, name: 'Michael Brown', age: 41, date: new Date('1982-12-05'), status: 'Pending' },
    { id: 5, name: 'Sarah Wilson', age: 29, date: new Date('1994-04-14'), status: 'Active' },
    { id: 6, name: 'David Martinez', age: 37, date: new Date('1986-03-22'), status: 'Inactive' },
    { id: 7, name: 'Chris Lee', age: 25, date: new Date('1998-11-30'), status: 'Active' },
    { id: 8, name: 'Anna Kim', age: 30, date: new Date('1993-06-19'), status: 'Pending' },
    { id: 9, name: 'James White', age: 45, date: new Date('1978-09-12'), status: 'Inactive' },
    { id: 10, name: 'Laura Black', age: 27, date: new Date('1996-10-05'), status: 'Active' },
    { id: 11, name: 'Robert Green', age: 52, date: new Date('1971-01-17'), status: 'Inactive' },
    { id: 12, name: 'Megan Gray', age: 19, date: new Date('2004-05-08'), status: 'Active' },
  ];

  tableConfig: BasicTableConfig = {
    columns: [
      {
        field: 'name',
        header: 'Name',
        type: 'text',
        sortable: true,
        filterable: true,
        width: '20%'
      },
      {
        field: 'age',
        header: 'Age',
        type: 'number',
        sortable: true,
        filterable: true,
        width: '10%'
      },
      {
        field: 'date',
        header: 'Birth Date',
        type: 'date',
        sortable: true,
        filterable: true,
        width: '50%'
      },
      {
        field: 'status',
        header: 'Status',
        type: 'text',
        sortable: true,
        filterable: true,
        width: '20%'
      }
    ],
    add: true,
    delete: true,
    clear: true,
    edit: true,
    pagination: true,
    rowSelection: 'multiple',
  };
}
