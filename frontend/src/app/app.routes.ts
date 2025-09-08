import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home').then(m => m.Home),
    title: 'Doações Locais - Conectando solidariedade'
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then(m => m.Login),
    title: 'Entrar - Doações Locais'
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register').then(m => m.Register),
    title: 'Cadastrar - Doações Locais'
  },
  {
    path: 'donations',
    loadComponent: () => import('./components/donations/donations').then(m => m.Donations),
    title: 'Doações Disponíveis'
  },
  {
    path: 'create-donation',
    loadComponent: () => import('./components/create-donation/create-donation').then(m => m.CreateDonation),
    canActivate: [AuthGuard],
    title: 'Criar Doação'
  },
  {
    path: 'profile',
    loadComponent: () => import('./components/profile/profile').then(m => m.Profile),
    canActivate: [AuthGuard],
    title: 'Meu Perfil'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard').then(m => m.Dashboard),
    canActivate: [AuthGuard],
    title: 'Dashboard'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
