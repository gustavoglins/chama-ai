import { ApiResponse } from '@/interfaces/api.interface';
import { AuthResponse } from '@/interfaces/auth.interface';
import { ClientSignupPersonalDataType } from '@/validators/formValidator';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const API_START_SIGUP_URI = '/user-service/api/v1/users/startSignup';
const API_FINISH_SIGUP_URI = '/user-service/api/v1/users/completeSignup';

export async function startSignup(payload: {
  email: string;
}): Promise<ApiResponse<undefined>> {
  try {
    const response = await fetch(`${API_BASE_URL}${API_START_SIGUP_URI}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data: ApiResponse<undefined> = await response.json();

    if (!response.ok) {
      return { ...data, status: 'ERROR' };
    }

    return data;
  } catch (error) {
    console.error('Error sending start sigup request:', error);
    return {
      status: 'ERROR',
      code: 500,
      message: (error as Error).message,
      data: undefined,
      errors: [{ message: (error as Error).message }],
    };
  }
}

export async function finishSignup(
  payload: ClientSignupPersonalDataType,
  emailOverride?: string
): Promise<ApiResponse<AuthResponse | undefined>> {
  try {
  const email = emailOverride ?? localStorage.getItem('signupEmail');

    if (!email) {
      throw new Error('Email não encontrado. Reinicie o processo de cadastro.');
    }

    const backendPayload = {
      taxId: payload.cpf.replace(/\D/g, ''),
      email: email,
      password: payload.password,
      accountType: 'CLIENT',
      firstName: payload.firstName,
      lastName: payload.lastName,
      dateOfBirth: payload.dateOfBirth.toISOString().split('T')[0],
      gender: payload.gender,
    };

    const response = await fetch(`${API_BASE_URL}${API_FINISH_SIGUP_URI}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backendPayload),
    });

    const data: ApiResponse<AuthResponse | undefined> = await response.json();

    if (!response.ok) {
      return { ...data, status: 'ERROR' };
    }

    localStorage.removeItem('signupEmail');

    return data;
  } catch (error) {
    console.error('Error sending finish signup request:', error);
    return {
      status: 'ERROR',
      code: 500,
      message: (error as Error).message,
      data: undefined,
      errors: [{ message: (error as Error).message }],
    };
  }
}
