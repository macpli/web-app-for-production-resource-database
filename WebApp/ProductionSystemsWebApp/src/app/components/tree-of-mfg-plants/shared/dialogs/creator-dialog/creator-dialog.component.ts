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
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddNodeDialog } from '../add-node/add-node-dialog.component';
import {MatStepperModule} from '@angular/material/stepper';

@Component({
  selector: 'creator-dialog',
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
    MatStepperModule,
    ReactiveFormsModule,
  ],
  templateUrl: './creator-dialog.component.html',
  styles: ['.mat-stepper-horizontal { margin-top: 8px; } ',
           '.mat-mdc-form-field { margin-top: 16px; } '
  ]
})

export class CreatorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddNodeDialog>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  inputValid: boolean = false;
  name: string = '';
    description: string = '';
    idOrg: string = '';
    celType: string = '';
    wstType: string = '';
    width: number = 100;
    height: number = 100;

  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    width: [100, Validators.required],
    height: [100, Validators.required],
    idOrg: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

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
