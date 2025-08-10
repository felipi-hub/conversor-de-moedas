export interface Transaction {
    id: string;
    fromCurrency?: string;
    toCurrency: string;
    fromAmount?: number;
    valueConverted?: number;
    toAmount?: string;
    dateTime?: string;
}