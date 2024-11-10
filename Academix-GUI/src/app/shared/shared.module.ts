import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardBuilderComponent } from './components/dashboard-builder/dashboard-builder.component';
import { DetailsBuilderComponent } from './components/details-builder/details-builder.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { SideTopMenuComponent } from './components/side-top-menu/side-top-menu.component';
import { TableBuilderComponent } from './components/table-builder/table-builder.component';
import { AuthService } from './auth/auth.service';
import { TextControlComponent } from './components/form-builder/utilities/text-control/text-control.component';
import { SelectControlComponent } from './components/form-builder/utilities/select-control/select-control.component';
import { RadiosControlComponent } from './components/form-builder/utilities/radios-control/radios-control.component';
import { TextAreaControlComponent } from './components/form-builder/utilities/text-area-control/text-area-control.component';
import { CheckboxesControlComponent } from './components/form-builder/utilities/checkboxs-control/checkboxes-control.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteControlComponent } from './components/form-builder/utilities/auto-complete-control/auto-complete-control.component';
import { CalendarControlComponent } from './components/form-builder/utilities/calendar-control/calendar-control.component';
import { MultiSelectControlComponent } from './components/form-builder/utilities/multi-select-control/multi-select-control.component';
import { BasicTableBuilderComponent } from './components/basic-table-builder/basic-table-builder.component';
@NgModule({
  declarations: [
    DashboardBuilderComponent,
    DetailsBuilderComponent,
    FormBuilderComponent,
    SideTopMenuComponent,
    TableBuilderComponent,
    BasicTableBuilderComponent,
    TextControlComponent,
    SelectControlComponent,
    RadiosControlComponent,
    TextAreaControlComponent,
    CheckboxesControlComponent,
    AutoCompleteControlComponent,
    CalendarControlComponent,
    MultiSelectControlComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AutoCompleteModule,
    CalendarModule,
    MultiSelectModule
  ],
  providers: [
    AuthService
  ],
  exports: [
    DashboardBuilderComponent,
    DetailsBuilderComponent,
    FormBuilderComponent,
    SideTopMenuComponent,
    TableBuilderComponent,
    BasicTableBuilderComponent
  ]
})
export class SharedModule { }
