import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'conversao', pathMatch: 'full' },
    {
        path: 'conversao',
        title: 'Conversão',
        loadComponent: () =>
            import('./feature/conversion-panel/conversion-panel.component')
                .then(c => c.ConversionPanelComponent),
    },
    {
        path: 'historico',
        title: 'Histórico de Conversões',
        loadComponent: () =>
            import('./feature/history-conversion/history-conversion.component')
                .then(c => c.HistoryConversionComponent),
    },
];