import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/_services/Auth/auth.service';
import { environment } from '../../../../environments/environment';
// import { AuthService } from 'src/app/shared/_services/Auth/auth.service';
// import { SocialSignInService } from 'src/app/shared/_services/SocialSignIn/social-sign-in.service';
// import { SocialAuthService,GoogleLoginProvider } from "angularx-social-login";

declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  // avail: boolean=false;
  // msg: string='';
  // latestClientId= '497303743191-j40sbqdb39nlfho2h89g0rbkt9ecogod.apps.googleusercontent.com'
  constructor(private fb: FormBuilder,private router: Router,
    // private socialAuthService: SocialAuthService,
    public authService: AuthService,
    // private socialSIgnIn: SocialSignInService
  ) {
    // Initialize the form with validation rules
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email] // Email must be valid and required
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6) // Minimum 6 characters for password
        ]
      ]
    });
  }

  // Convenience getter for easy access to form controls in the template
  get f() {
    return this.loginForm.controls;
  }

  // Function to handle form submission
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Username:', email);
      console.log('Password:', password);
      let LoginPayload= {email,password}
      this.login(LoginPayload)
      // alert(`Logged in as: ${email}`);
      // Add actual login functionality here
    } 

  }
 

  ngOnInit(): void {
  }


  login(payload:any){
    this.authService.login(payload).subscribe({
      next: (res) => {
        console.log(res)
        if(res?.status && res?.token){
          this.authService.storeToken(res.token);
          this.router.navigate(['/user/profile']);
        }
      },
      error: (err) => {
        console.error('Login Error Response:', err, err.error.status);
        console.log(err.status)
        // Optionally handle specific error scenarios
        // For example, show error message to user
      }
    });
  }

}  
