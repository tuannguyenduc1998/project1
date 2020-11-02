import { Component, OnInit } from '@angular/core';
import { ProfileForest } from 'src/app/model/profile-forest.model';
import { ForestProfileService } from '../../service/forest-profile.service';

@Component({
  selector: 'app-modal-plots',
  templateUrl: './modal-plots.component.html',
  styleUrls: ['./modal-plots.component.scss']
})
export class ModalPlotsComponent implements OnInit {

  forestModel: ProfileForest = new ProfileForest();

  constructor(private forestProfileService: ForestProfileService) { }

  ngOnInit(): void {
    this.forestProfileService.getForests().subscribe( (result) => {
      this.forestModel = result.data;
    });
  }

}
