import { HttpBackend, HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginViewModel } from './login-view-model';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
currentUserName:string = null;
private httpClient : HttpClient=null;
  constructor(private httpBackend:HttpBackend,private jwtHelperService:JwtHelperService) { 

  }

  public Login(loginViewModal:LoginViewModel) :Observable<any>{

    this.httpClient = new HttpClient(this.httpBackend);
    console.log("requestLogin");
    return this.httpClient.post<any>("http://localhost:54573/authenticate",loginViewModal,{responseType:"json"})
    .pipe(map(user =>{
      if(user){
        this.currentUserName = user.userName;
        console.log(user.userName);
        sessionStorage.currentUser = JSON.stringify(user);
      }
      return user;
    }));
  }

  public Logout(){
    this.currentUserName = null;
    sessionStorage.removeItem("currentUser");
  }

  public IsAuthenticated():boolean{

    var token = (sessionStorage.getItem("currentUser")?JSON.parse(sessionStorage.getItem("currentUser") as any).token :null);

    if(this.jwtHelperService.isTokenExpired())
    {
      return false; //token is not valid
    }
    else
    {
      return true; //token is valid
    }
  }


}
