import { Directive, ElementRef, OnInit } from '@angular/core';
import { RolesService } from '../service/roles.service';

@Directive({
  selector: '[appHiddenButton]'
})
export class HiddenButtonDirective implements OnInit{

  constructor(private element: ElementRef, private roleService: RolesService) { }
  ngOnInit(): void {
    this.roleService.roles$.subscribe( value => {
      if (value && (value.roles || []).some(x => x === 'HarvestedTimberSourceViewAllProfiles')){
          this.element.nativeElement.style.display = 'none';
      }
    });
  }

}
