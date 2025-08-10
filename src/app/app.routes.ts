import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConversionPanelComponent } from './components/conversion-panel/conversion-panel.component';
import { HistoryConversionComponent } from './components/history-conversion/history-conversion.component';

export const routes: Routes = [
    { path: '', redirectTo: '/conversao', pathMatch: 'full' },
    { path: 'conversao', component: ConversionPanelComponent },
    { path: 'historico', component: HistoryConversionComponent },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule { }
