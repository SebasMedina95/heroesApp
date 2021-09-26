import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; //Para las rutas de la aplicación.
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //Si tendremos componentes que tengan animaciones.
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { HttpClientModule } from '@angular/common/http'; //Recortdemos para las peticiones HTTP.

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
