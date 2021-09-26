import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeroeInterface } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirmar-eliminacion',
  templateUrl: './confirmar-eliminacion.component.html',
  styles: [
  ]
})
export class ConfirmarEliminacionComponent implements OnInit {

  constructor(private referenciaDialog : MatDialogRef<ConfirmarEliminacionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: HeroeInterface) { } //Inyectamos el servicio de Dialog para poder traer la data.
                                                                        //Leemos la Data que estemos enviando desde donde sea.

  ngOnInit(): void {
  }

  borrar(){
    this.referenciaDialog.close(true); //Si quiero borrarlo ...
  }

  cerrar(){
    this.referenciaDialog.close(false); //No lo voy a borrar
  }

}
