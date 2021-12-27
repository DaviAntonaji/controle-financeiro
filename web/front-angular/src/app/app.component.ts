import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-angular';
  public showOverlay = true;

  constructor(private router: Router) {

    router.events.subscribe((event: any) => {
      this.navigationInterceptor(event)
    })
  }
  
  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showOverlay = true;
      console.log("Iniciando")
    }
    if (event instanceof NavigationEnd) {
      this.showOverlay = false;
      console.log("Terminando")
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.showOverlay = false;
      console.log("Cancelado");
    }
    if (event instanceof NavigationError) {
      this.showOverlay = false;
      console.log("Erro");
    }
  }

}
