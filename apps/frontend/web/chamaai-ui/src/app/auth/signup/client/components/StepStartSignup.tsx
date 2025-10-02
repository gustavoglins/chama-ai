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
import { translateError } from '@/lib/errors/error-utils';
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
  onSuccess?: (email: string) => void;
}

export default function StepStartSignup({ onSuccess }: StepStartSignupProps) {
  const form = useForm<StartClientSignupType>({
    resolver: zodResolver(StartClientSignupSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: StartClientSignupType) {
    const trimmedEmail = values.email.trim().toLowerCase();
    try {
      const response = await startSignup({ email: trimmedEmail });

      if (response.status === ApiResponseStatus.SUCCESS) {
        localStorage.setItem('signupEmail', trimmedEmail);
        toast.success('Código de verificação enviado para o seu email.');
        onSuccess?.(trimmedEmail);
        return;
      }

      const userFriendlyErrorMessage = translateError(response.message);
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
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Enviando...' : 'Continuar'}
          </Button>
        </form>
      </Form>
      <Separator className="mt-5 mb-5 self-center" />
      <Button
        type="button"
        size="lg"
        variant="outline"
        className="w-full flex gap-2"
        onClick={() =>
          toast.info('Login com o Google estará disponível em breve.')
        }
      >
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
