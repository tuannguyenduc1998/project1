import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appDirectiveExam]'
})
export class ExamDirective implements OnInit {

  constructor(private element: ElementRef) { }
  ngOnInit(): void {
    this.element.nativeElement.style.color = 'green';
  }

}
