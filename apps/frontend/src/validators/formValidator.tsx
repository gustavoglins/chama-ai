import { z } from 'zod';

// Step 1: Contact (Email OR Phone required)
export const ClientSignupContactSchema = z
  .object({
    email: z
      .string()
      .trim()
      .email('Email inválido')
      .optional()
      .or(z.literal('').transform(() => undefined)),
    phoneNumber: z
      .string()
      .trim()
      .transform((v) => v.replace(/\D/g, ''))
      .refine(
        (v) => v.length === 0 || (v.length >= 10 && v.length <= 11),
        'Número de telefone inválido'
      )
      .optional()
      .or(z.literal('').transform(() => undefined)),
  })
  .refine((data) => !!data.email || !!data.phoneNumber, {
    message: 'Informe email ou telefone',
    path: ['email'],
  });
export type ClientSignupContactType = z.infer<typeof ClientSignupContactSchema>;

// Step 3: Personal Data
export const ClientSignupPersonalDataSchema = z.object({
  firstName: z.string().min(2, 'O Nome é obrigatório'),
  lastName: z.string().min(2, 'O Sobrenome é obrigatório'),
  cpf: z
    .string()
    .transform((v) => v.replace(/\D/g, ''))
    .refine((v) => v.length === 11, 'CPF inválido'),
  dateOfBirth: z
    .date()
    .refine((v) => !!v, 'A Data de nascimento é obrigatória'),
  gender: z
    .enum(['MALE', 'FEMALE', 'OTHER'])
    .refine((v) => !!v, 'O gênero é obrigatório'),
});
export type ClientSignupPersonalDataType = z.infer<
  typeof ClientSignupPersonalDataSchema
>;

// Step 4: Security
export const ClientSignupSecuritySchema = z
  .object({
    password: z
      .string()
      .min(8, 'A senha deve ter pelo menos 8 caracteres')
      .max(72, 'Senha muito longa'),
    confirmPassword: z.string().min(8, 'A Confirmação de senha é obrigatória'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });
export type ClientSignupSecurityType = z.infer<
  typeof ClientSignupSecuritySchema
>;

// Login (Email OU Telefone)
export const LoginSchema = z
  .object({
    email: z
      .string()
      .trim()
      .email('Email inválido')
      .optional()
      .or(z.literal('').transform(() => undefined)),
    phoneNumber: z
      .string()
      .trim()
      .transform((v) => v.replace(/\D/g, ''))
      .refine(
        (v) => v.length === 0 || (v.length >= 10 && v.length <= 11),
        'Telefone inválido'
      )
      .optional()
      .or(z.literal('').transform(() => undefined)),
    password: z.string().min(8, 'Senha inválida'),
    rememberMe: z.boolean().optional(),
  })
  .refine((data) => !!data.email || !!data.phoneNumber, {
    message: 'Informe email ou telefone',
    path: ['email'],
  });
export type LoginType = z.infer<typeof LoginSchema>;

// Signup (form único usado no fluxo do service-provider)
export const signupFormSchema = z
  .object({
    firstName: z.string().min(2, 'O Nome é obrigatório'),
    lastName: z.string().min(2, 'O Sobrenome é obrigatório'),
    cpf: z
      .string()
      .transform((v) => v.replace(/\D/g, ''))
      .refine((v) => v.length === 11, 'CPF inválido'),
    dateOfBirth: z
      .date()
      .refine((v) => !!v, 'A Data de nascimento é obrigatória'),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
    email: z
      .string()
      .trim()
      .email('Email inválido')
      .optional()
      .or(z.literal('').transform(() => undefined)),
    phoneNumber: z
      .string()
      .trim()
      .transform((v) => v.replace(/\D/g, ''))
      .refine(
        (v) => v.length === 0 || (v.length >= 10 && v.length <= 11),
        'Número de telefone inválido'
      )
      .optional()
      .or(z.literal('').transform(() => undefined)),
    password: z
      .string()
      .min(8, 'A senha deve ter pelo menos 8 caracteres')
      .max(72, 'Senha muito longa'),
    confirmPassword: z.string().min(8, 'A Confirmação de senha é obrigatória'),
  })
  .refine((data) => !!data.email || !!data.phoneNumber, {
    message: 'Informe email ou telefone',
    path: ['email'],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });
export type SignupFormSchema = z.infer<typeof signupFormSchema>;
