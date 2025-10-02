'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { ApiResponseStatus } from '@/interfaces/api.interface';
import { translateError } from '@/lib/errors/error-utils';
import { verifyOtp } from '@/services/auth.api';
import { startSignup } from '@/services/user.api';
import { VerifyOtpSchema, VerifyOtpType } from '@/validators/formValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Clipboard } from 'lucide-react';
import type { ClipboardEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface StepOtpVerificationProps {
  email?: string | null;
  onSuccess?: () => void;
  onBack?: () => void;
}

export default function StepOtpVerification({
  email,
  onSuccess,
  onBack,
}: StepOtpVerificationProps) {
  const [otp, setOtp] = useState<string>('');
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const [isResending, setIsResending] = useState(false);

  const handleGroupPaste = (event: ClipboardEvent<HTMLDivElement>) => {
    const data = event.clipboardData.getData('text');
    if (!data) return;
    const digits = data.replace(/\D/g, '').slice(0, 6);
    if (digits) {
      event.preventDefault();
      setOtp(digits);
    }
  };

  const form = useForm<VerifyOtpType>({
    resolver: zodResolver(VerifyOtpSchema),
    defaultValues: {
      otp: '',
    },
  });

  useEffect(() => {
    if (!resendCooldown) return;
    const interval = setInterval(() => {
      setResendCooldown((value) => (value > 0 ? value - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const handleVerify = useCallback(
    async (values: VerifyOtpType) => {
      const userEmail = email ?? localStorage.getItem('signupEmail');

      if (!userEmail) {
        toast.error('Email não encontrado. Por favor, reinicie o cadastro.');
        onBack?.();
        return;
      }

      try {
        const response = await verifyOtp({
          login: userEmail,
          otp: Number(values.otp),
        });

        if (response.status === ApiResponseStatus.SUCCESS) {
          toast.success('Código validado com sucesso.');
          onSuccess?.();
          return;
        }

        const userFriendlyErrorMessage = translateError(response.message);
        form.setError('otp', { message: userFriendlyErrorMessage });
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
        console.error('Error in OTP validation:', error);
      }
    },
    [email, form, onBack, onSuccess]
  );

  // OTP trigger when complete (entered 6 digits)
  useEffect(() => {
    if (otp.length === 6 && !form.formState.isSubmitting) {
      form.setValue('otp', otp);
      form.handleSubmit(handleVerify)();
    }
  }, [otp, form, handleVerify]);

  const handlePasteClick = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      const digits = text.replace(/\D/g, '').slice(0, 6);
      if (!digits) {
        toast.info(
          'Nenhum código numérico encontrado na área de transferência.'
        );
        return;
      }
      setOtp(digits);
    } catch (error) {
      toast.error('Não foi possível acessar a área de transferência.');
      console.error('Clipboard access error:', error);
    }
  }, []);

  const handleResend = useCallback(async () => {
    const userEmail = email ?? localStorage.getItem('signupEmail');

    if (!userEmail) {
      toast.error('Email não encontrado. Volte ao passo anterior.');
      onBack?.();
      return;
    }

    try {
      setIsResending(true);
      const response = await startSignup({ email: userEmail });

      if (response.status === ApiResponseStatus.SUCCESS) {
        toast.success('Novo código enviado.');
        setResendCooldown(60);
      } else {
        const userFriendlyErrorMessage = translateError(response.message);
        toast.error(userFriendlyErrorMessage);
      }
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        const backendErrorMessage = err.response?.data?.message;
        const userMessage = translateError(backendErrorMessage);
        toast.error(userMessage);
      } else {
        toast.error('Erro inesperado. Tente novamente.');
      }
      console.error('Error resending OTP:', error);
    } finally {
      setIsResending(false);
    }
  }, [email, onBack]);

  const resendLabel = useMemo(() => {
    if (resendCooldown > 0) {
      return `Reenviar código em ${resendCooldown}s`;
    }
    return 'Reenviar código';
  }, [resendCooldown]);

  return (
    <div className="w-full max-w-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleVerify)}
          className="flex flex-col gap-1"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="w-full flex justify-center scale-120">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={(value) => {
                        setOtp(value);
                        form.setValue('otp', value);
                      }}
                      containerClassName="flex justify-center items-center"
                      onBlur={field.onBlur}
                    >
                      <InputOTPGroup onPaste={handleGroupPaste}>
                        {[0, 1, 2].map((i) => (
                          <InputOTPSlot key={i} index={i} />
                        ))}
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup onPaste={handleGroupPaste}>
                        {[3, 4, 5].map((i) => (
                          <InputOTPSlot key={i} index={i} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center mt-5">
            <Button
              type="button"
              variant="secondary"
              size="xs"
              className="w-fit"
              onClick={handlePasteClick}
              disabled={form.formState.isSubmitting}
            >
              <Clipboard className="h-4 w-4" />
              Colar código
            </Button>
            <div className="flex items-center gap-2">
              {onBack && (
                <Button
                  type="button"
                  variant="ghost"
                  size="xs"
                  onClick={onBack}
                  disabled={form.formState.isSubmitting}
                >
                  Alterar email
                </Button>
              )}
              <Button
                type="button"
                variant="link"
                size="xs"
                onClick={handleResend}
                disabled={resendCooldown > 0 || isResending}
              >
                {isResending ? 'Reenviando...' : resendLabel}
              </Button>
            </div>
          </div>
          <Button
            type="submit"
            className="mt-6"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Validando...' : 'Validar código'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
