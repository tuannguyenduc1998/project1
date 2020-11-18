import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCreate } from 'src/app/shared/model/user-create.model';
import { MyserviceService } from 'src/app/shared/service/myservice.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-sign-up-household',
  templateUrl: './sign-up-household.component.html',
  styleUrls: ['./sign-up-household.component.scss']
})
export class SignUpHouseholdComponent implements OnInit {
  userCreateForm: FormGroup;
  userCreateModel: UserCreate = new UserCreate();
  showModal: boolean;
  imgeModel: string[] = [];
  url = 'http://hawaddsapi.bys.vn/api/file/';
  id: string;
  index: number;
  invalidMessages: string[] = [];
  @Input() isActive = false;
  formErrors = {
  username: '',
  fullname: '',
  email: '',
  password: '',
  confirmpassword: ''
  };
validationMessages = {
  required: 'Trường này là bắt buộc nhập',
  minlength: 'Mật khẩu phải ít nhất 6 kí tự',
};
  constructor(private formBuilder: FormBuilder,
    private myserviceService: MyserviceService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.userCreateForm = this.formBuilder.group({
      username: ['', Validators.required],
      fullname: ['', Validators.required],
      identityCard: ['', Validators.required],
      cellPhoneNumber: ['', Validators.required],
      images: ['']
    });
  }

  validateForm(): boolean {
    this.invalidMessages = this.getInvalidMessages(
      this.userCreateForm,
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

  onSelectFile(event): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.userService.setHouseRegistrationImages(file).subscribe((res) => {
        this.imgeModel.push(res.data.id);
      });
    }
  }

  removeSelectedFile(index): void {
    this.userCreateModel.images.splice(index, 1);
  }

  showModalImage(img: string[], id: string, index: number): void {
    this.showModal = true;
    this.imgeModel = img;
    this.id = id;
    this.index = index;
  }

  closeImageModal(): void {
    this.showModal = false;
  }
}
