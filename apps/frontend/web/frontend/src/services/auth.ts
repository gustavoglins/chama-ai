import { ClientSignupRequestDto } from '@/dto/user.interface';
import { unmask } from '@/lib/masks';

interface LoginPayload {
  login?: string;
  email?: string;
  phoneNumber?: string;
  password: string;
}

interface sendEmailConfirmationCodePayload {
  channel: 'EMAIL';
  email: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ServiceProviderSignupRequestDto {
  email: string;
  phoneNumber: number;
  firstName: string;
  lastName: string;
  cpf: string;
  password: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
}

export async function login(payload: LoginPayload) {
  const loginValue =
    payload.login ??
    payload.email ??
    (payload.phoneNumber ? unmask(payload.phoneNumber) : undefined);

  if (!loginValue) {
    throw new Error('Informe email ou telefone para login');
  }

  const body: Record<string, unknown> = {
    login: loginValue,
    password: payload.password,
  };

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Erro ao fazer login');
  }

  return res.json();
}

export async function signupClient(payload: ClientSignupRequestDto) {
  const res = await fetch(`${BASE_URL}/auth/signup/client`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Erro ao criar conta');
  }

  return res.json();
}

export async function signupServiceProvider(
  payload: ServiceProviderSignupRequestDto
) {
  const body = {
    ...payload,
    phoneNumber: Number(payload.phoneNumber),
  };
  const res = await fetch(`${BASE_URL}/auth/signup/service-provider`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Erro ao criar conta');
  }

  return res.json();
}

export async function sendEmailConfirmationCode(email: string) {
  const response = await fetch(`${BASE_URL}/auth/otp/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      channel: 'EMAIL',
    } as sendEmailConfirmationCodePayload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.message || 'Erro ao enviar código de confirmação via Email'
    );
  }
}

export async function sendPhoneConfirmationCode(phoneNumber: string) {
  const cleanPhone = unmask(phoneNumber || '');
  const response = await fetch(`${BASE_URL}/auth/otp/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phoneNumber: cleanPhone,
      channel: 'WHATSAPP',
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.message || 'Erro ao enviar código de confirmação via Whatsapp'
    );
  }
}

export async function verifyOtp(key: string, code: string) {
  const response = await fetch(`${BASE_URL}/auth/otp/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      key,
      code,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao verificar código de confirmação');
  }

  return response.json();
}

// Reset Password
export interface ResetPasswordRequestDto {
  token: string;
  newPassword: string;
}

// Start reset by sending OTP to email or phone (reuse existing send functions)
export async function resetPassword(payload: ResetPasswordRequestDto) {
  const response = await fetch(`${BASE_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao redefinir senha');
  }
  return response.json();
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth-token');
  }
}
