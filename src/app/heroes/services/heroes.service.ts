import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HeroeInterface } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root' //Si tenemos esta propiedad definida, gracias al LazyLoad, se importa automaticamente los servicios.
})
export class HeroesService {

  private baseURL : string = environment.baseURL; //En la carpeta enviroment colocamos las variables de entorno., enviroment.prod es el de producción
                                                  //mientras que el enviroment solo es el de desarrollo.

  constructor(private http : HttpClient) {

  }

  /**Recordemos que, HeroeInterface me devolvería un solo héroe, pero, como es un listado de héroes, entonces
   * lo que devolvemos es una colección de información, por tanto, colocamos las respectivas []
   */
  obtenerHeroesList() : Observable<HeroeInterface[]>{
    // return this.http.get<HeroeInterface[]>('http://localhost:3000/heroes');
    return this.http.get<HeroeInterface[]>(`${this.baseURL}/heroes`);
  }

  obtenerHeroePorId( parametro : string ) : Observable<HeroeInterface>{
    // return this.http.get<HeroeInterface>(`http://localhost:3000/heroes/${parametro}`);
    return this.http.get<HeroeInterface>(`${this.baseURL}/heroes/${parametro}`);
  }

  obtenerSugerencias( terminoBusqueda : string ) : Observable<HeroeInterface[]>{
    return this.http.get<HeroeInterface[]>(`${this.baseURL}/heroes?q=${terminoBusqueda}&_limit=6`); 
  }

  agregarHeroe( heroeInsert : HeroeInterface) : Observable<HeroeInterface>{
    if(heroeInsert.alt_img === '') heroeInsert.alt_img = 'assets/no-image.png';
    return this.http.post<HeroeInterface>(`${this.baseURL}/heroes`, heroeInsert); //especificamos el post para insertar y luego de la url, aplicamos una , heroeInsert
                                                                                  //por que requerimos insertar el heroe
  }

  editarHeroe( heroeUpdate : HeroeInterface) : Observable<HeroeInterface>{
    return this.http.put<HeroeInterface>(`${this.baseURL}/heroes/${heroeUpdate.id}`, heroeUpdate); //especificamos el put para actualizar y luego de la url, aplicamos una , heroeInsert
                                                                                  //por que requerimos actualizar el heroe
  }

  eliminarHeroe( idHeroe : string) : Observable<any>{ //Regresamos un objeto vacío. O tipo any.
    return this.http.delete<any>(`${this.baseURL}/heroes/${idHeroe}`); 
  }

}
