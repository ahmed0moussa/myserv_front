import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionTECH } from '../models/question-tech.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionTECHService {
  baseur="http://localhost:8080/api/v1/questionTECH/"
  constructor(private Http: HttpClient) { }
  findBySpecialite(idSpecialite:String){
    return this.Http.get<QuestionTECH>(this.baseur+'getBySpecialite?specialiteId='+idSpecialite)
  }
  
}
