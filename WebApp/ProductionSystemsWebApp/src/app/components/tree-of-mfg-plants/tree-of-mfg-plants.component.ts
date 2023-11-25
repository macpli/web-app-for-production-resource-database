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
import { TreeOfMfgPlantsNodeDetailsComponent } from "./tree-of-mfg-plants-node-details/tree-of-mfg-plants-node-details.component";
import { TreeOfMfgPlantsSidenavComponent } from "./tree-of-mfg-plants-sidenav/tree-of-mfg-plants-sidenav.component";

@Component({
    selector: 'tree-of-mfg-plants',
    standalone: true,
    templateUrl: './tree-of-mfg-plants.component.html',
    styleUrl: './tree-of-mfg-plants.component.scss',
    imports: [CommonModule, MatCardModule, MatSidenavModule, MatTreeModule, MatButtonModule, MatIconModule, TreeOfMfgPlantsNodeDetailsComponent, TreeOfMfgPlantsSidenavComponent]
})
export class TreeOfMfgPlantsComponent {

  ngOnInit(): void { 
  }
}
