// ==================== DTOs ====================

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserAuthData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

// ==================== REQUESTS ====================

export interface SendOtpRequest {
  email: string;
}

export interface VerifyOtpRequest {
  login: string;
  otp: number;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordConfirmRequest {
  email: string;
  code: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// ==================== RESPONSES ====================

export interface SendOtpResponse {
  message: string;
}

export interface VerifyOtpResponse {
  verified: boolean;
  message: string;
}

export interface LoginResponse {
  user: UserAuthData;
  tokens: AuthTokens;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface ResetPasswordConfirmResponse {
  message: string;
}

export interface ChangePasswordResponse {
  message: string;
}

// ==================== LEGACY ====================
// @deprecated Use LoginResponse instead
export interface AuthResponse {
  token: string;
}
