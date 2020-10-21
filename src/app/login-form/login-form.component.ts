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
    this.createForm();
  }

  onSubmit(): void{
    this.isSubmit = true;
    if (this.validateForm()) {
      this.router.navigateByUrl(`/employee/list`);
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
