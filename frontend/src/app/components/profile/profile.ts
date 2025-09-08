import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { User } from '../../models/user.model';
import { Donation } from '../../models/donation.model';
import { Match } from '../../models/match.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { DonationService } from '../../services/donation.service';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDividerModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {
  currentUser: User | null = null;
  profileForm: FormGroup;
  passwordForm: FormGroup;
  isLoading = false;
  isSaving = false;
  userDonations: Donation[] = [];
  userMatches: Match[] = [];

  // Expose enums for template use
  DonationStatus = {
    ACTIVE: 'ACTIVE' as const,
    INACTIVE: 'INACTIVE' as const,
    COMPLETED: 'COMPLETED' as const
  };

  MatchStatus = {
    PENDING: 'PENDING' as const,
    ACCEPTED: 'ACCEPTED' as const,
    REJECTED: 'REJECTED' as const,
    COMPLETED: 'COMPLETED' as const
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private donationService: DonationService,
    private matchService: MatchService,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadUserData();
  }

  private passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    if (confirmPassword?.hasError('passwordMismatch')) {
      confirmPassword.setErrors(null);
    }
    
    return null;
  }

  private loadCurrentUser(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.profileForm.patchValue({
        name: this.currentUser.name,
        email: this.currentUser.email,
        phone: this.currentUser.phone,
        address: this.currentUser.address,
        city: this.currentUser.city,
        state: this.currentUser.state
      });
    }
  }

  private loadUserData(): void {
    this.isLoading = true;
    
    // Load user donations
    this.donationService.getUserDonations().subscribe({
      next: (donations: Donation[]) => {
        this.userDonations = donations;
      },
      error: (error: any) => {
        console.error('Error loading user donations:', error);
      }
    });

    // Load user matches (both requests and received)
    this.matchService.getMyRequests().subscribe({
      next: (myRequests: Match[]) => {
        this.userMatches = [...myRequests];
        
        // Also load received requests
        this.matchService.getReceivedRequests().subscribe({
          next: (receivedRequests: Match[]) => {
            this.userMatches = [...this.userMatches, ...receivedRequests];
            this.isLoading = false;
          },
          error: (error: any) => {
            console.error('Error loading received requests:', error);
            this.isLoading = false;
          }
        });
      },
      error: (error: any) => {
        console.error('Error loading user matches:', error);
        this.isLoading = false;
      }
    });
  }

  onUpdateProfile(): void {
    if (this.profileForm.valid) {
      this.isSaving = true;
      
      const profileData = this.profileForm.value;

      this.userService.updateProfile(profileData).subscribe({
        next: (user: User) => {
          this.currentUser = user;
          // Update user in localStorage
          localStorage.setItem('user', JSON.stringify(user));
          this.snackBar.open('Perfil atualizado com sucesso!', 'Fechar', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
          this.isSaving = false;
        },
        error: (error: any) => {
          console.error('Error updating profile:', error);
          this.snackBar.open('Erro ao atualizar perfil. Tente novamente.', 'Fechar', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
          this.isSaving = false;
        }
      });
    }
  }

  onChangePassword(): void {
    if (this.passwordForm.valid) {
      this.isSaving = true;
      
      // For now, just show a message since the API doesn't have change password endpoint
      this.snackBar.open('Funcionalidade de alteração de senha em desenvolvimento', 'Fechar', {
        duration: 3000,
        panelClass: ['snackbar-info']
      });
      this.passwordForm.reset();
      this.isSaving = false;
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'ACTIVE':
      case 'ACCEPTED':
        return 'primary';
      case 'COMPLETED':
        return 'accent';
      case 'INACTIVE':
      case 'REJECTED':
        return 'warn';
      case 'PENDING':
        return '';
      default:
        return '';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'Ativa';
      case 'INACTIVE':
        return 'Inativa';
      case 'COMPLETED':
        return 'Concluída';
      case 'AVAILABLE':
        return 'Disponível';
      case 'RESERVED':
        return 'Em andamento';
      case 'PENDING':
        return 'Em andamento';
      case 'IN_PROGRESS':
        return 'Em andamento';
      case 'EXPIRED':
        return 'Expirada';
      case 'ACCEPTED':
      case 'APPROVED':
        return 'Aceita';
      case 'REJECTED':
        return 'Rejeitada';
      case 'CANCELLED':
        return 'Cancelada';
      default:
        return status;
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  onPhoneInput(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length >= 11) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 10) {
      value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 6) {
      value = value.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
    } else if (value.length >= 2) {
      value = value.replace(/(\d{2})(\d+)/, '($1) $2');
    }
    
    this.profileForm.patchValue({ phone: value });
  }
}
