import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Home,
  Lock,
  LucideAngularModule,
  Mail,
  Plus,
  Search,
  Settings,
  Smartphone,
  User,
  X,
} from 'lucide-angular';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      LucideAngularModule.pick({
        Smartphone,
        Mail,
        User,
        Lock,
        Eye,
        EyeOff,
        ArrowRight,
        ArrowLeft,
        Search,
        Settings,
        Plus,
        Check,
        X,
        Home,
      })
    ),
  ],
};
