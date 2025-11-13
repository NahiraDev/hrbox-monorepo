import { useAuth } from '@hrbox/core/hooks/useAuth';
import { useNavigation } from '@hrbox/core/hooks/useNavigation';
import { Paths } from '../../paths';
import { Button } from '@heroui/react';

const SelectRole = () => {
  const { user, roles, roleSelected, selectedRole, needsRoleSelection } = useAuth();
  const {push} = useNavigation();

  // اگر نیاز به انتخاب نقش نباشه → مستقیم ریدایرکت
  if (!needsRoleSelection && selectedRole) {
    push({to:Paths.HRLink.Dashboard})
    return null;
  }

  const handleRoleSelect = async (role: any) => {
    try {
      // فرض: بک‌اند یه endpoint داره برای انتخاب نقش
      // اگر نداره، فقط local ذخیره کن
      // await selectRole({ roleId: role.id }).unwrap();

      // دسترسی موقت: فقط localStorage + Redux
      const accessToken = 'temp-access-token'; // در حالت واقعی از بک‌اند بگیر
      roleSelected(role, accessToken);

    } catch (err) {
      console.error('انتخاب نقش ناموفق:', err);
    }
  };

  if (!user || roles.length === 0) {
    return <div>در حال بارگذاری...</div>;
  }

  return (
    <div className="flex flex-col gap-12 p-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-secondary-1000">انتخاب نقش</h1>
        <p className="text-secondary-600 mt-2">
          سلام <span className="font-semibold">{user.name}</span>! لطفاً نقش مورد نظر خود را انتخاب کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div
            key={role.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleRoleSelect(role)}
          >
            <div className="flex flex-col items-center gap-4">
              {/* آواتار کاربر */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary-100">
                <img
                  src={user.avatar || '/default-avatar.png'}
                  alt={user.name}
                  className="object-cover"
                />
              </div>

              {/* اطلاعات کاربر */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-secondary-1000">{user.name}</h3>
                <p className="text-sm text-primary-700 font-medium">{role.name}</p>
                <div className="mt-2 inline-block px-3 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full">
                  {role.slug}
                </div>
              </div>

              {/* دکمه انتخاب */}
              <Button
                onPress={(e) => {
                  handleRoleSelect(role);
                }}
                className="w-full mt-3"
                variant="flat"
              >
                ورود به پنل {role.name}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* دکمه خروج */}
      <div className="text-center">
        <Button
          onPress={() => {
            const { logout } = useAuth();
            logout();
          }}
          variant="flat "
          size="sm"
        >
          خروج از حساب
        </Button>
      </div>
    </div>
  );
};

export default SelectRole;