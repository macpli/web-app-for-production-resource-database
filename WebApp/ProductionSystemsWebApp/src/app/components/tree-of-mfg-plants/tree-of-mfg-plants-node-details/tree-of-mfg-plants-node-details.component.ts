import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeDetailsService } from '../../../services/node-details.service';
import { MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { first } from 'rxjs';
import { TreeNode } from '../../../models/treeNode.model';
import {MatTabsModule} from '@angular/material/tabs';
import { NodesService } from '../../../services/nodes.service';
import { TreeOfMfgPlantsDraftComponent } from "../tree-of-mfg-plants-sidenav/tree-of-mfg-plants-draft/tree-of-mfg-plants-draft.component";

@Component({
    selector: 'tree-of-mfg-plants-node-details',
    standalone: true,
    templateUrl: './tree-of-mfg-plants-node-details.component.html',
    styleUrl: './tree-of-mfg-plants-node-details.component.scss',
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTabsModule, TreeOfMfgPlantsDraftComponent]
})
export class TreeOfMfgPlantsNodeDetailsComponent {
  nodeId: string = '';
  keyId: string = '';
  parentId: string = '';
  nodeName: string = '';
  nodeDesc: string = '';
  nodeType: string = '';
  idOrg: string = '';

  factoryToDraw!: TreeNode[];

  constructor(
    private nodeDetailsService: NodeDetailsService,
    private nodesService: NodesService,
  ) {}

  ngOnInit(): void {
    this.nodeDetailsService.getNodeDetails().subscribe({
      next: (result) => {
        if(result.nodeId.length > 0)
        {
          this.nodeId = result.nodeId;
          this.keyId = result.keyId;
          this.parentId = result.parentId;
          this.getFactoryToDraft(this.nodeId);

          var firstLetter = this.keyId.charAt(0).toUpperCase();

          if(firstLetter == 'F'){
            this.getFactoryDetails(this.nodeId);
          } else if(firstLetter == 'M'){
            this.getDepartmentDetails(this.nodeId);
          } else if(firstLetter == 'C'){
            this.getCellDetails(this.nodeId);
          } else if(firstLetter == 'D'){
            this.getWorkstationDetails(this.nodeId);
          }
        }
      },
      error: (error) => {
        console.log('Error while recieving nodeId. Error: ' + error);
      }
    })
  }

  Close()
  {
    this.nodeId = '';
  }

  clearData(){
    this.nodeName = '';
    this.nodeDesc = '';
    this.nodeType = '';
    this.idOrg = '';
  }

  getFactoryToDraft(nodeId: string){
    this.nodesService.getChildren(nodeId).subscribe({
      next: (result) => {
        this.factoryToDraw = result;
        console.log(result);
      }
    })
  }

  getFactoryDetails(nodeId: string){
    this.clearData();
    this.nodeDetailsService.getFactoryDetails(nodeId).subscribe({
      next: (result) => {
        this.nodeName = result.name;
        this.nodeDesc = result.description;
        this.idOrg = result.idOrg!;
      }, 
      error: (error) => {
        console.log('Error while recieving node details. Error: ' + error);
      }
    })
  }

  getDepartmentDetails(nodeId: string){
    this.clearData();
    this.nodeDetailsService.getDepartmentDetails(nodeId).subscribe({
      next: (result) => {
        this.nodeName = result.name;
        this.nodeDesc = result.description;
      }, 
      error: (error) => {
        console.log('Error while recieving node details. Error: ' + error);
      }
    })
  }

  getCellDetails(nodeId: string){
    this.clearData();
    this.nodeDetailsService.getCellDetails(nodeId).subscribe({
      next: (result) => {
        this.nodeName = result.name;
        this.nodeDesc = result.description;
        this.nodeType = result.celType!;
      }, 
      error: (error) => {
        console.log('Error while recieving node details. Error: ' + error);
      }
    })
  }

  getWorkstationDetails(nodeId: string){
    this.clearData();
    this.nodeDetailsService.getWorkstationDetails(nodeId).subscribe({
      next: (result) => {
        this.nodeName = result.name;
        this.nodeDesc = result.description;
        this.nodeType = result.wstType!;
      }, 
      error: (error) => {
        console.log('Error while recieving node details. Error: ' + error);
      }
    })
  }

  public getNodeType(keyId: string): string{
    const firstLetter = keyId.charAt(0).toUpperCase();

    switch(firstLetter){
      case 'F':
        return 'Fabryka';
      case 'M':
        return 'Wydział';
      case 'C':
        return 'Komórka';
      case 'D':
        return 'Stanowisko'
      default:
        return ''
    }
  }
}
