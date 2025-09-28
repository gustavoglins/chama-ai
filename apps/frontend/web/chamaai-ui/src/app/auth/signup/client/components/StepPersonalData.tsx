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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { finishSignup } from '@/services/user.api';
import {
  ClientSignupPersonalDataSchema,
  ClientSignupPersonalDataType,
} from '@/validators/formValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface StepPersonalDataProps {
  onSuccess?: () => void;
}

export default function StepPersonalData({ onSuccess }: StepPersonalDataProps) {
  const [step, setStep] = useState<'personalData' | 'security'>('personalData');
  const [isLoading, setIsLoading] = useState(false);
  // ayu

  const form = useForm<ClientSignupPersonalDataType>({
    resolver: zodResolver(ClientSignupPersonalDataSchema),
    // Implement session storage to persist data between steps
    defaultValues: {
      firstName: '',
      lastName: '',
      cpf: '',
      dateOfBirth: undefined,
      gender: undefined,
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: ClientSignupPersonalDataType) {
    setIsLoading(true);

    try {
      const response = await finishSignup(data);

      if (response.status === 'SUCCESS') {
        toast.success('Cadastro realizado com sucesso!');
        onSuccess?.(); // Chama callback de sucesso se fornecido
      } else {
        toast.error(
          response.message || 'Erro ao realizar cadastro. Tente novamente.'
        );
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      toast.error('Erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form">
        {step === 'personalData' && (
          <div>
            <div className="form-content">
              <div className="form-field-group">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input id="firstName" placeholder="Nome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sobrenome</FormLabel>
                      <FormControl>
                        <Input
                          id="lastName"
                          placeholder="Sobrenome"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="form-field-group">
                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <Input
                          id="cpf"
                          placeholder="000.000.000-00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Nascimento</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          id="dateOfBirth"
                          value={
                            field.value
                              ? new Date(field.value)
                                  .toISOString()
                                  .split('T')[0]
                              : ''
                          }
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? new Date(e.target.value)
                                : undefined
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gênero</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ''}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="MALE">Masculino</SelectItem>
                            <SelectItem value="FEMALE">Feminino</SelectItem>
                            <SelectItem value="OTHER">Outro</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}
        {step === 'security' && (
          <div className="form-content">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      id="password"
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
                      type="password"
                      id="confirmPassword"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        {step === 'personalData' && (
          <Button
            type="button"
            className="w-full"
            onClick={() => setStep('security')}
            disabled={isLoading}
          >
            Continuar
          </Button>
        )}
        {step === 'security' && (
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Finalizando...' : 'Finalizar cadastro'}
          </Button>
        )}
      </form>
    </Form>
  );
}
