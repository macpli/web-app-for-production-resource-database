import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Node } from '../models/node.model';

@Injectable({
  providedIn: 'any'
})
export class NodesService {
  baseApiUrl: string = 'https://localhost:7299';

  constructor(private http: HttpClient) {   }

  getAllNodes(): Observable<Node[]> {
    return this.http.get<Node[]>(this.baseApiUrl + '/api/TreeOfMfgPlants/GetAllNodes');
  }
}
