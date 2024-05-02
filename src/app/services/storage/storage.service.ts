import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { TodoItemDB } from '@interfaces/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(
    private storage: Storage
  ) {
    this.init().then(() => {})
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async isDatabaseCreated(): Promise<boolean> {
    await this.init();
    return this._storage !== null;
  }

  public async set(key: string, value: TodoItemDB): Promise<any> {
    await this.init();
    return this._storage?.set(key, value);
  }

  public async get(key: string): Promise<TodoItemDB> {
    await this.init();
    return this._storage?.get(key);
  }

  public async update(key: string, value: TodoItemDB): Promise<any> {
    await this.init();
    const existingValue = await this._storage?.get(key);
    if (existingValue !== null) {
      return await this._storage?.set(key, { ...existingValue, ...value });
    }
  }

  public async filterBySyncUpFalse(): Promise<TodoItemDB[]> {
    await this.init();
    const allValues = await this._storage?.keys();
    if (allValues) {
      const filteredValues = [];
      for (const key of allValues) {
        const value = await this._storage?.get(key);
        if (value && value.syncUp === false) {
          filteredValues.push({...value, key});
        }
      }
      return filteredValues;
    } else {
      return [];
    }
  }
}
