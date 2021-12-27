import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemaRoutingModule } from './sistema-routing.module';
import { DashHomeComponent } from './components/dash-home/dash-home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AuthGuard } from '../auth.guard';
import { DespesasComponent } from './components/despesas/despesas.component';
import { RelatoriosComponent } from './components/relatorios/relatorios.component';
import { RecebimentosComponent } from './components/recebimentos/recebimentos.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { AddDespesaComponent } from './components/despesas/add-despesa/add-despesa.component';
import { AddRecebimentoComponent } from './components/recebimentos/add-recebimento/add-recebimento.component';
import { MatSelectFilterModule } from 'mat-select-filter';
import { RelatoriosAnualComponent } from './components/relatorios/relatorios-anual/relatorios-anual.component';
import { RelatoriosMensalComponent } from './components/relatorios/relatorios-mensal/relatorios-mensal.component';


const materialModules = [
  CdkTreeModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectFilterModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatTreeModule,
  FlexLayoutModule,
  OverlayModule,
  PortalModule,
  MatBadgeModule,
  MatGridListModule,
  MatRadioModule,
  MatDatepickerModule,
  MatTooltipModule
];


@NgModule({
  declarations: [
    DashHomeComponent,
    NavbarComponent,
    DespesasComponent,
    RelatoriosComponent,
    RecebimentosComponent,
    AddDespesaComponent,
    AddRecebimentoComponent,
    RelatoriosAnualComponent,
    RelatoriosMensalComponent,

  ],
  imports: [
    CommonModule,
    SistemaRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    GoogleChartsModule,
    SweetAlert2Module,
    ...materialModules
  ],
  providers: [
    AuthGuard,
  ]
})
export class SistemaModule { }
