import { Component, OnInit, ViewChild } from '@angular/core';
import { FormEmployeeComponent } from '../form-employee.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @ViewChild('form') form: FormEmployeeComponent;
  constructor() { }

  ngOnInit(): void {
  }

}
