import { Component, } from '@angular/core';
import { MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';

@Component({
  selector: 'app-conversion-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './conversion-dialog.component.html',
  styleUrls: ['./conversion-dialog.component.scss']
})
export class ConversionDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}
