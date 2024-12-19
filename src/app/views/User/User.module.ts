import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
    // { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
      path: 'profile',
      loadChildren: () => import(`./profile/profile.module`).then(
        module => module.ProfileModule
      )
    }
]

@NgModule({
  declarations: [
    // RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserModule { }