import { Login } from './../../shared/login';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {
  formLogin :FormGroup = new FormGroup({});
  
  constructor() { }

  ngOnInit(): void {
    this.createForm(new Login());
  }
  createForm(login: Login) {
    this.formLogin = new FormGroup({
      email: new FormControl(login.email),
      password: new FormControl(login.password),
    })
  }
 onSubmit() {
  let values = this.formLogin.value;
  if( values.email == "" ) {
    Swal.fire('Ooops...', 'Digite seu e-mail!', 'warning')  
  }else if (values.password == "") {
    Swal.fire('Ooops...', 'Digite sua senha!', 'warning')  
  }

}

}
