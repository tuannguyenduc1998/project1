import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TypeForm } from 'src/app/shared/constant/type-form';
import { Employees } from 'src/app/shared/model/data';
import { MyserviceService } from 'src/app/shared/service/myservice.service';
import { FormEmployeeComponent } from '../form-employee/form-employee.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Input() type: string;
  typeForm = TypeForm;
  id: string;
  employee: Employees;
  loadData$ = new BehaviorSubject('');
  @ViewChild('form') form: FormEmployeeComponent;
  constructor(private route: ActivatedRoute, private myserviceService: MyserviceService) {
   }

  ngOnInit(): void {
     this.getEmplyeeRoute();
     this.type = this.typeForm.edit;
  }

  getEmplyeeRoute(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.myserviceService.getEmployeeById(id).subscribe(employee => this.employee = employee);
  }

}
