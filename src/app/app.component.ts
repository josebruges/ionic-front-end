import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '@services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private storageService: StorageService
  ) {}
  ngOnInit(): void {
    this.verifyStorage();
  }

  async verifyStorage(): Promise<void> {
    await this.storageService.isDatabaseCreated()
  }
}

