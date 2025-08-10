import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-update-rate-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule,
    MatButtonModule, MatInputModule],
  templateUrl: './update-rate-dialog.component.html',
  styleUrl: './update-rate-dialog.component.css'
})
export class UpdateRateDialogComponent {
  newRate: number;


  constructor(
    public dialogRef: MatDialogRef<UpdateRateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { currentRate: number }
  ) {
    this.newRate = data.currentRate;
  }

  confirm(): void {
    this.dialogRef.close(this.newRate);
  }
  formatRate(): void {
    if (this.newRate != null && !isNaN(this.newRate)) {
      this.newRate = parseFloat(this.newRate.toFixed(2));
    }
  }


}

