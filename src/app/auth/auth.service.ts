import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private token: any;
  private loginUrl = "http://localhost:3100/login";
  private accessToken: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private toastr: ToastrService
  ) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(this.loginUrl, credentials).pipe(
      tap((response) => {
        this.token = response.token;
        localStorage.setItem("access_token", response.token);
        this.isClient();
      }),
      // catchError(error => {
      //   if (error.status === 401) {
      //     return throwError('Incorrect email or password');
      //   }
      //   return throwError('An unknown error occurred');
      // })
      catchError((error) => {
        if (error.status === 401) {
          return throwError("Incorrect email or password");
        }

        return throwError("An unknown error occurred");
      })
    );
  }

  isLoggedIn() {
    if (!this.token) {
      const token = localStorage.getItem("access_token");

      if (token && !this.jwtHelper.isTokenExpired(token)) {
        this.token = token;
      }
    }

    return !!this.token;
  }

  isClient() {
    console.log("token", this.jwtHelper.decodeToken());
    if (this.jwtHelper.decodeToken().roleId === 2) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.token = null;
    localStorage.removeItem("token");
  }
}
