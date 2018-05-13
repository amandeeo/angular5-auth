import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import Swal from 'sweetalert2';

@Injectable()
export class AuthGuard implements CanActivate {
	private isLoggedIn:any;

	constructor(
		private auth: AuthenticationService ,private router:Router){}

  canActivate(){

  	this.isLoggedIn = localStorage.getItem('auth-token');
  	if(!this.isLoggedIn){
  		this.router.navigate(['']);
  		Swal('Error!', 'Log In first To view Home Page', 'error');
  		return false;
  	}

    return true;
  }

}
