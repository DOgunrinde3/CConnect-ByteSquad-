import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";
import {UserModel} from "../model/User.model";
import {LoginModel} from "../model/Login.model";
import { Storage } from '@ionic/storage-angular';
import {UserRegistrationModel} from "../model/user-registration.model";
import {DoctorModel} from "../model/doctor.model";
import {StaffRegistrationModel} from "../model/staff-registration.model";

const BASE_URI = 'http://localhost:8080/api/v1/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService{

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private

  get isAuthenticated$() {
    return this.isAuthenticatedSubject.asObservable();
  }

  constructor(private http: HttpClient) {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    this.isAuthenticatedSubject.next(isAuthenticated);

    if (isAuthenticated){
    }
  }

   setAuthenticationState(isAuthenticated: boolean, userId: string) {
    this.isAuthenticatedSubject.next(isAuthenticated);
    this.updateLocalStorage(isAuthenticated, userId);
  }

  private updateLocalStorage(isAuthenticated: boolean, userId: string) {
    if (isAuthenticated) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userId', userId);
    } else {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userId');
    }
  }
  login(loginDetails: LoginModel): Observable<UserModel>{
      return this.http.post<UserModel>(`${BASE_URI}/login`, loginDetails, httpOptions);
  }

  loginStaff(loginDetails: LoginModel): Observable<DoctorModel>{
    return this.http.post<DoctorModel>(`${BASE_URI}/login-staff`, loginDetails);
  }

  update(userDetails: UserModel): Observable<UserModel>{
    return this.http.put<UserModel>(`${BASE_URI}/user/${userDetails.userId}`, userDetails);
  }

  logout(): Observable<void> {
    // Your logout logic here

    // Update authentication state
    this.setAuthenticationState(false, '');


    return of();
  }


  registerUser(userRegistration: UserRegistrationModel): Observable<UserModel>{
    return this.http.post<UserModel>(`${BASE_URI}/register-user`, userRegistration);
  }

  registerStaff(staffRegistration: StaffRegistrationModel): Observable<DoctorModel>{
    return this.http.post<DoctorModel>(`${BASE_URI}/register-staff`, staffRegistration);
  }
}
