import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodesService } from '../../services/nodes.service';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { Node } from '../../models/node.model';

@Component({
  selector: 'app-tree-of-mfg-plants',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './tree-of-mfg-plants.component.html',
  styleUrl: './tree-of-mfg-plants.component.scss'
})
export class TreeOfMfgPlantsComponent {
  nodes: Node[]=[];

  displayedColumns: string[] = ['nodeId', 'keyId', 'parentId', 'name'];
  dataSource = this.nodes;

  constructor(private nodesService: NodesService) {}

  ngOnInit(): void {
    this.nodesService.getAllNodes()
      .subscribe({
        next: (result) => {
          this.nodes = result;
          console.log(this.nodes);
        },
        error: (response) => {
          console.log(response);
        }
      })

      console.log(this.nodes);
  }
}
