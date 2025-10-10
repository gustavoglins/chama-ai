// ==================== ENUMS & TYPES ====================

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum AccountType {
  CLIENT = 'CLIENT',
  SERVICE_PROVIDER = 'SERVICE_PROVIDER',
  ADMIN = 'ADMIN',
}

// ==================== DTOs ====================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  cpf: string;
  dateOfBirth: Date;
  gender: Gender;
  accountType: AccountType;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  cpf: string;
  dateOfBirth: string;
  gender: Gender;
  accountType: AccountType;
}

// ==================== REQUESTS ====================

export interface CheckEmailRequest {
  email: string;
}

export interface StartSignupRequest {
  email: string;
}

export interface CompleteSignupRequest {
  taxId: string;
  email: string;
  password: string;
  accountType: AccountType;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO 8601 date format (YYYY-MM-DD)
  gender: Gender;
}

export interface UpdateUserProfileRequest {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: Gender;
}

export interface DeleteUserRequest {
  userId: string;
  confirmation: boolean;
}

// ==================== RESPONSES ====================

export interface CheckEmailResponse {
  exists: boolean;
  message: string;
}

export interface StartSignupResponse {
  message: string;
  email: string;
}

export interface CompleteSignupResponse {
  user: UserProfile;
  token: string;
}

export interface GetUserProfileResponse {
  user: UserProfile;
}

export interface UpdateUserProfileResponse {
  user: UserProfile;
  message: string;
}

export interface DeleteUserResponse {
  message: string;
  deletedAt: string;
}

// ==================== LEGACY ====================
// @deprecated Use CompleteSignupRequest instead
export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  cpf: string;
  dateOfBirth: Date;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  password: string;
}

// @deprecated Use CheckEmailRequest and specific OTP interfaces
export interface VerifySignupCodeRequest {
  email: string;
  code: string;
}
