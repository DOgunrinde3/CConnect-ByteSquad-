import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {UserModel} from "../model/user.model";
import {UserLoginModel} from "../model/user-login.model";

const BASE_URI = './api/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService{

  constructor(private http: HttpClient) {
  }

  login(loginDetails: UserLoginModel): Observable<UserModel>{
      return this.http.post<UserModel>(`${BASE_URI}/login`, loginDetails);
  }
}
