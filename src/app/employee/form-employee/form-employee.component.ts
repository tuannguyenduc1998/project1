import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { status, User } from 'src/app/data';
import { MyserviceService } from 'src/app/myservice.service';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.scss']
})
export class FormEmployeeComponent implements OnInit , OnDestroy{
  constructor(private myserviceService: MyserviceService) { }
  @Input() age;
  sub: Subscription;
  status = status;
  model = new User();
  url = './assets/icon.jpg';
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onChanges = new EventEmitter<number>();

  ngOnInit(): void {
    this.sub = this.myserviceService.age.subscribe( data => {
      this.age = data;
    });
    console.log('Quan sát');
  }
  // tslint:disable-next-line: typedef
  onChangeplus(){
    this.myserviceService.age.next(this.myserviceService.age.value + 1);
    this.onChanges.emit(this.age);
  }

  // tslint:disable-next-line: typedef
  onChangesub(){
    this.myserviceService.age.next(this.myserviceService.age.value - 1);
    this.onChanges.emit(this.age);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  // tslint:disable-next-line: typedef
  onSubmit(form){
    if (this.model.name !== undefined || this.model.email !== undefined)
    {
      console.log(form);
    }
    else { console.log('Tên nhân viên hoặc email đang không có dữ liệu'); }
  }
  // tslint:disable-next-line: typedef
  onReset(form){
     console.log(form.reset(form));
  }
  // tslint:disable-next-line: typedef
  onSelectFile(event){
    if (event.target.files){
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // tslint:disable-next-line: no-shadowed-variable
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }
}
