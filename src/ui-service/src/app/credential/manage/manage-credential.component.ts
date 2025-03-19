import { Component } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'manage-credential',
  templateUrl: './manage-credential.component.html',
  styleUrls: ['./manage-credential.component.scss']
})
export class ManageCredentialComponent {
  username: string = '';
  password: string = '';

  constructor(private dialogRef: MatDialogRef<ManageCredentialComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.username && this.password) {
      this.dialogRef.close({ username: this.username, password: this.password });
    }
  }
}
