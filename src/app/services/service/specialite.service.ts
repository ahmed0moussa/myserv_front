import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Specialite } from '../models/specialite';

@Injectable({
  providedIn: 'root',
})
export class SpecialiteService {
  baseurl = 'http://localhost:8080/api/v1/specialite/';
  specialite: Specialite[] = [];

  constructor(private Http: HttpClient) {}

  findall() {
    return this.Http.get<Specialite[]>(this.baseurl + 'all');
  }

  save(model: any) {
    return this.Http.post<Specialite>(this.baseurl + 'create', model);
  }
}
