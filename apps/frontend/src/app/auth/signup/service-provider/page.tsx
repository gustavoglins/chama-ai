'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronDownIcon } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { maskCPF, maskPhoneBR, unmask } from '@/lib/masks';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import {
  serviceProviderSignupFormSchema,
  type ServiceProviderSignupFormSchema,
} from '@/validators/formValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  sendEmailConfirmationCode,
  sendPhoneConfirmationCode,
  signupServiceProvider,
  verifyOtp,
} from '@/services/auth';
// import { ClientSignupRequestDto } from '@/dto/user.interface';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function ServiceProviderSignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [cooldownEmail, setCooldownEmail] = useState(0);
  const [cooldownPhone, setCooldownPhone] = useState(0);
  const [otpPhase, setOtpPhase] = useState<'EMAIL' | 'PHONE'>('EMAIL');
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // cooldown timers (email/phone)
  React.useEffect(() => {
    if (cooldownEmail <= 0) return;
    const id = setInterval(() => {
      setCooldownEmail((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [cooldownEmail]);
  React.useEffect(() => {
    if (cooldownPhone <= 0) return;
    const id = setInterval(() => {
      setCooldownPhone((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [cooldownPhone]);

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
    // Ao sair da etapa 3 (segurança), disparamos o OTP do EMAIL e vamos para verificação
    if (currentStep === 2) {
      setIsLoading(true);
      try {
        const { email } = form.getValues();
        await sendEmailConfirmationCode(email);
        setOtpPhase('EMAIL');
        setEmailVerified(false);
        setPhoneVerified(false);
        setEmailOtp('');
        setPhoneOtp('');
        setCooldownEmail(60);
        setCurrentStep(3);
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Erro ao enviar códigos';
        toast.error(msg);
      } finally {
        setIsLoading(false);
      }
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

  // Auto-verificação: ao alcançar 6 dígitos, verificar o canal atual e avançar
  React.useEffect(() => {
    const run = async () => {
      try {
        setVerifying(true);
        if (otpPhase === 'EMAIL') {
          const key = form.getValues('email');
          await verifyOtp(key, emailOtp);
          setEmailVerified(true);
          // Após verificar email, enviar OTP de telefone e alternar fase
          const phoneMasked = form.getValues('phoneNumber');
          await sendPhoneConfirmationCode(phoneMasked);
          setCooldownPhone(60);
          setOtpPhase('PHONE');
          setPhoneOtp('');
          toast.success('Email verificado com sucesso');
        } else {
          const key = unmask(form.getValues('phoneNumber'));
          await verifyOtp(key, phoneOtp);
          setPhoneVerified(true);
          toast.success('Telefone verificado com sucesso');
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Código inválido';
        toast.error(msg);
        if (otpPhase === 'EMAIL') setEmailOtp('');
        else setPhoneOtp('');
      } finally {
        setVerifying(false);
      }
    };

    if (currentStep === 3) {
      if (
        otpPhase === 'EMAIL' &&
        emailOtp.length === 6 &&
        !emailVerified &&
        !verifying
      ) {
        void run();
      }
      if (
        otpPhase === 'PHONE' &&
        phoneOtp.length === 6 &&
        !phoneVerified &&
        !verifying
      ) {
        void run();
      }
    }
  }, [
    currentStep,
    otpPhase,
    emailOtp,
    phoneOtp,
    emailVerified,
    phoneVerified,
    verifying,
    form,
  ]);

  const StepContents = [
    <div key="step-0" className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sobrenome</FormLabel>
              <FormControl>
                <Input placeholder="Sobrenome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input
                  placeholder="000.000.000-00"
                  value={field.value}
                  onChange={(e) => field.onChange(maskCPF(e.target.value))}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                  inputMode="numeric"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de Nascimento</FormLabel>
              <FormControl>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      type="button"
                      className="justify-between font-normal h-9"
                      onClick={() => setOpen(!open)}
                    >
                      {field.value
                        ? field.value.toLocaleDateString()
                        : 'Selecionar Data'}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      captionLayout="dropdown"
                      onSelect={(val) => {
                        if (val) field.onChange(val);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gênero</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="cursor-pointer w-full">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gênero</SelectLabel>
                      <SelectItem className="cursor-pointer" value="MALE">
                        Masculino
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="FEMALE">
                        Feminino
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="OTHER">
                        Outro
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>,
    <div key="step-1" className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Endereço de Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={field.value}
                  onChange={(e) => field.onChange(maskPhoneBR(e.target.value))}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                  inputMode="numeric"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>,
    <div key="step-2" className="grid gap-4">
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Senha</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  placeholder="********"
                  type={showPassword ? 'text' : 'password'}
                  {...field}
                  className="pr-10"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirmar Senha</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  placeholder="********"
                  type={showPassword ? 'text' : 'password'}
                  {...field}
                  className="pr-10"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>,
    // Step 3: Verificação sequencial (Email depois Telefone)
    <div key="step-3" className="grid gap-6">
      <div>
        <FormLabel>
          {otpPhase === 'EMAIL'
            ? 'Código de verificação (Email)'
            : 'Código de verificação (Telefone)'}
        </FormLabel>
        <div className="flex flex-col items-start gap-2">
          <div className="w-full flex justify-center">
            <InputOTP
              maxLength={6}
              value={otpPhase === 'EMAIL' ? emailOtp : phoneOtp}
              onChange={otpPhase === 'EMAIL' ? setEmailOtp : setPhoneOtp}
              containerClassName="w-full flex justify-center"
            >
              <InputOTPGroup>
                {[0, 1, 2].map((i) => (
                  <InputOTPSlot key={`${otpPhase}-a-${i}`} index={i} />
                ))}
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                {[3, 4, 5].map((i) => (
                  <InputOTPSlot key={`${otpPhase}-b-${i}`} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="flex justify-between w-full">
            <Button
              size="xs"
              type="button"
              variant="link"
              disabled={
                isLoading ||
                verifying ||
                (otpPhase === 'EMAIL' ? cooldownEmail > 0 : cooldownPhone > 0)
              }
              onClick={async () => {
                try {
                  if (otpPhase === 'EMAIL') {
                    const { email } = form.getValues();
                    await sendEmailConfirmationCode(email);
                    setCooldownEmail(60);
                  } else {
                    const { phoneNumber } = form.getValues();
                    await sendPhoneConfirmationCode(phoneNumber);
                    setCooldownPhone(60);
                  }
                } catch (e) {
                  toast.error(
                    e instanceof Error ? e.message : 'Erro ao reenviar código'
                  );
                }
              }}
            >
              {otpPhase === 'EMAIL'
                ? cooldownEmail > 0
                  ? `Reenviar (${cooldownEmail})`
                  : 'Reenviar código'
                : cooldownPhone > 0
                ? `Reenviar (${cooldownPhone})`
                : 'Reenviar código'}
            </Button>
          </div>
          {verifying && (
            <div className="mt-2 text-sm text-muted-foreground">
              Validando código...
            </div>
          )}
          {emailVerified && otpPhase === 'PHONE' && (
            <div className="mt-2 text-sm text-green-600">
              Email verificado. Agora verifique seu telefone.
            </div>
          )}
        </div>
      </div>
    </div>,
  ];

  return (
    <Card className="w-full max-w-2xl px-0 py-6.5 gap-10 rounded-3xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Criar conta</CardTitle>
        <CardDescription>
          {steps[currentStep].description ??
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
