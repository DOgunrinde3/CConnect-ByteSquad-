import {Component, EnvironmentInjector, inject, OnInit} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";
import {FooterPage} from "./components/footer/footer.page";

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
              private authService: AuthService){}

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
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

  routeToBio(){
    this.router.navigate(["/bio"]);
  }




}
