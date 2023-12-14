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
        default:
          return ''
      }

    }

    onNoClick(): void {
      this.dialogRef.close();
    }
  }