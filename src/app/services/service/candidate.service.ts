import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candidate } from '../models/candidate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private baseUrl = 'http://localhost:8080/api/candidate'; 
  constructor(private http: HttpClient) { }
   // Create a new candidate
   createCandidate(candidate: Candidate, specialiteId: string): Observable<Candidate> {
    return this.http.post<Candidate>(`${this.baseUrl}/save/${specialiteId}`, candidate);
  }

  // Get all candidates
  getAllCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.baseUrl}/getall`);
  }
  getCandidateById(id: string): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.baseUrl}/findbyid/${id}`);
  }
  findbyspecialite(specialiteid:string) {
    
    return this.http.get<Candidate[]>(`${this.baseUrl}/specialite/${specialiteid}`);
  }
}
