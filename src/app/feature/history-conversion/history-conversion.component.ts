import { Component, OnDestroy, OnInit } from '@angular/core';
import { Transaction } from '../../shared/interfaces/transaction.interface';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ConversionHistoryService } from '../../shared/services/conversion-history.service';
import { MatDialog } from '@angular/material/dialog';
import { TransactionDetailsDialogComponent } from './transaction-details-dialog/transaction-details-dialog.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, startWith, Subject, takeUntil } from 'rxjs';



@Component({
  selector: 'app-history-conversion',
  standalone: true,
  imports: [DecimalPipe, ReactiveFormsModule,
    DatePipe, SharedModule, MatPaginatorModule],
  templateUrl: './history-conversion.component.html',
  styleUrls: ['./history-conversion.component.scss']
})
export class HistoryConversionComponent implements OnInit, AfterViewInit, OnDestroy {

  transactions: Transaction[] = [];
  displayedColumns: string[] = ['id', 'currencies', 'valueConverted', 'dateTime', 'actions'];
  dataSource = new MatTableDataSource<Transaction>([]);

  filterCtrl = new FormControl<string>('', { nonNullable: true });
  private destroy$ = new Subject<void>();


  @ViewChild(MatPaginator) paginator!: MatPaginator;



  constructor(private conversionHistoryService: ConversionHistoryService,
    public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.conversionHistoryService.getTransactions().subscribe((transactions) => {
      this.transactions = transactions;
      this.dataSource.data = transactions;

      this.dataSource.filterPredicate = (data: Transaction, filter: string) => {
        const dataStr = `${data.id} ${data.fromCurrency} ${data.toCurrency} ${data.toAmount}`;
        return dataStr.toLowerCase().includes(filter.trim().toLowerCase());
      };

    });
    this.filterCtrl.valueChanges.pipe(
      startWith(this.filterCtrl.value),
      debounceTime(300),
      map(v => (v ?? '').toString().trim().toLowerCase()),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(value => {
      console.log("filter", value)
      this.dataSource.filter = value;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    });

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

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


