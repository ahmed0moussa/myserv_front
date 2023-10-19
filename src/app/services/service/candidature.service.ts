import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candidature } from '../models/candidature';
import { Observable } from 'rxjs';
import { Candidate } from '../models/candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  private baseUrl = 'http://localhost:8080/api/candidatures'; 
  constructor(private Http: HttpClient) {

   }
   save(model: Candidature){
    return this.Http.post<Candidature>(this.baseUrl+'/save',model);
   }
   
   findCheckedCandidatures(): Observable<Candidature[]> {
    return this.Http.get<Candidature[]>(`${this.baseUrl}/checked/true`);
  }

  findUncheckedCandidatures(): Observable<Candidature[]> {
    return this.Http.get<Candidature[]>(`${this.baseUrl}/checked/false`);
  }
  
  deleteCandidature(id: string): Observable<any> {
    return this.Http.delete(this.baseUrl+"/delete/"+id);
  }

  getCandidatureById(id:string){
    return this.Http.get<Candidature>(this.baseUrl+"/findbyid/"+id);
  }

  uploadFile(candidatureId: string, file: File): Observable<Candidature> {
    const formData: FormData = new FormData();
    
    formData.append('file', file, file.name);
    return this.Http.post<Candidature>(`${this.baseUrl}/save/uploadFile/${candidatureId}`, formData);
  }

  uploadLettre(candidatureId: string,  lettreDeMotivation: File): Observable<Candidature> {
    const formData = new FormData();
  formData.append('lettreDeMotivation', lettreDeMotivation,lettreDeMotivation.name);    
  return this.Http.post<Candidature>(`${this.baseUrl}/save/uploadLettre/${candidatureId}`, formData);
  }

  placeCandidate(candidatureId: string, specialiteId: string): Observable<Candidate> {
    const formData = new FormData();
     

    return this.Http.post<Candidate>(`${this.baseUrl}/savecandidate/${candidatureId}/${specialiteId}`,formData);
  }
  
}
