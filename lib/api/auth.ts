```typescript
import axios from './axios';
import { LoginFormValues, RegisterFormValues } from '@/lib/validations/auth';

export const authApi = {
  login: async (data: LoginFormValues) => {
    const response = await axios.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterFormValues) => {
    const response = await axios.post('/auth/register', data);
    return response.data;
  },

  logout: async () => {
    const response = await axios.post('/auth/logout');
    return response.data;
  }
};
```