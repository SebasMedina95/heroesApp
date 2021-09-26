import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { ListadoComponent } from './heroes/pages/listado/listado.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const rutas : Routes = [
  {
    //Cuando alguien entra al path auth, entonces cargamos los hijos mediante un Promise.
    //A partir del segmento auth, empieza a jugar las rutas hijas.
    path : 'auth',
    loadChildren : () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path : 'heroes',
    loadChildren : () => import('./heroes/heroes.module').then( m => m.HeroesModule ),
    canLoad : [ AuthGuard ],
    canActivate : [ AuthGuard ]
  },
  {
    path : '404',
    component : ErrorPageComponent
  },
  {
    path : '**',
    //component : ErrorPageComponent,
    redirectTo : '404'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(rutas) //Rutas padres
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
