import * as Yup from 'yup';
import { UserRole } from '@/lib/types/auth';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email tidak valid')
    .required('Email wajib diisi'),
  password: Yup.string()
    .min(8, 'Password minimal 8 karakter')
    .required('Password wajib diisi'),
  role: Yup.string()
    .oneOf(['consumer', 'seller'] as UserRole[], 'Role tidak valid')
    .required('Role wajib dipilih'),
});

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Nama minimal 2 karakter')
    .required('Nama wajib diisi'),
  email: Yup.string()
    .email('Email tidak valid')
    .required('Email wajib diisi'),
  password: Yup.string()
    .min(8, 'Password minimal 8 karakter')
    .required('Password wajib diisi'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Password tidak cocok')
    .required('Konfirmasi password wajib diisi'),
  role: Yup.string()
    .oneOf(['consumer', 'seller'] as UserRole[], 'Role tidak valid')
    .required('Role wajib dipilih'),
});

export type LoginFormValues = Yup.InferType<typeof loginSchema>;
export type RegisterFormValues = Yup.InferType<typeof registerSchema>;