import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent as ParentDashboard } from './features/parent/dashboard/dashboard.component';
import { DashboardComponent as StudentDashboard } from './features/student/dashboard/dashboard.component';
import { DashboardComponent as TeacherDashboard } from './features/teacher/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'parent',
    loadChildren: () => import('./features/parent/parent.module').then(m => m.ParentModule)
  },
  {
    path: 'teacher',
    loadChildren: () => import('./features/teacher/teacher.module').then(m => m.TeacherModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./features/student/student.module').then(m => m.StudentModule)
  },
  { path: '**', redirectTo: '/admin/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }