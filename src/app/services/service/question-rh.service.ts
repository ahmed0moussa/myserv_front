import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionRH } from '../models/question-rh';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionRHService {
  private baseUrl = 'http://localhost:8080/api/v1/questionRH/';

  constructor(private http: HttpClient) { }

  // Create a new QuestionRH
  createQuestion(questionRH: QuestionRH): Observable<QuestionRH> {
    return this.http.post<QuestionRH>(this.baseUrl + 'create', questionRH);
  }

  // Save a list of QuestionRH
  saveAllQuestions(questions: QuestionRH[]): Observable<QuestionRH[]> {
    return this.http.post<QuestionRH[]>(this.baseUrl + 'saveAll', questions);
  }

  // Get all QuestionRH entities
  findAll(): Observable<QuestionRH[]> {
    return this.http.get<QuestionRH[]>(this.baseUrl + 'findAll');
  }

  // Delete a QuestionRH by ID
  deleteQuestion(questionRHId: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'delete/' + questionRHId);
}
}
  
