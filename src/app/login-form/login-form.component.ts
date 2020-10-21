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
    @Input() userLogin: UserLogin = new UserLogin();
    user: UserLogin[];
    invalidMessages: string[] = [];
    formErrors = {
    username: '',
    password: ''
    };
  validationMessages = {
    required: 'Trường này là bắt buộc nhập',
    minLenght: 'Mật khẩu phải ít nhất 8 kí tự',
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
    this.user = this.myserviceService.onLoadUser();
    this.createForm();
    this.userForm.get('username').valueChanges.subscribe(
      mode => {
        if (mode === '')
        {
          this.userForm.get('username').setValidators([Validators.required]);
        }
        else {
          this.userForm.get('username').updateValueAndValidity();
        }
      }
    );
    this.userForm.get('password').valueChanges.subscribe(
      pwd => {
        if (pwd === '')
        {
          this.userForm.get('password').setValidators([Validators.required]);
        }
        else {
          this.userForm.get('password').updateValueAndValidity();
        }
      }
    );
  }

  onSubmit(): void{
    this.isSubmit = true;
    if (this.validateForm()) {
      if (this.user.find(x => x.username === this.userForm.get('username').value)
         && this.user.find(x => x.password === this.userForm.get('password').value))
      {
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
