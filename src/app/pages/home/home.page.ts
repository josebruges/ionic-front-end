import { Component, OnInit } from '@angular/core';
import { TodoItemDB, InputEvent } from '@interfaces/Interfaces';
import { StorageService } from '@services/storage/storage.service';

import { ModalController } from '@ionic/angular';
import { TodoFormComponent } from '../../components/todo-form/todo-form.component';
import { TodoFormUpdateComponent } from '../../components/todo-form-update/todo-form-update.component';
import { AsyncComponent } from '../../components/async/async.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  inputSearch: string = '';

  todoItemDB: TodoItemDB[] = []
  filteredItems: TodoItemDB[] = [];

  contentAsyncTodoItemSize: number = 0;
  contentAsyncTodoItem: { [id: string]: number } = {};
  loaded: boolean = false;
  checkedList: boolean = false;

  constructor(
    private storageService: StorageService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.loaded = false;
    this.getAllRequestsFromStorage()
  }

  async getAllRequestsFromStorage(): Promise<void> {
    this.todoItemDB = await this.storageService.filterBySyncUpFalse();
    this.filteredItems = [...this.todoItemDB]
    this.loaded = true;
  }

  onHandleCheckAsync(id: number): void {
    if(this.contentAsyncTodoItem[ id ]){
      delete this.contentAsyncTodoItem[ id ];
    }else{
      this.contentAsyncTodoItem[ id ] = new Date().getTime()
    }
    this.contentAsyncTodoItemSize = Object.keys(this.contentAsyncTodoItem).length;
  }

  onHandleCheckListShow(): void {
    this.checkedList = !this.checkedList;
    this.contentAsyncTodoItem = {};
    this.contentAsyncTodoItemSize = 0;
  }

  async onHandleToggleAllItemsSelection(): Promise<void> {
    if(this.contentAsyncTodoItemSize === this.todoItemDB.length) {
      this.contentAsyncTodoItem = {};
      this.contentAsyncTodoItemSize = 0;
    }else{
      this.todoItemDB.forEach((item: TodoItemDB) => {
        this.contentAsyncTodoItem[ item.id ] = new Date().getTime();
      })
      this.contentAsyncTodoItemSize = Object.keys(this.contentAsyncTodoItem).length;
    }
  }

  async openModalCreate(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: TodoFormComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.todoItemDB.unshift(data);
      this.filteredItems = [...this.todoItemDB]
    }
  }
  async openModalUpdate(index: number, todoItemDB: TodoItemDB): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: TodoFormUpdateComponent,
      componentProps: {
        todoItemDB,
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.todoItemDB[index] = data;
      this.filteredItems = [...this.todoItemDB]
    }
  }
  async openModalAsync(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AsyncComponent,
      componentProps: {
        contentAsyncTodoItem: this.contentAsyncTodoItem,
        filteredItems: this.filteredItems,
        todoItemDB: this.todoItemDB,
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    this.onHandleCheckListShow();
    if(data?.filteredItems){
      this.filteredItems = data?.filteredItems;
    }
    if(data?.todoItemDB){
      this.todoItemDB = data?.todoItemDB;
    }    
  }

  onHandleInputSearch(event: InputEvent) {
    const searchTerm = event.target.value.toLowerCase();
    this.inputSearch = searchTerm;
    this.filteredItems = this.todoItemDB.filter((item: TodoItemDB) =>
      item.title.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
    );
  }
}
