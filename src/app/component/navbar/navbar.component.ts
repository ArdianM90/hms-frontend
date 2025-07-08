import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatAnchor, MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbar,
    MatAnchor,
    MatAnchor,
    RouterLink,
    MatAnchor,
    MatIconButton,
    MatAnchor,
    MatIcon,
    MatButton
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  logout(): void {
    this.authService.logOut().subscribe({
      next: (): void => {
        this.authService.clearToken();
        this.router.navigate(['/login-page']);
      },
      error: (): void => {
        console.log('Błąd podczas zerowania refresh tokena')
        this.authService.clearToken();
        this.router.navigate(['/login-page']);
      }
    });
  }
}
