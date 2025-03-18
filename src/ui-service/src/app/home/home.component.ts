import { Component } from '@angular/core';

import { PasswordService } from '../services/password.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private passwordService: PasswordService) { }

  ngOnInit(): void {
    this.passwordService.getPosts().subscribe(x => {
      console.log(x);
    });
  }

}
