import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { Employees, EmployeeWorks, UserLogin } from '../model/data';
// Injectable dùng để trích xuất dữ liệu ra
@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  // Subject: khi vào nó sẽ không biết gì cả BehaviorSubject: thì ngược lại
  constructor(private router: Router, private http: HttpClient) { }

  get LoginStatus(): boolean {
    return JSON.parse(localStorage.getItem('LoginStatus') ||
    this.loggedInStatus.toString());
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

  userLogin: UserLogin[] = [
    {
      username: 'tuannguyen1998',
      password: 'khongcopass',
    }
  ];

  private employeeUrl = 'http://localhost:3000/employees';
  private loggedInStatus = JSON.parse(localStorage.getItem('LoginStatus') || ('false'));

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
    localStorage.setItem('LoginStatus', 'true');
  }
  // onLoad() {
  //   return this.employees;
  // }

  onLoadUser(): UserLogin[] {
    return this.userLogin;
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

}


