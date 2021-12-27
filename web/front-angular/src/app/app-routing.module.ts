import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginScreenComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'sistema',
    loadChildren: () => import('./sistema/sistema.module').then((m) => m.SistemaModule),
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
