import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-details-dialog',
  standalone: true,
  templateUrl: './transaction-details-dialog.component.html',
  styleUrls: ['./transaction-details-dialog.component.scss'],
  imports: [DecimalPipe, DatePipe]
})
export class TransactionDetailsDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TransactionDetailsDialogComponent>) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
