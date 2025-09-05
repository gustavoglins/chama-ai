'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Mail, Smartphone, Loader2 } from 'lucide-react';

import { maskPhoneBR, unmask } from '@/lib/masks';
import { resetPasswordFormSchema } from '@/validators/formValidator';
import {
  sendEmailConfirmationCode,
  sendPhoneConfirmationCode,
  verifyOtp,
  resetPassword,
} from '@/services/auth';
import Link from 'next/link';

type Step = 0 | 1 | 2;
type ResetPasswordFormType = z.infer<typeof resetPasswordFormSchema>;

export default function ResetPasswordPage() {
  const [step, setStep] = useState<Step>(0);
  const [otpKey, setOtpKey] = useState<string | null>(null);
  const [otp, setOtp] = useState('');
  const [resendIn, setResendIn] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [isEmail, setIsEmail] = useState(true);

  const form = useForm<ResetPasswordFormType>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      email: '',
      phoneNumber: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  // Toggle helper to keep fields mutually exclusive
  const toggleChannel = () => {
    setIsEmail((prev) => {
      const next = !prev;
      if (next) {
        form.setValue('phoneNumber', '');
      } else {
        form.setValue('email', '');
      }
      return next;
    });
  };

  useEffect(() => {
    if (step !== 1 || resendIn > 0) return;
    // auto-send OTP when entering step 1
    void handleSendOtp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setInterval(() => setResendIn((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [resendIn]);

  const titleByStep: Record<Step, string> = {
    0: 'Redefinir senha',
    1: 'Verificação de segurança',
    2: 'Nova senha',
  };
  const descriptionByStep: Record<Step, string> = {
    0: 'Informe seu email ou telefone para receber um código de verificação.',
    1: 'Enviamos um código para confirmar sua identidade.',
    2: 'Defina sua nova senha para acessar sua conta.',
  };

  async function handleSendOtp() {
    const { email, phoneNumber } = form.getValues();
    if (!email && !phoneNumber) {
      toast.error('Informe email ou telefone');
      return;
    }
    setIsSending(true);
    try {
      if (isEmail && email) {
        await sendEmailConfirmationCode(email);
        toast.success('Código enviado para seu email');
      } else if (!isEmail && phoneNumber) {
        const digits = unmask(phoneNumber);
        await sendPhoneConfirmationCode(digits);
        toast.success('Código enviado por WhatsApp');
      }
      setResendIn(60);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Falha ao enviar código';
      toast.error(message);
    } finally {
      setIsSending(false);
    }
  }

  async function handleVerifyOtp(code: string) {
    const { email, phoneNumber } = form.getValues();
    const key = isEmail ? email : unmask(phoneNumber || '');
    if (!key) return;
    try {
      const res = await verifyOtp(key, code);
      // Assume backend returns a token for reset in the verify response
      const token =
        res?.token ||
        res?.data?.token ||
        res?.resetToken ||
        res?.data?.resetToken ||
        null;
      if (!token) {
        throw new Error('Token não recebido na verificação');
      }
      setOtpKey(token);
      toast.success('Verificação concluída');
      setStep(2);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Código inválido';
      toast.error(message);
    }
  }

  function onSubmitStep0() {
    if (isEmail) {
      const e = form.getValues('email');
      if (!e) {
        form.trigger('email');
        toast.error('Informe seu email');
        return;
      }
      form.setValue('phoneNumber', '');
    } else {
      const p = form.getValues('phoneNumber');
      if (!p) {
        form.trigger('phoneNumber');
        toast.error('Informe seu telefone');
        return;
      }
      form.setValue('email', '');
    }
    setStep(1);
  }

  async function onSubmitStep2(values: ResetPasswordFormType) {
    if (!otpKey) {
      toast.error('Verifique o código antes de continuar');
      return;
    }
    if (!values.newPassword) {
      await form.trigger(['newPassword', 'confirmPassword']);
      toast.error('Informe a nova senha');
      return;
    }
    try {
      await resetPassword({ token: otpKey, newPassword: values.newPassword });
      toast.success('Senha redefinida com sucesso');
      // Optionally redirect to login
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Erro ao redefinir senha';
      toast.error(message);
    }
  }

  return (
    // <div className="container mx-auto max-w-3xl px-4 py-10">
    <div className="flex flex-col items-center w-full">
      <Card className="w-full max-w-sm px-0 py-6.5 gap-10 rounded-3xl">
        <CardHeader className="text-left flex flex-col gap-1">
          <CardTitle className="text-[1.625rem] font-bold">
            {titleByStep[step]}
          </CardTitle>
          <CardDescription>{descriptionByStep[step]}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            {step === 0 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmitStep0();
                }}
                className="space-y-6"
              >
                <div className="grid gap-4">
                  {isEmail ? (
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="email">Email</Label>
                        <a
                          className="ml-auto inline-block text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleChannel();
                            form.setValue('email', '');
                          }}
                        >
                          <div className="flex gap-1 items-center">
                            <Smartphone className="h-3.5 w-3.5" />
                            Usar Telefone
                          </div>
                        </a>
                      </div>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                id="email"
                                placeholder="voce@dominio.com"
                                type="email"
                                value={field.value || ''}
                                onChange={(e) => field.onChange(e.target.value)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ) : (
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="phoneNumber">Telefone</Label>
                        <a
                          className="ml-auto inline-block text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleChannel();
                            form.setValue('phoneNumber', '');
                          }}
                        >
                          <div className="flex gap-1 items-center">
                            <Mail className="h-3.5 w-3.5" />
                            Usar Email
                          </div>
                        </a>
                      </div>
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                id="phoneNumber"
                                placeholder="(99) 99999-9999"
                                inputMode="numeric"
                                value={maskPhoneBR(field.value || '')}
                                onChange={(e) =>
                                  field.onChange(maskPhoneBR(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-end gap-3">
                    <Button className="w-full" size="lg" type="submit">
                      Continuar
                    </Button>
                  </div>
                  <p className="text-center pt-3 text-xs text-muted-foreground leading-relaxed">
                    Primeira vez aqui?{' '}
                    <Link
                      className="underline text-primary"
                      href="/auth/signup"
                    >
                      Criar conta
                    </Link>
                  </p>
                </div>
              </form>
            )}

            {step === 1 && (
              <div className="mx-auto w-full md:max-w-xl text-center">
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground">
                    Enviamos um código para:
                  </p>
                  <p className="font-medium">
                    {isEmail
                      ? form.getValues('email')
                      : maskPhoneBR(form.getValues('phoneNumber') || '')}
                  </p>
                </div>

                <div className="flex justify-center">
                  <InputOTP
                    value={otp}
                    onChange={setOtp}
                    maxLength={6}
                    containerClassName="justify-center"
                    onComplete={(val) => handleVerifyOtp(val)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <div className="mt-6 flex items-center justify-center gap-4">
                  <Button variant="outline" onClick={() => setStep(0)}>
                    Voltar
                  </Button>
                  <Button
                    onClick={handleSendOtp}
                    disabled={isSending || resendIn > 0}
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Enviando...
                      </>
                    ) : resendIn > 0 ? (
                      `Reenviar em ${resendIn}s`
                    ) : (
                      'Reenviar código'
                    )}
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <form
                onSubmit={form.handleSubmit(onSubmitStep2)}
                className="space-y-6 md:max-w-xl mx-auto"
              >
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Nova senha</Label>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
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
                      <Label>Confirmar senha</Label>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    Voltar
                  </Button>
                  <Button type="submit">Salvar nova senha</Button>
                </div>
              </form>
            )}
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
