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

@Component({
  selector: 'tree-of-mfg-plants-sidenav',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSidenavModule, MatTreeModule, MatButtonModule, MatIconModule],
  templateUrl: './tree-of-mfg-plants-sidenav.component.html',
  styleUrl: './tree-of-mfg-plants-sidenav.component.scss'
})
export class TreeOfMfgPlantsSidenavComponent {
  constructor(private nodesService: NodesService) {}
  
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
}
