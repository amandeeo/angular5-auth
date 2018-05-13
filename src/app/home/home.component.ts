import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails} from '../authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	details:UserDetails; 

  public token:string;

  constructor(public auth:AuthenticationService) { }

  ngOnInit() {
  	this.getDetails();
  }

  getDetails(){

  	this.auth.userDetails().subscribe((data:any)=> {
  		console.log(data,"data on get userDetails");
  		this.details = data;
  		console.log(this.details,"userdetail")
  		this.details
  	},err => {
  		console.log(err,"error on get user details");
  	})
  }
  
}
