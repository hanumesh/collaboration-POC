import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../model/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  LoggedInUserEmail : string;
  token: string;  
  fullname: string;

  constructor(private accountService: AccountService,
    private router: Router
  ) {

  }

  ngOnInit() {    
    this.LoggedInUserEmail =  localStorage.getItem('LoggedInUserEmail');
    this.token =  localStorage.getItem('token');
    this.fullname = localStorage.getItem('fullname');
   }

  onLogout() {
    this.accountService.logout(this.token).subscribe(result => {
      this.router.navigateByUrl('/login');
    });
    this.router.navigateByUrl('/login');
  }
}
