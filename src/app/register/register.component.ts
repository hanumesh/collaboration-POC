import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from '../services/account.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isRegSuccessResp: boolean;
  isRegErrorResp: boolean;
  errorRegMsg: string;

  regForm: FormGroup;
  loading = false;
  submitted = false;
  userRegister = {};
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.regForm.controls; }

  onRegSubmit() {
   
    console.log(this.regForm.value.email + " " + this.regForm.value.username + " " + this.regForm.value.password);
    this.submitted = true;
    
    this.alertService.clear();
    this.isRegErrorResp = false;
    // stop here if form is invalid
    if (this.regForm.invalid) {
      return;
    }

    this.userRegister = {
      username: this.regForm.value.username,
      email: this.regForm.value.email,
      password: this.regForm.value.password
    };

    this.loading = true;
    this.accountService.register(this.userRegister).subscribe(
      (respReg) => {
        //   this.ngZone.run(() => this.router.navigateByUrl('/employees-list'))
        this.loading = false;
        this.isRegSuccessResp = true;
        this.isRegErrorResp = false;
        // setTimeout(() => {
        //   this.router.navigateByUrl('/login').then(e => {
        //     if (e) {
        //       console.log("Navigation is successful!");
        //     } else {
        //       console.log("Navigation has failed!");
        //     }
        //   });
        //  }, 3000);

      }, (errorReg) => {
        this.loading = false;
        console.log(errorReg);
        this.isRegErrorResp = true;
        // this.errorRegMsg = "Response Error:  " + errorReg.message;
        this.errorRegMsg = errorReg.error.message;
      });


  }

}
