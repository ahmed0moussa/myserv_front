import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompteRenduService {
  private baseUrl = 'http://localhost:8080/api/v1'; 

  constructor(private http: HttpClient) {}

  
  createCompteRendu(idEntretien:any,compteRendu: any): Observable<any> {
    
    return this.http.post(this.baseUrl+"/compterendu/create?idEntretien="+idEntretien, compteRendu);
  }

  getCompteRendu(entretienId: string): Observable<any> {
    const url = `${this.baseUrl}/compte-rendu/${entretienId}`;
    return this.http.get(url);
  }

  updateCompteRendu(compteRendu: any): Observable<any> {
    const url = `${this.baseUrl}/compte-rendu/update`; 
    return this.http.post(url, compteRendu);
  }
}
