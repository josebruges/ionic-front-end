import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from '@services/storage/storage.service';
import { TodoItemDB } from '@interfaces/Interfaces';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.scss'],
})
export class AsyncComponent implements OnInit  {
  public progressPorcentage: number = 0;
  public progress: number = 0;

  @Input() contentAsyncTodoItem: { [id: string]: number } = {};
  @Input() filteredItems: TodoItemDB[] = [];
  @Input() todoItemDB: TodoItemDB[] = [];

  constructor(
    private modalCtrl: ModalController,
    private storageService: StorageService,
  ) {
  }

  ngOnInit(): void {
    console.debug('[ AsyncComponent ]... ngOnInit');
  }

  sleep(ms: number = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async onHandleSincronizar() {
    let count: number = 0;
    for(let id in this.contentAsyncTodoItem){
      count++;
      const posBase = this.todoItemDB.map((x: TodoItemDB) => { return x.id }).indexOf(parseInt(id));
      if(posBase > 0){
        this.todoItemDB.splice(posBase, 1);
      }
      const posFilter = this.filteredItems.map((x: TodoItemDB) => { return x.id }).indexOf(parseInt(id));
      if(posFilter > 0){
        this.todoItemDB.splice(posFilter, 1);
      }

      const item: TodoItemDB =  this.filteredItems[posFilter];

      const key = item?.key || '';
      this.progress =  (count / Object.keys(this.contentAsyncTodoItem).length);
      this.progressPorcentage = Math.round((count / Object.keys(this.contentAsyncTodoItem).length) * 100);
      const resp = await this.storageService.set(key, {
        ...item,
        syncUp: true,
        dateSyncUp: new Date(),
        dateI: new Date(),
      });
  
      this.todoItemDB.splice(posBase, 1);
      this.filteredItems.splice(posFilter, 1);
    }
  }  

  cancel() {
    return this.modalCtrl.dismiss({ filteredItems: this.filteredItems, todoItemDB: this.todoItemDB}, 'cancel');
  }
}