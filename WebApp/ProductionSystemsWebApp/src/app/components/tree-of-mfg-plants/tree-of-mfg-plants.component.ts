import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodesService } from '../../services/nodes.service';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Factory } from '../../models/factory.model';
import { Department } from '../../models/department.model';
import { Station } from '../../models/station.model';

@Component({
  selector: 'app-tree-of-mfg-plants',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSidenavModule],
  templateUrl: './tree-of-mfg-plants.component.html',
  styleUrl: './tree-of-mfg-plants.component.scss'
})
export class TreeOfMfgPlantsComponent {
  factories: Factory[] = [];
  


  constructor(private nodesService: NodesService) {}

  ngOnInit(): void {
    this.InitData();
  }

  InitData(){
    this.getFactories();
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
          f.departments = result;
          if(result)
          {
            this.getStations();
          }
        },
        error: (response) => {
          console.log(response);
        }
      })
    })
  }

  getStations(){
    this.factories.forEach(f => {
      f.departments?.forEach(d =>{
        this.nodesService.getStationsForDepartment(d.keyId).subscribe({
          next: (result) => {
            d.stations = result;
          }
        })
      })
      })
    }
  
}
