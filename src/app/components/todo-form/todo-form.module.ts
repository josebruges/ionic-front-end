import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { TodoFormComponent } from './todo-form.component';

@NgModule({
  declarations: [
    TodoFormComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TodoFormComponent
  ]
})
export class TodoFormModule { }
