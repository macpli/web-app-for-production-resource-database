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
import {MatSelectModule} from '@angular/material/select';
import { NodeDetails } from '../../../../../models/nodeDetails.model';
import { NodeDetailsService } from '../../../../../services/node-details.service';

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
    MatListModule,
    MatSelectModule,
  ],
  templateUrl: './creator-dialog.component.html',
  styles: ['.mat-stepper-horizontal { margin-top: 8px; } ',
           '.mat-mdc-form-field { margin-top: 16px; } ',
           '.mat-mdc-form-field { margin-right: 8px!important; }',
           '.selected-department { font-weight: bold; background: #20B2AA; color: white; border-radius: 6px; }'
  ],
  providers: [NodesService, NodeDetailsService],
})

export class CreatorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddNodeDialog>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private nodesService: NodesService,
    private nodeDetailsService: NodeDetailsService,
  ) {}

  inputValid: boolean = false;
  name: string = '';
  description: string = '';
  idOrg: string = '';
  celType: string = '';
  wstType: string = '';
  width: number = 100;
  height: number = 100;

  selectedDepartment: any = { nodeId: '', keyId: '' }
  selectedCell: any = { nodeId: '', keyId: '' }
  selectedStation: any = { nodeId: '', keyId: '' }

  cellsToDisplay: TreeNode[] = [];
  stationsToDisplay: TreeNode[] = [];
  devicesToDisplay: TreeNode[] = [];

  factoryToAdd!: TreeNode;
  departmentsToAdd: TreeNode[] = [];
  cellsToAdd: TreeNode[] = [];
  stationsToAdd: TreeNode[] = [];
  devicesToAdd: TreeNode[] = [];

  nodesDetails: NodeDetails[] = [];
  factoryDetails!: NodeDetails;
  departmentsDetails: NodeDetails[] = [];
  cellsDetails: NodeDetails[] = [];
  stationsDetails: NodeDetails[] = [];

  nodesToAdd!: TreeNode[];

  // factory
  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    width: [100, Validators.required],
    height: [100, Validators.required],
    idOrg: ['', Validators.required],
  });

  // departments
  secondFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    width: [100, Validators.required],
    height: [100, Validators.required],
  });

  // cells
  thirdFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    width: [100, Validators.required],
    height: [100, Validators.required],
    celType: ['', Validators.required]
  });

  // stations
  fourthFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    width: [100, Validators.required],
    height: [100, Validators.required],
    wstType: ['', Validators.required]
  });

   // stations
   fifthFormGroup = this._formBuilder.group({
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

  addFactory() {
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

          this.factoryDetails = {
            name: this.firstFormGroup.get('name')!.value ?? '',
            description: this.firstFormGroup.get('description')!.value ?? '',
            idFct: newKeyId,
            idOrg: this.firstFormGroup.get('idOrg')!.value ?? '',
            nodeId: newKeyId,
          }

          console.log(this.factoryToAdd)
          console.log(this.factoryDetails)
        }
      }
    });  
  }

  addDepartment(){
    var newKeyId: string;
    const nodeType = this.getNodeType(this.factoryToAdd.keyId);

    var index: number = 0;
    if(this.departmentsToAdd.length > 0){
      index = 1;
      this.departmentsToAdd.forEach(d => {
        index++;
      })
    } else index = 1;
    
    newKeyId = nodeType + index;
    if (this.secondFormGroup && this.secondFormGroup.valid) {
      const newDepartment: TreeNode = {
        nodeId: this.factoryToAdd.nodeId + newKeyId,
        keyId: newKeyId,
        parentId: this.factoryToAdd.nodeId,
        name: this.secondFormGroup.get('name')!.value ?? '',
        width: this.secondFormGroup.get('width')!.value ?? 0,
        height: this.secondFormGroup.get('height')!.value ?? 0,
      }
      this.departmentsToAdd.push(newDepartment);
      console.log(this.departmentsToAdd);

      const newDepartmentDetails: NodeDetails = {
        nodeId: this.factoryToAdd.keyId + newKeyId,
        name: this.secondFormGroup.get('name')!.value ?? '',
        description: this.secondFormGroup.get('description')!.value ?? '',
        idFct: this.factoryToAdd.keyId,
        idDep: newKeyId,
      }
      this.departmentsDetails.push(newDepartmentDetails);
    }
  }

  selectDepartment(nodeId: string, keyId: string) {
    this.selectedDepartment.nodeId = nodeId;
    this.selectedDepartment.keyId = keyId;

    this.cellsToDisplay = this.getCellsToDisplay();
  }

  getCellsToDisplay(){
    return this.cellsToAdd.filter(cell => cell.parentId === this.selectedDepartment.nodeId);
  }

  addCell(parentNodeId: string, parentKeyId: string) {
    var newKeyId: string;
    const nodeType = this.getNodeType(parentKeyId);
    const childrenCells = this.cellsToAdd.filter(cell => cell.parentId === this.selectedDepartment.nodeId);

    var index: number = 0;
    if(childrenCells.length > 0){
      index = 1;
      childrenCells.forEach(d => {
        index++;
      })
    } else index = 1;
    
    newKeyId = nodeType + index;

    if(this.thirdFormGroup && this.thirdFormGroup.valid) {
      const newCell: TreeNode = {
        nodeId: parentNodeId + newKeyId,
        keyId: newKeyId,
        parentId: parentNodeId,
        name: this.thirdFormGroup.get('name')!.value ?? '',
        width: this.thirdFormGroup.get('width')!.value ?? 0,
        height: this.thirdFormGroup.get('height')!.value ?? 0,
      }
      this.cellsToAdd.push(newCell)
      this.cellsToDisplay = this.getCellsToDisplay();

      const newCellDetails: NodeDetails = {
        nodeId: parentNodeId + newKeyId,
        name: this.thirdFormGroup.get('name')!.value ?? '',
        description: this.thirdFormGroup.get('description')!.value ?? '',
        idDep: parentKeyId,
        idCel: newKeyId,
        celType: this.thirdFormGroup.get('celType')!.value ?? '',
      }
      this.cellsDetails.push(newCellDetails);
    }
    
    console.log(this.cellsToAdd)
  }  

  selectCell(nodeId: string, keyId: string) {
    this.selectedCell.nodeId = nodeId;
    this.selectedCell.keyId = keyId;

    this.stationsToDisplay = this.getStationsToDisplay();
  }

  getStationsToDisplay(){
    return this.stationsToAdd.filter(station => station.parentId === this.selectedCell.nodeId);
  }

  addStation(parentNodeId: string, parentKeyId: string){
    var newKeyId: string;
    const nodeType = this.getNodeType(parentKeyId);
    const childrenStations = this.stationsToAdd.filter(station => station.parentId === this.selectedCell.nodeId);

    var index: number = 0;
    if(childrenStations.length > 0){
      index = 1;
      childrenStations.forEach(s => {
        index++;
      })
    } else index = 1;
    
    newKeyId = nodeType + index;

    if(this.fourthFormGroup && this.fourthFormGroup.valid) {
      const newStation: TreeNode = {
        nodeId: parentNodeId + newKeyId,
        keyId: newKeyId,
        parentId: parentNodeId,
        name: this.fourthFormGroup.get('name')!.value ?? '',
        width: this.fourthFormGroup.get('width')!.value ?? 0,
        height: this.fourthFormGroup.get('height')!.value ?? 0,
      }
      this.stationsToAdd.push(newStation)
      this.stationsToDisplay = this.getStationsToDisplay();

      const newStationDetails: NodeDetails = {
        nodeId: parentNodeId + newKeyId,
        name: this.fourthFormGroup.get('name')!.value ?? '',
        description: this.fourthFormGroup.get('description')!.value ?? '',
        idWst: newKeyId,
        idCel: parentKeyId,
        wstType: this.fourthFormGroup.get('wstType')!.value ?? '',
      }
      this.stationsDetails.push(newStationDetails);
    }
  }

  selectStation(nodeId: string, keyId: string) {
    this.selectedStation.nodeId = nodeId;
    this.selectedStation.keyId = keyId;

    this.devicesToDisplay = this.getDevicesToDisplay();
  }

  getDevicesToDisplay(){
    return this.devicesToAdd.filter(device => device.parentId === this.selectedStation.nodeId);
  }

  addDevice(parentNodeId: string, parentKeyId: string){
    var newKeyId: string;
    const nodeType = this.getNodeType(parentKeyId);
    const childrenDevices = this.devicesToAdd.filter(device => device.parentId === this.selectedStation.nodeId);

    var index: number = 0;
    if(childrenDevices.length > 0){
      index = 1;
      childrenDevices.forEach(d => {
        index++;
      })
    } else index = 1;
    
    newKeyId = nodeType + index;

    if(this.fifthFormGroup && this.fifthFormGroup.valid) {
      const newDevice: TreeNode = {
        nodeId: parentNodeId + newKeyId,
        keyId: newKeyId,
        parentId: parentNodeId,
        name: this.fifthFormGroup.get('name')!.value ?? '',
        width: this.fifthFormGroup.get('width')!.value ?? 0,
        height: this.fifthFormGroup.get('height')!.value ?? 0,
      }
      this.devicesToAdd.push(newDevice)
      this.devicesToDisplay = this.getDevicesToDisplay();
    }
  }

  saveStructure(){
    // Adding factory
    this.nodesService.addNode(this.factoryToAdd).subscribe({
      next: (result) => {
        console.log(`Added ${this.factoryToAdd}`);
      },
      error: (message) => {
        console.log('Error while adding node: ' + message);
      }
    })

    // Adding factory details
    this.nodeDetailsService.addFactoryDetails(this.factoryDetails).subscribe({
      next: (result) => {
        console.log(`Added ${this.factoryDetails}`);
      },
      error: (message) => {
        console.log('Error while adding node: ' + message);
      }
    })

    // Adding departments
    this.departmentsToAdd.forEach(node => {
      this.nodesService.addNode(node).subscribe({
        next: (result) => {
          console.log(`Added ${node}`);
        },
        error: (message) => {
          console.log('Error while adding node: ' + message);
        }
      });
    })

    // Adding department details
    this.departmentsDetails.forEach(nodeDetails => {
      this.nodeDetailsService.addDepartmentDetails(nodeDetails).subscribe({
        next: (result) => {
          console.log(`Added ${nodeDetails}`);
        },
        error: (message) => {
          console.log('Error while adding node: ' + message);
        }
      })
    })

    // Adding cells
    this.cellsToAdd.forEach(node => {
      this.nodesService.addNode(node).subscribe({
        next: (result) => {
          console.log(`Added ${node}`);
        },
        error: (message) => {
          console.log('Error while adding node: ' + message);
        }
      });
    })

    // Adding cells details
    this.cellsDetails.forEach(nodeDetails => {
      this.nodeDetailsService.addCellDetails(nodeDetails).subscribe({
        next: (result) => {
          console.log(`Added ${nodeDetails}`);
        },
        error: (message) => {
          console.log('Error while adding node: ' + message);
        }
      })
    })

    // Adding workstations
    this.stationsToAdd.forEach(node => {
      this.nodesService.addNode(node).subscribe({
        next: (result) => {
          console.log(`Added ${node}`);
        },
        error: (message) => {
          console.log('Error while adding node: ' + message);
        }
      });
    })

     // Adding workstations details
     this.stationsDetails.forEach(nodeDetails => {
      this.nodeDetailsService.addWorkstationDetails(nodeDetails).subscribe({
        next: (result) => {
          console.log(`Added ${nodeDetails}`);
        },
        error: (message) => {
          console.log('Error while adding node: ' + message);
        }
      })
    })

    // Adding devices
    this.devicesToAdd.forEach(node => {
      this.nodesService.addNode(node).subscribe({
        next: (result) => {
          console.log(`Added ${node}`);
        },
        error: (message) => {
          console.log('Error while adding node: ' + message);
        }
      });
    })

    
  }
}
