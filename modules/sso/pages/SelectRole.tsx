import { useAuth } from '@hrbox/core/hooks/useAuth';
import { useNavigation } from '@hrbox/core/hooks/useNavigation';
import { Paths } from '../../paths';
import { Button } from '@heroui/react';
import { RoleSlug } from '@hrbox/core/config/theme';
import { useEffect } from 'react';
import {useFetchProfileInfoQuery, useGetProfilePhotoQuery} from "@hrbox/modules/hrlink/apis/Resume";

const SelectRole = () => {
    const { user, roles, roleSelected, selectedRole, needsRoleSelection, logout } = useAuth();
    const { push } = useNavigation();
    const {data:getRole} = useFetchProfileInfoQuery()
    const {data:getProfilePhoto} = useGetProfilePhotoQuery()
    useEffect(() => {
        const checkProfileAndRedirect = async () => {
            if (!needsRoleSelection && selectedRole) {
                try {
                    const profile = null;
                    const isComplete = getRole?.FirstName && getRole.Email;

                    let dashboardPath = '/';
                    switch (selectedRole.slug) {
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

                    if (!isComplete) {
                        push({ to: Paths.HRLink.ResumeInformation || '/hrlink/resume/inforamtion' });
                     } else {
                        push({ to: dashboardPath });
                    }
                } catch (err) {
                    console.error('❌ خطا در چک پروفایل:', err);
                }
            }
        };

        checkProfileAndRedirect();
    }, [needsRoleSelection, selectedRole]);

    const handleRoleSelect = async (role: any) => {
        try {
            console.log('🎭 Selecting role:', role);

            const selectResponse = await apiResponse.selectRole(role.slug);
            const accessToken = selectResponse.accessToken || user?.id || 'temp-access-token';

            roleSelected(role, accessToken);

            const profile = await apiResponse.getProfile();

            localStorage.setItem('userProfile', JSON.stringify(profile));

            const isComplete = profile.name && profile.email;

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

            if (!isComplete) {
                console.log('⚠️ Profile incomplete, redirecting to form');
                await push({ to:'/hrlink/profile-form' });
            } else {
                console.log('✅ Redirecting to:', dashboardPath);
                await push({ to: dashboardPath });
            }

        } catch (err) {
            console.error('❌ انتخاب نقش ناموفق:', err);
        }
    };

    if (!user || roles.length === 0) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-secondary-600">در حال بارگذاری...</p>
                </div>
            </div>
        );
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
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary-100">
                                <img
                                    src={user.avatar || '/default-avatar.png'}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
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
                                onPress={() => handleRoleSelect(role)}
                                className="w-full mt-3"
                                color="primary"
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
                        logout();
                        push({ to: Paths.SSO.login });
                    }}
                    variant="light"
                    color="danger"
                    size="sm"
                >
                    خروج از حساب
                </Button>
            </div>
        </div>
    );
};

export default SelectRole;