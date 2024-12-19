import { Routes } from '@angular/router';
import { AuthGuard } from './shared/_guards/authGuard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import(`./views/Auth/auth.module`).then(
          module => module.AuthModule
        )
      },
      {
        path: 'manager',
        loadChildren: () => import(`./views/manager/manager.module`).then(
          module => module.ManagerModule
        ),
        // canActivate:[AuthGuard]
      },
      {
        path: 'admin',
        loadChildren: () => import(`./views/Admin/admin.module`).then(
          module => module.AdminModule
        ),
        // canActivate:[AuthGuard]
      },
      {
        path: '',
        loadChildren: () => import(`./views/General/general.module`).then(
          module => module.GeneralModule
        )
      },
      {
        path: 'user',
        loadChildren: () => import(`./views/User/User.module`).then(
          module => module.UserModule
        ),
        canActivate:[AuthGuard]
      },
];
