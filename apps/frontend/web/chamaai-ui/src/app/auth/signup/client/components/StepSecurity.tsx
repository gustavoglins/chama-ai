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
import { finishSignup } from '@/services/user.api';
import {
  ClientSignupOnlyPersonalDataType,
  ClientSignupPersonalDataType,
  ClientSignupSecuritySchema,
  ClientSignupSecurityType,
} from '@/validators/formValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface StepSecurityProps {
  personalData: ClientSignupOnlyPersonalDataType | null;
  onSuccess?: () => void;
  onBack?: () => void;
}

export default function StepSecurity({
  personalData,
  onSuccess,
  onBack,
}: StepSecurityProps) {
  const form = useForm<ClientSignupSecurityType>({
    resolver: zodResolver(ClientSignupSecuritySchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: ClientSignupSecurityType) {
    if (!personalData) {
      toast.error(
        'Dados pessoais não encontrados. Volte e preencha novamente.'
      );
      onBack?.();
      return;
    }

    const payload: ClientSignupPersonalDataType = {
      ...personalData,
      password: values.password,
      confirmPassword: values.confirmPassword,
    } as ClientSignupPersonalDataType;

    try {
      const response = await finishSignup(payload);
      if (response.status === 'SUCCESS') {
        toast.success('Cadastro realizado com sucesso!');
        onSuccess?.();
      } else {
        toast.error(response.message || 'Erro ao realizar cadastro.');
      }
    } catch (e) {
      toast.error('Erro inesperado. Tente novamente.');
      console.error(e);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form">
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
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-6 flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1"
          >
            Voltar
          </Button>
          <Button type="submit" className="flex-1">
            Finalizar
          </Button>
        </div>
      </form>
    </Form>
  );
}
