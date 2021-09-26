import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { HeroeInterface } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  terminoBusqueda : string = "";
  listadoHeroes : HeroeInterface[] = [];
  heroeSeleccionado :HeroeInterface | undefined;
  
  constructor( private servicioHeroes : HeroesService ) { }

  ngOnInit(): void {
  }

  buscandoTermino(){
    this.servicioHeroes.obtenerSugerencias( this.terminoBusqueda.trim() )
      .subscribe( resHeroes => this.listadoHeroes = resHeroes )
  }

  opcionSeleccionada( evento : MatAutocompleteSelectedEvent ){
    // console.log(evento);
    
    if(!evento.option.value){
      this.heroeSeleccionado = undefined;
      console.log('No valor ...');
      return;
    }
    
    const hero : HeroeInterface = evento.option.value;
    console.log(hero);
    this.terminoBusqueda = hero.superhero;

    this.servicioHeroes.obtenerHeroePorId(hero.id!)
      .subscribe( respHeroe => this.heroeSeleccionado = respHeroe)

  }

}
