import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReturnLogin } from '../returns/login.return';



@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }


  constructor(private router: Router, private http: HttpClient) { }


  public signIn(data: any): Observable<ReturnLogin> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post<any>(environment.api + '/user/auth', data, { headers: headerOptions });

  }
  logout(): void {
    this.loggedIn.next(false);
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public getIP(): any {
    return fetch("https://api.ipify.org/?format=json").then(results => results.json())

  }

  public testAuthentication(): any {
    if (localStorage.getItem("userToken") != undefined) {
      let headerOptions = new HttpHeaders({ 'No-Auth': 'False' });
      return this.http.get<any>(environment.api + '/test_authentication', { headers: headerOptions });
    } else {
      return null;
    }

  }


}
