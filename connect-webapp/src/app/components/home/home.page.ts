import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router} from "@angular/router";
import {HeaderPage} from "../header/header.page";
import {FooterPage} from "../footer/footer.page";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderPage, FooterPage]
})
export class HomePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  routeToBook(){
    this.router.navigate(["/book"]);
  }

  routeToServices() {
    this.router.navigate(["/services"]);
  }

}
