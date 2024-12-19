import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';

interface NavItem {
  name: string;
  icon: string;
  url: string;
}
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  userName: string = '';
  userRole: string = '';
  userAvatar: string = '';
  isMobileSidebarOpen: boolean = false;
  navItems: NavItem[] = [
    { 
      name: 'Dashboard', 
      icon: 'cil-speedometer', 
      url: '/dashboard' 
    },
    { 
      name: 'User Management', 
      icon: 'cil-user', 
      url: '/user-management' 
    },
    { 
      name: 'Job Listing', 
      icon: 'cil-list', 
      url: '/job-listing' 
    },
    { 
      name: 'Profile', 
      icon: 'cil-user-follow', 
      url: '/profile' 
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
      
  }

  logout(event: Event) {
    event.preventDefault();
    // Implement logout logic
    this.router.navigate(['/login']);
  }

  toggleMobileSidebar(): void {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
    document.body.classList.toggle('sidebar-mobile-open', this.isMobileSidebarOpen);
  }

  // Close mobile sidebar when screen size increases
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth > 991) {
      this.isMobileSidebarOpen = false;
      document.body.classList.remove('sidebar-mobile-open');
    }
  }

}
