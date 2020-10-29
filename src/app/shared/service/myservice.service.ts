import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { Employees, EmployeeWorks, UserLogin } from 'src/app/model/data';
// Injectable dùng để trích xuất dữ liệu ra
@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  // Subject: khi vào nó sẽ không biết gì cả BehaviorSubject: thì ngược lại
  constructor(private router: Router, private http: HttpClient) { }

  get LoginStatus(){
    return JSON.parse(localStorage.getItem('LoginStatus'));
  }
  currentEmployee = new Employees();
  private userSubject: BehaviorSubject<UserLogin>;
  // employees: Employees[] = [
  //   {
  //     id: 1,
  //     avatar: 'assets/img-men.jpg',
  //     active: true,
  //     namecode: 312022161161,
  //     name: 'Nguyễn Đức Tuấn',
  //     email: 'tuannguyenduc151198@gmail.com',
  //     nation: 'Kinh',
  //     status: 'Độc thân',
  //     comment: 'không có gì',
  //     birthday: new Date(1998, 11, 15),
  //     works: [
  //       {
  //         item: {
  //           id: 'I',
  //           nameWork: 'Công việc I',
  //           descriptionWork: '',
  //         },
  //         child: [
  //           {
  //             item: {
  //               id: 'I.1',
  //               nameWork: 'Công việc I.1',
  //               descriptionWork: '',
  //             },
  //             child: []
  //           },
  //           {
  //             item: {
  //               id: 'I.2',
  //               nameWork: 'Công việc I.2',
  //               descriptionWork: '',
  //             },
  //             child: []
  //           },
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     avatar: 'assets/img-girl.jpg',
  //     active: true,
  //     namecode: 312022161162,
  //     name: 'Đặng Bảo Quyền',
  //     email: 'quyendang@gmail.com',
  //     nation: 'Kinh',
  //     status: 'Độc thân',
  //     comment: 'không có gì',
  //     birthday: new Date(1995, 12, 31),
  //     works: []
  //   }
  // ];

  employeeWorks: EmployeeWorks[] = [
    {
      id: 1,
      nameWork: 'Quản lý',
      descriptionWork: 'Quản lý những nhân viên cấp dưới',
    }
  ];

  // userLogin: UserLogin[] = [
  //   {
  //     username: 'tuannguyen1998',
  //     password: 'khongcopass',
  //   }
  // ];

  private employeeUrl = 'http://localhost:3000/employees';
  private userUrl = 'http://hawadevapi.bys.vn/api/login';
  private loggedInStatus = JSON.parse(localStorage.getItem('LoginStatus'));

  // tslint:disable-next-line:typedef
  getEmployees(){
     return this.http.get(this.employeeUrl);
  }

  getEmployeeById(id: number): Observable<Employees> {
    const url = `${this.employeeUrl}/${id}`;
    return this.http.get<Employees>(url).pipe(
      tap(selectedEmployee => selectedEmployee[0]),
      catchError(error => of(new Employees()))
    );
  }

  update(employee: Employees): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(`${this.employeeUrl}/${employee.id}`, employee, httpOptions).pipe(
      tap(updatedEmployee => updatedEmployee),
      catchError(error => of(new Employees()))
    );
  }

  add(employee: Employees): Observable<Employees> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Employees>(this.employeeUrl, employee, httpOptions).pipe(
      tap(( employees: Employees) => employees),
      catchError(error => of(new Employees()))
    );
  }

  delete(id: number): Observable<Employees> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const url = `${this.employeeUrl}/${id}`;
    return this.http.delete<Employees>(url, httpOptions).pipe(
      tap(_ => id),
      catchError(error => of(null))
    );
  }

  searchEmployees(name: string): Observable<Employees[]>{
    if (!name.trim()){
      return of([]);
    }
    return this.http.get<Employees[]>(`${this.employeeUrl}?name_like=${name}`).pipe(
      tap(employee => employee),
      catchError(error => of(null))
    );
  }

  setLoginStatus(value): void {
    this.loggedInStatus = value;
    localStorage.setItem('LoginStatus', JSON.stringify(value));
  }
  // onLoad() {
  //   return this.employees;
  // }

  // onLoadUser(): UserLogin[] {
  //   return this.userLogin;
  // }
  getUsers(){
    return this.http.get('http://localhost:3000/userlogin');
 }

  getUserApis(user: UserLogin){
    return this.http.post(this.userUrl, user);
 }

  // onLoadWork(): EmployeeWorks[] {
  //   return this.employeeWorks;
  // }

  // GetEmployee(id: string) {
  //   this.currentEmployee = this.employees.find(x => x.id === +id);
  //   return this.currentEmployee;
  // }
  // onGetEmployee(name: string) {
  //   return this.employees.filter(x => x.name === name);
  // }
  // onDelete(id: number) {
  //   this.employees = this.employees.filter(item => item.id !== id);
  // }
  // createOrUpdate(employee: Employees) {
  //   if (employee.id) {
  //     const src = employee.avatar.replace('C:\\fakepath\\', 'assets/');
  //     const employeeOld = this.employees.find(x => x.id === employee.id);
  //     employeeOld.id = employeeOld.id;
  //     employeeOld.namecode = employee.namecode;
  //     employeeOld.name = employee.name;
  //     employeeOld.active = employee.active;
  //     employeeOld.avatar = src;
  //     employeeOld.email = employee.email;
  //     employeeOld.nation = employee.nation;
  //     employeeOld.status = employee.status;
  //     employeeOld.comment = employee.comment;
  //     return;
  //   }
  //   const id = Math.max(...this.employees.map(item => item.id), 0);
  //   this.employees.push({
  //     id: id + 1,
  //     avatar: employee.avatar !== null ? employee.avatar.replace('C:\\fakepath\\', 'assets/') : '',
  //     namecode: employee.namecode,
  //     name: employee.name,
  //     email: employee.email,
  //     nation: employee.nation,
  //     status: employee.status,
  //     comment: employee.comment,
  //     active: employee.active,
  //     birthday: employee.birthday,
  //     works: []
  //   });
  // }

  getPagination(totalItems: number, currentPage: number = 1, pageSize: number = 2) {

    // Calculate total pages and define startPage and endPage variables
    const totalPages = Math.ceil(totalItems / pageSize);
    let startPage: number;
    let endPage: number;

    // There are 10 page links shown at any time unless there are less than 10 total pages
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      // Current page is in the 6th position, except for when the page is below 6 or less than 4 from the last position
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // Calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // Create an array of pages to *ngFor in the list of pages
    const pages = Array.from(Array(endPage + 1 - startPage), (_, i) => startPage + i);

    // Return object with all pagination properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

}


