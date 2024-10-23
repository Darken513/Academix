import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendanceDetailsComponent } from './attendanceManagement/attendance-details/attendance-details.component';
import { AttendanceEditionComponent } from './attendanceManagement/attendance-edition/attendance-edition.component';
import { AttendanceHistoryComponent } from './attendanceManagement/attendance-history/attendance-history.component';
import { CoursDetailsComponent } from './coursManagement/cours-details/cours-details.component';
import { CoursEditionComponent } from './coursManagement/cours-edition/cours-edition.component';
import { CoursListComponent } from './coursManagement/cours-list/cours-list.component';
import { EstablishmentDetailsComponent } from './establishmentManagement/establishment-details/establishment-details.component';
import { EstablishmentEditionComponent } from './establishmentManagement/establishment-edition/establishment-edition.component';
import { EstablishmentListComponent } from './establishmentManagement/establishment-list/establishment-list.component';
import { PaymentDetailsComponent } from './paymentManagement/payment-details/payment-details.component';
import { PaymentEditionComponent } from './paymentManagement/payment-edition/payment-edition.component';
import { PaymentHistoryComponent } from './paymentManagement/payment-history/payment-history.component';
import { RoomDetailsComponent } from './roomManagement/room-details/room-details.component';
import { RoomEditionComponent } from './roomManagement/room-edition/room-edition.component';
import { RoomListComponent } from './roomManagement/room-list/room-list.component';
import { SessionDetailsComponent } from './sessionManagement/session-details/session-details.component';
import { SessionEditionComponent } from './sessionManagement/session-edition/session-edition.component';
import { SessionListComponent } from './sessionManagement/session-list/session-list.component';
import { SubjectDetailsComponent } from './subjectManagement/subject-details/subject-details.component';
import { SubjectEditionComponent } from './subjectManagement/subject-edition/subject-edition.component';
import { SubjectListComponent } from './subjectManagement/subject-list/subject-list.component';
import { UserDetailsComponent } from './userManagement/user-details/user-details.component';
import { UserEditionComponent } from './userManagement/user-edition/user-edition.component';
import { UserListComponent } from './userManagement/user-list/user-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    AttendanceDetailsComponent,
    AttendanceEditionComponent,
    AttendanceHistoryComponent,
    CoursDetailsComponent,
    CoursEditionComponent,
    CoursListComponent,
    EstablishmentDetailsComponent,
    EstablishmentEditionComponent,
    EstablishmentListComponent,
    PaymentDetailsComponent,
    PaymentEditionComponent,
    PaymentHistoryComponent,
    RoomDetailsComponent,
    RoomEditionComponent,
    RoomListComponent,
    SessionDetailsComponent,
    SessionEditionComponent,
    SessionListComponent,
    SubjectDetailsComponent,
    SubjectEditionComponent,
    SubjectListComponent,
    UserDetailsComponent,
    UserEditionComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'attendance-management',
        children: [
          { path: 'details/:id', component: AttendanceDetailsComponent },
          { path: 'edit/:id', component: AttendanceEditionComponent },
          { path: 'history', component: AttendanceHistoryComponent }
        ]
      },
      {
        path: 'cours-management',
        children: [
          {
            path: 'details/:id', component: CoursDetailsComponent,
          },
          {
            path: 'session',
            children: [
              { path: 'details/:coursId/:id', component: SessionDetailsComponent },
              { path: 'edit/:coursId/:id', component: SessionEditionComponent },
              { path: 'list/:coursId', component: SessionListComponent },
              { path: '**', redirectTo: '/cours-management/list', pathMatch: 'full' }
            ]
          },
          { path: 'edit/:id', component: CoursEditionComponent },
          { path: 'list', component: CoursListComponent },
          { path: '', redirectTo: 'list', pathMatch: 'full' }
        ]
      },
      {
        path: 'establishment-management',
        children: [
          { path: 'details/:id', component: EstablishmentDetailsComponent },
          { path: 'edit/:id', component: EstablishmentEditionComponent },
          { path: 'list', component: EstablishmentListComponent },
          { path: '', redirectTo: 'list', pathMatch: 'full' }
        ]
      },
      {
        path: 'payment-management',
        children: [
          { path: 'details/:id', component: PaymentDetailsComponent },
          { path: 'edit/:id', component: PaymentEditionComponent },
          { path: 'history', component: PaymentHistoryComponent },
          { path: '', redirectTo: 'history', pathMatch: 'full' }
        ]
      },
      {
        path: 'room-management',
        children: [
          { path: 'details/:id', component: RoomDetailsComponent },
          { path: 'edit/:id', component: RoomEditionComponent },
          { path: 'list', component: RoomListComponent },
          { path: '', redirectTo: 'list', pathMatch: 'full' }
        ]
      },
      {
        path: 'subject-management',
        children: [
          { path: 'details/:id', component: SubjectDetailsComponent },
          { path: 'edit/:id', component: SubjectEditionComponent },
          { path: 'list', component: SubjectListComponent },
          { path: '', redirectTo: 'list', pathMatch: 'full' }
        ]
      },
      {
        path: 'user-management',
        children: [
          { path: 'list', component: UserListComponent },
          { path: 'edit/:id', component: UserEditionComponent },
          { path: 'details/:id', component: UserDetailsComponent },
          { path: '', redirectTo: 'list', pathMatch: 'full' }
        ]
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ])
  ]
})
export class AdminModule { }