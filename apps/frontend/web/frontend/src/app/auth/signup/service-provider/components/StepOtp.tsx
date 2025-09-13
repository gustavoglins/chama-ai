'use client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  sendEmailConfirmationCode,
  sendPhoneConfirmationCode,
  verifyOtp,
} from '@/services/auth';
import { Loader2, RefreshCcw, ShieldCheck, Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Phase = 'EMAIL' | 'PHONE' | 'DONE';

interface Props {
  email: string;
  phoneNumber: string;
  onAllVerified: () => void;
  isActive?: boolean;
}

export function StepOtp({
  email,
  phoneNumber,
  onAllVerified,
  isActive = true,
}: Props) {
  const [phase, setPhase] = useState<Phase>('EMAIL');
  const [emailCode, setEmailCode] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [cooldownEmail, setCooldownEmail] = useState(0);
  const [cooldownPhone, setCooldownPhone] = useState(0);
  const sentOnce = useRef(false);

  useEffect(() => {
    if (!isActive) return;
    if (!sentOnce.current) {
      sentOnce.current = true;
      void (async () => {
        try {
          setSending(true);
          await sendEmailConfirmationCode(email);
          setCooldownEmail(60);
          toast.success('Código enviado para o e-mail');
        } catch {
          toast.error('Falha ao enviar código por e-mail');
        } finally {
          setSending(false);
        }
      })();
    }
  }, [email, isActive]);

  useEffect(() => {
    if (cooldownEmail > 0) {
      const t = setTimeout(() => setCooldownEmail((c) => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [cooldownEmail]);
  useEffect(() => {
    if (cooldownPhone > 0) {
      const t = setTimeout(() => setCooldownPhone((c) => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [cooldownPhone]);

  useEffect(() => {
    if (!isActive) return;
    const tryVerify = async () => {
      if (phase === 'EMAIL' && emailCode.length === 6) {
        setVerifying(true);
        try {
          await verifyOtp(email, emailCode);
          toast.success('E-mail verificado');
          setPhase('PHONE');
          setEmailCode('');
          setSending(true);
          await sendPhoneConfirmationCode(phoneNumber);
          setCooldownPhone(60);
          toast.success('Código enviado por WhatsApp');
        } catch {
          toast.error('Código de e-mail inválido');
          setEmailCode('');
        } finally {
          setVerifying(false);
          setSending(false);
        }
      } else if (phase === 'PHONE' && phoneCode.length === 6) {
        setVerifying(true);
        try {
          await verifyOtp(phoneNumber.replace(/\D/g, ''), phoneCode);
          toast.success('Telefone verificado');
          setPhase('DONE');
          onAllVerified();
        } catch {
          toast.error('Código de telefone inválido');
          setPhoneCode('');
        } finally {
          setVerifying(false);
        }
      }
    };
    void tryVerify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailCode, phoneCode, phase, isActive]);

  const resend = async () => {
    try {
      setSending(true);
      if (phase === 'EMAIL') {
        await sendEmailConfirmationCode(email);
        setCooldownEmail(60);
      } else if (phase === 'PHONE') {
        await sendPhoneConfirmationCode(phoneNumber);
        setCooldownPhone(60);
      }
      toast.success('Código reenviado');
    } catch {
      toast.error('Falha ao reenviar código');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full md:max-w-xl mx-auto">
      <div className="flex flex-col gap-6 items-center text-center">
        <div className="flex items-center justify-center gap-3">
          <div
            className={cn(
              'flex items-center gap-2',
              phase !== 'EMAIL' && 'opacity-50'
            )}
          >
            <ShieldCheck className="h-4 w-4" />
            <span className="text-sm">E-mail</span>
            {(phase === 'PHONE' || phase === 'DONE') && (
              <Badge variant="secondary" title="E-mail verificado">
                <Check className="h-3 w-3" /> Verificado
              </Badge>
            )}
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div
            className={cn(
              'flex items-center gap-2',
              phase !== 'PHONE' && 'opacity-50'
            )}
          >
            <ShieldCheck className="h-4 w-4" />
            <span className="text-sm">Telefone</span>
            {phase === 'DONE' && (
              <Badge variant="secondary" title="Telefone verificado">
                <Check className="h-3 w-3" /> Verificado
              </Badge>
            )}
          </div>
        </div>

        {phase === 'EMAIL' && (
          <div className="space-y-3 w-full">
            <p className="text-sm text-muted-foreground text-center">
              Digite o código recebido em {email}.
            </p>
            <InputOTP
              maxLength={6}
              value={emailCode}
              onChange={setEmailCode}
              disabled={verifying}
              containerClassName="justify-center"
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
        )}

        {phase === 'PHONE' && (
          <div className="space-y-3 w-full">
            <p className="text-sm text-muted-foreground text-center">
              Digite o código recebido no WhatsApp {phoneNumber}.
            </p>
            <InputOTP
              maxLength={6}
              value={phoneCode}
              onChange={setPhoneCode}
              disabled={verifying}
              containerClassName="justify-center"
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
        )}

        <div className="flex items-center justify-center gap-3 mt-2">
          <Button
            variant="outline"
            type="button"
            onClick={resend}
            disabled={
              sending ||
              verifying ||
              (phase === 'EMAIL' ? cooldownEmail > 0 : cooldownPhone > 0)
            }
          >
            {sending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enviando
              </>
            ) : (
              <>
                <RefreshCcw className="h-4 w-4" />
                Reenviar{' '}
                {phase === 'EMAIL'
                  ? `(${cooldownEmail}s)`
                  : `(${cooldownPhone}s)`}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
