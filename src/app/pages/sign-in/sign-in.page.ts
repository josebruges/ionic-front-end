import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '@services/utils/utils.service';
import { ApiService } from '@services/api/api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  loginForm!: FormGroup;
  passwordFieldType: string = 'password';

  constructor(
    private formBuilder: FormBuilder,
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
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.fetchData();
    }
  }

  fetchData() {
    this.apiService.fetchData().subscribe(
      (data) => {
        console.debug('Data fetched successfully:', data);
        // Aquí puedes manejar los datos obtenidos según tus necesidades
      },
      (error) => {
        console.error('Error fetching data:', error);
        // Aquí puedes manejar el error según tus necesidades
      }
    );
  }
}
