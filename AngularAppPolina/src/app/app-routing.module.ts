import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './layout/home/home.component';
import { NgModule } from '@angular/core';
import { GestionDSComponent } from './layout/gestion-ds/gestion-ds.component';
import { GestionDIComponent } from './layout/gestion-di/gestion-di.component';


const routes: Routes = [
  {
    path: '',
      component: LoginComponent
  },
  {
    path: 'login',
      component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'demande-service',
    component: GestionDSComponent
  },
  {
    path: 'demande-investissement',
    component: GestionDIComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
