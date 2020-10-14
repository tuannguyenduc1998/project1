import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { TypeForm } from 'src/app/constant/type-form';
import { Employees, status} from 'src/app/model/data';
import { MyserviceService } from 'src/app/service/myservice.service';
@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.scss']
})
export class FormEmployeeComponent implements OnInit {
  @Input() model: Employees = new Employees();
  @Input() type: string;
  typeForm = TypeForm;
  constructor(private myserviceService: MyserviceService, private route: ActivatedRoute, private router: Router) { }
  sub: Subscription;
  status = status;
  imgDefault =  './assets/images.png';
  isSubmit: boolean;
  currentEmployee = new Employees();
  employees: Employees[];
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onChanges = new EventEmitter<number>();
  ngOnInit(): void {
  }
  onSubmit(): void {
    this.isSubmit = true;
    const id = Math.max(...this.myserviceService.employees.map(item => item.id), 0);
    const employee: Employees = this.model && {
      id: id + 1,
      avatar: this.model.avatar.replace('C:\\fakepath\\', 'assets/'),
      namecode: this.model.namecode,
      name: this.model.name,
      email: this.model.email,
      nation: this.model.nation,
      status: this.model.status,
      comment: this.model.comment,
      active: this.model.active,
    };
    if (this.model.name){
      this.myserviceService.onAdd(employee);
      this.router.navigateByUrl(`/employee/list`);
    }
  }
  onUpdate(employ: Employees): void {
    const src = employ.avatar.replace('C:\\fakepath\\', 'assets/');
    if (this.model.name){
        this.myserviceService.onUpdate(employ, src);
        this.router.navigateByUrl(`/employee/list`);
    }
  }
  onReset(form): void {
    this.isSubmit = false;
    console.log(form.reset(form));
  }
  onSelectFile(event): void {
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (eventEl: any) => {
        this.model.avatar = eventEl.target.result;
      };
    }
  }
}
