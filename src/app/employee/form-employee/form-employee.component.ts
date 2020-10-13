import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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
  @Input() id;
  sub: Subscription;
  status = status;
  model = new Employees();
  url =  './assets/images.png';
  isSubmit: boolean;
  currentEmployee = new Employees();
  employees: Employees[];
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onChanges = new EventEmitter<number>();

  ngOnInit(): void {
    this.sub = this.myserviceService.age.subscribe(data => {
      this.age = data;
    });
    if (this.myserviceService.currentEmployee) {
      this.model = this.myserviceService.currentEmployee;
      this.url = this.model.avatar;
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
  onSubmit() {
    this.isSubmit = true;
    // if (this.model.name !== undefined || this.model.email !== undefined) {
    // }
    // else { console.log('Tên nhân viên hoặc email đang không có dữ liệu'); }
    const id = Math.max(...this.myserviceService.employees.map(item => item.id), 0);
    const employee: Employees = this.model && {
      id: id + 1,
      avatar: this.model.avatar,
      namecode: this.model.namecode,
      name: this.model.name,
      email: this.model.email,
      nation: this.model.nation,
      status: this.model.status,
      comment: this.model.comment,
      active: this.model.active,
    };
    if (this.model.namecode && this.model.name){
      this.myserviceService.onAdd(employee);
      this.router.navigateByUrl(`/employee/listemployee`);
    }
  }
  onUpdate(employ: Employees){
    const src = employ.avatar.replace('C:\\fakepath\\', 'assets/');
    this.myserviceService.onUpdate(employ, src);
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

  // updateAvatar(event) {
  //   this.getBase64(event.target.files[0]).subscribe(res => {
  //     // Todo
  //     this.model.avatar = res;
  //   });
  // }

  // getBase64(file): Observable<any> {
  //   return new Observable(res => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       res.next(reader.result);
  //     };
  //     reader.onerror = function(error) {
  //       console.log('Error: ', error);
  //     };
  //   });
  // }
}
