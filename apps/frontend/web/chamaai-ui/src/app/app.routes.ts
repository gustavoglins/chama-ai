import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/signup',
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./core/layouts/auth/auth.layout').then((m) => m.AuthLayout),
    children: [
      {
        path: 'signup',
        loadComponent: () =>
          import('./domain/pages/auth/signup/signup.page').then(
            (m) => m.SignupPage
          ),
      },
    ],
  },
];
