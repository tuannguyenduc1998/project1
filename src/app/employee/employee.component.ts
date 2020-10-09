import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  // tslint:disable-next-line: typedef
  count: number;

  constructor() { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  onChange(event){
    this.count = event;
    console.log(this.count);
  }

}
