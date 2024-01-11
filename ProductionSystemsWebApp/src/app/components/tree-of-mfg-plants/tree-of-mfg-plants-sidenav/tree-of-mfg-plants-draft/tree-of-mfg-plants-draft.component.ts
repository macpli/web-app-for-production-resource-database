import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { TreeNode } from '../../../../models/treeNode.model';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import {MatIconModule} from '@angular/material/icon';
import { fabric } from 'fabric';

interface ExtendedTreeNode extends TreeNode {
  xCoordinate: number;
  yCoordinate: number;
}

interface ConnectionPoints {
  xCoordinate: number;
  yCoordinate: number;
}

@Component({
  selector: 'tree-of-mfg-plants-draft',
  standalone: true,
  imports: [CommonModule, MatButtonModule,MatIconModule, MatSelectModule, TreeOfMfgPlantsDraftComponent, MatListModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './tree-of-mfg-plants-draft.component.html',
  styleUrl: './tree-of-mfg-plants-draft.component.scss'
})
export class TreeOfMfgPlantsDraftComponent {
  @ViewChild('layoutCanvas') layoutCanvas!: ElementRef<HTMLCanvasElement>;
  private canvas!: fabric.Canvas;
  
  @Input() node!: TreeNode;
  @Output() canvasImage: EventEmitter<string> = new EventEmitter<string>();

  nodesFlat: TreeNode[] = [];

  renderedNodes: ExtendedTreeNode[] = [];

  xCoordinate: number = 0;
  yCoordinate: number = 0;
  
  colors = [
    { name: 'Niebieski', value: '#bae1ff' },
    { name: 'Czerwony', value: '#ffb3ba' },
    { name: 'Zielony', value: '#baffc9' },
    { name: 'Żółty', value: '#ffffba' },
    { name: 'Fioletowy', value: '#f6e3ff' }
  ];
  selectedColor = '#bae1ff';

  connectionPoints: ConnectionPoints[] = [];

  ngAfterViewInit() {
    this.canvas = new fabric.Canvas(this.layoutCanvas.nativeElement, {
      width: this.node.width,
      height: this.node.height,
    });

    this.getFlatNodes(this.node);
    //this.generateLayout(this.canvas);
  }

  getFlatNodes( node: TreeNode ){
    this.nodesFlat.push(node);
    if(node.children && node.children.length > 0){
      node.children.forEach(n => {
        this.getFlatNodes(n);
      })
    }
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

  generateLayout(canvas: fabric.Canvas, node?: TreeNode) {
    const colors = ['#bae1ff', '#ffb3ba',  '#baffc9', '#ffffba', '#f6e3ff'];

    //this.drawLayoutAuto(this.node, canvas, 0, 0, colors, 0);
    this.drawLayoutManual(node!, canvas,colors, 0);
  }

  getNodeToDraft(node: TreeNode){
    this.generateLayout(this.canvas, node);
  }

  drawLayoutManual(node: TreeNode, canvas: fabric.Canvas ,colors: string[], colorIndex: number){
    
    if(this.renderedNodes.length > 0){

      console.log(this.renderedNodes)

      var parentNode = this.renderedNodes.filter(n => n.nodeId === node.parentId);

      var realXCoordinate = parentNode[0].xCoordinate + this.xCoordinate;
      var realYCoordinate = parentNode[0].yCoordinate + this.yCoordinate;

      const extendedNode: ExtendedTreeNode = {
        ...node,
        xCoordinate: realXCoordinate,
        yCoordinate: realYCoordinate
      }
      
      var rect = new fabric.Rect({
        left: realXCoordinate,
        top: realYCoordinate,
        width: node.width,
        height: node.height,
        fill: this.selectedColor,
      });

      this.renderedNodes.push(extendedNode);

    } else {

      const extendedNode: ExtendedTreeNode = {
        ...node,
        xCoordinate: this.xCoordinate,
        yCoordinate: this.yCoordinate
      };

      var rect = new fabric.Rect({
        left:  this.xCoordinate,
        top: this.yCoordinate,
        width: node.width,
        height: node.height,
        fill: this.selectedColor,
      });

      this.renderedNodes.push(extendedNode);
    }

    canvas.add(rect);
    //this.drawConnections()
    const savedDraft = this.saveCanvasAsImage('png');
    this.canvasImage.emit(savedDraft);
    this.canvas.renderAll(); 
  }

  drawLayoutAuto(node: TreeNode, canvas: fabric.Canvas, x: number, y: number, colors: string[], colorIndex: number) {
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
          
          canvas.add(con1, con2);
        }

        this.drawLayoutAuto(child, canvas, parentX + currentX, currentY + 10, colors, (colorIndex + 1) % colors.length );
        
        // Wykonywane po ukończeniu danej gałęzi
        currentY += child.width + 10;
      }
    }

     const savedDraft = this.saveCanvasAsImage('png');
     this.canvasImage.emit(savedDraft);
     this.canvas.renderAll(); 
  }

  drawConnections(){
    const cells = this.renderedNodes.filter(n => n.keyId.charAt(0) === 'C');
    if(cells && cells.length > 0){

      var inputWarehouse: { xCoordinate: any; yCoordinate: any; }  
      inputWarehouse =
      {
        xCoordinate: (cells[0].xCoordinate + cells[0].width/2),
        yCoordinate: (cells[0].yCoordinate + cells[0].height/2),
      }

      var outputWarehouse: { xCoordinate: any; yCoordinate: any; }
      outputWarehouse =
      {
        xCoordinate: (cells[cells.length-1].xCoordinate + cells[cells.length-1].width/2),
        yCoordinate: (cells[cells.length-1].yCoordinate + cells[cells.length-1].height/2),
      }

      const startPoint = {x: inputWarehouse.xCoordinate, y: inputWarehouse.yCoordinate}
      const endPoint = {x: outputWarehouse.xCoordinate, y: outputWarehouse.yCoordinate}
      var renderedDeps = this.renderedNodes.filter(n => n.keyId.charAt(0) === 'M');

      renderedDeps.forEach(d => {
        var depCenter: any = {
          xCoordinate: d.width/2 + d.xCoordinate,
          yCoordinate: d.height/2 + d.yCoordinate
        }
        this.connectionPoints.push(depCenter);
        console.log('connection points: ' + this.connectionPoints.length);
      })

      for(let i = 0; i < renderedDeps.length-1; i++){
        if(i == 0){
          // Generate connection from inputWarehouse to first connection point
          console.log('Generating 1')
          let lineStart = {x: startPoint.x, y: startPoint.y }
          let lineEnd = { x: this.connectionPoints[1].xCoordinate, 
                          y: startPoint.y };
          let line = new fabric.Line([lineStart.x, lineStart.y, lineEnd.x, lineEnd.y], {
            fill: 'yellow',
            stroke: 'yellow',
            strokeWidth: 8,
          });
          this.canvas.add(line);
          
          lineStart = {x: this.connectionPoints[1].xCoordinate, 
            y: startPoint.y }
          lineEnd = { x: this.connectionPoints[1].xCoordinate, 
                      y: this.connectionPoints[1].yCoordinate,};
          line = new fabric.Line([lineStart.x, lineStart.y, lineEnd.x, lineEnd.y], {
            fill: 'yellow',
            stroke: 'yellow',
            strokeWidth: 8,
          });
          this.canvas.add(line);

        }else if(this.connectionPoints.length-2 === i && outputWarehouse){
          // generate connection to outputWarehouse cell
          console.log('Generating 2')
          let lineStart = {x: this.connectionPoints[i].xCoordinate, 
                          y: this.connectionPoints[i].yCoordinate }
          let lineEnd = { x: endPoint.x, 
                           y: this.connectionPoints[i].yCoordinate };
          
          let line = new fabric.Line([lineStart.x, lineStart.y, lineEnd.x, lineEnd.y], {
            fill: 'yellow',
            stroke: 'yellow',
            strokeWidth: 8,
          }); 
          this.canvas.add(line);

          lineStart = {x: endPoint.x, 
                      y: this.connectionPoints[i].yCoordinate }
          lineEnd = { x: endPoint.x, 
                     y: endPoint.y };
          
          line = new fabric.Line([lineStart.x, lineStart.y, lineEnd.x, lineEnd.y], {
            fill: 'yellow',
            stroke: 'yellow',
            strokeWidth: 8,
          }); 
          this.canvas.add(line);

        }else {
          if(this.connectionPoints.length-1 != i){
            console.log('Generating 3')
            // Generate normal connections
            let j = i + 1;
            let lineStart = {x: this.connectionPoints[i].xCoordinate, 
                             y: this.connectionPoints[i].yCoordinate }
            let lineEnd = { x: this.connectionPoints[j].xCoordinate, 
                            y: this.connectionPoints[i].yCoordinate };

            let line = new fabric.Line([lineStart.x, lineStart.y, lineEnd.x, lineEnd.y], {
              fill: 'yellow',
              stroke: 'yellow',
              strokeWidth: 8,
            }); 
            this.canvas.add(line);

            lineStart = {x: this.connectionPoints[j].xCoordinate, 
                        y: this.connectionPoints[i].yCoordinate }
            lineEnd   = { x: this.connectionPoints[j].xCoordinate, 
                        y: this.connectionPoints[j].yCoordinate };

            line = new fabric.Line([lineStart.x, lineStart.y, lineEnd.x, lineEnd.y], {
              fill: 'yellow',
            stroke: 'yellow',
            strokeWidth: 8,
          }); 
          this.canvas.add(line);

          }
        }
      } 
    }
  }

  saveCanvasAsImage(format: string): string {
    return this.canvas.toDataURL({
      format: 'jpeg', 
      quality: 1, 
    });
  }
}
