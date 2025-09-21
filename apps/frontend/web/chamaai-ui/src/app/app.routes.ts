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
        title: 'Signup | Chama Aí',
        path: 'signup',
        loadComponent: () =>
          import('./domain/auth/pages/signup/signup.page').then(
            (m) => m.SignupPage
          ),
      },
      {
        title: 'Cliente | Chama Aí',
        path: 'signup/client',
        loadComponent: () =>
          import('./domain/auth/pages/signup/client/client-signup.page').then(
            (m) => m.ClientSignupPage
          ),
      },
      {
        title: 'Profissional | Chama Aí',
        path: 'signup/service-provider',
        loadComponent: () =>
          import(
            './domain/auth/pages/signup/service-provider/service-provider-signup.page'
          ).then((m) => m.ServiceProviderSignupPage),
      },
    ],
  },
];
