'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { finishSignup } from '@/services/user.api';
import {
  ClientSignupOnlyPersonalDataType,
  ClientSignupPersonalDataType,
  ClientSignupSecurityType,
} from '@/validators/formValidator';
import { ApiResponseStatus } from '@/interfaces/api.interface';
import { translateError } from '@/lib/errors/error-utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import StepOtpVerification from './components/StepOtpVerification';
import StepPersonalData from './components/StepPersonalData';
import StepSecurity from './components/StepSecurity';
import StepStartSignup from './components/StepStartSignup';

export default function ClientSignupPage() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [personalData, setPersonalData] =
    useState<ClientSignupOnlyPersonalDataType | null>(null);
  const [signupEmail, setSignupEmail] = useState<string | null>(null);
  const [isFinishing, setIsFinishing] = useState(false);
  const router = useRouter();

  async function handleFinishSignup(credentials: ClientSignupSecurityType) {
    if (!personalData) {
      toast.error('Preencha seus dados pessoais antes de finalizar.');
      setStep(2);
      return;
    }

    setIsFinishing(true);

    try {
      const payload: ClientSignupPersonalDataType = {
        ...personalData,
        password: credentials.password,
        confirmPassword: credentials.confirmPassword,
      };

      const emailToUse = signupEmail ?? localStorage.getItem('signupEmail');

      if (!emailToUse) {
        toast.error('Email não encontrado. Volte ao início e tente novamente.');
        setStep(0);
        return;
      }

      if (!signupEmail) {
        setSignupEmail(emailToUse);
      }

      const response = await finishSignup(payload, emailToUse);

      if (response.status === ApiResponseStatus.SUCCESS) {
        if (response.data?.token) {
          localStorage.setItem('authToken', response.data.token);
          localStorage.removeItem('signupEmail');
          toast.success('Cadastro realizado com sucesso!');
          router.push('/app');
        } else {
          toast.success('Cadastro finalizado. Faça login para continuar.');
          router.push('/auth/login');
        }
        return;
      }

      const userFriendlyErrorMessage = translateError(response.message);
      toast.error(userFriendlyErrorMessage);
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        const backendErrorMessage = err.response?.data?.message;
        const userMessage = translateError(backendErrorMessage);
        toast.error(userMessage);
      } else {
        toast.error('Erro inesperado. Tente novamente.');
      }
      console.error('Error in signup:', error);
    } finally {
      setIsFinishing(false);
    }
  }

  return (
    <Card className={`${[2, 3].includes(step) ? 'max-w-md' : 'max-w-sm'}`}>
      <CardHeader>
        <CardTitle>
          {step === 0 && 'Criar conta'}
          {step === 1 && 'Introduza o código'}
          {step === 2 && 'Complete o Seu Perfil'}
          {step === 3 && 'Proteja sua conta'}
        </CardTitle>
        <CardDescription>
          {step === 0 &&
            'Por favor preencha seus dados para iniciar o cadastro.'}
          {step === 1 &&
            'Por favor, introduza o código de 6 dígitos que enviamos para o seu email.'}
          {step === 2 &&
            'Quase lá! Só mais alguns passos para finalizar o seu cadastro.'}
          {step === 3 && 'Crie uma senha segura para a sua conta.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        {step === 0 && (
          <StepStartSignup
            onSuccess={(email) => {
              setSignupEmail(email);
              setStep(1);
            }}
          />
        )}
        {step === 1 && (
          <StepOtpVerification
            email={signupEmail}
            onSuccess={() => {
              setStep(2);
            }}
            onBack={() => {
              setStep(0);
              setPersonalData(null);
            }}
          />
        )}
        {step === 2 && (
          <StepPersonalData
            onContinue={(data) => {
              setPersonalData(data);
              setStep(3);
            }}
            onBack={() => {
              setPersonalData(null);
              setStep(1);
            }}
          />
        )}
        {step === 3 && (
          <StepSecurity
            personalData={personalData}
            isSubmitting={isFinishing}
            onBack={() => setStep(2)}
            onSubmit={handleFinishSignup}
          />
        )}
      </CardContent>
    </Card>
  );
}
