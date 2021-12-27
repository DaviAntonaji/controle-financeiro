import { LoginServiceService } from 'src/app/services/login-service.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmdialogComponent, ConfirmDialogModel } from 'src/app/shared/components/confirmdialog/confirmdialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public selected_page = "Home";
  private _mobileQueryListener: () => void;

  public sendMessageToParent(page: string): void {
    this.selected_page = page;
  }
  mobileQuery: MediaQueryList;

  foto = '/assets/img/user.jpeg';
  menus = [
    {
      name: "Início",
      icon: "home",
      link: "home"
    },
    {
      name: "Despesas",
      icon: "attach_money",
      link: "despesas"
    },
    {
      name: "Recebimentos",
      icon: "account_balance_wallet",
      link: "recebimentos"
    },
    {
      name: "Relatórios",
      icon: "trending_up",
      link: "relatorios"
    }
  ]
  collapsedNav?: boolean;

  constructor(private authService: LoginServiceService, private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public dialog: MatDialog) {
    let url = router.routerState.snapshot.url;

    let urlArray = url.split("/");
    let nameRoute = urlArray[2];

   
    this.selected_page = nameRoute;

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);

  }
  user: any;
  user_id: any;

  ngOnInit(): void {

    let admObj: any = localStorage.getItem("UserObject");
    admObj = JSON.parse(admObj);
    this.user_id = admObj["user_id"];
    if(admObj["user_photo"] != null) { this.foto = admObj["user_photo"] }
    

    // this.authService.testAuthentication().subscribe((data: { refreshToken: any; user: any; user_id: any; }) => {

    //   if (data.refreshToken != null) {

    //     this.user = data.user;


    //     this.user_id = data.user_id





    //   }
    // });



  }

  logOut() {

    let title = "Desconectar";
    let message = "Deseja realmente se desconectar ?";


    const dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.authService.logout();

      }

    });
  }
  perfil() {

  }

}
