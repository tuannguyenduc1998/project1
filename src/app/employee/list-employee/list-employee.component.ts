import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TypeForm } from 'src/app/constant/type-form';
import { Employees } from 'src/app/model/data';
import { MyserviceService } from 'src/app/service/myservice.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit{
  employees: Employees[];
  model = new Employees();
  typeForm = TypeForm;
  searchTerm$ = new BehaviorSubject('');
  fieldsetDisabled = false;

  constructor(private myserviceService: MyserviceService, private router: Router
    ) {
        this.searchTerm$.pipe(debounceTime(600)).subscribe(_ => {
          this.onsearch();
       });
    }

  ngOnInit(): void {
    this.employees = this.myserviceService.onLoad();
  }

  viewEmployee(item: Employees): void {
    this.myserviceService.currentEmployee = item;
  }

  onsearch(): void {
    this.employees = [
        ...this.employees
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
