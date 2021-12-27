import { FinanceiroService } from './../../../services/financeiro.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from 'src/app/sistema/returns/despesa.categoria.return';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-despesa',
  templateUrl: './add-despesa.component.html',
  styleUrls: ['./add-despesa.component.css']
})
export class AddDespesaComponent implements OnInit {

  categorias: Categoria[] = []
  formAdd: FormGroup = new FormGroup({});
  dialogTitle: string = ""
  dialogButton: string = ""
  despesa_id: any;
  despesa_data: any = ""
  filteredCategoria: Categoria[] = []

  constructor(public financeiroService: FinanceiroService, public dialogRef: MatDialogRef<AddDespesaComponent>, @Inject(MAT_DIALOG_DATA) public data: AddDespesaComponentModel) {

    let admObj: any = localStorage.getItem("UserObject");
    admObj = JSON.parse(admObj);
    this.user_id = admObj["user_id"];

    if (this.data != null) {
      this.despesa_id = this.data.despesa_id
      this.categoria = this.data.despesa_categoria_id
      this.descricao = this.data.despesa_descricao
      this.valor = this.data.despesa_valor
      this.despesa_data = this.data.despesa_data;
      this.dialogTitle = "Atualizar despesa"
      this.dialogButton = "Atualizar"
    } else {
      this.dialogTitle = "Cadastrar despesa"
      this.dialogButton = "Cadastrar"
    }
    this.formAdd = new FormGroup({

      descricao: new FormControl(this.descricao, Validators.required),
      data: new FormControl(this.despesa_data, Validators.required),
      valor: new FormControl(this.valor, Validators.required),
      categoria: new FormControl(this.categoria, Validators.required),

    });

  }
  public checkError = (controlName: string, errorName: string) => {
    return this.formAdd.controls[controlName].hasError(errorName);
  }

  categoria: any
  user_id: any;
  descricao: any

  valor: any

  ngOnInit(): void {


    this.financeiroService.categoriasDespesas().subscribe(response => {
      this.categorias = response.categorias;
      this.filteredCategoria = this.categorias.slice();;
    })
  }
  onDismiss() {
    this.dialogRef.close(false);
  }
  onSubmit() {

    if (this.formAdd.valid) {

      if (this.dialogButton == "Cadastrar") {

        let data = {
          categoria: this.formAdd.value.categoria,
          data: this.formAdd.value.data,
          descricao: this.formAdd.value.descricao,
          user_id: this.user_id,
          valor: this.formAdd.value.valor
        }
        console.log(data)
        this.financeiroService.cadastraDespesa(data).subscribe(response => {
          Swal.fire("Sucesso!", "Despesa cadastrada com sucesso!", "success").then(() => {
            this.dialogRef.close(true)
          })

        }, err => {
          Swal.fire("Ooops...", "Erro ao cadastrar despesa", "error")
        });
      } else {
        let data = {
          categoria: this.formAdd.value.categoria,
          data: this.formAdd.value.data,
          descricao: this.formAdd.value.descricao,
          user_id: this.user_id,
          valor: this.formAdd.value.valor
        }
        console.log(data)
        this.financeiroService.atualizaDespesa(this.despesa_id, data).subscribe(response => {
          Swal.fire("Sucesso!", "Despesa atualizada com sucesso!", "success").then(() => {
            this.dialogRef.close(true)
          })

        }, err => {
          Swal.fire("Ooops...", "Erro ao atualizada despesa", "error")
        });
      }
    }
  }
}

export class AddDespesaComponentModel {

  constructor(public despesa_id: any, public despesa_descricao: string, public despesa_valor: number, public despesa_categoria_id: string, public despesa_data: string) {
  }
}