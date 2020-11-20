import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { UserLogin } from 'src/app/shared/model/data';
import { UserLoginData } from 'src/app/shared/model/user.model';
import { MyserviceService } from 'src/app/shared/service/myservice.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-In.component.html',
  styleUrls: ['./sign-In.component.scss']
})
export class SignInComponent implements OnInit {

    userForm: FormGroup;
    isSubmit: boolean;
    isCheckLogin: false;
    @Input() userLogin: UserLogin = new UserLogin();
    users: UserLogin[];
    currentUser: UserLoginData;
    invalidMessages: string[] = [];
    formErrors = {
    username: '',
    password: ''
    };
  validationMessages = {
    required: 'Trường này là bắt buộc nhập',
    minlength: 'Mật khẩu phải ít nhất 6 kí tự',
  };


    constructor(private formBuilder: FormBuilder,
                private myserviceService: MyserviceService, private router: Router, private userService: UserService) {

  }

  createForm(): void {
    this.userForm = this.formBuilder.group({
      username: [this.userLogin.userName, Validators.required],
      password: [this.userLogin.password, [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.userForm.valueChanges.subscribe(
      _ => {
        if (this.isSubmit)
        {
          this.validateForm();
        }
      }
    );
  }

  getUsers(): void {
    this.myserviceService.getUsers()
      .subscribe((data: any): void => {
        this.users = data;
      });
  }

  getUser(): void {
    this.myserviceService.getUserApis(this.userForm.value)
      .subscribe((data: any): void => {
        this.users = data;
      });
  }

  onSubmit(): void{
    this.isSubmit = true;
    if (this.validateForm()) {
      this.userLogin.password = this.enStr(this.userForm.get('password').value);
      this.userLogin.userName = this.userForm.get('username').value;
      this.myserviceService.getUserApis(this.userLogin).subscribe(res => {
        this.currentUser = res['data'];
        this.userService.setLoginStatus(this.currentUser);
        console.log(this.currentUser);
        this.router.navigateByUrl(`/dashboard`);
      },
      err => {alert('Tài khoản hoặc hoặc mật khẩu không đúng'); });
    }
  }

  validateForm(): boolean {
    this.invalidMessages = this.getInvalidMessages(
      this.userForm,
      this.formErrors
    );
    return this.invalidMessages.length === 0;
  }

  getInvalidMessages(
    form: FormGroup,
    formErrors: object): string[] {
    if (!form) { return; }
    const errorMessages = [];
    for (let field in formErrors) {
      formErrors[field] = '';
      const control = form.get(field);
      if (control && !control.valid) {
        for (const key in control.errors) {
          formErrors[field] += this.validationMessages[key] + '';
          break;
        }
      }
    }
    for (const key in formErrors) {
      if (formErrors.hasOwnProperty(key) && formErrors[key].length > 0) {
        errorMessages.push(formErrors[key]);
      }
    }
    return errorMessages;
  }

  enStr(pass): any{
    // tslint:disable-next-line: max-line-length
    const parsedSalt = CryptoJS.enc.Base64.parse('uGa5buIox4+fX4ViZ7p3TyR4cx5evpoBqFsE8dueBqheYs6faRQ1VxCr0oQ1hqXQGyjc8rKA5kWXjHMxAByt0Q==');
    const result = CryptoJS.PBKDF2( pass, parsedSalt, {
      keySize: 64 / 4,
      iterations: 1000,
      hasher: CryptoJS.algo.SHA512
    } );
    return CryptoJS.enc.Base64.stringify( result );
}
}
