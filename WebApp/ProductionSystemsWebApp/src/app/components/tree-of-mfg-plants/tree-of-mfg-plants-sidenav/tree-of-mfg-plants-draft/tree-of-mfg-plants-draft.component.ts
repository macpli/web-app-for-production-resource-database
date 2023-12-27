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

  getKeyIdClass(): string {
    
    if (this.node.keyId.startsWith('F')) {
      return 'red-border';
    } else if (this.node.keyId.startsWith('M')) {
      return 'blue-border';
    } else if (this.node.keyId.startsWith('C')) {
      return 'green-border';
    } else if (this.node.keyId.startsWith('D')){
      return 'yellow-border'
    } else if (this.node.keyId.startsWith('E')){
      return 'violet-border'
    }else return '';
  }
}
