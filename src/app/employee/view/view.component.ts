import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TypeForm } from 'src/app/constant/type-form';
import { Employees } from 'src/app/model/data';
import { MyserviceService } from 'src/app/service/myservice.service';
import { FormEmployeeComponent } from '../form-employee/form-employee.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  @Input() type: string;
  typeForm = TypeForm;
  id: string;
  employee: Employees;
  @ViewChild('form') form: FormEmployeeComponent;
  constructor(private route: ActivatedRoute, private myserviceService: MyserviceService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.employee = this.myserviceService.employees.find(x => x.id === +this.id);
    this.type = this.typeForm.view;
  }

}
