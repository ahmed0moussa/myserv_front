import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feedback } from '../models/feedback';

@Injectable({
  providedIn: 'root',
})
export class FeedBackService {
  baseurl = 'http://localhost:8080/api/v1/feedback/';
  feedback: Feedback[] = [];

  constructor(private Http: HttpClient) {}

  findall() {
    return this.Http.get<Feedback[]>(this.baseurl + 'all');
  }

  save(model: any) {
    return this.Http.post<Feedback>(this.baseurl + 'create', model);
  }
}
