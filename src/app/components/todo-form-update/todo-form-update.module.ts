import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TodoFormUpdateComponent } from './todo-form-update.component';

@NgModule({
  declarations: [
    TodoFormUpdateComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TodoFormUpdateComponent
  ]
})
export class TodoFormUpdateModule { }
