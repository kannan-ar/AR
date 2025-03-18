import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private passwordService = environment.passwordService;
  private apiScopes = ['api://e07f4d1a-35f9-409b-92e7-70e789b8577b/Ad.App'];

  constructor(
    private http: HttpClient,
    private msalService: MsalService) { }

  getPosts(): Observable<any> {
    return this.http.get<any>(this.passwordService.url);
  }
}
