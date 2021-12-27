import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReturnDespesas } from '../returns/despesas.return';
import { ReturnRecebimentos } from '../returns/recebimentos.return';
import { ReturnRelatorioAnual } from '../returns/relatorioanual.return';
import { ReturnRelatorioMensal } from '../returns/relatoriomensal.return';
import { ReturnCategoriaDespesa } from '../returns/despesa.categoria.return';

@Injectable({
  providedIn: 'root'
})
export class FinanceiroService {

  constructor(private router: Router, private http: HttpClient) { }

  public getDespesas(user_id: string, mes: string, ano: string): Observable<ReturnDespesas> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'False' });
    return this.http.get<any>(environment.api + `/despesas/${user_id}/${mes}/${ano}`, { headers: headerOptions });

  }
  public getRecebimentos(user_id: string, mes: string, ano: string): Observable<ReturnRecebimentos> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'False' });
    return this.http.get<any>(`${environment.api}/recebimentos/${user_id}/${mes}/${ano}`, { headers: headerOptions });

  }


  public relatorioMensal(user_id: string, mes: string, ano: string): Observable<ReturnRelatorioMensal> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'False' });
    return this.http.get<any>(`${environment.api}/relatorios/mensal/${user_id}/${ano}/${mes}`, { headers: headerOptions });

  }
  public relatorioAnual(user_id: string, ano: string): Observable<ReturnRelatorioAnual> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'False' });
    return this.http.get<any>(`${environment.api}/relatorios/anual/${user_id}/${ano}`, { headers: headerOptions });

  }

  public categoriasDespesas(): Observable<ReturnCategoriaDespesa> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'False' });
    return this.http.get<any>(`${environment.api}/despesas/categorias`, { headers: headerOptions });

  }

  public cadastraDespesa(data: any) {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'False' });
    return this.http.post<any>(`${environment.api}/despesas/cadastrar`, data, { headers: headerOptions });
  }

  public atualizaDespesa(despesa_id: any, data: any) {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'False' });
    return this.http.put<any>(`${environment.api}/despesas/atualizar/${despesa_id}`, data, { headers: headerOptions });
  }


  public deletaDespesa(despesa_id: any, user_id: any) {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'False' });
    return this.http.delete<any>(`${environment.api}/despesas/apagar/${despesa_id}/${user_id}`, { headers: headerOptions });
  }

  public deletaRecebimento(recebimento_id:any,user_id:any) {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'False' });
    return this.http.delete<any>(`${environment.api}/recebimentos/apagar/${recebimento_id}/${user_id}`, { headers: headerOptions });
  }

  public cadastraRecebimento(data:any) {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'False' });
    return this.http.post<any>(`${environment.api}/recebimentos/cadastrar`, data, { headers: headerOptions });
  }
  public atualizaRecebimento(recebimento_id:any, data:any) {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'False' });
    return this.http.put<any>(`${environment.api}/recebimentos/atualizar/${recebimento_id}`, data, { headers: headerOptions });
  }

}
