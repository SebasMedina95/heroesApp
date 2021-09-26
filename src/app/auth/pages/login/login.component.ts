import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor( private direccionamiento : Router,
               private servicioAuth : AuthService ) { }

  ngOnInit(): void {
  }

  login(){

    /**Ir al Backend. */

    /**Debemos tener iun Usuario */

    /**Navegamos a la pantalla de Héroes */
    this.servicioAuth.login()
    .subscribe( resp => {
      console.log(resp);
      
      if( resp.id ){
        this.direccionamiento.navigate(['./heroes']);
      }

      })
  }

  

}
