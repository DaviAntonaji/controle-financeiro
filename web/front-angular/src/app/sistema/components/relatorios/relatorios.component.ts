import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit {

  constructor() { }

  formBuscaMensal = new FormGroup({
    mes: new FormControl(),
    ano: new FormControl()
  }
  )

  formBuscaAnual = new FormGroup({

    ano: new FormControl()
  }
  )

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

  ngOnInit(): void {
    for (let i = this.anoMaximo; i >= this.anoMinimo; i--) {
      this.anosPossiveis.push(i)
    }
  }
  mes: any;
  ano: any;
  mensal = false;
  anual = false;
  consultaMensal() {
    if (this.formBuscaMensal.valid) {
      this.ano = this.formBuscaMensal.value.ano;
      this.mes = this.formBuscaMensal.value.mes;
      this.mensal = true;
      this.anual = false;
      console.log("MES", this.mes, "ANO", this.ano)
      console.log("IF MES", this.mensal, "ANO", this.anual)
    }
  }
  consultaAnual() {
    if (this.formBuscaAnual.valid) {
      this.mes = null;
      this.ano = this.formBuscaAnual.value.ano;
      this.mensal = false;
      this.anual = true;
    }
  }

}
