import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableAction, TableConfig } from './utilities/TableConfig';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss'
})
export class DynamicTableComponent {
  @Input() tableConfig?: TableConfig;
  @Input() data?: any[];
  hasNokInput: boolean = false;

  constructor() {
    if (!this.tableConfig || !this.data) {
      this.hasNokInput = true;
    }
  }

  /** 
  * Executes a global action, optionally prompting for confirmation
  */
  executeGlobalAction(action: TableAction) {
    if (action.confirm && !confirm('Are you sure you want to proceed?')) {
      return;
    }
    action.handler();
  }

  /**
  * Executes a row-specific action, optionally prompting for confirmation
  */
  executeRowAction(action: TableAction, rowData: any) {
    if (action.confirm && !confirm('Are you sure you want to proceed?')) {
      return;
    }
    action.handler(rowData);
  }

  sortColumn(field: string) {
    //todo-achraf : Sorting logic here
  }

  filterColumn(field: string) {
    //todo-achraf : filtering logic here
  }
}
