import { Component, OnInit, ViewChild } from '@angular/core';
import { FormEmployeeComponent } from '../form-employee.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  @ViewChild('form') form: FormEmployeeComponent;
  constructor() { }

  ngOnInit(): void {
  }

}
