import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject} from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TypeForm } from 'src/app/constant/type-form';
import { Employees, EmployeeWorks } from 'src/app/model/data';
import { MyserviceService } from 'src/app/service/myservice.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit{
  employees: Employees[];
  model = new Employees();
  modelWork = new EmployeeWorks();
  typeForm = TypeForm;
  searchTerm$ = new BehaviorSubject('');
  fieldsetDisabled = false;

  constructor(private myserviceService: MyserviceService, private router: Router, private formBuilder: FormBuilder
    ) {
        this.searchTerm$.pipe(debounceTime(200)).subscribe(_ => {
          this.onsearch();
       });
    }

  ngOnInit(): void {
    this.employees = this.myserviceService.onLoad();
  }

  onsearch(): void {
    this.employees = [
        ...this.myserviceService.employees
        .filter(item =>
         ( item && item.name.toLowerCase().search(this.searchTerm$.value.toLowerCase().trim()) !== -1)
        )
      ];
  }

  onDelete(id: number): void{
    this.myserviceService.onDelete(id);
    this.employees = this.myserviceService.employees;
  }

}
