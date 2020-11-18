import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ForestPilot, ForestPilots, ProfileForest } from '../../model/profile-forest.model';
import { ForestProfileService } from '../../service/forest-profile.service';

@Component({
  selector: 'app-modal-plots',
  templateUrl: './modal-plots.component.html',
  styleUrls: ['./modal-plots.component.scss'],
})
export class ModalPlotsComponent implements OnInit {
  @Input() setOfCheckedId = new Set<string>();
  @Input() usedId = new Set<string>();
  forestModel: ProfileForest = new ProfileForest();
  forestLists: ForestPilots[];
  pilotArray: ForestPilot[];
  form: FormGroup;
  PilotsData = [];
  isVisible: boolean;
  checkedAll: boolean;
  province: string;

  constructor(
    private forestProfileService: ForestProfileService,
    private modal: NzModalRef
  ) {}

  ngOnInit(): void {
    this.forestProfileService.getForests().subscribe((result) => {
      this.forestModel = result.data;
      this.forestLists = this.forestModel.forestPlots;
      this.province = this.forestModel.province.value;
      this.pilotArray = this.forestLists
        .filter((x) => x.trees)
        .reduce((accumulator, currentValue) => {
          return accumulator.concat(currentValue.trees);
        }, []);
    });
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.forestLists = this.forestLists.filter((o) => !this.usedId.has(o.id));
    this.checkedAll = this.forestLists.every(({ id }) =>
      this.setOfCheckedId.has(id)
    );
  }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onAllChecked(checked: boolean): void {
    this.forestLists.forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk(): void {
    setTimeout(() => {
      this.isVisible = false;
    }, 3000);
  }

  destroyModal(): void {
    this.modal.destroy();
  }

  clickNextModal(): void {
    this.modal.destroy({
      list1: this.setOfCheckedId,
      list2: this.forestLists,
      province: this.province,
    });
  }

  onCurrentPageDataChange($event: ForestPilots[]): void {
    this.forestLists = $event;
    this.refreshCheckedStatus();
  }
}
