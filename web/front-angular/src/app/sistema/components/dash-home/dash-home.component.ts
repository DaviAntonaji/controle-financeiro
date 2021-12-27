import { AddDespesaComponent } from './../despesas/add-despesa/add-despesa.component';
import { AddRecebimentoComponent } from './../recebimentos/add-recebimento/add-recebimento.component';
import { FinanceiroService } from './../../services/financeiro.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartType, Row } from 'angular-google-charts';
import { speedDialFabAnimations } from './speed-dial-fab.animations';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dash-home',
  templateUrl: './dash-home.component.html',
  styleUrls: ['./dash-home.component.css'],
  animations: speedDialFabAnimations
})
export class DashHomeComponent implements OnInit {

  height: any = 100;
  width: any = 100;

  options = {
    legend: 'none',
    height: this.height,
    width: this.width,
  };

acao(action:string){ 

  this.hideItems()
  if(action == "recebimento") {
    const dialogRef = this.dialog.open(AddRecebimentoComponent, {
      width: '560px',
      disableClose: false,
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getRelatorio();
    });
  }else if(action == "despesa") {
    const dialogRef = this.dialog.open(AddDespesaComponent, {
      width: '560px',
      disableClose: false,
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getRelatorio();
    });
  }

}

  Boptions = {
    buttons: [
      {
        icon: 'attach_money',
        action: "recebimento"
      },
      {
        icon: 'money_off',
        action: "despesa"
      }
    ]
  };

  buttons: { icon: string, action:string }[] = [{
    icon: 'attach_money',
    action: "recebimento"
  },
  {
    icon: 'money_off',
    action: "despesa"
  }];
  fabTogglerState = 'inactive';


  resetWindowSize(event: any) {
    this.width = event.target.innerWidth;
    this.height = event.target.innerHeight;
    this.options = {
      legend: 'none',
      height: this.height * 0.55,
      width: this.width * 0.65,
    };

  }
  type: ChartType = ChartType.PieChart;

  data: any = [];
  columnNames = ['Categoria', 'Quantidade'];

  constructor(public financeiroService: FinanceiroService, public dialog: MatDialog) {



    this.numberColum = (window.innerWidth <= 1000) ? 1 : 3;
    this.iframeColum = (window.innerWidth <= 1000) ? 1 : 2;
    this.breakpoint = (window.innerWidth <= 1000) ? 1 : 3;

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.options = {
      legend: 'none',
      height: this.height * 0.55,
      width: this.width * 0.65,
    };


    let admObj: any = localStorage.getItem("UserObject");
    admObj = JSON.parse(admObj);
    this.user_id = admObj["user_id"];
    this.nome = admObj['user_name']
    let teste = this.nome.split(" ")
    this.nomeCurto = teste[0]


    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const d = new Date();
    this.mes = monthNames[d.getMonth()]
    if (d.getMonth() + 1 > 9) {
      this.mesNumero = (d.getMonth() + 1).toString();
    } else {
      this.mesNumero = "0" + (d.getMonth() + 1).toString();
    }

    this.ano = d.getFullYear().toString();


  }
  user_id: string = "";
  nome: string = "";
  mesNumero: string = "";
  nomeCurto?: string;

  iframeColum = 1
  news_certifieds = []
  numberColum = 1
  breakpoint = 1
  breakpoint2 = 1
  rowheight = ""
  mes = ""
  ano = ""
  totalDespesas = "R$ 0.00"
  totalRecebido = "R$ 0.00";
  lucro = "R$ 0.00";
  categoria_despesas = {};


  ngOnInit(): void {

    const maxButtons = 6;
    if (this.Boptions.buttons.length > maxButtons) {
      this.Boptions.buttons.splice(5, this.Boptions.buttons.length - maxButtons);
    }
    this.hideItems()

    this.getRelatorio();




  }
  getRelatorio() {
    this.financeiroService.relatorioMensal(this.user_id, this.mesNumero, this.ano).subscribe(response => {
      this.totalRecebido = "R$ " + response.recebimento.toFixed(2)
      this.totalDespesas = "R$ " + response.despesa.toFixed(2)
      this.lucro = "R$ " + response.lucro.toFixed(2)

      this.categoria_despesas = response.categoria_despesas;
      this.data = []
      for (let i = 0; i < response.categoria_despesas.qtde.length; i++) {
        let nome = response.categoria_despesas.nomes[i]
        let qtde = response.categoria_despesas.qtde[i]
        this.data.push([nome, qtde])
      }
      console.log("DATA", this.data);

    }
    )

  }
  onResize(event: any) {
    this.numberColum = (event.target.innerWidth <= 1000) ? 1 : 3;
    this.iframeColum = (event.target.innerWidth <= 1000) ? 1 : 2;
    this.breakpoint2 = (event.target.innerWidth <= 1000) ? 1 : 2;
    this.breakpoint = (window.innerWidth <= 1000) ? 1 : 3;
    this.rowheight = (event.target.innerWidth <= 1000) ? "" : "3:0.7"

  }

  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.Boptions.buttons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }



}
