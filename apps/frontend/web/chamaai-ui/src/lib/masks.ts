// Utilidades de máscara para inputs brasileiros
import { useState } from 'react';

// Mantém apenas dígitos
const onlyDigits = (v: string) => v.replace(/\D/g, '');

export function maskCPF(value: string): string {
  const digits = onlyDigits(value).slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export function maskPhoneBR(value: string): string {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 10) {
    return digits
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }
  return digits
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
}

export function unmask(value: string): string {
  return onlyDigits(value);
}

/**
 * Hook personalizado para gerenciar input de telefone com máscara
 * @param onChange - Callback que recebe o valor limpo (apenas números)
 * @returns Objeto com propriedades para o input
 */
export function usePhoneMask(onChange: (cleanValue: string) => void) {
  const [displayValue, setDisplayValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanValue = unmask(value);
    const formattedValue = maskPhoneBR(value);

    // Limita a 11 dígitos (2 DDD + 9 número)
    if (cleanValue.length <= 11) {
      setDisplayValue(formattedValue);
      onChange(cleanValue);
    }
  };

  const reset = () => {
    setDisplayValue('');
  };

  const setValue = (value: string) => {
    const cleanValue = unmask(value);
    const formattedValue = maskPhoneBR(value);
    setDisplayValue(formattedValue);
    onChange(cleanValue);
  };

  return {
    value: displayValue,
    onChange: handleChange,
    reset,
    setValue,
  };
}
