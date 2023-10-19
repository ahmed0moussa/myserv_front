import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionRH } from '../models/question-rh';

@Injectable({
  providedIn: 'root'
})
export class QuestionRHService {
  baseur="http://localhost:8080/api/v1/questionRH/"
  constructor(private http: HttpClient) { }
  findAll(){
    return this.http.get<QuestionRH>(this.baseur+'findAll')
  }
}
