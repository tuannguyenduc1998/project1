import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Employees } from '../model/data';
// Injectable dùng để trích xuất dữ liệu ra
@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
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
  constructor(private router: Router) { }
  // tslint:disable-next-line:typedef
  onLoad(){
    return this.employees;
  }

  GetEmployee(id: string) {
    this.currentEmployee = this.employees.find(x => x.id === +id);
    return this.currentEmployee;
  }
  // tslint:disable-next-line:typedef
  onAdd(employee: Employees){
    const id = Math.max(...this.employees.map(item => item.id), 0);
    this.employees.push({
      id: id + 1,
      avatar: employee.avatar !== null ? employee.avatar.replace('C:\\fakepath\\', 'assets/') : '',
      namecode: employee.namecode,
      name: employee.name,
      email: employee.email,
      nation: employee.nation,
      status: employee.status,
      comment: employee.comment,
      active: employee.active,
    });
  }
  onGetEmployee(name: string) {
    return this.employees.filter(x => x.name === name);
  }
  onDelete(id: number){
    this.employees = this.employees.filter(item => item.id !== id);
  }
  onUpdate(employee: Employees, id: number){
    const src = employee.avatar.replace('C:\\fakepath\\', 'assets/');
    const employeeOld = this.employees.find(x => x.id === id);
    employeeOld.id = employeeOld.id;
    employeeOld.namecode = employee.namecode;
    employeeOld.name = employee.name;
    employeeOld.active = employee.active;
    employeeOld.avatar = src;
    employeeOld.email = employee.email;
    employeeOld.nation = employee.nation;
    employeeOld.status = employee.status;
    employeeOld.comment = employee.comment;
  }
}

