import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Transaction } from '../interfaces/transaction.interface';


@Injectable({ providedIn: 'root' })
export class ConversionHistoryService {
  private transactions: Transaction[] = [];
  private transactions$ = new BehaviorSubject<Transaction[]>([]);

  private nextId = 1;

  getTransactions(): Observable<Transaction[]> {
    return this.transactions$.asObservable();
  }

  addTransaction(transaction: Omit<Transaction, 'id' | 'dateTime'>) {
    const newTransaction: Transaction = {
      id: String(this.nextId++),
      dateTime: new Date().toISOString(),
      ...transaction
    };
    this.transactions.push(newTransaction);
    this.transactions$.next([...this.transactions]);
  }
}
