export interface ApiResponse<T> {
  status: 'SUCCESS' | 'ERROR';
  code: number;
  message: string;
  data: T;
  errors: ErrorDetails[];
}

export enum ApiResponseStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

interface ErrorDetails {
  field?: string;
  message: string;
}
