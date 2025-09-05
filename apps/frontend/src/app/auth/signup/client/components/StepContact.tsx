'use client';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { Smartphone, Mail, Loader2 } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { ClientSignupContactType } from '@/validators/formValidator';

interface Props {
  form: UseFormReturn<ClientSignupContactType>;
  isEmail: boolean;
  onToggle: () => void;
  onSubmit: (data: ClientSignupContactType) => Promise<void> | void;
  loading: boolean;
}

export function StepContact({
  form,
  isEmail,
  onToggle,
  onSubmit,
  loading,
}: Props) {
  return (
    <div className="w-full max-w-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-1"
        >
          {isEmail ? (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Email</FormLabel>
                    <a
                      className="ml-auto inline-block text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        onToggle();
                        form.setValue('email', '');
                      }}
                    >
                      <div className="flex gap-1 items-center">
                        <Smartphone className="h-3.5 w-3.5" />
                        Usar Telefone
                      </div>
                    </a>
                  </div>
                  <FormControl>
                    <Input placeholder="voce@dominio.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Telefone</FormLabel>
                    <a
                      className="ml-auto inline-block text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        onToggle();
                        form.setValue('phoneNumber', '');
                      }}
                    >
                      <div className="flex gap-1 items-center">
                        <Mail className="h-3.5 w-3.5" />
                        Usar Email
                      </div>
                    </a>
                  </div>
                  <FormControl>
                    <Input
                      placeholder="(99) 99999-9999"
                      inputMode="numeric"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button
            className="mt-2"
            size="lg"
            type="submit"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Carregando
              </>
            ) : isEmail ? (
              'Continuar com o Email'
            ) : (
              'Continuar com Telefone'
            )}
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
