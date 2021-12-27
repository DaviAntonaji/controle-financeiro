import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private router : Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;  


        return this.verifyLogin(url);
    }

    verifyLogin(url:string) : boolean{

        // let split = url.split("/");

        // console.log("split auth", localStorage.getItem("condoLogged"))



        
        if(!this.isLoggedIn()){
            this.router.navigate(['/login']);
            return false;
        }
        else{
            return true;
        }

    }
    
    public isLoggedIn(): boolean{
        let status = false;

        if( localStorage.getItem('userToken') != null &&  localStorage.getItem('userToken') != undefined &&  localStorage.getItem('userToken') != 'undefined'){

          status = true;

          console.log("tem token");
        }
        else{

          status = false;
        }
        return status;
    }
}