import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  findbyspecialite(specialite:any) {
    return this.Http.get<Entretien[]>(this.baseurl + 'specialite',specialite);
  }
  save(model: any) {
    return this.Http.post<Entretien>(this.baseurl + 'create', model);
  }
}
