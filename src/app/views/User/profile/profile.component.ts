import { Component } from '@angular/core';
import { AuthService } from '../../../shared/_services/Auth/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  // standalone: true,
  // imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  constructor(private authService: AuthService, private router:Router){

  }
  logout(): void {
    this.authService.clearToken(); // Remove the token from storage
    this.router.navigate(['/login']); // Redirect to the login page
  }

  getProfile(){
    this.authService.getProfile().subscribe((res)=>{
      console.log(res)
    })
  }

}
