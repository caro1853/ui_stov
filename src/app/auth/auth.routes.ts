import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';

const authRoutes: Routes = [
    {
      path: '', component: AuthComponent,
      children: [
        { path: 'login', component: LoginComponent, data: { titulo: 'Login de usuarios' } },
        { path: '**', redirectTo: 'login', pathMatch: 'full' }      
      ]
    }
  ];
  
  export const AUTH_ROUTES = RouterModule.forChild(authRoutes);