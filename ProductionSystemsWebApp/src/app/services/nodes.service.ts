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

  getChildren(nodeId: string): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(this.baseApiUrl + '/api/TreeOfMfgPlants/GetChildren/' + nodeId);
  }

  getNodesToDraft(nodeId: string): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(this.baseApiUrl + '/api/TreeOfMfgPlants/GetNodesToDraft/' + nodeId);
  }

  getAtomChildren(nodeId: string): Observable<string[]> {
    return this.http.get<string[]>(this.baseApiUrl + '/api/TreeOfMfgPlants/GetAtomChildren/' + nodeId)
  }

  addNode(node: TreeNode): Observable<TreeNode> {
    return this.http.post<TreeNode>(this.baseApiUrl + '/api/TreeOfMfgPlants/AddNode', node);
  }

  deleteNode(nodeId: string): Observable<string> {
    return this.http.delete<string>(this.baseApiUrl+ '/api/TreeOfMfgPlants/' + nodeId);
  }

  getWorkPieces(): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(this.baseApiUrl + '/api/TreeOfMfgPlants/GetWorkpieces');
  }
}
