import { Component } from '@angular/core';
import { AuthService } from '../../../shared/_services/Auth/auth.service';

@Component({
  selector: 'app-home-page',
  // standalone: true,
  // imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  constructor(private authService: AuthService){

  }


  
}
