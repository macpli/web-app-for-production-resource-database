import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeDetailsService } from '../../../services/node-details.service';
import { MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { first } from 'rxjs';

@Component({
  selector: 'tree-of-mfg-plants-node-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './tree-of-mfg-plants-node-details.component.html',
  styleUrl: './tree-of-mfg-plants-node-details.component.scss'
})
export class TreeOfMfgPlantsNodeDetailsComponent {
  nodeId: string = '';
  keyId: string = '';
  parentId: string = '';
  nodeName: string = '';
  nodeDesc: string = '';
  nodeType: string = '';
  idOrg: string = '';

  constructor(
    private nodeDetailsService: NodeDetailsService,
  ) {}

  ngOnInit(): void {
    this.nodeDetailsService.getNodeDetails().subscribe({
      next: (result) => {
        if(result.nodeId.length > 0)
        {
          this.nodeId = result.nodeId;
          this.keyId = result.keyId;
          this.parentId = result.parentId;

          var firstLetter = this.keyId.charAt(0).toUpperCase();

          if(firstLetter == 'F'){
            this.getFactoryDetails(this.nodeId);
          } else if(firstLetter == 'M'){
            this.getDepartmentDetails(this.nodeId);
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

  getFactoryDetails(nodeId: string){
    this.nodeDetailsService.getFactoryDetails(nodeId).subscribe({
      next: (result) => {
        console.log(result);
        this.nodeName = result.nodeName;
        this.nodeDesc = result.nodeDesc;
        this.nodeType = result.nodeType!;
        this.idOrg = result.idOrg!;
      }, 
      error: (error) => {
        console.log('Error while recieving node details. Error: ' + error);
      }
    })
  }

  getDepartmentDetails(nodeId: string){
    this.nodeDetailsService.getDepartmentDetails(nodeId).subscribe({
      next: (result) => {
        console.log(result);
        this.nodeName = result.nodeName;
        this.nodeDesc = result.nodeDesc;
        this.nodeType = result.nodeType!;
        this.idOrg = result.idOrg!;
      }, 
      error: (error) => {
        console.log('Error while recieving node details. Error: ' + error);
      }
    })
  }

  getNodeType(keyId: string): string{
    const firstLetter = keyId.charAt(0).toUpperCase();

    switch(firstLetter){
      case 'F':
        return 'Fabryka';
      case 'M':
        return 'Wydział';
      case 'C':
        return 'Komórka';
      default:
        return ''
    }
    
  }
}
