import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  
  findall(candidateId:string) {
    return this.Http.get<Entretien[]>(this.baseurl + 'all/'+candidateId);
  } 
  save(model: Entretien,candidateId:any) {
 
    return this.Http.post<Entretien>(this.baseurl + 'save?candidateId='+candidateId, model);
  }
  findbyId(idCanditate:string) {
  
    return this.Http.get<Entretien>(this.baseurl+'findbyid?id='+idCanditate)

  }
  deletebyId(idEntretien:string,idCanditate:string){
    return this.Http.delete(this.baseurl+"deleteEntretien/"+idEntretien+"/"+idCanditate);
  }

  
  precedent(specialiteId: string) {
    return this.Http.get<Specialite>(this.baseurl + specialiteId);
  }
  

 
}
