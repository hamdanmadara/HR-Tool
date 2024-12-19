import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
    // { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
      path: 'home',
      loadChildren: () => import(`./home-page/home-page.module`).then(
        module => module.HomePageModule
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
    RouterModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GeneralModule { }