import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factory } from '../models/factory.model';
import { Department } from '../models/department.model';
import { Station } from '../models/station.model';

@Injectable({
  providedIn: 'any'
})
export class NodesService {
  baseApiUrl: string = 'https://localhost:7299';

  constructor(private http: HttpClient) {   }

  getAllFactories(): Observable<Factory[]> {
    return this.http.get<Factory[]>(this.baseApiUrl + '/api/TreeOfMfgPlants/GetAllFactories');
  }

  getDepartmentsForFactory(factoryId: string): Observable<Department[]> {
    return this.http.get<Department[]>(this.baseApiUrl + '/api/TreeOfMfgPlants/GetDepartmentsForFactory/'  + factoryId);
  }

  getStationsForDepartment(departmentId: string): Observable<Station[]> {
    return this.http.get<Station[]>(this.baseApiUrl + '/api/TreeOfMfgPlants/GetStationsForDepartment/' + departmentId)
  }
}
