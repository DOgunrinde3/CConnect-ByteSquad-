import {Component, EnvironmentInjector, inject, OnInit} from '@angular/core';
import {IonicModule, ModalController} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";
import {FooterPage} from "./components/footer/footer.page";
import {UserInformationService} from "./services/user-information.service";
import {ConfirmAppointmentPage} from "./components/confirm-appointment/confirm-appointment.page";
import {NotificationsPage} from "./components/notifications/notifications.page";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FooterPage],
})
export class AppComponent implements OnInit {
  public environmentInjector = inject(EnvironmentInjector);
  isAuthenticated = false;


  constructor(private router: Router,
              private authService: AuthService,
  private userInfoService: UserInformationService,
              private modalController: ModalController){}

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated){
        this.userInfoService.getUserInformation();
      }
    });

  }

  logout(){
    this.authService.logout().subscribe(() => {
      this.router.navigate(["/login"]);

    });



  }

  routeToBook(){
    this.router.navigate(["/book"]);
  }

  routeToManage(){
    this.router.navigate(["/manage-appointments"]);
  }

  routeToBio(){
    this.router.navigate(["/bio"]);
  }

routeToHome(){
    this.router.navigate(["/home"]);
  }

  routeToSignup(){
    this.router.navigate(["/signup-client"]);

  }


  routeToLogin(){
    this.router.navigate(["/login"]);
  }

  async openModal() {


    const modal = await this.modalController.create({
      component: NotificationsPage,
      mode: "ios"
    });
    modal.present();



  }

  routeToServices(){
      this.router.navigate(["/services-page"]);
    }

}
