import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  tiles = [
    { title: 'Credentials', content: 'Manage Credentials', link: '/credentials', cols: 1, rows: 1, authRequired: true }
  ]

  gridCols: number = 3;
  
  constructor(private authService: AuthService) { }

  isLoggedIn() {
    return this.authService.checkLoginStatus();
  }
}
