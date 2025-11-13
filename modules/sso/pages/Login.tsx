import { FormProvider } from '@hrbox/core/providers/FormProvider';
import {
  formValidationErrorLogin,
  initialValuesFormLogin,
  LoginForm,
} from '@module/sso/forms';
import { useLoginMutation } from '@module/sso/apis/Auth';
import { useAuth } from '@hrbox/core/hooks/useAuth';
import { RoleSlug } from '@hrbox/core/config/theme';
import { useNavigation } from '@hrbox/core/hooks/useNavigation';
import { Paths } from '@hrbox/modules/paths';

const Login = () => {
  const [login] = useLoginMutation();
  const { loginSuccess } = useAuth();
  const { push } = useNavigation()

  // دیکد کردن JWT بدون کتابخانه
  const decodeJWT = (token: string) => {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return {};
    }
  };

  const handleLogin = async (values: any) => {
    try {
      const response = await login(values).unwrap();

      const { userId, displayName, Token, renewalToken } = response.data;

      // مرحله ۱: خواندن نقش‌ها از JWT
      const jwtPayload = decodeJWT(Token);
      const roleSlugsFromToken: string[] = jwtPayload.role || [];

      // مرحله ۲: ساخت نقش‌های تستی (اگر JWT خالی بود)
      const fallbackRoles = [
        { id: '1', name: 'کارفرما', slug: RoleSlug.SUPER_ADMIN, permissions: [] },
        { id: '2', name: 'فریلنسر', slug: RoleSlug.JOB_SEEKER, permissions: [] },
        { id: '3', name: 'کاربر عادی', slug: RoleSlug.ORGANIZATION, permissions: [] },
      ];

      // مرحله ۳: ترکیب نقش‌های JWT + تستی
      let roles = roleSlugsFromToken.map((slug: string, index: number) => ({
        id: String(userId * 100 + index),
        name: slug === 'Client' ? 'کارفرما' : slug === 'Freelancer' ? 'فریلنسر' : 'کاربر عادی',
        slug: slug as RoleSlug,
        permissions: [],
      }));

      // اگر JWT نقش نداشت → نقش‌های تستی
      if (roles.length === 0) {
        roles = fallbackRoles;
      }

      // مرحله ۴: dispatch loginSuccess
      console.log('فراخوانی loginSuccess با:', { userId, displayName, Token, roles });
      loginSuccess(userId, displayName, Token, renewalToken, roles);
      push({to:Paths.SSO.SelectRole})
      
    } catch (error: any) {
      console.error('خطا در لاگین:', error);
      throw new Error(error?.data?.msg || 'خطا در ورود');
    }
  };

  return (
    <FormProvider
      formId="login-form"
      initialValues={initialValuesFormLogin}
      validationSchema={formValidationErrorLogin}
      enableCache={true}
      clearCacheOnSubmit={true}
      onSubmitAsync={handleLogin}
    >
      <LoginForm />
    </FormProvider>
  );
};

export default Login;