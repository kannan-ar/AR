import { Component } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  username: string = '';
  password: string = '';

  constructor(private dialogRef: MatDialogRef<CreateComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.username && this.password) {
      this.dialogRef.close({ username: this.username, password: this.password });
    }
  }
}
