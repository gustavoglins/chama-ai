import { ApiResponse, ApiResponseStatus } from '@/interfaces/api.interface';
import {
  AccountType,
  CheckEmailRequest,
  CheckEmailResponse,
  CompleteSignupRequest,
  CompleteSignupResponse,
  Gender,
  StartSignupRequest,
  StartSignupResponse,
} from '@/interfaces/user.interface';
import { getErrorObject } from '@/lib/utils';
import { ClientSignupPersonalDataType } from '@/validators/formValidator';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const API_CHECK_EMAIL_URI = '/user-service/api/v1/users/checkEmail';
const API_START_SIGNUP_URI = '/user-service/api/v1/users/startSignup';
const API_COMPLETE_SIGNUP_URI = '/user-service/api/v1/users/completeSignup';

/**
 * Checks if a user with the given email is already registered
 * @param payload - Request payload containing the email to check
 * @returns API response indicating if the email exists
 */
export async function checkUserRegistered(
  payload: CheckEmailRequest
): Promise<ApiResponse<CheckEmailResponse>> {
  try {
    const response = await fetch(`${API_BASE_URL}${API_CHECK_EMAIL_URI}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data: ApiResponse<CheckEmailResponse> = await response.json();

    if (!response.ok) {
      return { ...data, status: ApiResponseStatus.ERROR };
    }

    return data;
  } catch (error) {
    console.log('Error sending checkUserRegistered request:', error);
    return getErrorObject<CheckEmailResponse>(error);
  }
}

/**
 * Initiates the signup process by sending a verification email
 * @param payload - Request payload containing the email to start signup
 * @returns API response with signup initiation result
 */
export async function startSignup(
  payload: StartSignupRequest
): Promise<ApiResponse<StartSignupResponse>> {
  try {
    const response = await fetch(`${API_BASE_URL}${API_START_SIGNUP_URI}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data: ApiResponse<StartSignupResponse> = await response.json();

    if (!response.ok) {
      return { ...data, status: ApiResponseStatus.ERROR };
    }

    return data;
  } catch (error) {
    console.error('Error sending startSignup request:', error);
    return getErrorObject<StartSignupResponse>(error);
  }
}

/**
 * Completes the signup process with user personal data
 * @param payload - Form data with user personal information
 * @param emailOverride - Optional email to override the one stored in localStorage
 * @returns API response with the created user profile and authentication token
 */
export async function finishSignup(
  payload: ClientSignupPersonalDataType,
  emailOverride?: string
): Promise<ApiResponse<CompleteSignupResponse>> {
  try {
    const email = emailOverride ?? localStorage.getItem('signupEmail');

    if (!email) {
      throw new Error('Email não encontrado. Reinicie o processo de cadastro.');
    }

    const backendPayload: CompleteSignupRequest = {
      taxId: payload.cpf.replace(/\D/g, ''),
      email: email,
      password: payload.password,
      accountType: AccountType.CLIENT,
      firstName: payload.firstName,
      lastName: payload.lastName,
      dateOfBirth: payload.dateOfBirth.toISOString().split('T')[0],
      gender: payload.gender as Gender,
    };

    const response = await fetch(`${API_BASE_URL}${API_COMPLETE_SIGNUP_URI}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backendPayload),
    });

    const data: ApiResponse<CompleteSignupResponse> = await response.json();

    if (!response.ok) {
      return { ...data, status: 'ERROR' };
    }

    localStorage.removeItem('signupEmail');

    return data;
  } catch (error) {
    console.error('Error sending finishSignup request:', error);
    return getErrorObject<CompleteSignupResponse>(error);
  }
}
