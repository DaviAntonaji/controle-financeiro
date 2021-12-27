import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmdialogComponent, ConfirmDialogModel } from 'src/app/shared/components/confirmdialog/confirmdialog.component';
import Swal from 'sweetalert2';
import { Despesa } from '../../returns/despesas.return';
import { FinanceiroService } from '../../services/financeiro.service';
import { AddDespesaComponent } from './add-despesa/add-despesa.component';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.css']
})
export class DespesasComponent implements OnInit {
  formBusca = new FormGroup({
    mes: new FormControl(),
    ano: new FormControl()
  }
  )
  showOverlay = true;
  inPesquisa = false;

  constructor(public financeiroService: FinanceiroService, public dialog: MatDialog) {
    let admObj: any = localStorage.getItem("UserObject");
    admObj = JSON.parse(admObj);
    this.user_id = admObj["user_id"];


  }
  meses = [
    {
      numero: "01",
      nome: "Janeiro"
    },
    {
      numero: "02",
      nome: "Fevereiro"
    },
    {
      numero: "03",
      nome: "Março"
    },
    {
      numero: "04",
      nome: "Abril"
    },
    {
      numero: "05",
      nome: "Maio"
    },
    {
      numero: "06",
      nome: "Junho"
    },
    {
      numero: "07",
      nome: "Julho"
    },
    {
      numero: "08",
      nome: "Agosto"
    },
    {
      numero: "09",
      nome: "Setembro"
    },
    {
      numero: "10",
      nome: "Outubro"
    },
    {
      numero: "11",
      nome: "Novembro"
    },
    {
      numero: "12",
      nome: "Dezembro"
    },
  ]
  user_id: any;
  mesAtual = this.meses[new Date().getMonth()].numero;
  anoMinimo = 2020;
  anoMaximo = new Date().getFullYear() + 1;
  anoAtual = new Date().getFullYear();
  anosPossiveis: any = []



  edit(data: any) {
    const dialogRef = this.dialog.open(AddDespesaComponent, {
      width: '560px',
      disableClose: false,
      maxHeight: '90vh',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.consultaDespesa();
    });

  }

  delete(data: any) {


    let title = "Tem certeza?";
    let message = "Deseja realmente apagar essa despesa?";


    const dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.financeiroService.deletaDespesa(data.despesa_id, this.user_id).subscribe(response => this.consultaDespesa());

        

      }

    });

  }


  range(size: any, startAt: any = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
  }
  ngOnInit(): void {
    for (let i = this.anoMaximo; i >= this.anoMinimo; i--) {
      this.anosPossiveis.push(i)
    }

  }
  despesas: any = [];
  paginator: any;

  cadastrar() {
    const dialogRef = this.dialog.open(AddDespesaComponent, {
      width: '560px',
      disableClose: false,
      maxHeight: '90vh',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (this.formBusca.value.ano == null || this.formBusca.value.mes == null) {
        this.showOverlay = true;
        this.despesas = [];
        this.dataSource = null;
      }else {
        this.consultaDespesa();
      }
    });


  }

  displayedColumns = ['descricao', 'valor', 'categoria', "data", "acoes"];

  consultaDespesa() {
    var ano = this.formBusca.value.ano;
    var mes = this.formBusca.value.mes;
    console.log("ANO", ano, "MES", mes)
    if (mes == null) {
      Swal.fire("Ooops.", "Selecione o mês", "error")
    } else if (ano == null) {
      Swal.fire("Ooops.", "Selecione o ano", "error")
    } else {


      this.showOverlay = true;
      this.inPesquisa = true;
      this.financeiroService.getDespesas(this.user_id, mes, ano).subscribe(response => {
        console.log("DADOS", response)
        this.despesas = response.despesas;
        console.log("length", this.despesas.length)
        this.dataSource = new MatTableDataSource<Despesa>(response.despesas);
        this.dataSource.paginator = this.paginator;
        this.showOverlay = false;
        this.inPesquisa = false;
      })
    }


  }
  public checkError = (controlName: string, errorName: string) => {
    return this.formBusca.controls[controlName].hasError(errorName);
  }
  dataSource: any;

  applyFilter(filterValue: any) {

    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
