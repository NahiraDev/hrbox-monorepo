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
  const { push } = useNavigation();

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

      const jwtPayload = decodeJWT(Token);
      const roleSlugsFromToken: string[] = jwtPayload.role || [];

      console.log('🔑 JWT Roles:', roleSlugsFromToken);

      const fallbackRoles = [
        {
          id: '1',
          name: 'سوپر ادمین',
          slug: RoleSlug.SUPER_ADMIN,
          permissions: ['*']
        },
        {
          id: '2',
          name: 'کارجو',
          slug: RoleSlug.JOB_SEEKER,
          permissions: ['view_jobs', 'apply_jobs']
        },
        {
          id: '3',
          name: 'سازمان',
          slug: RoleSlug.ORGANIZATION,
          permissions: ['manage_company', 'post_jobs']
        },
      ];

      // ✅ تبدیل نقش‌های JWT به RoleSlug
      const mapTokenRoleToSlug = (tokenRole: string): RoleSlug => {
        const roleMap: Record<string, RoleSlug> = {
          'Client': RoleSlug.ORGANIZATION,
          'Freelancer': RoleSlug.JOB_SEEKER,
          'SuperAdmin': RoleSlug.SUPER_ADMIN,
          'Admin': RoleSlug.SUPER_ADMIN,
        };
        return roleMap[tokenRole] || RoleSlug.JOB_SEEKER;
      };

      let roles = roleSlugsFromToken.map((tokenRole: string, index: number) => {
        const slug = mapTokenRoleToSlug(tokenRole);
        return {
          id: String(userId * 100 + index),
          name: slug === RoleSlug.ORGANIZATION ? 'سازمان' :
              slug === RoleSlug.JOB_SEEKER ? 'کارجو' : 'سوپر ادمین',
          slug,
          permissions: slug === RoleSlug.SUPER_ADMIN ? ['*'] : [],
        };
      });

      if (roles.length === 0) {
        console.warn('⚠️ No roles in token, using fallback roles');
        roles = fallbackRoles;
      }

      console.log('✅ Final roles:', roles);

      loginSuccess(userId, displayName, Token, renewalToken, roles);

      if (roles.length > 1) {
        await push({ to: Paths.SSO.SelectRole });
      } else {
        const role = roles[0];
        let dashboardPath = '/';

        switch (role.slug) {
          case RoleSlug.JOB_SEEKER:
            dashboardPath = Paths.HRLink.Dashboard;
            break;
          case RoleSlug.ORGANIZATION:
            dashboardPath = Paths.HRLink.Dashboard;
            break;
          case RoleSlug.SUPER_ADMIN:
            dashboardPath = '/super-admin/dashboard';
            break;
        }

        await push({ to: dashboardPath });
      }

    } catch (error: any) {
      console.error('❌ خطا در لاگین:', error);
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