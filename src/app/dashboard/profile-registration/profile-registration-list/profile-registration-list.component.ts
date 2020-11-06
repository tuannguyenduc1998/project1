import { Component, OnInit } from '@angular/core';
import { MasterData } from 'src/app/model/masterData.model';
import { UserLoginData } from 'src/app/model/user.model';
import { ForestProfileService } from 'src/app/shared/service/forest-profile.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-profile-registration-list',
  templateUrl: './profile-registration-list.component.html',
  styleUrls: ['./profile-registration-list.component.scss']
})
export class ProfileRegistrationListComponent implements OnInit {
  user: UserLoginData;
  masterData: MasterData = new MasterData();
  constructor(private userService: UserService, private forestService: ForestProfileService ) { }

  ngOnInit(): void {
    this.user = this.userService.LoginStatus;
    this.forestService.getDeclareHarvestStatus().subscribe( (result) => {
      this.masterData = result.data;
    })
  }

}
