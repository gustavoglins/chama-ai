export interface ClientSignupRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  cpf: string;
  password: string;
  dateOfBirth: Date;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  accountType: 'CLIENT';
}
