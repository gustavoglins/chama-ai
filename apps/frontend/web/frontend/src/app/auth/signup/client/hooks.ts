import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ClientSignupContactSchema,
  ClientSignupContactType,
  ClientSignupPersonalDataSchema,
  ClientSignupPersonalDataType,
  ClientSignupSecuritySchema,
  ClientSignupSecurityType,
} from '@/validators/formValidator';
import {
  sendEmailConfirmationCode,
  sendPhoneConfirmationCode,
  verifyOtp,
  signupClient,
} from '@/services/auth';
import { unmask } from '@/lib/masks';
import { toast } from 'sonner';
import { ClientSignupRequestDto } from '@/dto/user.interface';
import { useRouter } from 'next/navigation';

export enum SignupStep {
  CONTACT = 1,
  OTP = 2,
  PERSONAL = 3,
  SECURITY = 4,
}

export function useClientSignupFlow() {
  const [step, setStep] = useState<SignupStep>(SignupStep.CONTACT);
  const [isEmail, setIsEmail] = useState(true);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Forms ------------------------------------------------------
  const contactForm = useForm<ClientSignupContactType>({
    resolver: zodResolver(ClientSignupContactSchema),
    defaultValues: { email: '', phoneNumber: '' },
  });

  const personalForm = useForm<ClientSignupPersonalDataType>({
    resolver: zodResolver(ClientSignupPersonalDataSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      cpf: '',
      dateOfBirth: undefined,
      gender: undefined as unknown as 'MALE' | 'FEMALE' | 'OTHER',
    },
  });

  const securityForm = useForm<ClientSignupSecurityType>({
    resolver: zodResolver(ClientSignupSecuritySchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  // Cooldown timer --------------------------------------------
  useEffect(() => {
    if (otpCooldown <= 0) return;
    const id = setInterval(() => {
      setOtpCooldown((p) => (p <= 1 ? 0 : p - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [otpCooldown]);

  // Actions ----------------------------------------------------
  const requestOtp = async () => {
    setLoading(true);
    try {
      if (isEmail) {
        const email = contactForm.getValues('email');
        await sendEmailConfirmationCode(email || '');
      } else {
        const phoneMasked = contactForm.getValues('phoneNumber');
        const phone = unmask(phoneMasked || '');
        await sendPhoneConfirmationCode(phone);
      }
      setStep(SignupStep.OTP);
      setOtpCooldown(60);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Erro ao enviar código');
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = useCallback(async () => {
    if (otp.length !== 6) return;
    setLoading(true);
    try {
      const key = isEmail
        ? contactForm.getValues('email') || ''
        : unmask(contactForm.getValues('phoneNumber') || '');
      const res = await verifyOtp(key, otp);
      console.log(res);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setStep(SignupStep.PERSONAL);
      } else {
        toast.error('Token inválido');
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Erro ao verificar código');
    } finally {
      setLoading(false);
    }
  }, [otp, isEmail, contactForm]);

  useEffect(() => {
    if (otp.length === 6) void verifyCode();
  }, [otp, verifyCode]);

  const submitPersonal = async () => {
    setLoading(true);
    try {
      setStep(SignupStep.SECURITY);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Erro ao salvar dados');
    } finally {
      setLoading(false);
    }
  };

  const finalizeSignup = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token') || '';
      const personal = personalForm.getValues();
      const security = securityForm.getValues();
      const contact = contactForm.getValues();

      // Backend expects: token, firstName,lastName,email,phoneNumber(BigInteger),password,dateOfBirth
      const payload: ClientSignupRequestDto = {
        token,
        firstName: personal.firstName,
        lastName: personal.lastName,
        email: contact.email || '',
        phoneNumber: Number(unmask(contact.phoneNumber || '')),
        password: security.password,
        dateOfBirth: personal.dateOfBirth!.toISOString().split('T')[0],
        gender: personal.gender,
      };

      await signupClient(payload);
      toast.success('Conta criada com sucesso');
      router.push('/app');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  const toggleChannel = () => {
    setIsEmail((p) => !p);
    contactForm.clearErrors();
  };

  return {
    step,
    setStep,
    SignupStep,
    isEmail,
    toggleChannel,
    loading,
    otp,
    setOtp,
    otpCooldown,
    requestOtp,
    setOtpCooldown,
    verifyCode,
    contactForm,
    personalForm,
    securityForm,
    submitPersonal,
    finalizeSignup,
    showPassword,
    setShowPassword,
  };
}
