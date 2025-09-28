import { ApiResponse } from '@/interfaces/api.interface';
import { ClientSignupPersonalDataType } from '@/validators/formValidator';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const API_START_SIGUP_URI = '/user-service/api/v1/users/signup';
const API_FINISH_SIGUP_URI = '/user-service/api/v1/users/signup';

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
  payload: ClientSignupPersonalDataType
): Promise<ApiResponse<undefined>> {
  try {
    // Recupera o email do localStorage (salvo no step anterior)
    const email = localStorage.getItem('signupEmail');

    if (!email) {
      throw new Error('Email não encontrado. Reinicie o processo de cadastro.');
    }

    // Adapta o payload para o formato esperado pelo backend
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

    const data: ApiResponse<undefined> = await response.json();

    if (!response.ok) {
      return { ...data, status: 'ERROR' };
    }

    // Limpa o email do localStorage após sucesso
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
