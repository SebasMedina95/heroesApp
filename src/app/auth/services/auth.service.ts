import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthInterface } from '../interfaces/auth.interface';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs'; //of sirve para crear observable a partir de argumento que ponemos

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : string = environment.baseURL;
  private authUsuario : AuthInterface | undefined;

  get auth() : AuthInterface {
    return {...this.authUsuario!}; //Recordemos que {} es tener la garantía de que no cambiara el elemento.
                                  //Como esta proveido por el root, entonces tenemos acceso global.
  }

  constructor( private http : HttpClient ) { }

  verificarAutenticacion() : Observable<boolean> { //En vez de of,  pude haber colocado | boolean luego de Observable<boolean> 
    
    if(!localStorage.getItem('idToken')){ //Si el token no existe ...
      return of(false);
    }
      
    return this.http.get<AuthInterface>(`${this.baseUrl}/usuarios/2`)
        .pipe(
          map( autenticacion =>  {
            this.authUsuario = autenticacion;
            console.log('Map', autenticacion);
            return true;
          })
        ); 
    
  }

  login(){
    return this.http.get<AuthInterface>(`${this.baseUrl}/usuarios/2`)
                    .pipe(
                      tap( respuesta => this.authUsuario = respuesta ), //Se ejecuta antes del suscribe que llama login.
                      tap( respuesta => localStorage.setItem('idToken', respuesta.id) )
                    );
  }

  logout(){
    this.authUsuario = undefined;
  }

}
