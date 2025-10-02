import { ErrorMessages } from './erros-messages';

export function translateError(message?: string): string {
  if (!message) return ErrorMessages['default'];
  return ErrorMessages[message] || ErrorMessages['default'];
}
