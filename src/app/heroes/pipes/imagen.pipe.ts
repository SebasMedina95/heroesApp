import { Pipe, PipeTransform } from '@angular/core';
import { HeroeInterface } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  //pure: false  //Este elemento permite que, cada vez que haya algún cambio en el ciclo de vida de Angular, el Pipe se disparará.
                 //si lo dejamos en false, además de dispararse consume mas recursos, hagamoslo solo cuando sea necesario. Comportamiento
                 //por defecto es true.
})
export class ImagenPipe implements PipeTransform {

  //valor = daticoInput
  transform(valor: HeroeInterface) : string {
    //console.log(valor);

    if( !valor.id && !valor.alt_img){
      return 'assets/no-image.png';
    }else if( valor.alt_img ){
      return valor.alt_img;
    }else{
      return `assets/heroes/${valor.id}.jpg`;
    }

    //return null;
  }

}
