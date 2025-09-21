import { Component, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardCardComponent } from '@shared/components/card/card.component';
import { ZardDividerComponent } from '@shared/components/divider/divider.component';
import { ZardInputComponent } from '@shared/components/input/input.component';
import { ZardLabelComponent } from '@shared/components/label/label.component';
import { ZardToastComponent } from '@shared/components/toast/toast.component';
import { LucideAngularModule } from 'lucide-angular';
import { toast } from 'ngx-sonner';
import { StartSignupInterface } from '../../../interfaces/StartSignupInterface.interface';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-client-signup.page',
  imports: [
    ZardCardComponent,
    ZardButtonComponent,
    ZardLabelComponent,
    ZardInputComponent,
    ZardDividerComponent,
    ZardToastComponent,
    LucideAngularModule,
    ReactiveFormsModule,
  ],
  templateUrl: './client-signup.page.html',
})
export class ClientSignupPage {
  protected loginMethod = signal<'email' | 'phone'>('email');

  startSignupForm = new FormGroup(
    {
      email: new FormControl('', [Validators.email]),
      phoneNumber: new FormControl('', [
        Validators.pattern(/^[1-9]\d{10}$/), // 11 dígitos brasileiros
      ]),
    },
    { validators: this.atLeastOneFieldValidator }
  );

  constructor(private authService: AuthService) {}

  // Método para alternar entre email e telefone de forma segura
  switchToEmail() {
    this.loginMethod.set('email');
    this.startSignupForm.get('phoneNumber')?.reset();
    this.startSignupForm.get('phoneNumber')?.markAsUntouched();
  }

  switchToPhone() {
    this.loginMethod.set('phone');
    this.startSignupForm.get('email')?.reset();
    this.startSignupForm.get('email')?.markAsUntouched();
  }

  // Método para aplicar máscara visual ao telefone
  applyPhoneMask(value: string): string {
    if (!value) return '';

    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');

    // Limita a 11 dígitos
    const limitedNumbers = numbers.slice(0, 11);

    // Aplica máscara (11) 94928-3498
    if (limitedNumbers.length <= 2) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 7) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`;
    } else {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(
        2,
        7
      )}-${limitedNumbers.slice(7, 11)}`;
    }
  }

  // Método para extrair apenas números do telefone
  extractPhoneNumbers(value: string): string {
    return value ? value.replace(/\D/g, '') : '';
  }

  // Evento para input de telefone com máscara em tempo real
  onPhoneInput(event: any) {
    const input = event.target;
    const cursorPos = input.selectionStart;
    const oldValue = input.value;

    // Extrai apenas números
    const numbers = this.extractPhoneNumbers(oldValue);

    // Aplica máscara visual imediatamente
    const maskedValue = this.applyPhoneMask(numbers);

    // Atualiza o campo visual
    input.value = maskedValue;

    // Atualiza o FormControl apenas com números
    this.startSignupForm
      .get('phoneNumber')
      ?.setValue(numbers, { emitEvent: false });

    // Calcula nova posição do cursor
    let newCursorPos = cursorPos;
    if (maskedValue.length > oldValue.length) {
      // Se o valor cresceu, manter cursor na mesma posição relativa
      newCursorPos = Math.min(
        cursorPos + (maskedValue.length - oldValue.length),
        maskedValue.length
      );
    } else if (maskedValue.length < oldValue.length) {
      // Se o valor diminuiu, ajustar cursor
      newCursorPos = Math.min(cursorPos, maskedValue.length);
    }

    // Define a posição do cursor
    setTimeout(() => {
      input.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  }

  // Validador customizado: pelo menos um dos campos deve estar preenchido
  private atLeastOneFieldValidator(
    group: AbstractControl
  ): ValidationErrors | null {
    const email = group.get('email')?.value;
    const phone = group.get('phoneNumber')?.value;

    // Se pelo menos um campo está preenchido, é válido
    if ((email && email.trim()) || (phone && phone.trim())) {
      return null;
    }

    // Se nenhum campo está preenchido, retorna erro
    return { atLeastOneRequired: true };
  }

  handleSubmit() {
    console.log('Form submitted');

    // Validar se pelo menos um campo está preenchido E é válido
    const email = this.startSignupForm.get('email')?.value;
    const phone = this.startSignupForm.get('phoneNumber')?.value;

    // Verificar se há dados válidos
    const hasValidEmail =
      email && email.trim() && this.startSignupForm.get('email')?.valid;
    const hasValidPhone =
      phone && phone.trim() && this.startSignupForm.get('phoneNumber')?.valid;

    if (!hasValidEmail && !hasValidPhone) {
      console.log('Form is invalid - no valid email or phone');
      this.markFormGroupTouched();

      // Mostrar toast em vez de erro inline
      toast.error('Preencha pelo menos um: email ou telefone válido');
      return;
    }

    const formValue = this.startSignupForm.value;

    // Para telefone, extrair apenas números para envio
    const payload: StartSignupInterface =
      this.loginMethod() === 'email'
        ? { login: formValue.email ? formValue.email : '' }
        : {
            login: this.extractPhoneNumbers(
              formValue.phoneNumber ? formValue.phoneNumber : ''
            ),
          };

    console.log('Sending payload:', payload);

    this.authService.startSignup(payload).subscribe({
      next: () => {
        toast.success('Código enviado com sucesso!');
      },
      error: (error) => {
        console.error('Error during signup:', error);
        toast.error('Erro ao enviar código. Tente novamente.');
      },
    });
  }

  private markFormGroupTouched() {
    Object.keys(this.startSignupForm.controls).forEach((key) => {
      const control = this.startSignupForm.get(key);
      control?.markAsTouched();
    });
  }

  // Métodos para validação
  getCurrentField() {
    return this.loginMethod() === 'email' ? 'email' : 'phoneNumber';
  }

  getCurrentControl() {
    return this.startSignupForm.get(this.getCurrentField());
  }

  hasError() {
    const control = this.getCurrentControl();
    return control?.invalid && control?.touched;
  }

  getErrorMessage() {
    const control = this.getCurrentControl();
    if (control?.errors && control?.touched) {
      if (control.errors['email']) {
        return 'Email inválido';
      }
      if (control.errors['pattern']) {
        return 'Formato de telefone inválido';
      }
    }

    return '';
  }

  // Verificar se o formulário foi tocado
  isFormTouched() {
    return (
      this.startSignupForm.get('email')?.touched ||
      this.startSignupForm.get('phoneNumber')?.touched
    );
  }

  // Verificar se o formulário é válido para envio
  isFormValidForSubmit() {
    const email = this.startSignupForm.get('email')?.value;
    const phone = this.startSignupForm.get('phoneNumber')?.value;

    const hasValidEmail =
      email && email.trim() && this.startSignupForm.get('email')?.valid;
    const hasValidPhone =
      phone && phone.trim() && this.startSignupForm.get('phoneNumber')?.valid;

    return hasValidEmail || hasValidPhone;
  }

  getFieldStatus() {
    const control = this.getCurrentControl();
    if (control?.invalid && control?.touched) return 'error';
    if (control?.valid && control?.touched) return 'success';
    return undefined;
  }
}
