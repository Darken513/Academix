import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardBuilderComponent } from './components/dashboard-builder/dashboard-builder.component';
import { DetailsBuilderComponent } from './components/details-builder/details-builder.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { SideTopMenuComponent } from './components/side-top-menu/side-top-menu.component';
import { TableBuilderComponent } from './components/table-builder/table-builder.component';
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [
    DashboardBuilderComponent,
    DetailsBuilderComponent,
    FormBuilderComponent,
    SideTopMenuComponent,
    TableBuilderComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    AuthService
  ],
  exports: [
    DashboardBuilderComponent,
    DetailsBuilderComponent,
    FormBuilderComponent,
    SideTopMenuComponent,
    TableBuilderComponent
  ]
})
export class SharedModule { }
