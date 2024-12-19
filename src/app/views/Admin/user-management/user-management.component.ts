import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Viewer';
  status: 'Active' | 'Inactive' | 'Pending';
  avatar?: string;
}

interface Invitation {
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit {

  users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      status: 'Active',
      avatar: 'assets/img/avatars/1.jpg'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'User',
      status: 'Inactive',
      avatar: 'assets/img/avatars/2.jpg'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      role: 'Viewer',
      status: 'Pending',
      avatar: 'assets/img/avatars/3.jpg'
    },
    {
      id: 4,
      name: 'Emily Brown',
      email: 'emily.brown@example.com',
      role: 'User',
      status: 'Active',
      avatar: 'assets/img/avatars/4.jpg'
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      role: 'Admin',
      status: 'Pending',
      avatar: 'assets/img/avatars/5.jpg'
    },
    {
      id: 6,
      name: 'Sarah Lee',
      email: 'sarah.lee@example.com',
      role: 'Viewer',
      status: 'Inactive',
      avatar: 'assets/img/avatars/6.jpg'
    },
    {
      id: 7,
      name: 'Alex Rodriguez',
      email: 'alex.rodriguez@example.com',
      role: 'User',
      status: 'Active',
      avatar: 'assets/img/avatars/7.jpg'
    }
  ];

  filteredUsers: User[] = [];
  searchTerm: string = '';
  selectedStatus: string = '';
  selectedRole: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  successMessage: string = '';
  successModalVisible: boolean = false;

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }
  get pageNumbers(): number[] {
    return Array.from({length: this.totalPages}, (_, i) => i + 1);
  }

  invitations: Invitation[] = [
    { name: '', email: '' },
    // { name: '', email: '' },
    // { name: '', email: '' },
    // { name: '', email: '' },
    // { name: '', email: '' }
  ];

  ngOnInit() {
    this.filteredUsers = [...this.users];
    this.filterUsers();
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = !this.searchTerm || 
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.selectedStatus || user.status === this.selectedStatus;
      const matchesRole = !this.selectedRole || user.role === this.selectedRole;

      return matchesSearch && matchesStatus && matchesRole;
    });

    this.currentPage = 1;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  handleUserAction(user: User) {
    if (user.status === 'Pending') {
      // Remove pending invitation
      this.users = this.users.filter(u => u.id !== user.id);
      this.filteredUsers = this.filteredUsers.filter(u => u.id !== user.id);
      this.showSuccessModal('Invitation removed successfully');
    } else if (user.status === 'Active') {
      user.status = 'Inactive';
      this.showSuccessModal('User deactivated successfully');
    } else if (user.status === 'Inactive') {
      user.status = 'Active';
      this.showSuccessModal('User activated successfully');
    }
  }

  cancelInvitation(index: number) {
    this.invitations.splice(index, 1);
    this.invitations.push({ name: '', email: '' });
  }

  // sendInvitations() {
  //   const validInvitations = this.invitations.filter(invite => 
  //     invite.name.trim() !== '' && invite.email.trim() !== '' && this.isValidEmail(invite.email)
  //   );

  //   if (validInvitations.length > 0) {
  //     // Add pending users to the users list
  //     const newPendingUsers: User[] = validInvitations.map((invite, index) => ({
  //       id: this.users.length + index + 1,
  //       name: invite.name,
  //       email: invite.email,
  //       role: 'User', // Default role
  //       status: 'Pending',
  //       avatar: 'assets/img/avatars/default-avatar.png'
  //     }));

  //     this.users.push(...newPendingUsers);
  //     this.filterUsers();
  //     this.showSuccessModal('Invitations sent successfully');

  //     // Reset invitations
  //     this.invitations = [
  //       { name: '', email: '' },
  //       { name: '', email: '' },
  //       { name: '', email: '' },
  //       { name: '', email: '' },
  //       { name: '', email: '' }
  //     ];

  //     // Close modal
  //     const modalElement = document.getElementById('inviteUsersModal');
  //     if (modalElement) {
  //       const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
  //       modal.hide();
  //     }
  //   } else {
  //     alert('Please fill in both name and email for at least one invitation');
  //   }
  // }

  openInviteUserModal() {
    const modalElement = document.getElementById('inviteUsersModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  showSuccessModal(message: string) {
    this.successMessage = message;
    this.successModalVisible = true;
    
    // Auto-hide the modal after 3 seconds
    setTimeout(() => {
      this.successModalVisible = false;
    }, 3000);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }


  addInvitationRow() {
    // Only add a new row if the last row is not empty
    const lastInvitation = this.invitations[this.invitations.length - 1];
    if (lastInvitation.name.trim() !== '' || lastInvitation.email.trim() !== '') {
      this.invitations.push({ name: '', email: '' });
    }
  }

  // Modify sendInvitations to limit to 5 invitations
  sendInvitations() {
    // Filter out empty invitations
    const validInvitations = this.invitations.filter(invite => 
      invite.name.trim() !== '' && invite.email.trim() !== '' && this.isValidEmail(invite.email)
    );

    // Limit to 5 invitations
    const limitedInvitations = validInvitations.slice(0, 5);

    if (limitedInvitations.length > 0) {
      // Add pending users to the users list
      const newPendingUsers: User[] = limitedInvitations.map((invite, index) => ({
        id: this.users.length + index + 1,
        name: invite.name,
        email: invite.email,
        role: 'User', // Default role
        status: 'Pending',
        avatar: 'assets/img/avatars/default-avatar.png'
      }));

      this.users.push(...newPendingUsers);
      this.filterUsers();
      this.showSuccessModal(`${limitedInvitations.length} invitation(s) sent successfully`);

      // Reset invitations
      this.invitations = [
        { name: '', email: '' },
        // { name: '', email: '' },
        // { name: '', email: '' },
        // { name: '', email: '' },
        // { name: '', email: '' }
      ];

      // Close modal
      const modalElement = document.getElementById('inviteUsersModal');
      if (modalElement) {
        const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
        modal.hide();
      }
    } else {
      alert('Please fill in valid name and email for at least one invitation');
    }
  }
}