import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/_services/Auth/auth.service';
import { routes } from '../../../app.routes';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Define the form group for registration
  registerForm: FormGroup;
  token: any;

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router,private route: ActivatedRoute) {
    // Initialize the form with validation rules
    this.registerForm = this.fb.group({
      fullname: [
        '',
        [Validators.required] // Full name is required
      ],
      email: [
        '',
        [Validators.required, Validators.email] // Email must be valid and required
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6) // Password must be at least 6 characters
        ]
      ]
    });
  }

  // Getter for form controls
  get f() {
    return this.registerForm.controls;
  }

  // Function to handle form submission
  onSubmit() {
    if (this.registerForm.valid) {
      const { fullname, email, password } = this.registerForm.value;
      console.log('Full Name:', fullname);
      console.log('Email:', email);
      console.log('Password:', password);
      let registerPayload = {email,password,name:fullname}
      this.register(registerPayload)
      // Proceed with actual registration logic here (e.g., API call to register the user)
      // alert('Registration successful!');

      // Optionally, reset the form after submission
      // this.registerForm.reset();
    } else {
      this.markAllFieldsAsTouched(); // Mark all fields as touched to show validation feedback
    }
  }

  register(payload:any){
    this.authService.signUp(payload).subscribe({
      next: (res) => {
        console.log(res)
        if(res?.status){
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error('Signup Error Response:', err, err.error.status);
        // console.log(err.status)
        // Optionally handle specific error scenarios
        // For example, show error message to user
      }
    });
  }

  // Mark all form fields as touched for validation feedback
  markAllFieldsAsTouched() {
    Object.keys(this.registerForm.controls).forEach(field => {
      const control = this.registerForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      
      // Optional: Validate token
      if (this.token) {
        console.log("token",this.token)
        // this.validateToken(this.token);
      }
    });
  
    // Additional initialization logic if needed
  }

}
