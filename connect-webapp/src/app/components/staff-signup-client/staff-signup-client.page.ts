import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { IonCardContent, IonicModule, ModalController, NavController, Platform, ToastController} from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {UserInformationService} from "../../services/user-information.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {NgForOf, NgIf} from "@angular/common";
import {UserRegistrationModel} from "../../model/user-registration.model";
import {FooterPage} from "../footer/footer.page";
import {HeaderPage} from "../header/header.page";
import {ConfirmAppointmentPage} from "../confirm-appointment/confirm-appointment.page";
import {AppointmentTypeEnum} from "../../model/appointment-type.enum";
import {StaffRegistrationModel} from "../../model/staff-registration.model";
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-signup-client',
  templateUrl: 'staff-signup-client.page.html',
  styleUrls: ['staff-signup-client.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, ReactiveFormsModule, NgIf, FooterPage, HeaderPage, NgForOf]
})
export class StaffSignupClient implements OnInit, OnDestroy {


  staffRegistrationForm: FormGroup;
  activeBreadcrumb: string = 'intro';
  showPassword = false;
  emailValid: boolean = true;
  phoneNumberValid: boolean = true;
  loadingSubscription: Subscription[] = [];

  @ViewChild(IonCardContent , { read: ElementRef }) card: ElementRef<HTMLIonCardElement>;

  private animation1: Animation;
  private animation2: Animation;

  appointmentTypes = Object.values(AppointmentTypeEnum);


  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private platform: Platform,
              private navCtrl: NavController,
              private userInformationService: UserInformationService,
              private toastController: ToastController,
              private animationCtrl: AnimationController) {
  }

  ngAfterViewInit() {
    this.animation1 = this.animationCtrl
      .create()
      .addElement(this.card.nativeElement)
      .duration(300)
      .iterations(1)
      .fromTo('transform', 'translateX(0px)', 'translateX(-70px)')
      .fromTo('opacity', '1', '0')
      .fromTo('transform', 'translateX(70px)', 'translateX(0px)')
      .fromTo('opacity', '0', '1');

    this.animation2 = this.animationCtrl
      .create()
      .addElement(this.card.nativeElement)
      .duration(300)
      .iterations(1)
      .fromTo('transform', 'translateX(0px)', 'translateX(70px)')
      .fromTo('opacity', '1', '0')
      .fromTo('transform', 'translateX(-70px)', 'translateX(0px)')
      .fromTo('opacity', '0', '1');
  }

  ngOnInit(){
    this.staffRegistrationForm = this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      services: ['', [Validators.required]],
    });
  }

  validateEmail() {
    this.emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email?.value);
  }

  validatePhoneNumber() {
    this.phoneNumberValid = /^\d{10}$/.test(this.phoneNumber?.value);
  }

  getName(){
    return this.showPassword ? 'eye-outline' : 'eye-off-outline'
  }

  getType(){
    return this.showPassword ? 'text' : 'password'
  }

  get email() {
    return this.staffRegistrationForm.get('email');
  }

  get password() {
    return this.staffRegistrationForm.get('password');
  }


  get phoneNumber() {
    return this.staffRegistrationForm.get('phoneNumber');
  }

  get bio() {
    return this.staffRegistrationForm.get('bio');
  }

  get firstName() {
    return this.staffRegistrationForm.get('firstName');
  }

  get lastName() {
    return this.staffRegistrationForm.get('lastName');
  }

  get birthdate() {
    return this.staffRegistrationForm.get('birthdate');
  }

  get experience() {
    return this.staffRegistrationForm.get('experience');
  }

  get services() {
    return this.staffRegistrationForm.get('services');
  }

  get confirmPassword() {
    return this.staffRegistrationForm.get('confirmPassword');
  }

  toggleShowPassword(){
    this.showPassword = !this.showPassword;
  }

  passwordMatch(): boolean {
    return this.password?.value == this.confirmPassword?.value;
  }

  goToNext() {
    this.animation1.play();
    if (this.activeBreadcrumb === 'intro') {
      this.activeBreadcrumb = 'contacts';
    } else if (this.activeBreadcrumb === 'contacts') {
      this.activeBreadcrumb = 'id';
    } else if (this.activeBreadcrumb === 'id') {
      this.activeBreadcrumb = 'password';
    }
  }

  goToPrevious() {
    this.animation2.play();
    if (this.activeBreadcrumb === 'contacts') {
      this.activeBreadcrumb = 'intro';
    } else if (this.activeBreadcrumb === 'id') {
      this.activeBreadcrumb = 'contacts';
    } else if (this.activeBreadcrumb === 'password') {
      this.activeBreadcrumb = 'id';
    }
  }

  register(): void {

    const staffRegistrationInformation =  this.staffRegistrationForm.getRawValue() as StaffRegistrationModel;

    this.loadingSubscription.push(this.authService.registerStaff(staffRegistrationInformation).subscribe(
      () =>{
        this.presentToast("top", 'Registration successful!', 'success', "checkmark-outline");

        this.platform.ready().then(() => {
          this.navCtrl.navigateRoot('/login');
        });
      },
      error => {
        this.presentToast("top", error.error, 'danger', 'close-outline');
        // Handle errors if necessary
      }, () => {
        this.presentToast("top", 'Registration successful!', 'success', "checkmark-outline");

        this.platform.ready().then(() => {
          this.navCtrl.navigateRoot('/login-staff');
        });
      }
    ));
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: any, color: any, icon) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      icon: icon,
      color:color

    });

    await toast.present();
  }

  ngOnDestroy(){
    this.loadingSubscription.forEach(s => s.unsubscribe());
  }
}
