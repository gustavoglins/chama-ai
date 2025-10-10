import { ApiResponse } from '@/interfaces/api.interface';
import {
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from '@/interfaces/auth.interface';
import { getErrorObject } from '@/lib/utils';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const API_SEND_OTP_URI = '/auth-service/api/v1/auth/otp/send';
const API_VERIFY_OTP_URI = '/auth-service/api/v1/auth/otp/validate';
const API_LOGIN_URI = '/auth-service/api/v1/auth/login';
const API_RESET_PASSWORD_URI = '/auth-service/api/v1/auth/reset-password';

/**
 * Sends an OTP code to the user's email
 * @param payload - Request payload containing the email
 * @returns API response with send OTP result
 */
export async function sendOtp(
  payload: SendOtpRequest
): Promise<ApiResponse<SendOtpResponse>> {
  try {
    const response = await fetch(`${API_BASE_URL}${API_SEND_OTP_URI}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data: ApiResponse<SendOtpResponse> = await response.json();

    return data;
  } catch (error) {
    console.error('Error sending verify otp request:', error);
    return getErrorObject<SendOtpResponse>(error);
  }
}

/**
 * Verifies the OTP code sent to the user
 * @param payload - Request payload containing login and OTP code
 * @returns API response with verification result
 */
export async function verifyOtp(
  payload: VerifyOtpRequest
): Promise<ApiResponse<VerifyOtpResponse>> {
  try {
    const response = await fetch(`${API_BASE_URL}${API_VERIFY_OTP_URI}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data: ApiResponse<VerifyOtpResponse> = await response.json();

    if (!response.ok) {
      return { ...data, status: 'ERROR' };
    }

    return data;
  } catch (error) {
    console.error('Error sending verify otp request:', error);
    return getErrorObject<VerifyOtpResponse>(error);
  }
}

/**
 * Authenticates a user with email and password
 * @param payload - Request payload containing login credentials
 * @returns API response with login result and tokens
 */
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
    return getErrorObject<LoginResponse>(error);
  }
}

/**
 * Initiates password reset process for a user
 * @param payload - Request payload containing the user's email
 * @returns API response with reset password result
 */
export async function resetPassword(
  payload: ResetPasswordRequest
): Promise<ApiResponse<ResetPasswordResponse>> {
  try {
    const response = await fetch(`${API_BASE_URL}${API_RESET_PASSWORD_URI}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data: ApiResponse<ResetPasswordResponse> = await response.json();

    if (!response.ok) {
      return { ...data, status: 'ERROR' };
    }

    return data;
  } catch (error) {
    console.error('Error sending reset password request:', error);
    return getErrorObject<ResetPasswordResponse>(error);
  }
}
