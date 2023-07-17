import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import { Entretien } from '../models/entretien';

@Injectable({
  providedIn: 'root',
})
export class EntretienService {
  baseurl = 'http://localhost:8080/api/v1/entretien/';
  entretien: Entretien[] = [];

  constructor(private Http: HttpClient) {}

  findall() {
    return this.Http.get<Entretien[]>(this.baseurl + 'all');
  }
  findbyspecialite(specialiteid:string) {
    
    return this.Http.get<Entretien[]>(`http://localhost:8080/api/v1/entretien/specialite?specialiteId=${specialiteid}`);
  }
  save(model: any) {
    return this.Http.post<Entretien>(this.baseurl + 'create', model);
  }
}
