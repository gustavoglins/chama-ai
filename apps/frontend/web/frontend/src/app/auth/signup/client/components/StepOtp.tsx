'use client';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp';
import { Clipboard, Loader2, ChevronLeft } from 'lucide-react';

interface Props {
  otp: string;
  setOtp: (v: string) => void;
  loading: boolean;
  cooldown: number;
  onResend: () => void;
  onBack: () => void;
  isEmail: boolean;
  onPaste: () => void;
}

export function StepOtp({
  otp,
  setOtp,
  loading,
  cooldown,
  onResend,
  onBack,
  isEmail,
  onPaste,
}: Props) {
  const handleGroupPaste = (e: React.ClipboardEvent) => {
    const data = e.clipboardData.getData('text');
    if (!data) return;
    const digits = data.replace(/\D/g, '').slice(0, 6);
    if (digits) {
      e.preventDefault();
      setOtp(digits);
    }
  };
  return (
    <div className="w-full max-w-md">
      <div
        className="flex items-center mb-5 bg-neutral-100 w-fit pl-0.5 p-1 rounded-full cursor-pointer"
        onClick={onBack}
      >
        <ChevronLeft className="w-5 h-5" />
      </div>
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-[1.625rem] font-bold">Introduza o Código</h1>
        <p className="text-sm text-muted-foreground">
          Por favor, introduza o código de 6 dígitos que enviamos para{' '}
          {isEmail ? 'o seu email' : 'o seu telefone'}.
        </p>
      </div>
      <div className="flex flex-col w-full items-center mb-4">
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={(value) => setOtp(value)}
          containerClassName="w-full flex justify-center"
          className="w-full"
        >
          <InputOTPGroup className="flex gap-0" onPaste={handleGroupPaste}>
            {[0, 1, 2].map((i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="h-10 w-11 md:h-11 md:w-15 text-base md:text-lg font-normal"
              />
            ))}
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup className="flex gap-0" onPaste={handleGroupPaste}>
            {[3, 4, 5].map((i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="h-10 w-11 md:h-11 md:w-15 text-base md:text-lg font-normal"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="flex justify-between mt-5">
        <Button
          type="button"
          size="xs"
          variant="secondary"
          onClick={onPaste}
          disabled={loading}
        >
          <Clipboard className="w-5 h-5" />
          Colar Código
        </Button>
        <Button
          size="xs"
          type="button"
          variant="link"
          disabled={cooldown > 0}
          onClick={onResend}
        >
          {cooldown > 0 ? `Reenviar Código (${cooldown})` : 'Reenviar Código'}
        </Button>
      </div>
      {loading && (
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Validando...
        </div>
      )}
    </div>
  );
}
