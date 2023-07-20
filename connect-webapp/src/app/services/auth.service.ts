import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {UserModel} from "../model/User.model";
import {LoginModel} from "../model/Login.model";
import {UserRegistrationModel} from "../model/user-registration.model";
import {DoctorModel} from "../model/doctor.model";
import {StaffRegistrationModel} from "../model/staff-registration.model";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import jwt_decode from 'jwt-decode';


const BASE_URI = '/api/v1/auth';


const token = localStorage.getItem('token');
const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private authStateChanged = new BehaviorSubject<boolean>(this.isLoggedIn());
  private staffRole = 'ROLE_STAFF';


  constructor(private http: HttpClient, private router: Router, private toastController: ToastController) {

  }

  getToken(): string | null {
    // Retrieve the token from localStorage or any other storage mechanism
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    // Check if a token exists
    const token = this.getToken();
    return !!token; // Returns true if token exists, false otherwise
  }

  isStaff(): boolean {
    const token = localStorage.getItem('token');
    // @ts-ignore
    const decodedToken: any = jwt_decode(token);
    return decodedToken.role === this.staffRole;
  }

  getAuthState(): BehaviorSubject<boolean> {
    return this.authStateChanged;
  }

  login(loginDetails: LoginModel, isStaff: boolean) {

    this.getApiEndpoint(loginDetails, isStaff).subscribe(
      (response) => {
        const token = response.token;
        localStorage.setItem('token', token);
        this.authStateChanged.next(true);


      },
      (error) => {
        this.presentToast("top", 'Invalid Email or Password', 'danger', 'close-outline');
        // Handle errors if necessary
      }, () => {
        this.router.navigate(["/home"]);
        this.presentToast("top", 'Login successful!', 'success', "checkmark-outline");

      });

  }

  loginStaff(loginDetails: LoginModel): Observable<DoctorModel> {
    console.log(`${BASE_URI}/login-staff`);
    return this.http.post<DoctorModel>(`${BASE_URI}/login-staff`, loginDetails);
  }

  update(userDetails: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${BASE_URI}/user/${userDetails.userId}`, userDetails, {headers});
  }

  logout() {
    localStorage.removeItem('token');
    this.authStateChanged.next(false); // Notify subscribers about the authentication state change
    this.router.navigate(["/login"]);
  }

  registerUser(userRegistration: UserRegistrationModel): Observable<any> {
    return this.http.post<any>(`${BASE_URI}/register-user`, userRegistration);
  }

  registerStaff(staffRegistration: StaffRegistrationModel): Observable<DoctorModel> {
    return this.http.post<DoctorModel>(`${BASE_URI}/register-staff`, staffRegistration);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: any, color: any, icon) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      icon: icon,
      color: color

    });

    await toast.present();
  }

  private loginUser(loginDetails: LoginModel): Observable<any> {
    return this.http.post<any>(`${BASE_URI}/login`, loginDetails);
  }

  private getApiEndpoint(loginDetails: LoginModel, isStaff: boolean) {
    return isStaff === true ? this.loginStaff(loginDetails) : this.loginUser(loginDetails)
  }

}
