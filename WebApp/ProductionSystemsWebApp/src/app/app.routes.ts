import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TreeOfMfgPlantsComponent } from './components/tree-of-mfg-plants/tree-of-mfg-plants.component';

export const routes: Routes = [
    { path: '**', component: TreeOfMfgPlantsComponent}
];
