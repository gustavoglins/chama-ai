import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardCardComponent } from '@shared/components/card/card.component';
import { ZardLabelComponent } from '@shared/components/label/label.component';
import {
  SimpleRadioCardOption,
  ZardRadioCardGroupComponent,
} from '@shared/components/radio-card/radio-card.component';

@Component({
  selector: 'app-signup.page',
  imports: [
    ZardCardComponent,
    ZardButtonComponent,
    RouterModule,
    ZardRadioCardGroupComponent,
    ZardLabelComponent,
  ],
  templateUrl: './signup.page.html',
})
export class SignupPage {
  private readonly router = inject(Router);

  protected radioOptions: SimpleRadioCardOption[] = [
    { value: 'client', label: 'Quero contratar serviços', badge: 'Cliente' },
    {
      value: 'service_provider',
      label: 'Quero oferecer meus serviços',
      badge: 'Profissional',
    },
  ];

  protected selectedValue: string | null = null;

  protected onSelectionChange(value: string) {
    this.selectedValue = value;
  }

  protected onContinue() {
    if (!this.selectedValue) {
      return;
    }

    const route =
      this.selectedValue === 'client'
        ? '/auth/signup/client'
        : '/auth/signup/service-provider';

    this.router.navigate([route]);
  }
}
