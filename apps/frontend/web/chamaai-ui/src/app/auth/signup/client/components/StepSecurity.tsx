"use client";

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
import {
  ClientSignupOnlyPersonalDataType,
  ClientSignupSecuritySchema,
  ClientSignupSecurityType,
} from '@/validators/formValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface StepSecurityProps {
  personalData: ClientSignupOnlyPersonalDataType | null;
  onSubmit: (values: ClientSignupSecurityType) => Promise<void> | void;
  onBack?: () => void;
  isSubmitting?: boolean;
}

export default function StepSecurity({
  personalData,
  onSubmit,
  onBack,
  isSubmitting = false,
}: StepSecurityProps) {
  const form = useForm<ClientSignupSecurityType>({
    resolver: zodResolver(ClientSignupSecuritySchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function handleSubmit(values: ClientSignupSecurityType) {
    if (!personalData) {
      toast.error(
        'Dados pessoais não encontrados. Volte e preencha novamente.'
      );
      onBack?.();
      return;
    }

    await onSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="form">
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    autoComplete="new-password"
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
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="********"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="w-full sm:flex-1"
            disabled={form.formState.isSubmitting || isSubmitting}
          >
            Voltar
          </Button>
          <Button
            type="submit"
            className="w-full sm:flex-1"
            disabled={form.formState.isSubmitting || isSubmitting}
          >
            {form.formState.isSubmitting || isSubmitting
              ? 'Finalizando...'
              : 'Finalizar'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
