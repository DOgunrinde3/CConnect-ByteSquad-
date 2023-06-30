import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";
import {UserModel} from "../model/User.model";
import {LoginModel} from "../model/Login.model";
import { Storage } from '@ionic/storage-angular';
import {RegistrationModel} from "../model/Registration.model";

const BASE_URI = 'http://localhost:8080/api/v1/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService{

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  get isAuthenticated$() {
    return this.isAuthenticatedSubject.asObservable();
  }

  constructor(private http: HttpClient) {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

   setAuthenticationState(isAuthenticated: boolean) {
    this.isAuthenticatedSubject.next(isAuthenticated);
    this.updateLocalStorage(isAuthenticated);
  }

  private updateLocalStorage(isAuthenticated: boolean) {
    if (isAuthenticated) {
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      localStorage.removeItem('isAuthenticated');
    }
  }
  login(loginDetails: LoginModel): Observable<UserModel>{
      return this.http.post<UserModel>(`${BASE_URI}/login`, loginDetails);
  }

  logout(): Observable<void> {
    // Your logout logic here

    // Update authentication state
    this.setAuthenticationState(false);


    return of();
  }


  registerUser(userRegistration: RegistrationModel): Observable<UserModel>{
    console.log(userRegistration)
    return this.http.post<UserModel>(`${BASE_URI}/register-user`, userRegistration);
  }
}
