import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeDetailsService } from '../../../services/node-details.service';
import { MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { first } from 'rxjs';
import { TreeNode } from '../../../models/treeNode.model';
import {MatTabsModule} from '@angular/material/tabs';
import { NodesService } from '../../../services/nodes.service';
import { TreeOfMfgPlantsDraftComponent } from "../tree-of-mfg-plants-sidenav/tree-of-mfg-plants-draft/tree-of-mfg-plants-draft.component";
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
    selector: 'tree-of-mfg-plants-node-details',
    standalone: true,
    templateUrl: './tree-of-mfg-plants-node-details.component.html',
    styleUrl: './tree-of-mfg-plants-node-details.component.scss',
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTabsModule, TreeOfMfgPlantsDraftComponent,
              MatInputModule, MatSelectModule, FormsModule]
})
export class TreeOfMfgPlantsNodeDetailsComponent {
  @Output() refresh = new EventEmitter<boolean>();

  cellTypes = [
    { value: 'Cell', label: 'Komórka' },
    { value: 'Line', label: 'Linia' },
    { value: 'Warehouse', label: 'Magazyn' }
  ];

  wstTypes = [
    { value: 'Machining', label: 'Obróbcze' },
    { value: 'Assembly', label: 'Montażowe' },
    { value: 'Measurement', label: 'Pomiarowe' },
    { value: 'Storage', label: 'Magazynowe' }
  ];

  nodeId: string = '';
  keyId: string = '';
  parentId: string = '';
  nodeName: string = '';
  nodeDesc: string = '';
  nodeType: string = '';
  idOrg: string = '';
  location: string = '';
  manager: string = '';
  supervisor: string = '';

  nodeToDraw!: TreeNode[];

  editMode: boolean = false;
  imageUrl: string = '';

  constructor(
    private nodeDetailsService: NodeDetailsService,
    private nodesService: NodesService,
  ) {}

  ngOnInit(): void {
    this.nodeDetailsService.getNodeDetails().subscribe({
      next: (result) => {
        if(result.nodeId.length > 0)
        {
          this.nodeId = result.nodeId;
          this.keyId = result.keyId;
          this.parentId = result.parentId;
          this.getNodesToDraft(this.nodeId);

          var firstLetter = this.keyId.charAt(0).toUpperCase();

          if(firstLetter == 'F'){
            this.getFactoryDetails(this.nodeId);
          } else if(firstLetter == 'M'){
            this.getDepartmentDetails(this.nodeId);
          } else if(firstLetter == 'C'){
            this.getCellDetails(this.nodeId);
          } else if(firstLetter == 'D'){
            this.getWorkstationDetails(this.nodeId);
          }
        }
      },
      error: (error) => {
        console.log('Error while recieving nodeId. Error: ' + error);
      }
    })
  }

  Close()
  {
    this.nodeId = '';
  }

  clearData(){
    this.nodeName = '';
    this.nodeDesc = '';
    this.nodeType = '';
    this.idOrg = '';
  }

  getNodesToDraft(nodeId: string){
    this.nodesService.getNodesToDraft(nodeId).subscribe({
      next: (result) => {
        this.nodeToDraw = result;
        console.log(result)
      }
    })
  }

  getFactoryDetails(nodeId: string){
    this.clearData();
    this.nodeDetailsService.getFactoryDetails(nodeId).subscribe({
      next: (result) => {
        this.nodeName = result.name;
        this.nodeDesc = result.description;
        this.idOrg = result.idOrg!;
        this.location = result.location!;
      }, 
      error: (error) => {
        console.log('Error while recieving node details. Error: ' + error);
      }
    })
  }

  getDepartmentDetails(nodeId: string){
    this.clearData();
    this.nodeDetailsService.getDepartmentDetails(nodeId).subscribe({
      next: (result) => {
        this.nodeName = result.name;
        this.nodeDesc = result.description;
        this.manager = result.manager!;
      }, 
      error: (error) => {
        console.log('Error while recieving node details. Error: ' + error);
      }
    })
  }

  getCellDetails(nodeId: string){
    this.clearData();
    this.nodeDetailsService.getCellDetails(nodeId).subscribe({
      next: (result) => {
        this.nodeName = result.name;
        this.nodeDesc = result.description;
        this.nodeType = result.celType!;
        this.supervisor = result.supervisor!;
      }, 
      error: (error) => {
        console.log('Error while recieving node details. Error: ' + error);
      }
    })
  }

  getWorkstationDetails(nodeId: string){
    this.clearData();
    this.nodeDetailsService.getWorkstationDetails(nodeId).subscribe({
      next: (result) => {
        this.nodeName = result.name;
        this.nodeDesc = result.description;
        this.nodeType = result.wstType!;
      }, 
      error: (error) => {
        console.log('Error while recieving node details. Error: ' + error);
      }
    })
  }

  public getNodeType(keyId: string): string{
    const firstLetter = keyId.charAt(0).toUpperCase();

    switch(firstLetter){
      case 'F':
        return 'Fabryka';
      case 'M':
        return 'Wydział';
      case 'C':
        return 'Komórka';
      case 'D':
        return 'Stanowisko'
      default:
        return ''
    }
  }

  setEditMode(): boolean {
    return this.editMode = !this.editMode;
  }

  deleteNode(nodeId: string){
    this.nodesService.deleteNode(nodeId).subscribe();

    this.nodeDetailsService.deleteDetails(nodeId).subscribe({
      next: (result) => {
        this.clearData();
        this.Close();
        this.refresh.emit(true);
        this.editMode = false;
      }
    });
  }
  
  generatePDF(nodeToDraw: TreeNode[], canvasImageDataURL: string) {
    const content: any[] = [];

  // Add a title to the PDF
  content.push({ text: 'Raport:', style: 'header' });

  this.addNodesToContent(nodeToDraw, content);
  
  if (canvasImageDataURL) {
    content.push({ image: canvasImageDataURL, width: 500 }); // Adjust the width as needed
  }

  const docDefinition = {
    content,
    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
    },
  };

    pdfMake.createPdf(docDefinition).download("raport.pdf");
  }

  addNodesToContent(nodes: TreeNode[], content: any[]) {
    nodes.forEach((node) => {
    
    content.push(`${node.name}, ID: ${node.nodeId}`);

      if (node.children && node.children.length > 0) {
        const childContent: any[] = [];
        this.addNodesToContent(node.children, childContent);
       content.push({ ul: childContent });
      }
    });
  }

  onCanvasImageReceived(draft: string) {
    this.imageUrl = draft;
  }
}
  