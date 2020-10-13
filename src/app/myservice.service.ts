import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employees } from './data';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
// Injectable dùng để trích xuất dữ liệu ra
@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  age = new BehaviorSubject(18);
  currentEmployee = new Employees();
  employees: Employees[] = [
    {
      id: 1,
      avatar: 'assets/img-men.jpg',
      active: true,
      namecode: 312022161161,
      name: 'Nguyễn Đức Tuấn',
      email: 'tuannguyenduc151198@gmail.com',
      nation: 'Kinh',
      status: 'Độc thân',
      comment: 'không có gì'
    },
    {
      id: 2,
      avatar: 'assets/img-girl.jpg',
      active: true,
      namecode: 312022161162,
      name: 'Đặng Bảo Quyền',
      email: 'quyendang@gmail.com',
      nation: 'Kinh',
      status: 'Độc thân',
      comment: 'không có gì'
    }
  ];
  // Subject: khi vào nó sẽ không biết gì cả BehaviorSubject: thì ngược lại
  constructor() { }
  // tslint:disable-next-line:typedef
  onLoad(){
    return this.employees;
  }
  // tslint:disable-next-line:typedef
  onAdd(employee: Employees){
    this.employees.push(employee);
  }
  onGetEmployee(name: string) {
    return this.employees.filter(x => x.name === name);
  }
  onDelete(id: number){
    this.employees = this.employees.filter(item => item.id !== id);
  }
  onUpdate(employee: Employees){
    const employeeOld = this.employees.find(x => x.id === employee.id);
    employeeOld.id = employeeOld.id;
    employeeOld.namecode = employee.namecode;
    employeeOld.name = employee.name;
    employeeOld.active = employee.active;
    employeeOld.avatar = employee.avatar;
    employeeOld.email = employee.email;
    employeeOld.nation = employee.nation;
    employeeOld.status = employee.status;
    employeeOld.comment = employee.comment;
  }
  search(terms: Observable<string>) {
    return terms.pipe(debounceTime(400))
      .pipe(distinctUntilChanged())
      .pipe(switchMap(term => this.onGetEmployee(term)));
  }
}


