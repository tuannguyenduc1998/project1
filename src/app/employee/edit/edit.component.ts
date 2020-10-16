import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TypeForm } from 'src/app/constant/type-form';
import { Employees } from 'src/app/model/data';
import { MyserviceService } from 'src/app/service/myservice.service';
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
    this.loadData$.pipe(debounceTime(0)).subscribe(_ => {
      this.employee =  this.myserviceService.GetEmployee(this.id);
   });
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.employee =  this.myserviceService.GetEmployee(this.id);
    this.type = this.typeForm.edit;
  }

}
