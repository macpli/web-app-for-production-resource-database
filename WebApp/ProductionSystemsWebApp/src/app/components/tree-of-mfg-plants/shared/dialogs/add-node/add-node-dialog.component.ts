import {Component, Inject} from '@angular/core';
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

    constructor(
      public dialogRef: MatDialogRef<AddNodeDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    onNoClick(): void {
      this.dialogRef.close();
    }
  }