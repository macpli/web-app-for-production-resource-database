import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodesService } from '../../services/nodes.service';

@Component({
  selector: 'app-tree-of-mfg-plants',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tree-of-mfg-plants.component.html',
  styleUrl: './tree-of-mfg-plants.component.scss'
})
export class TreeOfMfgPlantsComponent {
  nodes: Node[]=[];

  constructor(private nodesService: NodesService) {}

  ngOnInit(): void {
    this.nodesService.getAllNodes()
      .subscribe({
        next: (nodes) => {
          console.log(nodes);
        },
        error: (response) => {
          console.log(response);
        }
      })
  }
}
