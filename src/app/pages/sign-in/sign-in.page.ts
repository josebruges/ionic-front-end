import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '@services/utils/utils.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private utilsService: UtilsService)
  {}

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

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }
}
