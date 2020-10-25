import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from '../model/data';
import { MyserviceService } from '../service/myservice.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

    userForm: FormGroup;
    isSubmit: boolean;
    isCheckLogin: false;
    @Input() userLogin: UserLogin = new UserLogin();
    users: UserLogin[];
    invalidMessages: string[] = [];
    formErrors = {
    username: '',
    password: ''
    };
  validationMessages = {
    required: 'Trường này là bắt buộc nhập',
    minlength: 'Mật khẩu phải ít nhất 8 kí tự',
  };


    constructor(private formBuilder: FormBuilder, private myserviceService: MyserviceService, private router: Router) {

  }

  createForm(): void {
    this.userForm = this.formBuilder.group({
      username: [this.userLogin.username, Validators.required],
      password: [this.userLogin.password, [Validators.required, Validators.minLength(8)]],
    });
  }
  ngOnInit(): void {
    this.getUsers();
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

  onSubmit(): void{
    this.isSubmit = true;
    if (this.validateForm()) {

      // this.myserviceService.login(this.userForm.controls.username.value, this.userForm.controls.password.value)
      // .subscribe(
      // matched => {
      //   if (matched) {
      //     this.router.navigateByUrl(`/employee/list`);
      //   } else {
      //     alert('Tài khoản hoặc mật khẩu không đúng!');
      //   }
      // });
      if (this.users.find(x => x.username === this.userForm.get('username').value && x.password === this.userForm.get('password').value))
      {
        this.myserviceService.setLoginStatus(true);
        this.router.navigateByUrl(`/employee/list`);
      }
      else {
        alert('Tài khoản hoặc mật khẩu không đúng!');
      }
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
}
