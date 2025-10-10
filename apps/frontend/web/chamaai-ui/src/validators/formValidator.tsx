import { z } from 'zod';

const emailField = z
  .string()
  .trim()
  .min(1, 'Email é obrigatório')
  .email('Email inválido');

const passwordField = z
  .string()
  .min(8, 'A senha deve ter pelo menos 8 caracteres')
  .max(72, 'Senha muito longa');

const confirmPasswordField = z
  .string()
  .min(8, 'A Confirmação de senha é obrigatória');

const firstNameField = z.string().trim().min(2, 'O Nome é obrigatório');

const lastNameField = z.string().trim().min(2, 'O Sobrenome é obrigatório');

const cpfField = z
  .string()
  .trim()
  .min(1, 'O CPF é obrigatório')
  .refine((value) => value.replace(/\D/g, '').length === 11, 'CPF inválido')
  .transform((value) => value.replace(/\D/g, ''));

const dateOfBirthField = z
  .date()
  .refine(
    (value) => value <= new Date(),
    'A Data de nascimento não pode ser no futuro'
  );

const genderField = z.enum(['MALE', 'FEMALE', 'OTHER']);

// Schema to initialize client signup (Step 1/3)
export const StartClientSignupSchema = z.object({
  email: emailField,
});
export type StartClientSignupType = z.infer<typeof StartClientSignupSchema>;

export const VerifyOtpSchema = z.object({
  otp: z.string().trim().length(6, 'O código deve ter 6 dígitos'),
});
export type VerifyOtpType = z.infer<typeof VerifyOtpSchema>;

// (Novo) Schema apenas para dados pessoais (sem senha) - Step separado
export const ClientSignupOnlyPersonalDataSchema = z.object({
  firstName: firstNameField,
  lastName: lastNameField,
  cpf: cpfField,
  dateOfBirth: dateOfBirthField,
  gender: genderField,
});
export type ClientSignupOnlyPersonalDataType = z.infer<
  typeof ClientSignupOnlyPersonalDataSchema
>;

// Schema to colect user personal data (Step 3/4)
export const ClientSignupPersonalDataSchema = z
  .object({
    firstName: firstNameField,
    lastName: lastNameField,
    cpf: cpfField,
    dateOfBirth: dateOfBirthField,
    gender: genderField,
    password: passwordField,
    confirmPassword: confirmPasswordField,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });
export type ClientSignupPersonalDataType = z.infer<
  typeof ClientSignupPersonalDataSchema
>;

// Schema to set user password (Step 4/4)
export const ClientSignupSecuritySchema = z
  .object({
    password: passwordField,
    confirmPassword: confirmPasswordField,
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
  email: emailField,
  password: passwordField,
  rememberMe: z.boolean().optional(),
});
export type LoginType = z.infer<typeof LoginSchema>;

// Signup (form único usado no fluxo do service-provider)
export const signupFormSchema = z
  .object({
    firstName: firstNameField,
    lastName: lastNameField,
    cpf: cpfField,
    dateOfBirth: dateOfBirthField,
    gender: genderField,
    email: emailField,
    password: passwordField,
    confirmPassword: confirmPasswordField,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });
export type SignupFormSchema = z.infer<typeof signupFormSchema>;

// Signup do Service Provider (email obrigatório)
export const serviceProviderSignupFormSchema = z
  .object({
    firstName: firstNameField,
    lastName: lastNameField,
    cpf: cpfField,
    dateOfBirth: dateOfBirthField,
    gender: genderField,
    email: emailField,
    password: passwordField,
    confirmPassword: confirmPasswordField,
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
  email: emailField,
});
export type ResetPasswordContactType = z.infer<
  typeof ResetPasswordContactSchema
>;

export const ResetPasswordNewSchema = z
  .object({
    newPassword: passwordField
      .optional()
      .or(z.literal('').transform(() => undefined)),
    confirmPassword: confirmPasswordField
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

// Testes:

export const LogInSchema = z.object({
  email: emailField,
});
export type LogInType = z.infer<typeof LogInSchema>;
