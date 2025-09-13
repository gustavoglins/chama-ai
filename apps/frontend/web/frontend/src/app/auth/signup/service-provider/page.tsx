'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { unmask } from '@/lib/masks';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import {
  serviceProviderSignupFormSchema,
  type ServiceProviderSignupFormSchema,
} from '@/validators/formValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { signupServiceProvider } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { StepPersonal } from './components/StepPersonal';
import { StepContact } from './components/StepContact';
import { StepSecurity } from './components/StepSecurity';
import { StepOtp } from './components/StepOtp';

export default function ServiceProviderSignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  // timers e reenvio são controlados pelo StepOtp

  const form = useForm<ServiceProviderSignupFormSchema>({
    resolver: zodResolver(serviceProviderSignupFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      cpf: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: undefined,
      gender: undefined as unknown as 'MALE' | 'FEMALE' | 'OTHER',
    },
    mode: 'onChange',
  });

  const steps: {
    title: string;
    description?: string;
    fields: (keyof ServiceProviderSignupFormSchema)[];
  }[] = [
    {
      title: 'Informações pessoais',
      description: 'Preencha seus dados básicos para começar o cadastro',
      fields: ['firstName', 'lastName', 'cpf', 'dateOfBirth', 'gender'],
    },
    {
      title: 'Informações de contato',
      description: 'Informe seus dados de contato para continuarmos',
      fields: ['email', 'phoneNumber'],
    },
    {
      title: 'Segurança da conta',
      description: 'Crie uma senha segura para proteger sua conta',
      fields: ['password', 'confirmPassword'],
    },
    {
      title: 'Verificação de segurança',
      description: 'Verifique seu email e telefone para concluir o cadastro',
      fields: [],
    },
  ];

  const isLastStep = currentStep === steps.length - 1;

  const goNext = async () => {
    const stepFields = steps[currentStep].fields;
    const valid = await form.trigger(
      stepFields as (keyof ServiceProviderSignupFormSchema)[],
      { shouldFocus: true }
    );
    if (!valid) return;
    // Ao sair da etapa 2 (segurança), vamos para verificação; StepOtp envia o código automaticamente
    if (currentStep === 2) {
      setEmailVerified(false);
      setPhoneVerified(false);
      setCurrentStep(3);
      return;
    }
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const goBack = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (data: ServiceProviderSignupFormSchema) => {
    setIsLoading(true);
    try {
      // OTPs já validados nesta etapa
      if (!emailVerified || !phoneVerified) {
        throw new Error('Conclua as verificações de email e telefone');
      }

      const resJson = await signupServiceProvider({
        email: data.email,
        phoneNumber: Number(unmask(data.phoneNumber)),
        firstName: data.firstName,
        lastName: data.lastName,
        cpf: data.cpf,
        password: data.password,
        dateOfBirth: data.dateOfBirth
          ? data.dateOfBirth.toISOString().split('T')[0]
          : '',
        gender: data.gender,
      });
      if (typeof window !== 'undefined') {
        if (resJson.token) localStorage.setItem('auth-token', resJson.token);
        router.push('/app');
      } else {
        toast.error('Ocorreu um erro inesperado. Por favor faça o login');
        router.push('/auth/login');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha no cadastro';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const StepContents = [
    <StepPersonal key="step-0" form={form} />,
    <StepContact key="step-1" form={form} />,
    <StepSecurity key="step-2" form={form} />,
    <StepOtp
      key="step-3"
      email={form.getValues('email')}
      phoneNumber={form.getValues('phoneNumber')}
      isActive={currentStep === 3}
      onAllVerified={() => {
        setEmailVerified(true);
        setPhoneVerified(true);
      }}
    />,
  ];

  return (
    <Card className="w-full max-w-2xl px-0 py-6.5 gap-10 rounded-3xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">
          {steps[currentStep]?.title || 'Criar conta'}
        </CardTitle>
        <CardDescription>
          {steps[currentStep]?.description ||
            'Preencha seus dados para continuar.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col w-full">
        {/* Indicador de progresso */}
        <ol className="relative mb-8 flex w-full items-center justify-between">
          {steps.map((step, index) => {
            const done = index < currentStep;
            const active = index === currentStep;
            return (
              <li
                key={step.title}
                className="flex-1 flex flex-col items-center group"
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-medium transition-colors ${
                    done
                      ? 'bg-primary text-primary-foreground border-primary'
                      : active
                      ? 'border-primary text-foreground'
                      : 'border-muted-foreground/30 text-muted-foreground'
                  } `}
                >
                  {done ? '✓' : index + 1}
                </div>
                <p
                  className={`mt-2 text-[10px] font-medium uppercase tracking-wide ${
                    active ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {step.title}
                </p>
              </li>
            );
          })}
        </ol>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            {StepContents.map((content, i) => (
              <div key={i} className={i === currentStep ? 'block' : 'hidden'}>
                {content}
              </div>
            ))}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex gap-3 w-full">
                {currentStep > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goBack}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    Voltar
                  </Button>
                )}
                {!isLastStep && (
                  <Button
                    type="button"
                    onClick={goNext}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    Próximo
                  </Button>
                )}
                {isLastStep && (
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={
                      isLoading ||
                      (currentStep === 3 && (!emailVerified || !phoneVerified))
                    }
                  >
                    {isLoading ? 'Carregando' : 'Finalizar Cadastro'}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
        <Separator className="m-5 self-center" />
        <Button size="lg" variant="outline" className="w-full flex gap-2">
          <Image
            src="/google-icon.svg"
            alt="Google Logo Icon"
            width={1000}
            height={1000}
            className="h-5 w-auto object-contain"
            priority
          />
          Iniciar sessão com o Google
        </Button>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <p className="text-center pt-3 text-xs text-muted-foreground leading-relaxed">
          Já possui conta?{' '}
          <Link className="underline text-primary" href="/auth/login">
            Entrar
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
