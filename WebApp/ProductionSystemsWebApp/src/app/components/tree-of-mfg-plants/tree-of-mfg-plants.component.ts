import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodesService } from '../../services/nodes.service';
import { MatCardModule} from '@angular/material/card';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import { NestedTreeControl} from '@angular/cdk/tree';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { TreeNode } from '../../models/treeNode.model';

@Component({
  selector: 'app-tree-of-mfg-plants',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSidenavModule, MatTreeModule, MatButtonModule, MatIconModule],
  templateUrl: './tree-of-mfg-plants.component.html',
  styleUrl: './tree-of-mfg-plants.component.scss'
})
export class TreeOfMfgPlantsComponent {

  constructor(private nodesService: NodesService) {}
  
  factories: TreeNode[] = [];
  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();
  
  allnodes: any;

  ngOnInit(): void {
    
    this.getAllNodes();
  }

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

  getAllNodes(){
    this.nodesService.GetChildren('0')
    .subscribe({
      next: (result) => {
        this.dataSource.data = result;
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
