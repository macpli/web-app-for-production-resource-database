import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode } from '../../../../models/treeNode.model';


@Component({
  selector: 'tree-of-mfg-plants-draft',
  standalone: true,
  imports: [CommonModule, TreeOfMfgPlantsDraftComponent],
  templateUrl: './tree-of-mfg-plants-draft.component.html',
  styleUrl: './tree-of-mfg-plants-draft.component.scss'
})
export class TreeOfMfgPlantsDraftComponent {
  @Input() node!: TreeNode;
}
