import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TreeNode } from '../models/treeNode.model';

@Injectable({
  providedIn: 'any'
})
export class NodesService {
  baseApiUrl: string = 'https://localhost:7299';

  constructor(private http: HttpClient) {   }

  getAllFactories(): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(this.baseApiUrl + '/api/TreeOfMfgPlants/GetAllFactories');
  }

  getDepartmentsForFactory(factoryId: string): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(this.baseApiUrl + '/api/TreeOfMfgPlants/GetDepartmentsForFactory/'  + factoryId);
  }

  GetCellsForDepartment(departmentId: string): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(this.baseApiUrl + '/api/TreeOfMfgPlants/GetCellsForDepartment/' + departmentId);
  }

  GetDeviceGroupsForCell(cellId: string): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(this.baseApiUrl + '/api/TreeOfMfgPlants/GetDeviceGroupsForCell/' + cellId);
  }

  GetEquipment(deviceGroupId: string): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(this.baseApiUrl + '/api/TreeOfMfgPlants/GetEquipment/' + deviceGroupId);
  }
}
