import { Component } from '@angular/core';
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

@Component({
  selector: 'tree-of-mfg-plants-sidenav',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSidenavModule, MatTreeModule, MatButtonModule, MatIconModule],
  templateUrl: './tree-of-mfg-plants-sidenav.component.html',
  styleUrl: './tree-of-mfg-plants-sidenav.component.scss'
})
export class TreeOfMfgPlantsSidenavComponent {

  constructor(
    private nodesService: NodesService,
    private nodeDetailsService: NodeDetailsService,
    public dialog: MatDialog,
    ) {}
  
  factories: TreeNode[] = [];
  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();
  isLoading: boolean = true;
  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;
  
  ngOnInit(): void {
    this.getAllNodes();
  }

  getAllNodes(){
    this.isLoading = true;
    this.nodesService.GetChildren('0')
    .subscribe({
      next: (result) => {
        this.dataSource.data = result;
        this.isLoading = false;
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

  setNodeDetails(nodeId: string, keyId: string, parentId: string)
  {
    this.nodeDetailsService.setNodeDetails(nodeId, keyId, parentId);
  }

  public getNodeType(keyId: string): string{
    const firstLetter = keyId.charAt(0).toUpperCase();

    switch(firstLetter){
      case 'F':
        return 'M';
      case 'M':
        return 'C';
      case 'C':
        return 'D';
      default:
        return ''
    }
  }

  addNode(nodeId: string, keyId: string, parentId: string, nodeName: string){
    var nodeName = '';
    const nodeType = this.getNodeType(keyId);
    var maxNumericValue;
    var newKeyId: string;
    
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
          data: {nodeId: nodeId, name: nodeName},
        });

        dialogRef.afterClosed().subscribe(result => {
          nodeName = result;

          if(result){
            const newNode: TreeNode = {
              nodeId: nodeId+newKeyId,
              keyId: newKeyId,
              parentId: nodeId,
              name: nodeName
            }

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
  }
}