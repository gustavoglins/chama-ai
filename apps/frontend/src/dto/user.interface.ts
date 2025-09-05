export interface ClientSignupRequestDto {
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  password: string;
  dateOfBirth: string;
  cpf?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  accountType?: 'CLIENT' | 'SERVICE_PROVIDER';
}
