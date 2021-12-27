import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartType, Column } from 'angular-google-charts';
import { FinanceiroService } from 'src/app/sistema/services/financeiro.service';

@Component({
  selector: 'app-relatorios-anual',
  templateUrl: './relatorios-anual.component.html',
  styleUrls: ['./relatorios-anual.component.css']
})
export class RelatoriosAnualComponent implements OnInit {



  @Input() ano: any;




  height: any = 100;
  width: any = 100;
  optionsLine = {

    legend: {
      position: 'bottom'
    },
    height: this.height,
    width: this.width,
  };

  options = {
    legend: 'none',
    height: this.height,
    width: this.width,
  };

  resetWindowSize(event: any) {
    this.width = event.target.innerWidth;
    this.height = event.target.innerHeight;
    this.optionsLine = {

      legend: {
        position: 'bottom'
      },
      height: this.height * 0.55,
      width: this.width * 0.65
    }
    this.options = {
      legend: 'none',
      height: this.height * 0.55,
      width: this.width * 0.65,
    };

  }
  type: ChartType = ChartType.PieChart;
  typeLine: ChartType = ChartType.ColumnChart;

  data: any = [];
  dataLine: any = [];
  columnNames = ['Categoria', 'Quantidade'];

  constructor(public financeiroService: FinanceiroService, public dialog: MatDialog) {


  }


  lucros: any[] = []
  recebimentos: any[] = []
  despesas: any[] = []
  monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

 

  onSelect(event: any) {

    console.log(event);

  }

  columnNamesLine:Column[] = ['Mês', 'Recebimentos', "Despesas", "Lucro"];
  getRelatorio() {
    this.financeiroService.relatorioAnual(this.user_id, this.ano).subscribe(response => {


      this.recebimentos = response.recebimentos
      this.lucros = response.lucros
      this.despesas = response.despesas

      this.totalRecebido = "R$ " + response.recebimentos.reduce((a, b) => a + b, 0).toFixed(2)
      this.totalDespesas = "R$ " + response.despesas.reduce((a, b) => a + b, 0).toFixed(2)
      this.lucro = "R$ " + response.lucros.reduce((a, b) => a + b, 0).toFixed(2)

      this.dataLine = [];

      for (let i = 0; i < this.recebimentos.length; i++) {
        this.dataLine.push([this.monthNames[i].substring(0,3),parseFloat(this.recebimentos[i]), parseFloat(this.despesas[i]),  parseFloat(this.lucros[i])])
      }
      console.log("dataLine", this.dataLine);

      this.categoria_despesas = response.categoria_despesas;
      this.data = []
      for (let i = 0; i < response.categoria_despesas.qtde.length; i++) {
        let nome = response.categoria_despesas.nomes[i]
        let qtde = response.categoria_despesas.qtde[i]
        this.data.push([nome, qtde])
      }


    }
    )

  }


  ngOnChanges(changes: SimpleChanges) {



    this.getRelatorio();


  }

  user_id: string = "";


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

    this.optionsLine = {

      legend: {
        position: 'bottom'
      },
      height: this.height * 0.55,
      width: this.width * 0.65
    }
    let admObj: any = localStorage.getItem("UserObject");
    admObj = JSON.parse(admObj);
    this.user_id = admObj["user_id"];


    console.log("USER_ID", this.user_id)
    this.getRelatorio();


  }
}
