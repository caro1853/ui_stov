import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
  })
export class LoginService {
    controller: string = 'login';
    pathservice: string = '';
    isTokenValid: boolean = false;

    /**
     *
     */
    constructor(private _http: HttpClient) {
      const baseURLAPI = environment.baseURLAPI;
      this.pathservice = `${baseURLAPI}`;//`${environment.baseURLmanagementAPI}/${this.controller}`;
      console.log({pathservice: this.pathservice});
    }

    validateUser(email: string, password: string){
        this.isTokenValid = false;
        const path = `${this.pathservice}/login`;
        return this._http.post(path, { email, password })
        .pipe(
            map((res: any) => {
            if (res?.token) {
                localStorage.setItem('token', res?.token);
                this.isTokenValid = true;
                return true;
            }
            return false;

            })
        );
    }

    getTokenSaved() {
        if (localStorage.getItem('token')) {
          return localStorage.getItem('token');
        } else {
          return '';
        }
      }

    getDoctorId():number{
        const doctorId = this.getValueFromClaim('doctorid');
        if(doctorId){
          if(Number.isInteger(Number(doctorId))){
            return Number(doctorId);
          }
        }
        return 0;
    }

    getPatientId():number{
      const patientId = this.getValueFromClaim('patientid');
        if(patientId){
          if(Number.isInteger(Number(patientId))){
            return Number(patientId);
          }
        }
        return 0;
    }

    isDoctor(){
        return this.getValueFromClaim('isdoctor') == 'true';
    }

    isPatient(){
        return this.getValueFromClaim('ispatient') == 'true';
    }

    getValueFromClaim(claim:string){
        let token = this.getTokenSaved();
        let value = '';
        if(token){
            let infoToken = this.decodeToken(token);  
            value = infoToken[claim];
        }
        return value;
    }

    getNameUser(){
        return this.getValueFromClaim('name');
    }

    closeSesion() {
      localStorage.removeItem('token');
      this.isTokenValid = false;
    }

    decodeToken(token: string) {
        if (token === null || token === '') { return { 'upn': '' }; }
        const parts = token.split('.');
        if (parts.length !== 3) {
    
          throw new Error('JWT must have 3 parts');
        }
        const decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
          throw new Error('Cannot decode the token');
        }
        return JSON.parse(decoded);
    }
    
    private urlBase64Decode(str: string) {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
          case 0:
            break;
          case 2:
            output += '==';
            break;
          case 3:
            output += '=';
            break;
          default:
            // tslint:disable-next-line:no-string-throw
            throw 'Illegal base64url string!';
        }
        return decodeURIComponent((<any>window).escape(window.atob(output)));
      }
} 