import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import {AccountService } from '../services/account.service';
import {AlertService } from '../services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

  }

 // convenience getter for easy access to form fields
 get f() { return this.form.controls; }

 onSubmit() {
  this.submitted = true;

  // reset alerts on submit
  this.alertService.clear();

  // stop here if form is invalid
  if (this.form.invalid) {
      return;
  }

  this.loading = true;

  this.accountService.login(this.form.value).subscribe(
    (data: any) => {
      let name = data.name;
      localStorage.setItem('Name', name);
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/automateIdeas';
      this.router.navigateByUrl(returnUrl);
  
      this.router.navigate([ '/' ]);
    },
    (err: HttpErrorResponse) => {
      console.log(err.error);
      if (err.error.msg) {
        console.log(err.error.msg, 'Undo');
      } else {
        console.log('Something Went Wrong!');
      }
    }
  )

  /*     .pipe(first())
      .subscribe({
          next: () => {
              // get return url from query parameters or default to home page
              const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            //   this.router.navigateByUrl(returnUrl);
            this.router.navigate("/deployfirewalls");
          },
          error: error => {
              this.alertService.error(error);
              this.loading = false;
          }
      }); */
}

}
