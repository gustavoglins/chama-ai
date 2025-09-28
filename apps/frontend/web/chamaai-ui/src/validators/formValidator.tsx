import { z } from 'zod';

// Schema to initialize client signup (Step 1/3)
export const StartClientSignupSchema = z.object({
  email: z.email('Email inválido'),
});
export type StartClientSignupType = z.infer<typeof StartClientSignupSchema>;

export const VerifyOtpSchema = z.object({
  otp: z.string().length(6, 'O código deve ter 6 dígitos'),
});
export type VerifyOtpType = z.infer<typeof VerifyOtpSchema>;

// Schema to colect user personal data (Step 3/4)
export const ClientSignupPersonalDataSchema = z
  .object({
    firstName: z.string('O Nome é obrigatório').min(2, 'O Nome é obrigatório'),
    lastName: z
      .string('O Sobrenome é obrigatório')
      .min(2, 'O Sobrenome é obrigatório'),
    cpf: z
      .string('O CPF é obrigatório')
      .transform((v) => v.replace(/\D/g, ''))
      .refine((v) => v.length === 11, 'CPF inválido'),
    dateOfBirth: z
      .date('A Data de nascimento é obrigatória')
      .refine((v) => !!v, 'A Data de nascimento é obrigatória'),
    gender: z
      .enum(['MALE', 'FEMALE', 'OTHER'], 'O gênero é obrigatório')
      .refine((v) => !!v, 'O gênero é obrigatório'),
    password: z
      .string('A senha é obrigatória')
      .min(8, 'A senha deve ter pelo menos 8 caracteres')
      .max(72, 'Senha muito longa'),
    confirmPassword: z
      .string('A confirmação de senha é obrigatória')
      .min(8, 'A Confirmação de senha é obrigatória'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
  });
export type ClientSignupPersonalDataType = z.infer<
  typeof ClientSignupPersonalDataSchema
>;

// Schema to set user password (Step 4/4)
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

// Login (Email required)
export const LoginSchema = z.object({
  email: z.string().trim().email('Email inválido'),
  password: z.string().min(8, 'Senha inválida'),
  rememberMe: z.boolean().optional(),
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
    email: z.string().trim().email('Email inválido'),
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
export type SignupFormSchema = z.infer<typeof signupFormSchema>;

// Signup do Service Provider (email obrigatório)
export const serviceProviderSignupFormSchema = z
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
    email: z.string().trim().email('Email inválido'),
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
export type ServiceProviderSignupFormSchema = z.infer<
  typeof serviceProviderSignupFormSchema
>;

// Reset Password: Contact (Email required) and New Password
export const ResetPasswordContactSchema = z.object({
  email: z.string().trim().email('Email inválido'),
});
export type ResetPasswordContactType = z.infer<
  typeof ResetPasswordContactSchema
>;

export const ResetPasswordNewSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, 'A senha deve ter pelo menos 8 caracteres')
      .max(72, 'Senha muito longa')
      .optional()
      .or(z.literal('').transform(() => undefined)),
    confirmPassword: z
      .string()
      .min(8, 'A Confirmação de senha é obrigatória')
      .optional()
      .or(z.literal('').transform(() => undefined)),
  })
  .refine(
    (data) =>
      (!data.newPassword && !data.confirmPassword) ||
      data.newPassword === data.confirmPassword,
    {
      message: 'As senhas não coincidem',
      path: ['confirmPassword'],
    }
  );
export type ResetPasswordNewType = z.infer<typeof ResetPasswordNewSchema>;

// Combined schema for the form (we trigger step-specific fields)
export const resetPasswordFormSchema = ResetPasswordContactSchema.merge(
  ResetPasswordNewSchema
);
export type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>;
