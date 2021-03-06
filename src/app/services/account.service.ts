import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, first, map, tap } from 'rxjs/operators';

import jwt_decode from 'jwt-decode';

import { environment } from '../environments/environment';
import { User } from '../model/user';
import { last } from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUri: string = 'http://130.61.255.170:5000';
  //  headers = new HttpHeaders().set('Content-Type', 'application/json');
  // headers: new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Credentials': 'true',
  //   'Access-Control-Allow-Headers': 'Content-Type',
  //   'Access-Control-Allow-Methods': 'POST'});

  /*     httpOptions = {
           headers: new HttpHeaders({
             'Content-Type': 'application/json',
             
             'postman-token': 'a7ca00a5-812d-1dbb-ea29-75bf61865a19',
             'cache-control': 'no-cache'         
           })
         }; */

  private loggedInUserSubject: BehaviorSubject<User>;
  public loggedInUser: Observable<User>;
  currentUser: string;
  constructor(private router: Router,
    private http: HttpClient) {
  }



  // getToken() {
  //   return localStorage.getItem("LoggedInUsertoken")
  // }

  // isLoggednIn() {
  //   return this.getToken() !== null;
  // }


  // sendToken(token: string) {
  //   localStorage.setItem("LoggedInUsertoken", token)
  // }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

  login(userData: any): Observable<any> {
    let urlLogin = this.baseUri + '/login';

    return this.http.post<any>(urlLogin, userData).pipe(map(user => {
      console.log(JSON.stringify(user));
      let tokenInfo = this.getDecodedAccessToken(JSON.stringify(user.token)); // decode token
      let firstname = tokenInfo.user.firstname;
      let lastname = tokenInfo.user.lastname;
      let fullname = firstname + "  " + lastname;
      localStorage.setItem('LoggedInUserEmail', userData.email)
      localStorage.setItem('fullname', fullname);
      localStorage.setItem('token', (JSON.stringify(tokenInfo)));
      return user;
    }, (errorHandler) => {
      catchError(errorHandler)
    }));
  }

  register(userRegister): Observable<any> {
    let urlReg = this.baseUri + '/signup';
    console.log("email: " + userRegister.email + "\n" + "password: " + userRegister.password + "\n" + "\n" + "firstname: " + userRegister.firstname);
    return this.http.post(urlReg, userRegister)
      .pipe(catchError(this.errorHandler))
  }

  logout(token) {
    let urlLogOut = this.baseUri + '/logout';
    //  let token = localStorage.getItem('token');
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.set('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.set('token', token);
    let options = {
      headers: httpHeaders
    };
    return this.http.get(urlLogOut, options).pipe(
      map(LogoutDone => {
        console.log('LogoutDone', LogoutDone);
        localStorage.removeItem('LoggedInUserEmail');
        localStorage.removeItem('fullname');
        localStorage.removeItem('token');
        localStorage.clear();
        this.router.navigateByUrl('/login');
        // window.location.reload();
      }, (errorHandler) => {
        catchError(errorHandler)
      })
    )
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = 'Error Code: ${error.status}\nMessage: ${error.message}';
    }
    console.log(errorMessage);
    return throwError(error);
  }
}
