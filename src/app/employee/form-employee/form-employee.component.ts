import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TypeForm } from 'src/app/constant/type-form';
import { Employees, status} from 'src/app/model/data';
import { MyserviceService } from 'src/app/service/myservice.service';
import {Location} from '@angular/common';
import { emailValidator } from 'src/app/model/validator';
@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.scss']
})
export class FormEmployeeComponent implements OnInit {
  @Input() model: Employees = new Employees();
  @Input() type: string;
  employeeFormGroup: FormGroup;
  typeForm = TypeForm;
  sub: Subscription;
  status = status;
  imgDefault =  './assets/images.png';
  isSubmit: boolean;
  employees: Employees[];
  id: string;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onChanges = new EventEmitter<number>();
  constructor(private formBuilder: FormBuilder, private myserviceService: MyserviceService,
              private route: ActivatedRoute, private router: Router, private location: Location) {
              }
  ngOnInit(): void {
    this.createForm();
    this.id = this.route.snapshot.params.id;
  }

  createForm(): void{
    this.employeeFormGroup = this.formBuilder.group({
      active: [this.model.active],
      avatar: [this.model.avatar],
      namecode: [this.model.namecode],
      name: [this.model.name, Validators.required],
      nation: [this.model.nation],
      status: [this.model.status],
      email: [this.model.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
      comment: [this.model.comment]
    });
  }

  onSave(): void {
    this.isSubmit = true;
    if (!this.employeeFormGroup.invalid){
      this.myserviceService.onAdd(this.employeeFormGroup.value);
      this.router.navigateByUrl(`/employee/list`);
    }
  }

  onUpdate(employ: Employees): void {
    this.isSubmit = true;
    if (employ.name){
      this.myserviceService.onUpdate(employ, +this.id);
      this.router.navigateByUrl(`/employee/list`);
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
      };
    }
  }

  goBack(): void{
    this.location.back();
  }
}
