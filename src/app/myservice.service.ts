import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// Injectable dùng để trích xuất dữ liệu ra
@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  age = new BehaviorSubject(18);
  // Subject: khi vào nó sẽ không biết gì cả BehaviorSubject: thì ngược lại
  constructor() { }
}


