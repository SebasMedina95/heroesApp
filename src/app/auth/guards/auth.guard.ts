import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private servicioAuth : AuthService,
               private router : Router ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.servicioAuth.verificarAutenticacion()
        .pipe(
          tap( estaAutenticado => {
            if(!estaAutenticado){
              this.router.navigate(['./auth/login']);
            }
          })
        )
      
      // if(this.servicioAuth.auth.id){
      //   return true;
      // }else{
      //   console.log('Bloqueado por AuthGuard - CanActivate.');
      //   return false;
      // }

  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      return this.servicioAuth.verificarAutenticacion()
        .pipe(
          tap( estaAutenticado => {
            if(!estaAutenticado){
              this.router.navigate(['./auth/login']);
            }
          })
        )
      
      // console.log('canLoad', false);
      // console.log( route );
      // console.log( segments );

      //Si esto existe, dejelo pasar
      // if(this.servicioAuth.auth.id){
      //   return true;
      // }else{
      //   console.log('Bloqueado por AuthGuard - CanLoad.');
      //   return false;
      // }

  }
}
