import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AuthComponent } from "./auth.component";
import { AUTH_ROUTES } from "./auth.routes";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
      AuthComponent,
      LoginComponent
    ],
    imports: [ 
      AUTH_ROUTES,
      ReactiveFormsModule,
      FormsModule,
      CommonModule,
      RouterModule,
    ],
    providers: [],
    bootstrap: []
  })
  export class AuthModule { }