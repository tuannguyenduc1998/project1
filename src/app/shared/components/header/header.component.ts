import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginData } from '../../model/user.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private service: UserService) { }
  user: UserLoginData;
  fullname: string;
  ngOnInit(): void {
    this.user = this.service.LoginStatus;
    this.fullname = this.user.fullName;
  }

  onLogOut(): void {
    this.router.navigate(['/login']);
    localStorage.removeItem('LoginStatus');
  }

}
