import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/services/models/login-model';

import { AuthService } from 'src/app/services/service/auth.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
})
export class AuthLayoutComponent implements OnInit {
  password!: string;
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  loginForm: LoginModel = {
    username: '',
    password: '',
  };

  ngOnInit(): void {}

  userLogin() {
    this.authService.userLogin(this.loginForm).subscribe((data) => {
      this.authService.setConnectedUser;
      if (data) {
        const isAdmin = this.authService.isUserInRole('ROLE_ADMIN');
        if (isAdmin) {
          // Redirect to the admin interface
          this.router.navigateByUrl('/admin');
        } else {
          // Redirect to the user interface or perform other actions
          this.router.navigateByUrl('/');
        }
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
