import { TemplateRef } from "@angular/core";

/**
* Configuration for actions that can be performed on a table or rows within the table.
* @param {string} label The label to be displayed on the action button.
* @param {string} icon Optional icon for the button, which can be used for visual representation.
* @param {Function} handler Function to handle the action when the button is clicked. This function should define what happens when the action is triggered.
* @param {boolean} confirm Optional flag indicating whether a confirmation dialog should be shown before executing the action. If true, a confirmation dialog will be shown; otherwise, the action will be executed immediately.
*/
interface TableAction {
    label: string;
    icon?: string;
    handler: (...args: any[]) => void;
    confirm?: boolean;
}

/**
* Configuration for a column in the table. Defines how each column should be rendered and interacted with.
* @param {string} field The field in the data source that this column represents. This is used to extract the value for this column from the row data.
* @param {string} header The label to be displayed as the column header.
* @param {string} type The type of data this column will display. Possible values: 'text', 'number', 'date', 'action'.
* @param {boolean} sortable Optional flag indicating whether the column can be sorted by the user. If true, sorting functionality will be enabled for this column.
* @param {boolean} filterable Optional flag indicating whether the column can be filtered by the user. If true, filtering functionality will be enabled for this column.
* @param {string} width Optional width of the column. This can be specified as a string, e.g., '100px', '20%'. //todo-achraf extend this to style customization
* @param {TemplateRef<any>} cellTemplate Optional custom template for rendering the cell content. This allows for more complex content than a simple text display.
*/
interface ColumnConfig {
    field: string;
    header: string;
    type: 'text' | 'number' | 'date' | 'action';
    sortable?: boolean;
    filterable?: boolean;
    width?: string;
    cellTemplate?: TemplateRef<any>;
}

/**
* Configuration for the table component.
* Defines the overall structure and behavior of the table.
* @param {ColumnConfig[]} columns list of columns to be displayed in the table. Each column is configured using the ColumnConfig interface.
* @param {TableAction[]} rowActions Optional list of actions available for each row in the table. These actions are typically buttons that perform operations on individual rows.
* @param {TableAction[]} globalActions Optional list of actions available for the entire table. These actions apply to the whole table, such as adding new rows or clearing all rows.
* @param {boolean} pagination Optional flag indicating whether pagination should be enabled for the table. If true, pagination controls will be displayed and data will be paginated.
* @param {string} rowSelection Optional setting for row selection type. Possible values: 'single' (single row selection) or 'multiple' (multiple rows selection).
* @param {{ [key: string]: string }} styles Optional custom styles to be applied to the table. This is an object where keys are CSS property names and values are CSS property values.
*/
interface TableConfig {
    columns: ColumnConfig[];
    rowActions?: TableAction[];
    globalActions?: TableAction[];
    pagination?: boolean;
    rowSelection?: 'single' | 'multiple';
    styles?: { [key: string]: string };
}

export {
    TableAction,
    ColumnConfig,
    TableConfig
}