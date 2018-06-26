import { Component } from '@angular/core';
// import { Http } from '@angular/http';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  authValue: boolean = false;
  auth_url = '/twitter';
  auth_message = 'login';

  constructor(private authService: AuthService) {
  }
  authCheck() {
    this.authService.getAuthStatus().subscribe(
      data => this.handleSuccessCheck(data),
      error => this.handleError(error),
      () => console.log('Request complete')
    );
  }

  handleSuccessCheck(data) {
    this.authValue = data;
    if (data) {
      this.auth_message = 'logout';
      this.auth_url = '/logout';
    } else {
      this.auth_message = 'login';
      this.auth_url = '/twitter';
    }
  }

  handleError(error) {
    console.log(error);
  }
}
