import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([  
      { 
        path: 'pages', 
        loadChildren: () => import('./pages/pages.module').then(m=> m.PagesModule)
      },  
      {
        path: 'auth',
        loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
      },      
      { path: '**', redirectTo: 'auth', pathMatch: 'full' }
    ]),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
