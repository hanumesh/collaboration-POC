import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from '../services/account.service';
import { AlertService } from '../services/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  isUserLoggedInSuccess: boolean;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  isLoginErrorResp: boolean;
  errorLoginMsg: string;

  userData = {};

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  getUrl(data){
    return this.returnUrl = '/automateIdeas';
    //  this.router.navigateByUrl('/automateIdeas');
  }

  onLoginSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.isLoginErrorResp=false;
    this.userData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.accountService.login(this.userData).subscribe((loginResp) => {
      console.log('loginResp', loginResp);
      this.router.navigateByUrl('/automateIdeas');         
    }, (errorLogin) => {
      this.isLoginErrorResp=true;
      this.loading = false;
      console.log(errorLogin);    
      this.errorLoginMsg = errorLogin.error.message;
    });
  }
}
