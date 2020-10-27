import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TypeForm } from 'src/app/constant/type-form';
import { Employees, EmployeeWorks, status, Work, WorkItem } from 'src/app/model/data';
import { Location } from '@angular/common';
import { emailValidator } from 'src/app/model/validator';
import { MyserviceService } from 'src/app/shared/components/service/myservice.service';
@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.scss']
})
export class FormEmployeeComponent implements OnInit {
  @Input() model: Employees = new Employees();
  @Input() type: string;
  employeeFormGroup: FormGroup;
  items: FormArray;
  typeForm = TypeForm;
  sub: Subscription;
  status = status;
  imgDefault = './assets/images.png';
  isSubmit: boolean;
  employees: Employees[];
  id: number;
  employeeWorks: EmployeeWorks[];
  employeeWorkFormGroup: FormGroup;
  editField: string;
  orderForm: FormGroup;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onChanges = new EventEmitter<number>();
  // Validate form
  invalidMessages: string[] = [];
  formErrors = {
    name: '',
    email: ''
  };
  validationMessages = {
    required: 'Trường này là bắt buộc nhập',
    email: 'Email không đúng định dạng',
  };

  get formArrayItems(): FormArray {
    return this.employeeFormGroup.get('works') as FormArray;
  }

  formArrayChild(form: FormGroup): FormArray {
    return form && form.get('workChild') as FormArray;
  }
  constructor(private formBuilder: FormBuilder, private myserviceService: MyserviceService,
              private route: ActivatedRoute, private router: Router, private location: Location) {
  }
  ngOnInit(): void {
    this.createForm();
    this.myserviceService.getEmployees()
      .subscribe((data: any): void => {
        this.employees = data;
      });
    this.employeeFormGroup.valueChanges.subscribe(
      _ => {
        if (this.isSubmit)
        {
          this.validateForm();
        }
      }
    );
  }

  createWork(workItem: WorkItem): FormGroup {
    return this.formBuilder.group({
      id: workItem.item && workItem.item.id,
      nameWork: workItem.item && workItem.item.nameWork,
      descriptionWork: workItem.item && workItem.item.descriptionWork,
      workChild: this.formBuilder.array(
        (workItem.child || []).map(el => this.createWork(el))
      )
    });
  }

  addWorkChild(item: FormGroup): void {
    this.formArrayChild(item).push( this.createWork(new WorkItem()));
  }

  addWorkParent(controls: FormArray): void{
    controls.push(this.createWork(new WorkItem()));
  }

  delete(index: number, controls: any): void {
    controls.splice(index, 1);
  }

  createForm(): void {
    this.employeeFormGroup = this.formBuilder.group({
      id: [this.model.id],
      active: [this.model.active],
      avatar: [this.model.avatar],
      namecode: [this.model.namecode],
      name: [this.model.name, Validators.required],
      nation: [this.model.nation],
      status: [this.model.status],
      email: [this.model.email, Validators.email],
      comment: [this.model.comment],
      birthday: [this.model.birthday],
      works: this.formBuilder.array(
        (this.model.works || []).map(el => this.createWork(el))
        )
    });
  }

  onAdd(): void {
    this.isSubmit = true;
    if (this.validateForm()) {
      const id = Math.max(...this.employees.map(item => item.id), 0);
      const newEmployee: Employees = new Employees();
      newEmployee.id = id + 1;
      newEmployee.namecode = this.employeeFormGroup.value.namecode;
      newEmployee.name = this.employeeFormGroup.value.name;
      newEmployee.active = this.employeeFormGroup.value.active;
      newEmployee.avatar = this.employeeFormGroup.value.avatar;
      newEmployee.birthday = this.employeeFormGroup.value.birthday;
      newEmployee.email = this.employeeFormGroup.value.email;
      newEmployee.nation = this.employeeFormGroup.value.nation;
      newEmployee.status = this.employeeFormGroup.value.status;
      newEmployee.comment = this.employeeFormGroup.value.comment;
      this.myserviceService.add(newEmployee)
      .subscribe(insertedEmployee => {
        this.employees.push(insertedEmployee);
        this.router.navigateByUrl(`/employee/list`);
      });
    }
  }

  onSubmit(): void {
    this.isSubmit = true;
    if (this.validateForm()) {
      this.myserviceService.update(this.employeeFormGroup.value).subscribe(() => this.router.navigateByUrl(`/employee/list`));
    }
  }

  onReset(): void {
    this.goBack();
  }

  onSelectFile(event): void {
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (eventEl: any) => {
        this.model.avatar = eventEl.target.result;
        this.employeeFormGroup.get('avatar').patchValue(this.model.avatar);
      };
    }
  }

  goBack(): void {
    this.location.back();
  }

  validateForm(): boolean {
    this.invalidMessages = this.getInvalidMessages(
      this.employeeFormGroup,
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

  changeValue(id: number, property: string, event: any): void {
    this.editField = event.target.textContent;
  }

  updateList(id: number, property: string, event: any): void {
    const editField = event.target.textContent;
    this.employeeWorks[id][property] = editField;
  }

}
