import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./user-list/user-list.module').then((m) => m.UserListModule),
  },
  {
    path: 'add/user',
    loadChildren: () =>
      import('./add-edit-user/add-edit-user.module').then(
        (m) => m.AddEditUserModule
      ),
  },
  {
    path: 'edit/user/:id',
    loadChildren: () =>
      import('./add-edit-user/add-edit-user.module').then(
        (m) => m.AddEditUserModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
