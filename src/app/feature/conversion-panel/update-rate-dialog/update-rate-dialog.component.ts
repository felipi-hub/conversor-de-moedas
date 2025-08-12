import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/modules/shared.module';


@Component({
  selector: 'app-update-rate-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './update-rate-dialog.component.html',
  styleUrls: ['./update-rate-dialog.component.scss']
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

}

