export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  cpf: string;
  dateOfBirth: Date;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  cpf: string;
  dateOfBirth: Date;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  password: string;
}

export interface StartSignupRequest {
  email: string;
}

export interface VerifySignupCodeRequest {
  email: string;
  code: string;
}

export interface CompleteSignupRequest {
  email: string;
  firstName: string;
  lastName: string;
  cpf: string;
  dateOfBirth: Date;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  password: string;
}
