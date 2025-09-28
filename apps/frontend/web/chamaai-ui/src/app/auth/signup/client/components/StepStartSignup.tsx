'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ApiResponseStatus } from '@/interfaces/api.interface';
import { startSignup } from '@/services/user.api';
import {
  StartClientSignupSchema,
  StartClientSignupType,
} from '@/validators/formValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface StepStartSignupProps {
  onSuccess?: () => void;
}

export default function StepStartSignup({ onSuccess }: StepStartSignupProps) {
  const form = useForm<StartClientSignupType>({
    resolver: zodResolver(StartClientSignupSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: StartClientSignupType) {
    try {
      const response = await startSignup({ email: values.email });
      console.log(response);

      if (response.status === ApiResponseStatus.SUCCESS) {
        localStorage.setItem('signupEmail', values.email);
        onSuccess?.();
      }
    } catch (error) {
      toast.error('Erro ao enviar código de verificação. Tente novamente.');
      console.error('Error in client signup:', error);
    }
  }

  return (
    <div className="w-full max-w-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="voce@dominio.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Continuar
          </Button>
        </form>
      </Form>
      <Separator className="mt-5 mb-5 self-center" />
      <Button size="lg" variant="outline" className="w-full flex gap-2">
        <Image
          src="/google-icon.svg"
          alt="Google Logo Icon"
          width={20}
          height={20}
          className="h-5 w-auto object-contain"
          priority
        />
        Iniciar sessão com o Google
      </Button>
    </div>
  );
}
