import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MyserviceService } from './myservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: MyserviceService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (!this.authService.LoginStatus) {
      this.router.navigate(['/login']);
    }
    return this.authService.LoginStatus;
  }
}
