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
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { ClientSignupSecurityType } from '@/validators/formValidator';

interface Props {
  form: UseFormReturn<ClientSignupSecurityType>;
  onSubmit: () => Promise<void> | void;
  loading: boolean;
  showPassword: boolean;
  toggleShow: () => void;
}

export function StepSecurity({
  form,
  onSubmit,
  loading,
  showPassword,
  toggleShow,
}: Props) {
  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-[1.625rem] font-bold">Proteja sua conta</h1>
        <p className="text-sm text-muted-foreground">
          Crie uma senha segura para a sua conta.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => onSubmit())}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="********"
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      aria-label={
                        showPassword ? 'Ocultar senha' : 'Mostrar senha'
                      }
                      onClick={toggleShow}
                      className="absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
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
                <FormLabel>Confirmar Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="********"
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      aria-label={
                        showPassword ? 'Ocultar senha' : 'Mostrar senha'
                      }
                      onClick={toggleShow}
                      className="absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="mt-4 w-full"
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
            ) : (
              'Finalizar Cadastro'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
