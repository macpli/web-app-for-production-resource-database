import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodesService } from '../../services/nodes.service';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Factory } from '../../models/factory.model';
import { Department } from '../../models/department.model';
import { Station } from '../../models/station.model';
import {MatTreeNestedDataSource, MatTreeModule, MatTreeFlattener, MatTreeFlatDataSource} from '@angular/material/tree';
import {FlatTreeControl, NestedTreeControl} from '@angular/cdk/tree';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { TreeNode } from '../../models/treeNode.model';

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
 }

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
  

  ngOnInit(): void {
    this.InitData();
    
  }
  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;
  InitData(){
    this.getFactories();
    console.log(this.dataSource);
  }

  getFactories(){
    this.nodesService.getAllFactories()
    .subscribe({
      next: (result) => {
        this.factories = result;
        
        if(result)
        {
          this.getDepartments();
        }
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  getDepartments(){
    this.factories.forEach(f => {
      this.nodesService.getDepartmentsForFactory(f.keyId).subscribe({
        next: (result) => {
          f.children = result;
          if(result)
          {
            this.getCells();
          }
        },
        error: (response) => {
          console.log(response);
        }
      })
    })
  }

  getCells(){
    this.factories.forEach(f => {
      f.children?.forEach(d =>{
        this.nodesService.GetCellsForDepartment(d.nodeId).subscribe({
          next: (result) => {
            d.children = result;
            if(result != null){
              this.dataSource.data = this.factories;
              console.log(d.children);
            }
            
            
          }
        })
      })
      })
    }

    
  
}
