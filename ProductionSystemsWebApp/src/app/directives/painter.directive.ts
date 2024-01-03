import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

interface TreeNode {
  width: number;
  height: number;
  nodeId: string;
  keyId: string;
  parentId: string;
  name: string;
  expandable?: boolean;
  level?: number;
  children?: TreeNode[];
}

@Directive({
  selector: '[appTreePainter]',
  standalone: true,
})
export class TreePainterDirective implements OnInit, OnChanges {
  @Input() rootNode!: TreeNode;
  @Input() canvasWidth!: number;
  @Input() canvasHeight!: number;

  private ctx: CanvasRenderingContext2D;

  constructor(private el: ElementRef) {
    this.ctx = el.nativeElement.getContext('2d');
  }

  ngOnInit() {
    if(this.rootNode){
      this.paintTree(this.rootNode, 10, 10, this.canvasWidth, this.canvasHeight);
    }
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rootNode'] || changes['canvasWidth'] || changes['canvasHeight']) {
      this.clearCanvas();
      this.paintTree(this.rootNode, 10, 10, this.canvasWidth, this.canvasHeight);
    }
  }

  private paintRectangle(x: number, y: number, width: number, height: number): void {
    this.ctx.fillStyle = '#00FF00'; // Green color, you can customize this
    this.ctx.fillRect(x, y, width, height);
    this.ctx.strokeRect(x, y, width, height);
  }

  private paintTree(node: TreeNode, x: number, y: number, parentWidth: number, parentHeight: number): void {
    // Paint the current node
    this.paintRectangle(x, y, node.width, node.height);

    // Calculate the positions and dimensions for child nodes
    let childX = x + 10; // Adjust as needed
    let childY = y + 10; // Adjust as needed

    console.log(x, y, node.width, node.height)

    if (node.children && node.children.length > 0) {
      // Recursively paint child nodes
      node.children.forEach((child, index) => {
        this.paintTree(child, childX, childY, child.width, child.height);
        console.log(child, childX, childY, child.width, child.height)

        // Update x and y for the next child position
        childX += 20 + child.width; // Adjust as needed
      });
    }
  }

  private clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
}
