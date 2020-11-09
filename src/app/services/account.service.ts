import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { User } from '../model/user';

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

  login(userData: any): Observable<any> {
    let urlLogin = this.baseUri + '/login';    
  
    return this.http.post<any>(urlLogin, userData).pipe(map(token => {
      console.log(JSON.stringify(token));
      localStorage.setItem('LoggedInUserEmail', userData.email)
      localStorage.setItem('token', (JSON.stringify(token)) );
      return token;
    }, (errorHandler) => {
      catchError(this.errorHandler)
    }));
  }

  register(userRegister): Observable<any> {
    let urlReg = this.baseUri + '/signup';
    // let url = '${this.baseUri}/script/signup';
    console.log("email: " + userRegister.email + "\n" + "password: " + userRegister.password + "\n" + "\n" + "name: " + userRegister.username);
    return this.http.post(urlReg, userRegister)
      .pipe(catchError(this.errorHandler))
  }

  logout(sessID) {
    // let url = '${this.baseUri}/script/logout';
    let urlLogOut = this.baseUri + '/logout';

    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.set('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.set('session', sessID);
    let options = {
      headers: httpHeaders
    };
    return this.http.get(urlLogOut, options).pipe(
      map(result => {
        localStorage.removeItem('loggedInUser')
        localStorage.removeItem('sessionID')
        localStorage.clear()
        this.router.navigateByUrl('/login');
        window.location.reload();
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
