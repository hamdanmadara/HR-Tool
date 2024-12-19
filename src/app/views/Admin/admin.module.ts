import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';
import { NavbarComponent } from '../General/navbar/navbar.component';


const routes: Routes = [
  { path: '', redirectTo: 'user-management', pathMatch: 'full' },
  {
    path: 'user-management',
    component: UserManagementComponent
    // loadChildren: () => import(`./user-management/user-management.module`).then(
    //   module => module.UserManagementModule
    // )
  }

];

@NgModule({
  declarations: [
    // RegisterComponent
  
    // ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    // NavbarComponent,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AdminModule { }
