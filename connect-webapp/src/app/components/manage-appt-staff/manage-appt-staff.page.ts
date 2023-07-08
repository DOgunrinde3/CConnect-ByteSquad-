import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-manage-appt-staff',
  templateUrl: './manage-appt-staff.page.html',
  styleUrls: ['./manage-appt-staff.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ManageApptStaffPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
