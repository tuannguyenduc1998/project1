import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ForestPilot, ForestPilots, ProfileForest } from 'src/app/model/profile-forest.model';
import { ForestProfileService } from '../../service/forest-profile.service';

@Component({
  selector: 'app-modal-plots',
  templateUrl: './modal-plots.component.html',
  styleUrls: ['./modal-plots.component.scss']
})
export class ModalPlotsComponent implements OnInit {
  @Input() isChecked?: string;
  forestModel: ProfileForest = new ProfileForest();
  forestLists: ForestPilots[];
  pilotArray: ForestPilot[];
  a: ForestPilot[] = [];
  b: ForestPilot[];
  c: any[];
  form: FormGroup;
  PilotsData = [];

  constructor(private forestProfileService: ForestProfileService, private modal: NzModalRef) {
  }

  ngOnInit(): void {
    this.forestProfileService.getForests().subscribe( (result) => {
      this.forestModel = result.data;
      this.forestLists = this.forestModel.forestPlots;
      this.pilotArray = this.forestLists.filter( x => x.trees).reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue.trees);
      }, []);
    });
  }

  next() {
  }

}
