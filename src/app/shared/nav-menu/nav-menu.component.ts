import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  /**
   *
   */
  constructor(private _router: Router,) {
   
    
  }
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  exitSesion() {
    //this._loginService.closeSesion();
    //this._router.navigate(['/auth/login']);
  }
}
