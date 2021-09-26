import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeInterface } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
    `
      mat-card {
        margin-top: 20px;
      }
    `
  ]
})
export class ListadoComponent implements OnInit {

  listadoHeroes : HeroeInterface[] = [];
  
  constructor( private servicioHeroes : HeroesService ) { }

  ngOnInit(): void {
    this.servicioHeroes.obtenerHeroesList()
      .subscribe( (resultHeroes) => {
        this.listadoHeroes = resultHeroes;
      })
  }

}
