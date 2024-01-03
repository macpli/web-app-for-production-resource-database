import { Component, ElementRef, HostListener, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { TreeNode } from '../../../models/treeNode.model';
import { NodesService } from '../../../services/nodes.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NodeDetailsService } from '../../../services/node-details.service';
import { NodeInfo } from '../../../models/nodeInfo';
import { MatDialog } from '@angular/material/dialog';
import { AddNodeDialog } from '../shared/dialogs/add-node/add-node-dialog.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TreeOfMfgPlantsDraftComponent } from "./tree-of-mfg-plants-draft/tree-of-mfg-plants-draft.component";
import { TreePainterDirective } from '../../../directives/painter.directive';
import { NodeDetails } from '../../../models/nodeDetails.model';
import { CreatorDialogComponent } from '../shared/dialogs/creator-dialog/creator-dialog.component';

@Component({
    selector: 'tree-of-mfg-plants-sidenav',
    standalone: true,
    templateUrl: './tree-of-mfg-plants-sidenav.component.html',
    styleUrl: './tree-of-mfg-plants-sidenav.component.scss',
    imports: [CommonModule, MatCardModule, MatSidenavModule, MatTreeModule, MatButtonModule, MatIconModule, MatTabsModule, TreeOfMfgPlantsDraftComponent, TreePainterDirective],
    
})
export class TreeOfMfgPlantsSidenavComponent {
  @Input() refreshTriggered = false;

  constructor(
    private nodesService: NodesService,
    private nodeDetailsService: NodeDetailsService,
    public dialog: MatDialog,
    ) {}
  
  public factories!: TreeNode[];
  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  factoriesData = new MatTreeNestedDataSource<TreeNode>();
  workPiecesData = new MatTreeNestedDataSource<TreeNode>();
  isLoading: boolean = true;
  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

  chosenNode: any;
  factoryToDraw!: TreeNode[];
  
  ngOnInit(): void {
    this.refresh();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refreshTriggered'] && this.refreshTriggered) {
      this.refresh();
      this.refreshTriggered = false;
    }
  }

  refresh(){
    this.getAllNodes();
    this.getWorkPieces();
  }

  getFactoryToDraft(nodeId: string){
    this.nodesService.getNodesToDraft(nodeId).subscribe({
      next: (result) => {
        this.factoryToDraw = result;
      }
    })
  }

  getAllNodes(){
    this.isLoading = true;
    this.nodesService.getChildren('0')
    .subscribe({
      next: (result) => {
        this.factoriesData.data = result;
        //this.factories = result;
        this.isLoading = false;
      }
    })
  }

  getWorkPieces(){
    this.nodesService.getWorkPieces()
    .subscribe({
      next: (result) => {
        this.workPiecesData.data = result;
      }
    })
  }

  getIconClass(keyId: string): string {
    const startingLetter = keyId.charAt(0).toUpperCase(); 

    const iconClasses:any = {
      F: 'domain',
      D: 'pallet',
      E: 'precision_manufacturing',
      M: 'factory',
      C: 'warehouse', //conveyor_belt
    };

    return iconClasses[startingLetter] || iconClasses.default;
  }

  setNodeDetails(nodeId: string, keyId: string, parentId: string, width: number, height: number)
  {
    this.chosenNode = { nodeId, keyId, parentId, width, height };
  
    this.getFactoryToDraft(nodeId);

    this.nodeDetailsService.setNodeDetails(nodeId, keyId, parentId);
  }

  public getNodeType(keyId: string): string{
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

  addNode(nodeId: string, keyId: string, parentId: string){
    var nodeName = '';
    var nodeDesc = '';
    var width, height: number;
    var idOrg = '';
    var celType = '';
    var wstType = '';
    const nodeType = this.getNodeType(keyId);
    var maxNumericValue;
    var newKeyId: string;
    
    // Adding Factory
    if(parentId == '0' && keyId == '0' && nodeId == '0'){
      this.nodesService.getAtomChildren(parentId).subscribe({
        next: (result) => {
          const numericValues = result.map(value => parseInt(value.substring(1), 10));
          maxNumericValue = Math.max(...numericValues);
  
          if(maxNumericValue && maxNumericValue < 0){
            newKeyId = nodeType + 1;
          } else newKeyId = nodeType + 0 + (maxNumericValue +1);
  
          const dialogRef = this.dialog.open(AddNodeDialog, {
            width: '50%',
            height: '80%',
            data: {nodeId: nodeId, name: nodeName, nodeType: nodeType},
          });
  
          dialogRef.afterClosed().subscribe(result => {
            nodeName = result.name;
            width = result.width;
            height = result.height;
            nodeDesc = result.description;
            idOrg = result.idOrg;
            
            if(result){
              const newNode: TreeNode = {
                nodeId: newKeyId,
                keyId: newKeyId,
                parentId: '0',
                name: nodeName,
                width: width,
                height: height,
              }

              const newNodeDetails: NodeDetails = {
                name: nodeName,
                description: nodeDesc,
                idFct: newKeyId,
                idOrg: idOrg,
                nodeId: newKeyId
              }

              this.nodeDetailsService.addFactoryDetails(newNodeDetails).subscribe({
                next: (result) => {
                  console.log('Successfully added details');
                  this.refresh();
                }
              })

              this.nodesService.addNode(newNode).subscribe({
                next: (result) => {
                  console.log('Successfully added a new node.');
                  this.getAllNodes();
                },
                error: (message) => {
                  console.log('Error while adding node: ' + message);
                }
              })
            }
            
          });
        }
      });
    }else {
      // Adding An Element
      this.nodesService.getAtomChildren(nodeId).subscribe({
        next: (result) => {
          const numericValues = result.map(value => parseInt(value.substring(1), 10));
          maxNumericValue = Math.max(...numericValues);
  
          if(maxNumericValue && maxNumericValue < 0){
            newKeyId = nodeType + 1;
          } else newKeyId = nodeType + (maxNumericValue +1);
  
          const dialogRef = this.dialog.open(AddNodeDialog, {
            width: '50%',
            height: '80%',
            data: {nodeId: nodeId, name: nodeName, nodeType: nodeType},
          });
  
          dialogRef.afterClosed().subscribe(result => {
            nodeName = result.name;
            width = result.width;
            height = result.height;
            nodeDesc = result.description;
            idOrg = result.idOrg;
            celType = result.celType;
            wstType = result.wstType;
  
            if(result){
              const newNode: TreeNode = {
                nodeId: nodeId+newKeyId,
                keyId: newKeyId,
                parentId: nodeId,
                name: nodeName,
                width: width, 
                height: height
              }
  
              if(nodeType == 'M'){
                const newNodeDetails: NodeDetails = {
                  name: nodeName,
                  description: nodeDesc,
                  idDep: newKeyId,
                  idFct: keyId,
                  nodeId: nodeId+newKeyId
                }
                this.nodeDetailsService.addDepartmentDetails(newNodeDetails).subscribe({
                  next: (result) => {
                    this.refresh();
                  }
                })
              }else if(nodeType == 'C'){
                const newNodeDetails: NodeDetails = {
                  name: nodeName,
                  description: nodeDesc,
                  idCel: newKeyId,
                  idDep: keyId,
                  nodeId: nodeId+newKeyId,
                  celType: celType,
                }
                this.nodeDetailsService.addCellDetails(newNodeDetails).subscribe({
                  next: (result) => {
                    this.refresh();
                  }
                })
              }else if(nodeType == 'D'){
                const newNodeDetails: NodeDetails = {
                  name: nodeName,
                  description: nodeDesc,
                  idWst: newKeyId,
                  idCel: keyId,
                  nodeId: nodeId+newKeyId,
                  wstType: wstType,
                }
                this.nodeDetailsService.addWorkstationDetails(newNodeDetails).subscribe({
                  next: (result) => {
                    this.refresh();
                  }
                })
              }

              this.nodesService.addNode(newNode).subscribe({
                next: (result) => {
                  this.getAllNodes();
                },
                error: (message) => {
                  console.log('Error while adding node: ' + message);
                }
              })
            }
            
          });
        }
      });
    }
  }

  openCreator(){
    const dialogRef = this.dialog.open(CreatorDialogComponent, {
      width: '50%',
      height: '80%',
    });
  }

  
}