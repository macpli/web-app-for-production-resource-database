import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { NodeDetails } from '../models/nodeDetails.model';
import { TreeNode } from '../models/treeNode.model';

@Injectable({
  providedIn: 'any'
})
export class NodeDetailsService {
  private dataSubject = new BehaviorSubject<{ nodeId: string, keyId: string, parentId: string }>({ nodeId: '', keyId: '', parentId: '' });
  baseApiUrl: string = 'https://localhost:7299';
  
  constructor(
    private http: HttpClient,
    ) {}
  
  setNodeDetails(nodeId: string, keyId: string, parentId: string)
  {
    const nodeInfo = { nodeId, keyId, parentId};
    this.dataSubject.next(nodeInfo);
  }

  getNodeDetails(): Observable<{ nodeId: string, keyId: string, parentId: string }> 
  {
    return this.dataSubject.asObservable();
  }

  getFactoryDetails(nodeId: string): Observable<NodeDetails> {
    return this.http.get<NodeDetails>(this.baseApiUrl + '/api/FactoryDetails/GetFactoryDetails/' + nodeId)
  }

  getDepartmentDetails(nodeId: string): Observable<NodeDetails> {
    return this.http.get<NodeDetails>(this.baseApiUrl + '/api/FactoryDetails/GetDepartmentDetails/' + nodeId)
  }

  getCellDetails(nodeId: string): Observable<NodeDetails> {
    return this.http.get<NodeDetails>(this.baseApiUrl + '/api/FactoryDetails/GetCellDetails/' + nodeId)
  }

  getWorkstationDetails(nodeId: string): Observable<NodeDetails> {
    return this.http.get<NodeDetails>(this.baseApiUrl + '/api/FactoryDetails/GetWorkstationDetails/' + nodeId)
  }

  addFactoryDetails(details: NodeDetails): Observable<NodeDetails> {
    return this.http.post<NodeDetails>(this.baseApiUrl + '/api/FactoryDetails/AddFactoryDetails', details);
  }

  addDepartmentDetails(details: NodeDetails): Observable<NodeDetails> {
    return this.http.post<NodeDetails>(this.baseApiUrl + '/api/FactoryDetails/AddDepartmentDetails', details);
  }

  addCellDetails(details: NodeDetails): Observable<NodeDetails> {
    return this.http.post<NodeDetails>(this.baseApiUrl + '/api/FactoryDetails/AddCellDetails', details);
  }

  addWorkstationDetails(details: NodeDetails): Observable<NodeDetails> {
    return this.http.post<NodeDetails>(this.baseApiUrl + '/api/FactoryDetails/AddWorkstationDetails', details);
  }

  deleteDetails(nodeId: string): Observable<string> {
    return this.http.delete<string>(this.baseApiUrl + '/api/FactoryDetails/DeleteDetails/' + nodeId);
  }
}
