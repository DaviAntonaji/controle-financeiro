import { RelatoriosComponent } from './components/relatorios/relatorios.component';
import { RecebimentosComponent } from './components/recebimentos/recebimentos.component';
import { DespesasComponent } from './components/despesas/despesas.component';
import { DashHomeComponent } from './components/dash-home/dash-home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [{
  path: "",
  component: NavbarComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'home'
    },
    {
      path: 'home',
      component:  DashHomeComponent
    },
    {
      path: 'despesas',
      component:  DespesasComponent
    },
    {
      path: 'recebimentos',
      component:  RecebimentosComponent
    },
    {
      path: 'relatorios',
      component:  RelatoriosComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemaRoutingModule { }
