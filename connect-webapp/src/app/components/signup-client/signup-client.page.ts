import {Component, Input} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {UserInformationModel} from "../../model/user-information.model";
import {UserInformationService} from "../../services/user-information.service";
import {CompanyModel} from "../../model/company.model";

@Component({
  selector: 'app-signup-client',
  templateUrl: 'signup-client.page.html',
  styleUrls: ['signup-client.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent]
})
export class SignupClient {

  userInformation: UserInformationModel;
  companyInformation: CompanyModel;

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
