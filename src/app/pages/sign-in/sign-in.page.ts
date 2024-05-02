import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '@services/api/api.service';
import { UtilsService } from '@services/utils/utils.service';
import { StorageService } from '@services/storage/storage.service';
import { TodoItemDB, CustomNavigationOptions } from '@interfaces/Interfaces';

import { NavController } from '@ionic/angular';




@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  loginForm!: FormGroup;
  passwordFieldType: string = 'password';
  loading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private utilsService: UtilsService,
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  filterOnlyNumbers(event: KeyboardEvent | ClipboardEvent) {
    return this.utilsService.filterOnlyNumbers(event);
  }

  togglePasswordFieldType() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onSubmit() {
    this.loading = true;
    if (this.loginForm.valid) {
      this.fetchData();
    }else{
      this.loading = false;
    }
  }

  fetchData() {
    this.apiService.fetchData().subscribe(
      (data) => {
        localStorage.setItem('userId', data?.userId);
        const todoItemDB: TodoItemDB = {
          ...data,
          syncUp: false,
          dateSyncUp: null,
          dateI: new Date(),
          dateU: new Date(),
        }
        this.storageService.set(new Date().getTime().toString(), todoItemDB).then(resp => {

          this.loading = false;

          const options: CustomNavigationOptions = {
            animationDirection: 'forward',
            duration: 500,
            animationBuilder: 'ease-out',
          };
      
          setTimeout(() => {
            this.navCtrl.navigateRoot('/home', options); 
          }, 2000)
        });
        for(let i = 1; i <= 50; ++i){
          const todoItemDBTest: TodoItemDB = {
            ...data,
            id: todoItemDB.id + i,
            syncUp: false,
            dateSyncUp: null,
            dateI: new Date(),
            dateU: new Date(),
          }
          this.storageService.set(new Date().getTime().toString() + '' + i, todoItemDBTest).then(resp => {
          })
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }
}
