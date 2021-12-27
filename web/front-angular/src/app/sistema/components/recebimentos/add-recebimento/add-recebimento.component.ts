import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FinanceiroService } from 'src/app/sistema/services/financeiro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-recebimento',
  templateUrl: './add-recebimento.component.html',
  styleUrls: ['./add-recebimento.component.css']
})
export class AddRecebimentoComponent implements OnInit {


  formAdd: FormGroup = new FormGroup({});
  dialogTitle: string = ""
  dialogButton: string = ""
  recebimento_id: any;
  recebimento_data: any = ""


  constructor(public financeiroService: FinanceiroService, public dialogRef: MatDialogRef<AddRecebimentoComponent>, @Inject(MAT_DIALOG_DATA) public data: AddRecebimentoComponentModel) {

    let admObj: any = localStorage.getItem("UserObject");
    admObj = JSON.parse(admObj);
    this.user_id = admObj["user_id"];

    if (this.data != null) {
      this.recebimento_id = this.data.recebimento_id

      this.descricao = this.data.recebimento_descricao
      this.valor = this.data.recebimento_valor
      this.recebimento_data = this.data.recebimento_data;
      this.dialogTitle = "Atualizar recebimento"
      this.dialogButton = "Atualizar"
    } else {
      this.dialogTitle = "Cadastrar recebimento"
      this.dialogButton = "Cadastrar"
    }
    console.log("RECEBIMENTO_DATA", this.recebimento_data);
    this.formAdd = new FormGroup({

      descricao: new FormControl(this.descricao, Validators.required),
      data: new FormControl(this.recebimento_data, Validators.required),
      valor: new FormControl(this.valor, Validators.required),

    });

  }
  public checkError = (controlName: string, errorName: string) => {
    return this.formAdd.controls[controlName].hasError(errorName);
  }


  user_id: any;
  descricao: any

  valor: any

  ngOnInit(): void {


  }
  onDismiss() {
    this.dialogRef.close(false);
  }
  onSubmit() {

    if (this.formAdd.valid) {

      if (this.dialogButton == "Cadastrar") {

        let data = {

          data: this.formAdd.value.data,
          descricao: this.formAdd.value.descricao,
          user_id: this.user_id,
          valor: this.formAdd.value.valor
        }
        console.log(data)
        this.financeiroService.cadastraRecebimento(data).subscribe(response => {
          Swal.fire("Sucesso!", "Recebimento cadastrada com sucesso!", "success").then(() => {
            this.dialogRef.close(true)
          })

        }, err => {
          console.log("ERRO", err)
          Swal.fire("Ooops...", "Erro ao cadastrar recebimento", "error")
        });
      } else {
        let data = {

          data: this.formAdd.value.data,
          descricao: this.formAdd.value.descricao,
          user_id: this.user_id,
          valor: this.formAdd.value.valor
        }
        console.log(data)
        this.financeiroService.atualizaRecebimento(this.recebimento_id, data).subscribe(response => {
          Swal.fire("Sucesso!", "Recebimento atualizada com sucesso!", "success").then(() => {
            this.dialogRef.close(true)
          })

        }, err => {
          Swal.fire("Ooops...", "Erro ao atualizada recebimento", "error")
        });
      }
    }
  }

}

export class AddRecebimentoComponentModel {

  constructor(public recebimento_id: any, public recebimento_descricao: string, public recebimento_valor: number, public recebimento_data: string) {}
}