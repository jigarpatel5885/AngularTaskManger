import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate{

  constructor(private loginService:LoginService,private router :Router,private jwtHelperService:JwtHelperService) { 

  }

  canActivate(route: ActivatedRouteSnapshot) :boolean{
    var token = (sessionStorage.getItem("currentUser")?JSON.parse(sessionStorage.getItem("currentUser")).token :null);
    if(this.loginService.IsAuthenticated() && this.jwtHelperService.decodeToken(token).role == route.data.expectedRole){
      return true;
    }
    else{
      this.router.navigate(["login"]);
      return false;
    }
  }
}
