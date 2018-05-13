import { Component, OnInit  } from '@angular/core';
import { AuthenticationService, TokenPayload} from '../authentication.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials:TokenPayload = {
    email: '',
    name: '',
    age:'',
    password: '',
    confirm_password:''
  }

	public disableLogin : boolean = false;
  public payload : string;
  public token : string;
  public errorMessage:string;
  public checked:boolean;
  public cookieValue:string;
  public isRemembered : boolean = false;


  constructor(public auth:AuthenticationService,public router:Router,private cookieService: CookieService) { }

  ngOnInit() {
      this.token = localStorage.getItem('auth-token');
      if(this.token){
        this.router.navigate(['/home']);
      }
    //checking if there is cookie exists
     this.cookieValue = this.cookieService.get('last_unload');
    if(this.cookieValue){
      this.isRemembered = true;
      //decrypting 
      var bytes  = CryptoJS.AES.decrypt(this.cookieValue.toString(), 'secret key 123');
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      this.credentials.email = decryptedData[0].email;
      this.credentials.password =decryptedData[1].password;
      // this.router.navigate(['/home']);
    }
  }
//switch forms from login to sign up and vice-versa
  switchForm(){
  	this.disableLogin = !this.disableLogin;
  }

  //Function to execute signup

  signingUp(){
   
    if(this.credentials.password != this.credentials.confirm_password){
       Swal('Error!', 'Password and confirm password must be same', 'error');
    }

    else{
      this.auth.register(this.credentials).subscribe(() => {
         Swal('Congratulations', 'Registeration successful', 'success');
        this.disableLogin = false;
      },(err) => {
        this.errorMessage = err.error.error;
        Swal('Error!', this.errorMessage, 'error');
      });
     }
  }

//function to execute at time of login

  loggingIn(){

    this.auth.login(this.credentials).subscribe((data : any)=> {
       this.auth.saveToken(data.token);
       if(this.isRemembered){
      var temp = [{'email': this.credentials.email}, {'password': this.credentials.password}]

     // Encrypt
      var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(temp), 'secret key 123');
      
      //storing encrypted data into cookie
      this.cookieService.set( 'last_unload', ciphertext.toString());
    }
      this.credentials.email = '';
      this.credentials.password = '';
       this.router.navigate(['/home']);
    },
    (err) => {
      this.errorMessage = err.error.error;
      Swal('Error!', this.errorMessage, 'error');
    })
  }

  toggleEditable(event) {
     if ( event.target.checked ) {
         this.checked = true;
    }
    else{
      this.checked = false;
      this.cookieService.delete('last_unload');

}

}
}
