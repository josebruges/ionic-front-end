import { Component, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '@services/storage/storage.service';
import { TodoItemDB } from '@interfaces/Interfaces';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit  {
  todoForm!: FormGroup;
  todoItemDB: TodoItemDB = {
    userId: 0,
    id: 0,
    title: '',
    completed: false,
    syncUp: false,
    dateSyncUp: null,
    dateI: new Date(),
    dateU: new Date(),
  }

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      completed: [false]
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async onSubmit() {
    if (this.todoForm.valid) {
      const userId = localStorage.getItem('userId')
      this.todoItemDB.userId = parseInt('' + userId);
      this.todoItemDB.id =  new Date().getTime();
      this.todoItemDB.title = this.todoForm.value.title;
      this.todoItemDB.completed = this.todoForm.value.completed;
      this.todoItemDB.dateI = new Date();
      this.todoItemDB.dateU = new Date();

      const resp = await this.storageService.set(new Date().getTime().toString(), this.todoItemDB);
      return this.modalCtrl.dismiss(this.todoItemDB, 'confirm');
    }else{
      return this.modalCtrl.dismiss(null, 'cancel');
    }
  }
}