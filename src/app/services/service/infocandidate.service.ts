import { Injectable } from '@angular/core';
import { Infocandidate } from '../models/infocandidate';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfocandidateService {
  private baseUrl = 'http://localhost:8080/api/infocandidate'; 
  constructor(private http: HttpClient) { }
  createInfocandidate(infocandidate: Infocandidate): Observable<Infocandidate> {
    return this.http.post<Infocandidate>(`${this.baseUrl}/save`, infocandidate);
  }
  getInfocandidateById(id: string): Observable<Infocandidate> {
    return this.http.get<Infocandidate>(`${this.baseUrl}/findbyid/${id}`);
  }
}
