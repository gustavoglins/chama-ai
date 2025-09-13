'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioCardGroup } from '@/components/ui/radio-card';
import { AccountType } from '@/types/AccountType';
import { ChevronLeft, LogIn } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

export default function SignupPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<AccountType | null>(null);

  const handleSelectAccountType = useCallback((selected: AccountType) => {
    setAccountType(selected);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!accountType) {
      toast.warning('Selecione um tipo de conta antes de prosseguir.');
    } else if (accountType === 'client') {
      router.push('/auth/signup/client');
    } else if (accountType === 'service_provider') {
      router.push('/auth/signup/service-provider');
    } else {
      toast.error('Ocorreu um erro inesperado. Por favor tente novamente.');
    }
  }

  return (
    // <Card className="w-full max-w-xl px-14 py-16 gap-8">
    <Card className="w-full max-w-md px-0 py-6.5 gap-10 rounded-3xl">
      <CardHeader className="text-center">
        <Image
          src="/logo.png"
          alt="Chama Ai"
          width={100}
          height={100}
          className="mx-auto mb-4"
        />
        <CardTitle className="text-3xl font-bold">
          Bem-vindo ao Chama Ai
        </CardTitle>
        <CardDescription>
          Serviços rápidos e confiáveis ao seu alcance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2.5">
            <Label>Tipo de conta</Label>
            <RadioCardGroup<AccountType>
              options={[
                {
                  value: 'client',
                  label: 'Quero contratar serviços',
                  badge: 'Cliente',
                },
                {
                  value: 'service_provider',
                  label: 'Quero oferecer meus serviços',
                  badge: 'Profissional',
                },
              ]}
              value={accountType}
              onChange={handleSelectAccountType}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          size="xl"
          type="button"
          className="w-full"
          onClick={handleSubmit}
        >
          Continuar
        </Button>
        <p className="text-center pt-3 text-xs text-muted-foreground leading-relaxed">
          Já tem uma conta?{' '}
          <Link className="underline text-primary" href="/auth/login">
            Entrar
          </Link>
        </p>
      </CardFooter>
      <div className="text-center pt-3 text-xs text-muted-foreground leading-relaxed">
        Ao continuar você concorda com nossos{' '}
        <Link href="/terms-of-service" className="hover:underline text-primary">
          Termos de Serviço
        </Link>{' '}
        e{' '}
        <Link href="/privacy-policy" className="hover:underline text-primary">
          Política de Privacidade
        </Link>
        .
      </div>
    </Card>
  );
}
