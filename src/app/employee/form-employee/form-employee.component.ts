import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employees, status} from 'src/app/data';
import { MyserviceService } from 'src/app/myservice.service';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.scss']
})
export class FormEmployeeComponent implements OnInit, OnDestroy {
  constructor(private myserviceService: MyserviceService, private route: ActivatedRoute, private router: Router) { }
  @Input() age;
  sub: Subscription;
  status = status;
  model = new Employees();
  url =  './assets/images.png';
  isSubmit: boolean;
  currentEmployee = new Employees();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onChanges = new EventEmitter<number>();

  ngOnInit(): void {
    this.sub = this.myserviceService.age.subscribe(data => {
      this.age = data;
    });
    if (this.myserviceService.currentEmployee) {
      this.model = this.myserviceService.currentEmployee;
    }
  }
  // tslint:disable-next-line: typedef
  onChangeplus() {
    this.myserviceService.age.next(this.myserviceService.age.value + 1);
    this.onChanges.emit(this.age);
  }

  // tslint:disable-next-line: typedef
  onChangesub() {
    this.myserviceService.age.next(this.myserviceService.age.value - 1);
    this.onChanges.emit(this.age);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  // tslint:disable-next-line: typedef
  onSubmit(form: NgForm) {
    this.isSubmit = true;
    // if (this.model.name !== undefined || this.model.email !== undefined) {
    console.log(form);
    // }
    // else { console.log('Tên nhân viên hoặc email đang không có dữ liệu'); }
    const employee: Employees = {
      avatar: form.value.avatar,
      namecode: form.value.namecode,
      name: form.value.name,
      email: form.value.email,
      nation: form.value.nation,
      status: form.value.status,
      comment: form.value.comment,
      active: form.value.active,
    };
    if (form.value.namecode && form.value.name){
      this.myserviceService.onAdd(employee);
      this.router.navigateByUrl(`/employee/listemployee`);
    }
  }
  // tslint:disable-next-line: typedef
  onReset(form) {
    this.isSubmit = false;
    console.log(form.reset(form));
  }
  // tslint:disable-next-line: typedef
  onSelectFile(event) {
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // tslint:disable-next-line: no-shadowed-variable
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }
}
