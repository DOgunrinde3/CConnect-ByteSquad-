import {Component, Input} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {UserModel} from "../../model/user.model";
import {UserInformationService} from "../../services/user-information.service";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent]
})
export class Tab2Page {

  userInformation: UserModel;

  constructor(private userInformationService: UserInformationService) {
  }


  ngOnInit() {
    this.userInformationService.userInformation$.subscribe(
      value => {

        if (value != null) {
          this.userInformation = value
        }
      },
      error => {
        // Handle errors if necessary
      }
    );

  }
}
