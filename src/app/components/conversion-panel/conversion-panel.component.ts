
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElementRef, HostListener } from '@angular/core';




// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ConversionDialogComponent } from '././conversion-dialog/conversion-dialog.component';
import { ConversionHistoryService } from '../history-conversion/conversion-history.service';
import { Transaction } from '../history-conversion/transaction.interface'
import { UpdateRateDialogComponent } from './update-rate-dialog/update-rate-dialog.component';

@Component({
  selector: 'app-conversion-panel',
  standalone: true,
  imports: [CommonModule,
    FormsModule,

    // Material Modules
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,],
  templateUrl: './conversion-panel.component.html',
  styleUrl: './conversion-panel.component.css'
})
export class ConversionPanelComponent {
  constructor(private dialog: MatDialog, private elRef: ElementRef,
    private conversionHistory: ConversionHistoryService) { }

  currentRate = 2.45;
  fromCurrency = 'OR';
  toCurrency = 'TB';
  fromAmount: number | null = null;
  toAmount: string = '0.00';
  showError = false;

  updateConversion() {
    const rate = this.currentRate;
    if (!this.fromAmount || this.fromAmount < 0) {
      this.showError = true;
      this.toAmount = '0.00';
      return;
    }
    this.showError = false;

    if (this.fromCurrency === this.toCurrency) {
      this.toAmount = this.fromAmount.toFixed(2);
    } else if (this.fromCurrency === 'OR' && this.toCurrency === 'TB') {
      this.toAmount = (this.fromAmount * rate).toFixed(2);
    } else {
      this.toAmount = (this.fromAmount / rate).toFixed(2);
    }

  }
  // aoclicar em fechar no modal ele limpa o imput dos valores
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.clearInput();
    }
  }

  clearInput() {
    this.fromAmount = 0;
    this.showError = false;
    this.toAmount = '0.00';
  }

  performConversion() {
    this.updateConversion();
    if (this.showError) return;
    if (!this.fromCurrency || !this.toCurrency || this.fromAmount == null || this.toAmount == null) {
      this.showError = true;
      return;
    }

    const newTransaction: Transaction = {
      id: this.generateTransactionId(),
      fromCurrency: this.fromCurrency,
      toCurrency: this.toCurrency,
      fromAmount: this.fromAmount,
      toAmount: this.toAmount,
      dateTime: new Date().toISOString(),
    };

    this.conversionHistory.addTransaction(newTransaction);

    this.dialog.open(ConversionDialogComponent, {
      width: '600',
      data: {
        fromAmount: this.fromAmount,
        fromCurrency: this.fromCurrency,
        toAmount: this.toAmount,
        toCurrency: this.toCurrency
      }
    });
  }

  // Exemplo simples de gerador de ID
  generateTransactionId(): string {
    return 'TX' + Math.floor(Math.random() * 1000000);
  }

  openRateModal(): void {
    const dialogRef = this.dialog.open(UpdateRateDialogComponent, {
      width: '600',
      data: { currentRate: this.currentRate }
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      if (result !== this.currentRate) {
        this.currentRate = result;
      }
    });
  }
}




