import { AddRecebimentoComponent } from './add-recebimento/add-recebimento.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { FinanceiroService } from '../../services/financeiro.service';
import { ConfirmdialogComponent, ConfirmDialogModel } from 'src/app/shared/components/confirmdialog/confirmdialog.component';
import { Recebimento } from '../../returns/recebimentos.return';

@Component({
  selector: 'app-recebimentos',
  templateUrl: './recebimentos.component.html',
  styleUrls: ['./recebimentos.component.css']
})
export class RecebimentosComponent implements OnInit {

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
    const dialogRef = this.dialog.open(AddRecebimentoComponent, {
      width: '560px',
      disableClose: false,
      maxHeight: '90vh',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.consultaRecebimentos();
    });

  }

  delete(data: any) {


    let title = "Tem certeza?";
    let message = "Deseja realmente apagar esse recebimento?";


    const dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.financeiroService.deletaRecebimento(data.recebimento_id, this.user_id).subscribe(response => this.consultaRecebimentos());

        

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
  recebimentos: any = [];
  paginator: any;

  cadastrar() {
    const dialogRef = this.dialog.open(AddRecebimentoComponent, {
      width: '560px',
      disableClose: false,
      maxHeight: '90vh',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (this.formBusca.value.ano == null || this.formBusca.value.mes == null) {
        this.showOverlay = true;
        this.recebimentos = [];
        this.dataSource = null;
      }else {
        this.consultaRecebimentos();
      }
    });


  }

  displayedColumns = ['descricao', 'valor', "data", "acoes"];

  consultaRecebimentos() {
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
      this.financeiroService.getRecebimentos(this.user_id, mes, ano).subscribe(response => {
        console.log("DADOS", response)
        this.recebimentos = response.recebimentos;
        console.log("length", this.recebimentos.length)
        this.dataSource = new MatTableDataSource<Recebimento>(response.recebimentos);
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
