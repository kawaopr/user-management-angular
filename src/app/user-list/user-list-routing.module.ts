import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserListComponent } from './user-list.component';

const routes: Routes = [
  {
    path: 'user-list',
    component: UserListComponent,
    children: [

      {
        path: 'user-detail/:id',
        loadChildren: () =>
          import('../user-detail/user-detail.module').then(
            (m) => m.UserDetailModule
          ),
      },
      {
        path: '',
        redirectTo: 'user-list/user-detail/1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'users/:id',
    loadChildren: () =>
      import('../user-detail/user-detail.module').then(
        (m) => m.UserDetailModule
      ),
  },
  {
    path: '',
    redirectTo: window.innerWidth <= environment.mobileWidth ? 'user-list' : 'user-list/user-detail/1',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserListRoutingModule {}
