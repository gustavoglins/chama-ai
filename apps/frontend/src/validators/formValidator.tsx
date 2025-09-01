import { z } from 'zod';

// Signup Client Schema
export const signupFormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, 'O Primeiro Nome deve ter pelo menos 2 caracteres'),
    lastName: z
      .string()
      .min(2, 'O Ultimo Nome deve ter pelo menos 2 caracteres'),
    email: z.email('Email inválido'),
    phoneNumber: z
      .number()
      .min(11, 'Número de telefone inválido')
      .max(11, 'Número de telefone inválido'),
    password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
    confirmPassword: z.string().min(8, 'A Confirmação de senha é obrigatória'),
    dateOfBirth: z.date('A Data de nascimento é obrigatória'),
    gender: z.string('O gênero é obrigatório'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas nao coincidem',
    path: ['confirmPassord'],
  });

// Signup Service Provider Schema, TODO:
// export const signupServiceProviderFormSchema = z
//   .object({
//     firstName: z.string().min(2, 'O Primeiro Nome deve ter pelo menos 2 caracteres'),
//     lastName: z.string().min(2, 'O Ultimo Nome deve ter pelo menos 2 caracteres'),
//     email: z.email('Email inválido'),
//     phoneNumber: z.number().min(11, 'Número de telefone inválido').max(11, "Número de telefone inválido"),
//     password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
//     confirmPassword: z.string().min(8, 'A Confirmação de senha é obrigatória'),
//     dateOfBirth: z.date('A Data de nascimento é obrigatória'),
//     gender: z.string('O gênero é obrigatório'),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: 'As senhas nao coincidem',
//     path: ['confirmPassord'],
//   });

// Login Schema
export const loginFormSchema = z.object({
  email: z.email('Email inválido'),
  password: z.string('Senha inválida').min(8, 'Senha inválida'),
  rememberMe: z.boolean().optional(),
});

export type SignupFormSchema = z.infer<typeof signupFormSchema>;
// export type SignupServiceProviderFormSchema = z.infer<typeof signupServiceProviderFormSchema>;
export type LoginFormSchema = z.infer<typeof loginFormSchema>;
