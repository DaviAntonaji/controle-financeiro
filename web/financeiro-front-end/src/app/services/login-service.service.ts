import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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

  constructor(private router: Router, private http: HttpClient, private sanitizer: DomSanitizer) { }


  public signIn(data:any): Observable<ReturnLogin> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'True' });    
    return this.http.post<any>(environment.api + '/user/auth', data, {headers: headerOptions });

  }
  logout(): void {
    this.loggedIn.next(false);
    localStorage.clear();
    this.router.navigate(['/login']);
  } 
 



}
