import { ApiResponse } from '@/interfaces/api.interface';
import {
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
} from '@/interfaces/auth.interface';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const API_VERIFY_OTP_URI = '/auth-service/api/v1/auth/otp/validate';
const API_LOGIN_URI = '/auth-service/api/v1/auth/login';
const API_RESET_PASSWORD_URI = '/auth-service/api/v1/auth/reset-password';

interface VerifyOtpPayload {
  login: string;
  otp: number;
}

export async function verifyOtp(
  payload: VerifyOtpPayload
): Promise<ApiResponse<undefined>> {
  try {
    const response = await fetch(`${API_BASE_URL}${API_VERIFY_OTP_URI}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data: ApiResponse<undefined> = await response.json();

    if (!response.ok) {
      return { ...data, status: 'ERROR' };
    }

    return data;
  } catch (error) {
    console.error('Error sending verify otp request:', error);
    return {
      status: 'ERROR',
      code: 500,
      message: (error as Error).message,
      data: undefined,
      errors: [{ message: (error as Error).message }],
    };
  }
}

export async function login(
  payload: LoginRequest
): Promise<ApiResponse<LoginResponse>> {
  try {
    const response = await fetch(`${API_BASE_URL}${API_LOGIN_URI}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data: ApiResponse<LoginResponse> = await response.json();

    if (!response.ok) {
      return { ...data, status: 'ERROR' };
    }

    return data;
  } catch (error) {
    console.error('Error sending login request:', error);
    return {
      status: 'ERROR',
      code: 500,
      message: (error as Error).message,
      data: {
        user: { id: '', email: '', firstName: '', lastName: '' },
        accessToken: '',
        refreshToken: '',
      } as LoginResponse,
      errors: [{ message: (error as Error).message }],
    };
  }
}

export async function resetPassword(
  payload: ResetPasswordRequest
): Promise<ApiResponse<undefined>> {
  try {
    const response = await fetch(`${API_BASE_URL}${API_RESET_PASSWORD_URI}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data: ApiResponse<undefined> = await response.json();

    if (!response.ok) {
      return { ...data, status: 'ERROR' };
    }

    return data;
  } catch (error) {
    console.error('Error sending reset password request:', error);
    return {
      status: 'ERROR',
      code: 500,
      message: (error as Error).message,
      data: undefined,
      errors: [{ message: (error as Error).message }],
    };
  }
}
