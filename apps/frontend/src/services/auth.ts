interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  name: string;
  email: string;
  password: string;
  accountType: 'client' | 'service_provider';
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(payload: LoginPayload) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Erro ao fazer login');
  }

  return res.json();
}

export async function signup(payload: SignupPayload) {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Erro ao criar conta');
  }

  return res.json();
}
