import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

@Component({
    selector: 'add-node-dialog',
    templateUrl: 'add-node-dialog.component.html',
    standalone: true,
    imports: [
      CommonModule,
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatButtonModule,
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
      MatSelectModule
    ],
  })  
  export class AddNodeDialog {
    name: string = '';
    description: string = '';
    idOrg: string = '';
    celType: string = '';
    wstType: string = '';
    width: number = 100;
    height: number = 100;

    cellTypes = [
      { value: 'Cell', label: 'Komórka' },
      { value: 'Line', label: 'Linia' },
      { value: 'Warehouse', label: 'Magazyn' }
    ];

    wstTypes = [
      { value: 'Machining', label: 'Obróbcze' },
      { value: 'Assembly', label: 'Montażowe' },
      { value: 'Measurement', label: 'Pomiarowe' },
      { value: 'Storage', label: 'Magazynowe' }
    ];

    inputValid: boolean = false;

    constructor(
      public dialogRef: MatDialogRef<AddNodeDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    getType(nodeType: string){
      switch(nodeType){
        case 'F':
          return 'fabrykę'
        case 'M':
          return 'wydział'
        case 'C':
          return 'komórkę'
        case 'D':
          return 'stanowisko'
        case 'E':
          return 'urządzenie'
        default:
          return ''
      }

    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    validateInput(nodeType: string, name: string, description: string, height: number, width: number, idOrg: string, celType: string, wstType: string): boolean {
      
      switch(nodeType){
        case 'F':
          if(name.length == 0 || description.length == 0 || width == 0 || height == 0 || idOrg.length == 0){
            return this.inputValid = false;
          } else return this.inputValid = true;
        case 'M':
          if(name.length == 0 || description.length == 0 || width == 0 || height == 0){
            return this.inputValid = false;
          } else return this.inputValid = true;
        case 'C':
          if(name.length == 0 || description.length == 0 || width == 0 || height == 0 || celType.length == 0){
            return this.inputValid = false;
          } else return this.inputValid = true;
        case 'D':
          if(name.length == 0 || description.length == 0 || width == 0 || height == 0 || wstType.length == 0){
            return this.inputValid = false;
          } else return this.inputValid = true;
        case 'E':
          if(name.length == 0 || description.length == 0 || width == 0 || height == 0){
            return this.inputValid = false;
          } else return this.inputValid = true;
        default:
          return this.inputValid = false;
      }
        
      
    }
  }