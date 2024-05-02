import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '@services/storage/storage.service';
import { TodoItemDB } from '@interfaces/Interfaces';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-todo-form-update',
  templateUrl: './todo-form-update.component.html',
  styleUrls: ['./todo-form-update.component.scss'],
})
export class TodoFormUpdateComponent implements OnInit  {
  todoFormUpdate!: FormGroup;
  @Input() todoItemDB!: TodoItemDB;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
  ) {
  }

  ngOnInit(): void {
    this.todoFormUpdate = this.formBuilder.group({
      title: [this.todoItemDB?.title || '', [Validators.required]],
      completed: [this.todoItemDB?.completed || false]
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async onSubmit() {
    if (this.todoFormUpdate.valid) {
      this.todoItemDB.title = this.todoFormUpdate.value.title;
      this.todoItemDB.completed = this.todoFormUpdate.value.completed;
      this.todoItemDB.dateU = new Date();

      await this.storageService.set(new Date().getTime().toString(), this.todoItemDB);
      return this.modalCtrl.dismiss(this.todoItemDB, 'confirm');
    }else{
      return this.modalCtrl.dismiss(null, 'cancel');
    }
  }
}