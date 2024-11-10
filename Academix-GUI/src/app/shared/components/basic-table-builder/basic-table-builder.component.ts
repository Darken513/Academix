import { Component, Input, OnInit } from '@angular/core';
import { BasicTableConfig, TableConfig } from '../table-builder/utilities/TableConfig';

@Component({
  selector: 'app-basic-table-builder',
  templateUrl: './basic-table-builder.component.html',
  styleUrl: './basic-table-builder.component.scss'
})
export class BasicTableBuilderComponent implements OnInit {
  @Input() tableConfig?: BasicTableConfig;
  @Input() data?: any[];
  developedTableConf?: TableConfig;

  ngOnInit(): void {
    if (!this.tableConfig) {
      return;
    }
    this.developedTableConf = {
      columns: this.tableConfig.columns,
      rowActions: [],
      globalActions: [],
      pagination: this.tableConfig.pagination,
      rowSelection: this.tableConfig.rowSelection,
      styles: this.tableConfig.styles
    }
    if (this.tableConfig.add) {
      this.developedTableConf.globalActions?.push({
        label: 'Add Row',
        icon: 'fa-solid fa-plus',
        handler: () => this.addRow()
      });
    }
    if (this.tableConfig.clear) {
      this.developedTableConf.globalActions?.push({
        label: 'Clear Table',
        icon: 'fa-regular fa-trash-can',
        handler: () => this.clearTable(),
        confirmatiomMsg: 'Are you sure you want to clear the table'
      })
    }
    if (this.tableConfig.edit) {
      this.developedTableConf.rowActions?.push({
        icon: 'fa-regular fa-pen-to-square',
        handler: (rowData) => this.editRow(rowData),
      })
    }
    if (this.tableConfig.delete) {
      this.developedTableConf.rowActions?.push({
        icon: 'fa-solid fa-xmark',
        handler: (rowData) => this.deleteRow(rowData),
        confirmatiomMsg: 'Are you sure you want to delete this Subject'
      })
    }
  }

  editRow(rowData: any) {
    console.log('Editing row:', rowData);
    // Implement edit logic here
  }

  deleteRow(rowData: any) {
    console.log('Deleting row:', rowData);
    // Implement delete logic here
  }

  addRow() {
    console.log('Adding a new row');
    // Implement add row logic here
  }

  clearTable() {
    console.log('Clearing all table data');
    this.data = [];
  }
}
