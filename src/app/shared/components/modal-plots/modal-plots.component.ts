import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import { ForestPilot, ForestPilots, ProfileForest } from 'src/app/model/profile-forest.model';
import { ForestProfileService } from '../../service/forest-profile.service';

@Component({
  selector: 'app-modal-plots',
  templateUrl: './modal-plots.component.html',
  styleUrls: ['./modal-plots.component.scss']
})
export class ModalPlotsComponent implements OnInit {
  isChecked: false;
  forestModel: ProfileForest = new ProfileForest();
  forestLists: ForestPilots[];
  pilotArray: ForestPilot[];
  a: ForestPilot[] = [];
  b: ForestPilot[];
  c: any[];
  form: FormGroup;
  PilotsData = [];

  get PilotsFormArray() {
    return this.form.controls.Pilots as FormArray;
  }
  constructor(private forestProfileService: ForestProfileService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.forestProfileService.getForests().subscribe( (result) => {
      this.forestModel = result.data;
      this.forestLists = this.forestModel.forestPlots;
      this.pilotArray = this.forestLists.filter( x => x.trees).reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue.trees);
      }, []);
      this.form = this.formBuilder.group({
        Pilots: new FormArray([], minSelectedCheckboxes(1))
      });

      // async Pilots
      of(this.getPilots()).subscribe(Pilots => {
        this.PilotsData = Pilots;
        this.addCheckboxes();
      });
    });
  }

  private addCheckboxes() {
    this.PilotsData.forEach(() => this.PilotsFormArray.push(new FormControl(false)));
  }

  getPilots() {
    return this.pilotArray;
  }

  next() {
    const selectedPilotIds = this.form.value.Pilots
      .map((checked, i) => checked ? this.PilotsData[i].id : null)
      .filter(v => v !== null);

    console.log(selectedPilotIds);
  }

}
function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}
