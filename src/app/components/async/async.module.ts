import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { AsyncComponent } from './async.component';

@NgModule({
  declarations: [
    AsyncComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    AsyncComponent
  ]
})
export class AsyncModule { }
