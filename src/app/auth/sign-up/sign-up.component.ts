import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/shared/helpers/must-match.validator';
import { UserLogin } from 'src/app/shared/model/data';
import { UserLoginData } from 'src/app/shared/model/user.model';
import { MyserviceService } from 'src/app/shared/service/myservice.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  userForm: FormGroup;
  isSubmit: boolean;
  isCheckLogin: false;
  @Input() userLogin: UserLogin = new UserLogin();
  users: UserLogin[];
  currentUser: UserLoginData;
  invalidMessages: string[] = [];
  isActiveE = false;
  isActiveH = true;
  isActive = false;
  formErrors = {
  username: '',
  fullname: '',
  email: '',
  password: '',
  confirmpassword: '',
  mustMatch: ''
  };
validationMessages = {
  required: 'Trường này là bắt buộc nhập',
  minlength: 'Mật khẩu phải ít nhất 6 kí tự',
  email: 'Email không đúng định dạng',
  mustMatch: 'Mật khẩu không khớp'
};
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

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

  createForm(): void {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      fullname: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6)]]
    },
    {
      validator: MustMatch('password', 'confirmpassword')
  }
    );
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

  onSubmit(): void{
    this.isSubmit = true;
    if (this.validateForm()) {
        if (this.isActiveE === true){
          this.isActive = true;
        }
        if (this.isActiveH === true){
          this.isActive = true;
        }
      }
    }

  chooseTypeSignUpE(): void {
    if (this.isActiveE){
      this.isActiveE = true;
    }
    else {
      this.isActiveE = this.isActiveH;
    }
    this.isActiveH = !this.isActiveE;
  }

  chooseTypeSignUpH(): void {
    if (this.isActiveH){
      this.isActiveH = true;
    }
    else {
      this.isActiveH = this.isActiveE;
    }
    this.isActiveE = !this.isActiveH;
  }
}
