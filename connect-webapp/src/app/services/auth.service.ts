import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {UserModel} from "../model/User.model";
import {LoginModel} from "../model/Login.model";
import {CompanyModel} from "../model/company.model";
import {RegistrationModel} from "../model/Registration.model";

const BASE_URI = 'http://localhost:8080/api/v1/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService{

  constructor(private http: HttpClient) {
  }

  login(loginDetails: LoginModel): Observable<UserModel>{
      return this.http.post<UserModel>(`${BASE_URI}/login`, loginDetails);
  }
  createCompany(companyRegistration: CompanyModel): Observable<any>{
    return this.http.post<any>(`${BASE_URI}/create-company`, companyRegistration);
  }

  registerUser(userRegistration: RegistrationModel): Observable<UserModel>{
    return this.http.post<UserModel>(`${BASE_URI}/register-user`, userRegistration);
  }
}
