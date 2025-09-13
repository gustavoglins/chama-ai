'use client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { StepContact } from './components/StepContact';
import { StepOtp } from './components/StepOtp';
import { StepPersonal } from './components/StepPersonal';
import { StepSecurity } from './components/StepSecurity';
import { useClientSignupFlow, SignupStep } from './hooks';
import { maskPhoneBR } from '@/lib/masks';

export default function ClientSignupPage() {
  const {
    step,
    SignupStep: StepEnum,
    isEmail,
    toggleChannel,
    loading,
    otp,
    setOtp,
    otpCooldown,
    requestOtp,
    setOtpCooldown,
    contactForm,
    personalForm,
    securityForm,
    submitPersonal,
    finalizeSignup,
    showPassword,
    setShowPassword,
    setStep,
  } = useClientSignupFlow();

  // Adapt phone masking at input level
  contactForm.register('phoneNumber', {
    onChange: (e) => {
      const masked = maskPhoneBR(e.target.value);
      contactForm.setValue('phoneNumber', masked);
    },
  });

  return (
    <div className="flex flex-col items-center w-full">
      {step === StepEnum.CONTACT && (
        <Card className="w-full max-w-sm px-0 py-6.5 gap-10 rounded-3xl">
          <CardHeader className="text-left flex flex-col gap-1">
            <CardTitle className="text-[1.625rem] font-bold">
              Criar conta
            </CardTitle>
            <CardDescription>
              Por favor preencha seus dados para iniciar o cadastro.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StepContact
              form={contactForm}
              isEmail={isEmail}
              onToggle={toggleChannel}
              loading={loading}
              onSubmit={async (data) => {
                if (isEmail && !data.email)
                  return contactForm.setError('email', {
                    type: 'required',
                    message: 'O email é obrigatório',
                  });
                if (!isEmail && !data.phoneNumber)
                  return contactForm.setError('phoneNumber', {
                    type: 'required',
                    message: 'O telefone é obrigatório',
                  });
                await requestOtp();
              }}
            />
          </CardContent>
        </Card>
      )}

      {step === StepEnum.OTP && (
        <Card className="w-full max-w-md px-0 py-6.5 gap-10 rounded-3xl">
          <CardContent>
            <StepOtp
              otp={otp}
              setOtp={setOtp}
              loading={loading}
              cooldown={otpCooldown}
              onResend={() => {
                requestOtp();
                setOtpCooldown(60);
              }}
              onBack={() => setStep(SignupStep.CONTACT)}
              isEmail={isEmail}
              onPaste={async () => {
                if (!navigator?.clipboard?.readText) return;
                const raw = await navigator.clipboard.readText();
                const digits = raw.replace(/\D/g, '').slice(0, 6);
                if (digits) setOtp(digits);
              }}
            />
          </CardContent>
        </Card>
      )}

      {step === StepEnum.PERSONAL && (
        <Card className="w-full max-w-md px-0 py-6.5 gap-10 rounded-3xl">
          <CardContent>
            <StepPersonal
              form={personalForm}
              onSubmit={submitPersonal}
              loading={loading}
            />
          </CardContent>
        </Card>
      )}

      {step === StepEnum.SECURITY && (
        <Card className="w-full max-w-md px-0 py-6.5 gap-10 rounded-3xl">
          <CardContent>
            <StepSecurity
              form={securityForm}
              onSubmit={finalizeSignup}
              loading={loading}
              showPassword={showPassword}
              toggleShow={() => setShowPassword((p) => !p)}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
