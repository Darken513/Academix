import { Component, Input, OnInit } from '@angular/core';
import { TableAction, TableConfig } from './utilities/TableConfig';

@Component({
  selector: 'app-table-builder',
  templateUrl: './table-builder.component.html',
  styleUrls: ['./table-builder.component.scss']
})
export class TableBuilderComponent implements OnInit {
  @Input() tableConfig?: TableConfig;
  @Input() data?: any[];

  originalData: any[] = []; // To store original data for filtering
  filteredData: any[] = []; // Store filtered data
  sortedColumn: string | null = null; // Keeps track of the last sorted column
  sortDirection: 'asc' | 'desc' = 'asc'; // Track sort direction
  hasNokInput: boolean = false;
  filters: { [key: string]: string } = {}; // Store filter values for each column

  ngOnInit(): void {
    this.validateInputs();
    if (this.data) {
      this.originalData = [...this.data]; // Store a copy of original data for reset after filtering
      this.filteredData = [...this.data];
    }
  }

  validateInputs() {
    if (!this.tableConfig || !this.data || !this.tableConfig.columns || this.tableConfig.columns.length === 0) {
      this.hasNokInput = true;
    } else {
      this.hasNokInput = false;
    }
  }

  executeGlobalAction(action: TableAction) {
    if (action.confirm && !confirm('Are you sure you want to proceed?')) {
      return;
    }
    action.handler();
  }

  executeRowAction(action: TableAction, rowData: any) {
    if (action.confirm && !confirm('Are you sure you want to proceed?')) {
      return;
    }
    action.handler(rowData);
  }

  /**
   * Sort the table based on a column field
   * @param field Column field to sort by
   */
  sortColumn(field: string) {
    if (!this.filteredData) return;

    if (this.sortedColumn === field) {
      // Toggle sort direction if the same column is clicked
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Default to ascending sort if a new column is sorted
      this.sortedColumn = field;
      this.sortDirection = 'asc';
    }

    this.filteredData.sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];

      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  /**
   * Handle input in filter fields
   * @param field Column field to filter by
   * @param event Input event containing the filter value
   */
  onFilterInput(field: string, event: any) {
    const filterTerm = event.target.value.toLowerCase();
    this.filters[field] = filterTerm;
    this.applyFilters();
  }

  /**
   * Apply filters to the data based on the input values
   */
  applyFilters() {
    this.filteredData = this.originalData.filter(row => {
      return this.tableConfig!.columns.every(col => {
        const cellValue = row[col.field]?.toString().toLowerCase();
        const filterValue = this.filters[col.field] || '';
        return cellValue.includes(filterValue);
      });
    });
  }
}
