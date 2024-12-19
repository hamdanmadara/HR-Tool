import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/_services/Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss'
})
export class OrganizationComponent implements OnInit {
  organizationForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
    public authService: AuthService,) {}

  ngOnInit(): void {
    this.organizationForm = this.fb.group({
      organizationName: ['', [Validators.required]],
      organizationEmail: ['', [Validators.required, Validators.email]],
      adminName: ['', [Validators.required]],
      adminEmail: ['', [Validators.required, Validators.email]],
      adminPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Getter for easy access to form fields
  get f() { return this.organizationForm.controls; }

  onSubmit() {
    if (this.organizationForm.valid) {
      // Prepare payload matching your specified structure
      const payload = {
        name: this.f['organizationName'].value,
        email: this.f['organizationEmail'].value,
        adminName: this.f['adminName'].value,
        adminEmail: this.f['adminEmail'].value,
        adminPassword: this.f['adminPassword'].value
      };
      this.createOrg(payload)

      // TODO: Implement your registration service call here
      console.log('Organization Registration Payload:', payload);
      
      // Example of how you might call a registration service
      // this.organizationService.register(payload).subscribe(
      //   response => {
      //     // Handle successful registration
      //   },
      //   error => {
      //     // Handle registration error
      //   }
      // );
    }
  }

  createOrg(payload:any){
    this.authService.createOrganization(payload).subscribe({
      next: (res) => {
        console.log(res)
        if(res?.status){
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error('Organization Error Response:', err, err.error.status);
        // console.log(err.status)
        // Optionally handle specific error scenarios
        // For example, show error message to user
      }
    });
  }

}
