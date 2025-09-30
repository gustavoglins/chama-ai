'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';
import StepOtpVerification from './components/StepOtpVerification';
import StepStartSignup from './components/StepStartSignup';
import StepPersonalData from './components/StepPersonalData';
import StepSecurity from './components/StepSecurity';
import { ClientSignupOnlyPersonalDataType } from '@/validators/formValidator';
import { useRouter } from 'next/navigation';

export default function ClientSignupPage() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [personalData, setPersonalData] =
    useState<ClientSignupOnlyPersonalDataType | null>(null);
  const router = useRouter();

  function onSignuped() {
    router.push('/app');
  }

  return (
    <Card
      className={`w-full ${[2, 3].includes(step) ? 'max-w-md' : 'max-w-sm'}`}
    >
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
          {step === 3 && 'Defina uma senha segura para a sua conta.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        {step === 0 && (
          <StepStartSignup
            onSuccess={() => {
              setStep(1);
            }}
          />
        )}
        {step === 1 && (
          <StepOtpVerification
            onSuccess={() => {
              setStep(2);
            }}
          />
        )}
        {step === 2 && (
          <StepPersonalData
            onContinue={(data) => {
              setPersonalData(data);
              setStep(3);
            }}
          />
        )}
        {step === 3 && (
          <StepSecurity
            personalData={personalData}
            onBack={() => setStep(2)}
            onSuccess={onSignuped}
          />
        )}
      </CardContent>
    </Card>
  );
}
