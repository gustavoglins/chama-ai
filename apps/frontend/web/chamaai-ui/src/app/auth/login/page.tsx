'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
import { LoginSchema, LoginType } from '@/validators/formValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function LoginPage() {
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  function onSubmit(values: LoginType) {}

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Por favor preencha seus dados para iniciar sessão
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="form">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="voce@dominio.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        id="rememberMe"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor="rememberMe"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Lembrar de mim
                    </FormLabel>
                  </FormItem>
                )}
              />
              <Link
                href="/auth/forgot-password"
                className="text-xs hover:underline"
              >
                Redefinir senha
              </Link>
            </div>
            <Button type="submit" size="lg" className="w-full">
              Continuar
            </Button>
            <div className="text-center text-xs text-muted-foreground">
              Primeira vez aqui?{' '}
              <Link href="/auth/signup" className="underline text-foreground">
                Criar conta
              </Link>
            </div>
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
      </CardContent>
    </Card>
  );
}
