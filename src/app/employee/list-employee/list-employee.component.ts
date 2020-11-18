import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MyserviceService } from 'src/app/shared/service/myservice.service';
import { Employees, EmployeeWorks } from 'src/app/shared/model/data';
import { TypeForm } from 'src/app/shared/constant/type-form';

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
  pagination: any = {};
  pagedEmployees: any[];

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
  }

  getEmployees(): void {
    this.myserviceService.getEmployees()
      .subscribe((data: any): void => {
        this.employees = data;
        this.setPage(1);
      });
  }

  onDelete(id: number): void {
    this.myserviceService.delete(id).subscribe(_ => {
      this.employees = this.employees.filter(employee => employee.id !== id);
    });
  }

  onSearch(searchString: string): void{
    if (searchString === ''){
      this.ngOnInit();
    }
    this.myserviceService.searchEmployees(searchString).subscribe((data) => {
      this.pagedEmployees = data;
    }, error => of([null])
    );
  }

  onLogOut(): void {
    this.router.navigate(['/login']);
    localStorage.removeItem('LoginStatus');
  }

  setPage(page: number) {
    if (page < 1 || page > this.pagination.totalPages) {
      return;
    }
    this.pagination = this.myserviceService.getPagination(this.employees.length, page);
    this.pagedEmployees = this.employees.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
  }

  // searchNext(): void{
  //   if (this.employes.page < this.employes.totalPages){
  //     let nextPage = this.employes.page + 1;
  //     let x = {
  //       page: nextPage,
  //       size: 2,
  //       keyword: ''
  //     };
  //     this.httpClient.post('http://localhost:3000/employees', x).subscribe( result => {
  //       this.employes = result;
  //       this.employes = this.employes.data;
  //     },error => error);
  //   }
  //   else{
  //     alert('Bạn đang ở cuối trang!');
  //   }
  // }

  // searchPrevious(): void{
  //   if (this.employes.page > 1){
  //     let previousPage = this.employes.page - 1;
  //     let x = {
  //       page: previousPage,
  //       size: 2,
  //       keyword: ''
  //     };
  //     this.httpClient.post('http://localhost:3000/employees', x).subscribe( result => {
  //       this.employes = result;
  //       this.employes = this.employes.data;
  //     },error => error);
  //   }
  //   else{
  //     alert('Bạn đang ở đầu trang!');
  //   }
  // }

  // onsearch(): void {
  //   this.employees = [
  //     ...this.employees.filter(
  //       (item) =>
  //         item &&
  //         item.name
  //           .toLowerCase()
  //           .search(this.searchTerm$.value.toLowerCase().trim()) !== -1
  //     ),
  //   ];
  // }

  // onDelete(id: number): void {
  //   this.myserviceService.onDelete(id);
  //   this.employees = this.myserviceService.employees;
  // }
}
