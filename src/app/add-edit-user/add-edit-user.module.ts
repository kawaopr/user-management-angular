import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEditUserRoutingModule } from './add-edit-user-routing.module';
import { AddEditUserComponent } from './add-edit-user.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [AddEditUserComponent],
  imports: [
    CommonModule,
    AddEditUserRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AddEditUserModule {}
