import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  nameuser:string = '';
  constructor(private _loginService: LoginService) { 
    this.nameuser = _loginService.getNameUser();
  }

  ngOnInit() {

  }

}