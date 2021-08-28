import { HttpBackend, HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginViewModel } from './login-view-model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
currentUserName:string = null;
private httpClient : HttpClient=null;
  constructor(private httpBackend:HttpBackend) { 

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


}
