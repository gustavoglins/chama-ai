'use client';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { maskPhoneBR } from '@/lib/masks';
import { type ServiceProviderSignupFormSchema } from '@/validators/formValidator';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  form: UseFormReturn<ServiceProviderSignupFormSchema>;
}

export function StepContact({ form }: Props) {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-1">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="seu@email.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input
                  placeholder="(11) 90000-0000"
                  value={field.value}
                  onChange={(e) => field.onChange(maskPhoneBR(e.target.value))}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                  inputMode="numeric"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
