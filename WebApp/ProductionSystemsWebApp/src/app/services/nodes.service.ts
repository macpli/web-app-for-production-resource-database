import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodesService {
  baseApiUrl: string = 'https://localhost:7211';

  constructor(private http: HttpClient) {   }

  getAllNodes(): Observable<Node[]> {
    return this.http.get<Node[]>(this.baseApiUrl + '/api/');
  }
}
