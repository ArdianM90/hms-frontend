import {Component, OnDestroy} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {Subscription} from 'rxjs';
import {LoginData} from '../../model/login-data.model';
import {AuthResponse} from '../../model/auth-response.model';
import {AuthService} from '../../service/auth.service';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule, MatLabel, MatFormField, MatCardContent, MatCardTitle, MatCardHeader, MatCard, MatButton, RouterLink, MatInput, FooterComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnDestroy {
  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  loginData: LoginData = {
    login: '',
    password: ''
  };

  private authResponse: AuthResponse = {
    success: false,
    userId: '',
    jwt: '',
    message: ''
  };

  private httpSub!: Subscription

  requestAuth(): void {
    this.httpSub = this.authService
      .logIn(this.loginData.login, this.loginData.password)
      .subscribe((response: AuthResponse): void => {
        if (response) {
          this.authResponse = response
          console.log(this.authResponse.success)
          if (this.authResponse.success) {
            localStorage.setItem('jwt', this.authResponse.jwt);
            localStorage.setItem('ua-id', this.authResponse.userId);
            this.router.navigate(['/hotels-list']);
          } else {
            localStorage.clear();
            console.log("Brak autentykacji użytkownika")
          }
        }
      })
  }

  ngOnDestroy(): void {
    if (this.httpSub)
      this.httpSub.unsubscribe();
  }
}
