import { Component, OnInit } from '@angular/core';
import { HeroeInterface, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarEliminacionComponent } from '../../components/confirmar-eliminacion/confirmar-eliminacion.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width : 100%;
        border-radius: 5px;
      }

      .alinearBotones{
        justify-content: center;
        text-align:center;
      }
    `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id   : 'DC Comics',
      desc : 'Editorial de Comics - DC Comics' 
    },
    {
      id   : 'Marvel Comics',
      desc : 'Editorial de Comics - Marvel Comics' 
    }
  ]

  heroe : HeroeInterface = {
    superhero : '',
    alter_ego : '',
    characters : '',
    first_appearance : '',
    publisher : Publisher.DCComics, //Por la Enumeración de la Interfaz.
    alt_img : '',
  }

  constructor( private httpHeroe : HeroesService,        //Para el servicio.
               private rutaActiva : ActivatedRoute,     //Para controlar la ruta de la URL actual.
               private router : Router,                //Para controlar el tema de las rutas y la navegación.
               private _snackBar: MatSnackBar,        //Para el mensaje de retroalimentación SnackBar.
               public dialog: MatDialog ) { }        //Para los mensajes de confirmación.   

  ngOnInit(): void {

    //Si estamos editando entonces se disparará solo en este caso.
    if(this.router.url.includes('editar')){
      this.rutaActiva.params
        .pipe(switchMap( ({id}) => this.httpHeroe.obtenerHeroePorId(id) ))
        .subscribe( heroeRetornado => this.heroe = heroeRetornado);
    }

  }

  //Nos va servir tanto para guardar uno nuevo como para actualizar.
  guardar(){
    if(this.heroe.superhero.trim().length === 0){
      alert('El nombre del Super Héroe es Obligatorio ...');
      return;
    }

    if(this.heroe.alter_ego.trim().length === 0){
      alert('El alter_ego del Super Héroe es Obligatorio ...');
      return;
    }

    console.log(this.heroe.id);

    if(this.heroe.id){
      //Actualizamos
      this.httpHeroe.editarHeroe(this.heroe)
        .subscribe ( res => {
          console.log('Actualizando ', res);
          this.mostrarMensajeSnackBar('Héroe Actualizado ...');
          this.router.navigate(['/heroes/listado', res.id])
        })
        
    }else{
      //Insertamos
      this.httpHeroe.agregarHeroe(this.heroe)
        .subscribe( res => {
          console.log('Resultado', res);
          // this.router.navigate(['/heroes/editar', res.id])
          this.mostrarMensajeSnackBar('Héroe Registrado ...');
          this.router.navigate(['/heroes/listado', res.id])
        });
    }

  }

  eliminar(){

    const dialog = this.dialog.open( ConfirmarEliminacionComponent, {
      width : '450px',
      data  : this.heroe
    })

    dialog.afterClosed()
      .subscribe( resultado => {
        console.log( resultado );
        if(resultado){
          this.httpHeroe.eliminarHeroe(this.heroe.id!)
            .subscribe( res => {
              this.router.navigate(['/heroes/listado'])
            })  
        }
      })


  }

  mostrarMensajeSnackBar( mensaje : string) : void{
    this._snackBar.open(mensaje, '¡ Ok !', {
      duration : 3000
    });
  }

}
