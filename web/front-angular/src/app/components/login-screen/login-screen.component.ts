import { LoginServiceService } from './../../services/login-service.service';
import { Login } from './../../shared/login';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  siteKey = "6LefY74dAAAAAFo26SOJ6H1ptwAe3DNkb935rb9o";
  secretCaptcha = "6LefY74dAAAAAOm8MKOybbrIyM3KaDF0rVIYLnCs"

  constructor(private loginService: LoginServiceService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      // recaptcha: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let values = this.loginForm.value;
      let dados = {
        'login': values.email,
        'password': values.password
      }
      this.loginService.signIn(dados).subscribe(response => {
        localStorage.setItem('UserObject', JSON.stringify(response.user));
        localStorage.setItem('userToken', response.token);

        Swal.fire("Sucesso", "Login efetuado com sucesso!").then(a => {
          this.router.navigate(["/sistema/home"]);
        });

        this.router.navigate(['/home']);
      }, err => Swal.fire("Ooops...", "Email e/ou senha incorretos", 'error'));
    }

  }

  public checkError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }


}
