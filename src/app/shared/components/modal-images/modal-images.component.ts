import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-images',
  templateUrl: './modal-images.component.html',
  styleUrls: ['./modal-images.component.scss']
})
export class ModalImagesComponent implements OnInit {
  @Input() showModal: boolean;
  @Input() imgeModel: string[];
  @Input() id: string;
  @Input() index: number;
  @Output() closed = new EventEmitter<boolean>();
  currentImage: string;
  url = 'http://hawaddsapi.bys.vn/api/file/';
  constructor() { }

  ngOnInit(): void {
    this.currentImage = this.imgeModel[this.index];
  }

  closeImageModal(): void
  {
    this.closed.emit(true);
  }

  nextMove(): void{
    this.index = this.index < this.imgeModel.length - 1 ? this.index + 1 : this.index - 1 ;
    this.currentImage = this.imgeModel[this.index];
  }

  clickImg(index): void{
    this.currentImage = this.imgeModel[index];
  }
}
