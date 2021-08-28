import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})



export class AppComponent {

/**
 *
 */
constructor(public loginService:LoginService) {
  

}

}
