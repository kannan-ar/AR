import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private passwordService = environment.passwordService;
  constructor(
    private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get<any>(`${this.passwordService.url}/password/get`);
  }
}
