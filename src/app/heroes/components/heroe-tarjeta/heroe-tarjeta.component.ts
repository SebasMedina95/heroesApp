import { Component, Input, OnInit } from '@angular/core';
import { HeroeInterface } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [
    `
      mat-card {
        margin-top: 20px;
      }

      .cuadrandoImagenes{
        
      }
    `
  ]
})
export class HeroeTarjetaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() daticoInput! : HeroeInterface;

}
