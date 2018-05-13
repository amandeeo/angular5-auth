import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth:AuthenticationService,public router:Router ) { }

  ngOnInit() {
  }
  logMeOut(){
  	window.localStorage.removeItem('auth-token');
    window.localStorage.removeItem('last_unload');
  		this.router.navigate(['']);
  	
  }

}
