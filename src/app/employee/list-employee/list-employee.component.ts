import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { TypeForm } from 'src/app/constant/type-form';
import { Employees, EmployeeWorks } from 'src/app/model/data';
import { MyserviceService } from 'src/app/service/myservice.service';
import localeVi from '@angular/common/locales/vi';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss'],
})
export class ListEmployeeComponent implements OnInit {
  employees: Employees[] = [];
  model = new Employees();
  modelWork = new EmployeeWorks();
  typeForm = TypeForm;
  searchTerm$ = new BehaviorSubject('');
  employees$: Observable<Employees[]>;
  searchSubject$ = new Subject<string>();
  fieldsetDisabled = false;
  locale: string;
  localeData: any;

  constructor(
    private myserviceService: MyserviceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {
    // this.searchTerm$.pipe(debounceTime(200)).subscribe((_) => {
    //   this.onsearch();
    // });
  }

  ngOnInit(): void {
    this.getEmployees();
    this.getSearch();
  }

  getEmployees(): void {
    this.myserviceService.getEmployees()
      .subscribe((data: any): void => {
        this.employees = data;
      });
  }

  onDelete(id: number): void {
    this.myserviceService.delete(id).subscribe(_ => {
      this.employees = this.employees.filter(employee => employee.id !== id);
    });
  }

  onSearch(searchString: string): void{
    this.searchSubject$.next(searchString);
  }

  getSearch(): void{
    this.employees$ = this.searchSubject$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((searchString: string) => this.myserviceService.searchEmployees(searchString))
    );
  }

  onsearch(): void {
    this.employees = [
      ...this.employees.filter(
        (item) =>
          item &&
          item.name
            .toLowerCase()
            .search(this.searchTerm$.value.toLowerCase().trim()) !== -1
      ),
    ];
  }

  // onDelete(id: number): void {
  //   this.myserviceService.onDelete(id);
  //   this.employees = this.myserviceService.employees;
  // }

  onLogOut(): void {
    this.router.navigate(['/login']);
    localStorage.removeItem('LoginStatus');
  }
}
