import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() userName: string = '';
  @Output() logoutEmitter = new EventEmitter<string>();

  constructor(private authService: AuthService) { }

  msLogin() {
    this.authService.microsoftLogin();
  }
  
  isLoggedIn() {
    return this.authService.checkLoginStatus();
  }

  logout() {
    this.logoutEmitter.emit();
  }
}
