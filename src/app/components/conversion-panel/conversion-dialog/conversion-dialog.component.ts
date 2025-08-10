import { Component, } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-conversion-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './conversion-dialog.component.html',
  styleUrl: './conversion-dialog.component.css'
})
export class ConversionDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }


}
