import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { NodeDetails } from '../models/nodeDetails.model';

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
}
