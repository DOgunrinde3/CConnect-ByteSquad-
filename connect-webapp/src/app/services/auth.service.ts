import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";
import {UserModel} from "../model/User.model";
import {LoginModel} from "../model/Login.model";
import { Storage } from '@ionic/storage-angular';
import {UserRegistrationModel} from "../model/user-registration.model";
import {DoctorModel} from "../model/doctor.model";
import {StaffRegistrationModel} from "../model/staff-registration.model";
import {JwtDto} from "../model/jwt-dto";

const BASE_URI = 'http://localhost:8080/api/v1/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService{


  constructor(private http: HttpClient) {

  }


  login(loginDetails: LoginModel): Observable<UserModel>{
      return this.http.post<UserModel>(`${BASE_URI}/login`, loginDetails, httpOptions);
  }



  registerUser(userRegistration: UserRegistrationModel): Observable<UserModel>{
    return this.http.post<UserModel>(`${BASE_URI}/register-user`, userRegistration, httpOptions);
  }

  registerStaff(staffRegistration: StaffRegistrationModel): Observable<DoctorModel>{
    return this.http.post<DoctorModel>(`${BASE_URI}/register-staff`, staffRegistration, httpOptions);
  }

  public refreshToken(jwtDto : JwtDto) : Observable<JwtDto>{
    return this.http.post<JwtDto>(`${BASE_URI}/refresh-token`, jwtDto);
  }

}
