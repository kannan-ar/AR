import { Component } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login.component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  msLogin() {
    this.authService.microsoftLogin();
  }

  isLoggedIn() {
    return this.authService.checkLoginStatus();
  }
}
