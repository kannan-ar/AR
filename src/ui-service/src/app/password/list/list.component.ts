import { Component } from '@angular/core';

import { PasswordService } from '../../services/password.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  credentials: Credential[] = [];
  displayedColumns: any[] = ['userName', 'password', 'actions'];
  constructor(
    private passwordService: PasswordService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.passwordService.getPosts().subscribe({
      next: (credentials) => {
        this.credentials = credentials;
      }
    });
  }

  edit(credential: any): void {
    console.log(credential);
  }

  delete(id: string): void {
    console.log(id);
  }

  openLoginModal(): void {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '400px',
      disableClose: true  // Prevent closing without action
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User Logged In:', result);
      } else {
        console.log('Login canceled');
      }
    });
  }
}
