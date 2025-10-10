'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Suspense } from 'react';

const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'A senha deve ter pelo menos 8 caracteres')
      .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
      .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
      .regex(/[0-9]/, 'A senha deve conter pelo menos um número'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const form = useForm<ResetPasswordType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: ResetPasswordType) {
    try {
      if (!token) {
        toast.error('Token inválido ou expirado');
        return;
      }

      // TODO: Implementar chamada à API para redefinir senha
      console.log('Nova senha:', values.password);
      console.log('Token:', token);

      toast.success('Senha redefinida com sucesso!');

      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (error) {
      toast.error('Erro ao redefinir senha. Tente novamente.');
    }
  }

  if (!token) {
    return (
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>Link Inválido</CardTitle>
          <CardDescription>
            Este link de recuperação é inválido ou expirou
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href="/auth/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Solicitar novo link de recuperação
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Redefinir Senha</CardTitle>
        <CardDescription>Digite sua nova senha abaixo</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova Senha</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
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
                  <FormLabel>Confirmar Senha</FormLabel>
                  <FormControl>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full">
              Redefinir Senha
            </Button>
            <div className="text-center">
              <Link
                href="/auth/login"
                className="text-sm text-muted-foreground hover:text-primary hover:underline"
              >
                Voltar para o login
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
