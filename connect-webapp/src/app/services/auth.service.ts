import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {UserModel} from "../model/User.model";
import {LoginModel} from "../model/Login.model";
import { Storage } from '@ionic/storage-angular';
import {UserRegistrationModel} from "../model/user-registration.model";
import {DoctorModel} from "../model/doctor.model";
import {StaffRegistrationModel} from "../model/staff-registration.model";
import {Router} from "@angular/router";

const BASE_URI = 'http://localhost:8080/api/v1/auth';


const token = localStorage.getItem('token');
const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);


@Injectable({
  providedIn: 'root'
})

export class AuthService{


  constructor(private http: HttpClient, private router: Router) {

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


  login(loginDetails: LoginModel): Observable<any>{
      return this.http.post<any>(`${BASE_URI}/login`, loginDetails);
  }

  loginStaff(loginDetails: LoginModel): Observable<DoctorModel>{
    return this.http.post<DoctorModel>(`${BASE_URI}/login-staff`, loginDetails);
  }

  update(userDetails: UserModel): Observable<UserModel>{
    return this.http.put<UserModel>(`${BASE_URI}/user/${userDetails.userId}`, userDetails, { headers });
  }
logout(){
  localStorage.removeItem('token');
  this.router.navigate(["/login"]);
}


  registerUser(userRegistration: UserRegistrationModel): Observable<any>{
    return this.http.post<any>(`${BASE_URI}/register-user`, userRegistration);
  }

  registerStaff(staffRegistration: StaffRegistrationModel): Observable<DoctorModel>{
    return this.http.post<DoctorModel>(`${BASE_URI}/register-staff`, staffRegistration);
  }
}
