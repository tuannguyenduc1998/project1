import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MasterdataService } from '../shared/service/masterdata.service';
import { RolesService } from '../shared/service/roles.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private roleService: RolesService, private masterDataService: MasterdataService) { }

  ngOnInit(): void {
    forkJoin([this.masterDataService.getMasterDataAddress(), this.masterDataService.getSignUp()]).subscribe((result) =>{
      this.masterDataService.addressmasterdata$.next(result[0].data);
      this.masterDataService.signUpData$.next(result[1].data);
    });
  }

}
