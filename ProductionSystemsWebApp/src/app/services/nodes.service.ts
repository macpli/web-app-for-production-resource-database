import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TreeNode } from '../models/treeNode.model';
import { NodeToUpdate } from '../models/nodeToUpdate'
import { Device } from '../models/device.model';

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

  updateNodeCoordinates(nodeToUpdate: NodeToUpdate): Observable<NodeToUpdate> {
    return this.http.patch<NodeToUpdate>(this.baseApiUrl + '/api/TreeOfMfgPlants/UpdateNodeCoordinates', nodeToUpdate)
  }

  deleteNode(nodeId: string): Observable<string> {
    return this.http.delete<string>(this.baseApiUrl+ '/api/TreeOfMfgPlants/' + nodeId);
  }

  addDevice(device: Device): Observable<Device> {
    return this.http.post<Device>(this.baseApiUrl + '/api/TreeOfMfgPlants/AddDevice', device);
  }

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.baseApiUrl + '/api/TreeOfMfgPlants/GetDevices');
  }
}
