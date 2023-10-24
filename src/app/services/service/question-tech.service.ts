import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionTECH } from '../models/question-tech.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionTECHService {
  baseUrl = "http://localhost:8080/api/v1/questionTECH/";

  constructor(private http: HttpClient) { }

  // Create a technical question associated with a specialization
  createQuestion(questionTECH: QuestionTECH, specialiteId: string): Observable<QuestionTECH> {
    return this.http.post<QuestionTECH>(this.baseUrl + 'createQuestion?specialiteId=' + specialiteId, questionTECH);
  }

  // Save a list of technical questions associated with a specialization
  saveAll(listequestionTECH: QuestionTECH[], specialiteId: string): Observable<QuestionTECH[]> {
    return this.http.post<QuestionTECH[]>(this.baseUrl + 'saveAll?specialiteId=' + specialiteId, listequestionTECH);
  }

  // Delete a technical question by its ID
  deleteQuestion(questionTECHId: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'delete/' + questionTECHId);
  }

  // Retrieve technical questions associated with a specialization by ID
  findBySpecialite(idSpecialite: string): Observable<QuestionTECH[]> {
    return this.http.get<QuestionTECH[]>(this.baseUrl + 'getBySpecialite?specialiteId=' + idSpecialite);
  }
  
}
