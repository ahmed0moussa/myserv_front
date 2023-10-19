import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompteRenduService {
  private baseUrl = 'http://localhost:8080/api/v1/compterendu'; 

  constructor(private http: HttpClient) {}

  
  createCompteRendu(compteRendu: any): Observable<any> {
    
    return this.http.post(this.baseUrl+"/create", compteRendu);
  }

  getCompteRendu(id: string): Observable<any> {
   
    return this.http.get(`${this.baseUrl}/findbyid/${id}`);
  }

  updateCompteRendu(compteRendu: any): Observable<any> {
    const url = `${this.baseUrl}/compte-rendu/update`; 
    return this.http.post(url, compteRendu);
  }
  uplodImage(infoCandidateId: string, image: File){
    const formData: FormData = new FormData();
    
    formData.append('image', image, image.name);
    
    return this.http.post(`${this.baseUrl}/uploadImage/${infoCandidateId}`, formData);

  }
  uplode(compeRenduId: string, compeRendu: File){
    const formData: FormData = new FormData();
    
    formData.append('filecompteRendu', compeRendu, compeRendu.name);
    
    return this.http.post(`${this.baseUrl}/uploadCompteRendu/${compeRenduId}`, formData);

  }
}
