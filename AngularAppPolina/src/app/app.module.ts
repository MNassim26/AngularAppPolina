import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DemoMaterialModule } from './materials';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './layout/home/home.component';
import{ HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GestionDSComponent } from './layout/gestion-ds/gestion-ds.component';
import { GestionDIComponent } from './layout/gestion-di/gestion-di.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    HomeComponent,
    GestionDSComponent,
    GestionDIComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DemoMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
