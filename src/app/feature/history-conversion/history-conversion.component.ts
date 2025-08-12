import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../shared/interfaces/transaction.interface';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ConversionHistoryService } from '../../shared/services/conversion-history.service';
import { MatDialog } from '@angular/material/dialog';
import { TransactionDetailsDialogComponent } from './transaction-details-dialog/transaction-details-dialog.component';
import { SharedModule } from '../../shared/modules/shared.module';



@Component({
  selector: 'app-history-conversion',
  standalone: true,
  imports: [DecimalPipe,
    DatePipe, SharedModule],
  templateUrl: './history-conversion.component.html',
  styleUrls: ['./history-conversion.component.scss']
})
export class HistoryConversionComponent implements OnInit {
  transactions: Transaction[] = [];
  displayedColumns: string[] = ['id', 'currencies', 'valueConverted', 'dateTime', 'actions'];


  constructor(private conversionHistoryService: ConversionHistoryService, public dialog: MatDialog) { }

  ngOnInit(): void {
    // Subscrição para obter as transações atualizadas
    this.conversionHistoryService.getTransactions().subscribe((transactions) => {
      this.transactions = transactions;  // Atualiza as transações exibidas na tabela
    });
  }
  openDialog(transaction: any): void {
    const dialogRef = this.dialog.open(TransactionDetailsDialogComponent, {
      width: '800px',
      data: transaction
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O modal foi fechado');
    });
  }
}

/*transactions: Transaction[] = [
  {
    id: 'TX12345',
    fromCurrency: 'USD',
    toCurrency: 'BRL',
    fromAmount: 100,
    valueConverted: 520.75,
    dateTime: '2025-08-08T10:30:00'
  },
  {
    id: 'TX12346',
    fromCurrency: 'EUR',
    toCurrency: 'USD',
    fromAmount: 90,
    valueConverted: 108.90,
    dateTime: '2025-08-08T11:15:00'
  },
];*/

