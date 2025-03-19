import { Component } from '@angular/core';

import { CredentialService } from '../../services/credential.service';
import { MatDialog } from '@angular/material/dialog';
import { ManageCredentialComponent } from '../manage/manage-credential.component';

@Component({
  selector: 'list-credential',
  templateUrl: './list-credential.component.html',
  styleUrls: ['./list-credential.component.scss']
})
export class ListCredentialComponent {
  credentials: Credential[] = [];
  displayedColumns: any[] = ['userName', 'password', 'actions'];
  constructor(
    private credentialService: CredentialService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.credentialService.getPosts().subscribe({
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
    const dialogRef = this.dialog.open(ManageCredentialComponent, {
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
