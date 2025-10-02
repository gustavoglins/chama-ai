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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ClientSignupOnlyPersonalDataSchema,
  ClientSignupOnlyPersonalDataType,
} from '@/validators/formValidator';
import { maskCPF } from '@/lib/masks';
import { zodResolver } from '@hookform/resolvers/zod';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

interface StepPersonalDataProps {
  onContinue: (data: ClientSignupOnlyPersonalDataType) => void;
  onBack?: () => void;
}

export default function StepPersonalData({
  onContinue,
  onBack,
}: StepPersonalDataProps) {
  const form = useForm<ClientSignupOnlyPersonalDataType>({
    resolver: zodResolver(ClientSignupOnlyPersonalDataSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      cpf: '',
      dateOfBirth: undefined as unknown as Date,
      gender: undefined as unknown as 'MALE' | 'FEMALE' | 'OTHER',
    },
  });

  function onSubmit(data: ClientSignupOnlyPersonalDataType) {
    onContinue(data);
  }

  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form">
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
                    <Input id="lastName" placeholder="Sobrenome" {...field} />
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
                      inputMode="numeric"
                      maxLength={14}
                      value={maskCPF(field.value || '')}
                      onChange={(event) => {
                        const masked = maskCPF(event.target.value);
                        field.onChange(masked);
                      }}
                      onBlur={field.onBlur}
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
                          ? new Date(field.value).toISOString().split('T')[0]
                          : ''
                      }
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? new Date(e.target.value) : undefined
                        )
                      }
                      onBlur={field.onBlur}
                      max={today}
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
        <div className="flex flex-col-reverse sm:flex-row gap-3">
          {onBack && (
            <Button
              type="button"
              variant="outline"
              className="w-full sm:flex-1"
              onClick={onBack}
            >
              Voltar
            </Button>
          )}
          <Button
            type="submit"
            className="w-full sm:flex-1"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Validando...' : 'Continuar'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
