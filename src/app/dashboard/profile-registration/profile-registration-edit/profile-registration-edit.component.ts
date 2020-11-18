import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HarvestDeclare } from 'src/app/shared/model/declare-harvests';
import { ProfileForest } from 'src/app/shared/model/profile-forest.model';
import { ForestProfileService } from 'src/app/shared/service/forest-profile.service';
import { ProfileRegistrationCreateComponent } from '../profile-registration-create/profile-registration-create.component';

@Component({
  selector: 'app-profile-registration-edit',
  templateUrl: './profile-registration-edit.component.html',
  styleUrls: ['./profile-registration-edit.component.scss'],
})
export class ProfileRegistrationEditComponent implements OnInit {
  @ViewChild('form') form: ProfileRegistrationCreateComponent;
  haverstDeclareModel: HarvestDeclare;
  forestModel: ProfileForest;
  constructor(
    private route: ActivatedRoute,
    private forestProfileService: ForestProfileService
  ) {}

  ngOnInit(): void {
    this.getForestRoute();
  }

  getForestRoute(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.forestProfileService.getDeclareHarvestById(id).subscribe((result) => {
      this.haverstDeclareModel = result.data;
      const forestId = this.haverstDeclareModel.forestId
        ? this.haverstDeclareModel.forestId
        : this.haverstDeclareModel.standingTreeTraditionId;
      this.forestProfileService
        .getForestByForestId(forestId, this.haverstDeclareModel.forestId)
        .subscribe((results) => {
          this.forestModel = results.data;
        });
    });
  }
}
