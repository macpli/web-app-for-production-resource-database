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
  templateUrl: './device-creator-dialog.component.html'
})
export class DeviceCreatorDialogComponent {

}
