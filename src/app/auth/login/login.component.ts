import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email11 = '';
  password11 = '';

  showalert:boolean=false;
  messagealert:string="Error";
  classalert:string="";

  /**
   *
   */
  constructor(private _router: Router,private _loginService: LoginService) {
  }

  onSigin(formulario: NgForm) {
    this.hideAlert();
    if(this.email11 == '' || this.password11 == ''){
      this.showAlert('El correo y la contraseña son necesarios');
    }
    else{
      this._loginService.validateUser(this.email11, this.password11).subscribe({
        next: (res: any) => {
          if(res ==  true){
            if(this._loginService.isDoctor()){
              this._router.navigate(['/pages/bookings']);
            }
            else{
              this._router.navigate(['/pages/doctor-available']);
            }
          }
          else{
            this.showAlert('Usuario o contraseña incorrectos');
          }
        },
        error: (err:any) => {
          
          this.showAlert(err?.error?.message??err?.message??'Error al iniciar sesión');
        }
      }); 
    }
  }

  showAlert(message:string){
    this.showalert = true;
    this.messagealert = message;
  }

  hideAlert(){
    this.showalert = false;
  }
}
