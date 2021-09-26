import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthInterface } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .contenido {
        margin : 10px;
      }
    `
  ]
})
export class HomeComponent implements OnInit {

  get authUsuarios(){
    return this.servicioAuth.auth;
  }
  
  constructor( private direccionamiento : Router,
               private servicioAuth : AuthService ) { }

  ngOnInit(): void {
  }

  logout( ){

    /**Ir al Backend. */

    /**Debemos tener iun Usuario */

    /**Navegamos a la pantalla de Héroes */
    this.direccionamiento.navigate(['./auth']);
  }

}
