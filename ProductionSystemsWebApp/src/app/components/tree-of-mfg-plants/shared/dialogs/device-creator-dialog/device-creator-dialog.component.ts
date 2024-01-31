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
import { Device } from '../../../../../models/device.model';

@Component({
  selector: 'app-device-creator-dialog',
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
  templateUrl: './device-creator-dialog.component.html',
  providers: [NodesService],
})
export class DeviceCreatorDialogComponent {

  constructor(
    private _formBuilder: FormBuilder,
    private nodesService: NodesService,
  ) {}

  name!: string;
  width!: number;
  height!: number;
  type!: string;

  devicesControlGroup = this._formBuilder.group({
    name: ['', Validators.required],
    width: [2, Validators.required],
    height: [2, Validators.required],
    type: ['', Validators.required]
  });

  save(){
    if (this.devicesControlGroup && this.devicesControlGroup.valid) {

      var newKeyId: string = '';

      this.nodesService.getDevices().subscribe({
        next: (result) => {
          newKeyId = 'U0' + result.length +1;

          var deviceToAdd: Device = {
            id: newKeyId,
            keyId: newKeyId,
            parentId: '0',
            name: this.devicesControlGroup.get('name')!.value ?? '',
            width: this.devicesControlGroup.get('width')!.value ?? 0,
            height: this.devicesControlGroup.get('height')!.value ?? 0,
            type: this.devicesControlGroup.get('type')!.value?? ''
          };
    
          this.nodesService.addDevice(deviceToAdd).subscribe({
            next: (result) => {
              console.log(result)
            }
          })        
        }
      })
    }
  }

}
