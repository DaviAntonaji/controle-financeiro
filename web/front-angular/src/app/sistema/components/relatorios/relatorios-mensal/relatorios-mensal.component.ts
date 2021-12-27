import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartType } from 'angular-google-charts';
import { FinanceiroService } from 'src/app/sistema/services/financeiro.service';

@Component({
  selector: 'app-relatorios-mensal',
  templateUrl: './relatorios-mensal.component.html',
  styleUrls: ['./relatorios-mensal.component.css']
})
export class RelatoriosMensalComponent implements OnInit {



  @Input() mes: any;
  @Input() ano: any;


  monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  mesNome: any

  height: any = 100;
  width: any = 100;


  options = {
    legend: 'none',
    height: this.height,
    width: this.width,
  };

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


  }


  getRelatorio() {
    this.financeiroService.relatorioMensal(this.user_id, this.mes, this.ano).subscribe(response => {
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


  ngOnChanges(changes: SimpleChanges) {


    this.mesNome = this.monthNames[parseInt(this.mes) - 1]
    this.getRelatorio();


  }

  user_id: string = "";

  mesNumero: string = "";
  nomeCurto?: string;

  iframeColum = 1
  news_certifieds = []
  numberColum = 1
  breakpoint = 1
  breakpoint2 = 1
  rowheight = ""
  totalDespesas = "R$ 0.00"
  totalRecebido = "R$ 0.00";
  lucro = "R$ 0.00";
  categoria_despesas = {};



  ngOnInit(): void {


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



    this.mesNome = this.monthNames[parseInt(this.mes) - 1]
    this.getRelatorio();


  }

}
