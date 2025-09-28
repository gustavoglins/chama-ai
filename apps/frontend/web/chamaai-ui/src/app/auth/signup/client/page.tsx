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
import { useRouter } from 'next/navigation';

export default function ClientSignupPage() {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const router = useRouter();

  function onSignuped() {
    router.push('/app');
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          {step === 0 && 'Criar conta'}
          {step === 1 && 'Introduza o código'}
          {step === 2 && 'Complete o Seu Perfil'}
        </CardTitle>
        <CardDescription>
          {step === 0 &&
            'Por favor preencha seus dados para iniciar o cadastro.'}
          {step === 1 &&
            'Por favor, introduza o código de 6 dígitos que enviamos para o seu email.'}
          {step === 2 &&
            'Quase lá! Só mais alguns passos para finalizar o seu cadastro.'}
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
        {step === 2 && <StepPersonalData onSuccess={onSignuped} />}
      </CardContent>
    </Card>
  );
}
