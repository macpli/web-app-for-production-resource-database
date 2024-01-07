import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode } from '../../../../models/treeNode.model';
import { fabric } from 'fabric';

@Component({
  selector: 'tree-of-mfg-plants-draft',
  standalone: true,
  imports: [CommonModule, TreeOfMfgPlantsDraftComponent],
  templateUrl: './tree-of-mfg-plants-draft.component.html',
  styleUrl: './tree-of-mfg-plants-draft.component.scss'
})
export class TreeOfMfgPlantsDraftComponent {
  @ViewChild('layoutCanvas') layoutCanvas!: ElementRef<HTMLCanvasElement>;
  private canvas!: fabric.Canvas;
  
  @Input() node!: TreeNode;

  ngAfterViewInit() {
    this.canvas = new fabric.Canvas(this.layoutCanvas.nativeElement, {
      width: 800,
      height: 800,
    });

    this.generateLayout(this.canvas);
  }

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

  generateLayout(canvas: fabric.Canvas) {
  
    const colors = ['red', 'blue', 'green', 'yellow', 'pink'];
    this.drawLayout(this.node, canvas, 0, 0, colors, 0);
  }

  drawLayout(node: TreeNode, canvas: fabric.Canvas, x: number, y: number, colors: string[], colorIndex: number) {
    const color = colors[colorIndex];
    var index: number = 1;

    if(node.parentId == '0'){
      var rect = new fabric.Rect({
        left: x,
        top: y,
        width: node.width,
        height: node.height,
        fill: color,
      });

    }else {
      var rect = new fabric.Rect({
        left: x,
        top: y,
        width: node.width,
        height: node.height,
        fill: color,
      });
    }

    canvas.add(rect);

    if (node.children && node.children.length > 0) {
      const parentWidth = node.width;
     
      let currentX = x;
      let currentY = y;

      for (const child of node.children) {
        
        const parentX = (parentWidth - child.width)/2;
        
        // Generating connection roads between cells
        if(node.keyId.charAt(0) == 'M' && index < node.children.length){
          console.log(node.children.length)
          var con1 = new fabric.Rect({
            left: parentX + currentX + 10,
            top: currentY + child.height + 10,
            width: 10,
            height: 10,
            fill: 'beige',
          });
    
          var con2 = new fabric.Rect({
            left: parentX + currentX + child.width - 20,
            top: currentY + child.height + 10 ,
            width: 10,
            height: 10,
            fill: 'beige',
          });
          index ++;
          console.log('index: ' + index)
          canvas.add(con1, con2);
        }

        this.drawLayout(child, canvas, parentX + currentX, currentY + 10, colors, (colorIndex + 1) % colors.length );
        
        // Wykonywane po ukończeniu danej gałęzi
        currentY += child.width + 10;
      }
    }
  }
}
