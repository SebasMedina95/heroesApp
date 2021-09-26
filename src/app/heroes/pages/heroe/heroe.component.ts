import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { HeroeInterface } from '../../interfaces/heroes.interface';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      img {
        width : 100%;
        border-radius: 5px;
      }

      .divHeroe{
        min-height:700px
      }
    `
  ]
})
export class HeroeComponent implements OnInit {
   
  /**private rutaActiva : ActivatedRoute tomará la ruta que tenemos
    * activa en ese preciso momento
    */
  constructor( private rutaActiva : ActivatedRoute,
               private heroesService : HeroesService ) { }

  /**Con el ! le decimos a TS y ANGULAR que confíe en lo que estamos haciendo. */             
  heroe! : HeroeInterface;

  ngOnInit(): void {
    /**Tomamos los parámetros de la ruta y escogemos el que queremos.
     * El switchMap recibe lo que rutaActiva está emitiendo, que sería básicamente
     * lo mismo que aplicamos en el suscribe, y  ya en el suscribe mandamos toda la información
     * correspondiente a la variable definida.
     */
    this.rutaActiva.params
      .pipe(switchMap( resPipe => this.heroesService.obtenerHeroePorId(resPipe.id) ) )
      .subscribe( resSusc => this.heroe = resSusc )
  }

}
