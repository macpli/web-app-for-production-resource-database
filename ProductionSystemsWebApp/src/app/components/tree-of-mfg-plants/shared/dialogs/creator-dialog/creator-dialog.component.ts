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
import { TreeNode } from '../../../../../models/treeNode.model';
import { NodesService } from '../../../../../services/nodes.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatListModule} from '@angular/material/list';

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
    HttpClientModule,
    MatListModule
  ],
  templateUrl: './creator-dialog.component.html',
  styles: ['.mat-stepper-horizontal { margin-top: 8px; } ',
           '.mat-mdc-form-field { margin-top: 16px; } ',
           '.mat-mdc-form-field { margin-right: 8px!important; }'
  ],
  providers: [NodesService], // Provide the NodesService here
})

export class CreatorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddNodeDialog>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private nodesService: NodesService,
  ) {}

  inputValid: boolean = false;
  name: string = '';
  description: string = '';
  idOrg: string = '';
  celType: string = '';
  wstType: string = '';
  width: number = 100;
  height: number = 100;

  factoryToAdd!: TreeNode;
  departmentsToAdd!: TreeNode[];

  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    width: [100, Validators.required],
    height: [100, Validators.required],
    idOrg: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    width: [100, Validators.required],
    height: [100, Validators.required],
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

  getNodeType(keyId: string): string{
    const firstLetter = keyId.charAt(0).toUpperCase();

    switch(firstLetter){
      case '0':
        return 'F';
      case 'F':
        return 'M';
      case 'M':
        return 'C';
      case 'C':
        return 'D';
      case 'D':
        return 'E'
        case 'E':
          return 'Z'
      default:
        return ''
    }
  }

  saveFactory() {
    var maxNumericValue;
    var newKeyId: string;
    const nodeType = this.getNodeType('0');

    this.nodesService.getAtomChildren('0').subscribe({
      next: (result) => {
        const numericValues = result.map(value => parseInt(value.substring(1), 10));
        maxNumericValue = Math.max(...numericValues);

        if(maxNumericValue && maxNumericValue < 0){
          newKeyId = nodeType + 1;
        } else newKeyId = nodeType + 0 + (maxNumericValue +1);


        if (this.firstFormGroup && this.firstFormGroup.valid) {

          this.factoryToAdd = {
            nodeId: newKeyId,
            keyId: newKeyId,
            parentId: '0',
            name: this.firstFormGroup.get('name')!.value ?? '',
            width: this.firstFormGroup.get('width')!.value ?? 0,
            height: this.firstFormGroup.get('height')!.value ?? 0,
          };

          console.log(this.factoryToAdd)
        }
      }
    });

    
  }
}
