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
import { verifyOtp } from '@/services/auth.api';
import { VerifyOtpSchema, VerifyOtpType } from '@/validators/formValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Clipboard } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface StepOtpVerificationProps {
  onSuccess?: () => void;
}

export default function StepOtpVerification({
  onSuccess,
}: StepOtpVerificationProps) {
  const [otp, setOtp] = useState<string>('');
  const handleGroupPaste = (e: React.ClipboardEvent) => {
    const data = e.clipboardData.getData('text');
    if (!data) return;
    const digits = data.replace(/\D/g, '').slice(0, 6);
    if (digits) {
      e.preventDefault();
      setOtp(digits);
    }
  };

  const form = useForm<VerifyOtpType>({
    resolver: zodResolver(VerifyOtpSchema),
    defaultValues: {
      otp: '',
    },
  });

  // OTP trigger when complete (entered 6 digits)
  useEffect(() => {
    if (otp.length === 6) {
      form.setValue('otp', otp);
      form.handleSubmit(handleSubmit)();
    }
  }, [otp, form]);

  async function handleSubmit(values: VerifyOtpType) {
    const userEmail = localStorage.getItem('signupEmail');
    if (!userEmail) {
      toast.error('Email não encontrado. Por favor, reinicie o cadastro.');
      return;
    }
    try {
      const response = await verifyOtp({
        login: userEmail,
        otp: Number(values.otp),
      });

      if (response.status === ApiResponseStatus.SUCCESS) {
        onSuccess?.();
      }
    } catch (error) {
      toast.error('Erro ao validar código de verificação. Tente novamente.');
      console.error('Error in OTP validation:', error);
    }
  }

  return (
    <div className="w-full max-w-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
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
          <div className="flex justify-between mt-5">
            <Button
              type="button"
              variant="secondary"
              size="xs"
              className="w-fit"
            >
              <Clipboard className="h-4 w-4" />
              Colar código
            </Button>
            <Button type="button" variant="link" size="xs">
              Reenviar código
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
