import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
export class DoctorService {
    controller: string = 'doctor';
    pahtservice: string = '';

    constructor(private _http: HttpClient) {
        const baseURLAPI = environment.baseURLAPI;
        const version = 'v1';
        this.pahtservice = `${baseURLAPI}/api/${version}`;
    }

    getPathService(method: string){
        switch (method) {
          case 'get': return `${this.pahtservice}/${this.controller}`;
        }
        return '';
    }

    getDoctorsAvailable()
    {
        const path = this.getPathService('get');
        return this._http.get(path);
    }
}