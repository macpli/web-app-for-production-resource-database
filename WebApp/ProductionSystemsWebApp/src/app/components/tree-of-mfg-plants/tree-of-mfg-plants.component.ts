import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule} from '@angular/material/sidenav';
import { TreeOfMfgPlantsNodeDetailsComponent } from "./tree-of-mfg-plants-node-details/tree-of-mfg-plants-node-details.component";
import { TreeOfMfgPlantsSidenavComponent } from "./tree-of-mfg-plants-sidenav/tree-of-mfg-plants-sidenav.component";
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
    selector: 'tree-of-mfg-plants',
    standalone: true,
    templateUrl: './tree-of-mfg-plants.component.html',
    styleUrl: './tree-of-mfg-plants.component.scss',
    imports: [CommonModule, MatToolbarModule, MatSidenavModule, TreeOfMfgPlantsNodeDetailsComponent, TreeOfMfgPlantsSidenavComponent]
})
export class TreeOfMfgPlantsComponent { }
