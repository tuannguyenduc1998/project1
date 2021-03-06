import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.router.navigateByUrl(`/dashboard/profile-registration/profile-registration-create`);
  }

  onSubmitMove(): void{
    this.router.navigateByUrl(`/dashboard/user/view`);
  }

  onSubmitList(): void{
    this.router.navigateByUrl(`/dashboard/profile-registration/profile-registration-list`);
  }
}
