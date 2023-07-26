import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { IonCardContent, IonicModule, NavController, Platform, ToastController } from '@ionic/angular';
import {UserInformationService} from "../../services/user-information.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";
import {UserRegistrationModel} from "../../model/user-registration.model";
import {FooterPage} from "../footer/footer.page";
import {HeaderPage} from "../header/header.page";
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';
import {Subscription} from "rxjs";


@Component({
  selector: 'app-signup-client',
  templateUrl: 'signup-client.page.html',
  styleUrls: ['signup-client.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, NgIf, FooterPage, HeaderPage],
})
export class SignupClient implements OnInit, OnDestroy {

  userRegistrationForm: FormGroup;
  activeBreadcrumb: string = 'intro';
  showPassword = false;
  emailValid: boolean = true;
  phoneNumberValid: boolean = true;
  loadingSubscription: Subscription[] = [];

  @ViewChild(IonCardContent , { read: ElementRef }) card: ElementRef<HTMLIonCardElement>;

  private animation1: Animation;
  private animation2: Animation;

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
    this.userRegistrationForm = this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],

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
    return this.userRegistrationForm.get('email');
  }

  get password() {
    return this.userRegistrationForm.get('password');
  }


  get phoneNumber() {
    return this.userRegistrationForm.get('phoneNumber');
  }

  get bio() {
    return this.userRegistrationForm.get('bio');
  }

  get firstName() {
    return this.userRegistrationForm.get('firstName');
  }

  get lastName() {
    return this.userRegistrationForm.get('lastName');
  }

  get birthdate() {
    return this.userRegistrationForm.get('birthdate');
  }

  get confirmPassword() {
    return this.userRegistrationForm.get('confirmPassword');
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
      this.activeBreadcrumb = 'password';
    }
  }

  goToPrevious() {
    this.animation2.play();
    if (this.activeBreadcrumb === 'contacts') {
      this.activeBreadcrumb = 'intro';
    } else if (this.activeBreadcrumb === 'password') {
      this.activeBreadcrumb = 'contacts';
    }
  }



  register(): void {

    const userRegistrationInformation =  this.userRegistrationForm.getRawValue() as UserRegistrationModel;

    // @ts-ignore

    this.loadingSubscription.push(this.authService.registerUser(userRegistrationInformation).subscribe(
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
