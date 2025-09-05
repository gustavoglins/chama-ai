'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { LoginSchema, LoginType } from '@/validators/formValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { login } from '@/services/auth';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginType) => {
    setIsLoading(true);
    try {
      const response = await login(data);
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth-token', response.token);
      } else {
        toast.error('Ocorreu um erro inesperado. Tente novamente');
        return;
      }
      router.push('/app');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha no login';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm px-0 py-6.5 gap-10 rounded-3xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Bem vindo de volta</CardTitle>
        <CardDescription>Faça login para acessar sua conta.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 md:gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Endereço de Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col mb-2.5">
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
                          onClick={() => setShowPassword((p) => !p)}
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
                name="rememberMe"
                render={() => (
                  <FormItem>
                    <div className="flex w-full justify-between">
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            id="remember-me"
                            className="cursor-pointer"
                          />
                        </FormControl>
                        <FormLabel className="font-light">
                          Lembrar de mim
                        </FormLabel>
                      </div>
                      <Link
                        href="/auth/reset-password"
                        className="text-sm hover:underline"
                      >
                        Redefinir senha
                      </Link>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <Button
              size="xl"
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Carregando' : 'Entrar'}
            </Button>
            <p className="text-center pt-3 text-xs text-muted-foreground leading-relaxed">
              Primeira vez aqui?{' '}
              <Link className="underline text-primary" href="/auth/signup">
                Criar conta
              </Link>
            </p>
          </form>
        </Form>
        <Separator className="m-5 self-center" />
        <Button size="lg" variant="outline" className="w-full flex gap-2">
          <Image
            src="/google-icon.svg"
            alt="Google Logo Icon"
            width={1000}
            height={1000}
            className="h-5 w-auto object-contain hover:scale-115 active:scale-100 transition-all duration-300 ease-in-out"
            priority
          />
          Iniciar sessão com o Google
        </Button>
      </CardContent>
    </Card>
  );
}
