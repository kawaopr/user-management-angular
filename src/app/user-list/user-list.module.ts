import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListRoutingModule } from './user-list-routing.module';
import { SharedModule } from '@shared/shared.module';
import { UserListComponent } from './user-list.component';



@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    UserListRoutingModule,
    SharedModule
  ]
})
export class UserListModule { }
