import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpParams} from '@angular/common/http';
import { Entretien } from '../models/entretien';
import { Specialite } from '../models/specialite';


@Injectable({
  providedIn: 'root',
})
export class EntretienService {
  baseurl = 'http://localhost:8080/api/v1/entretien/';
  entretien: Entretien[] = [];
  specialite: Specialite[] = [];

  constructor(private Http: HttpClient) {}
  headers = new HttpHeaders();
  findall() {
    return this.Http.get<Entretien[]>(this.baseurl + 'all');
  }
  findbyspecialite(specialiteid:string) {
    
    return this.Http.get<Entretien[]>(`http://localhost:8080/api/v1/entretien/specialite?specialiteId=${specialiteid}`);
  }

  save(model: Entretien,specialite:any) {
 
    return this.Http.post<Entretien>(this.baseurl + 'create?specialite='+specialite, model);
  }
  precedent(specialiteId: string) {
    return this.Http.get<Specialite>(this.baseurl + specialiteId);
  }
}
