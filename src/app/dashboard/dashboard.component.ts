import { Component, OnInit } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { forkJoin } from 'rxjs';
import { MasterdataService } from '../shared/service/masterdata.service';
import { RolesService } from '../shared/service/roles.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private roleService: RolesService, private masterDataService: MasterdataService) { }

  ngOnInit(): void {
    forkJoin([this.roleService.getRoles()]).subscribe((result) =>{
      this.roleService.roles$.next(result[0].data);
    });
  }
}
