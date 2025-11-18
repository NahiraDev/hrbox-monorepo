import { useAuth } from "@hrbox/core/hooks/useAuth";
import { useNavigation } from "@hrbox/core/hooks/useNavigation";
import { Paths } from "../../paths";
import { Button } from "@heroui/react";
import { RoleSlug } from "@hrbox/core/config/theme";
import { useEffect } from "react";
import {
  useFetchProfileInfoQuery,
  useGetProfilePhotoQuery,
} from "@hrbox/modules/hrlink/apis/Resume";

const SelectRole = () => {
  const {
    user,
    roles,
    roleSelected,
    selectedRole,
    needsRoleSelection,
    logout,
  } = useAuth();
  const { push } = useNavigation();
  const { data: getRole } = useFetchProfileInfoQuery();
  const { data: getProfilePhoto } = useGetProfilePhotoQuery();
  useEffect(() => {
    const checkProfileAndRedirect = async () => {
      if (!needsRoleSelection && selectedRole) {
        try {
          const profile = null;
          const isComplete = getRole?.FirstName && getRole.Email;

          let dashboardPath = "/";
          switch (selectedRole.slug) {
            case RoleSlug.JOB_SEEKER:
              dashboardPath = Paths.HRLink.Dashboard;
              break;
            case RoleSlug.ORGANIZATION:
              dashboardPath = Paths.HRLink.Dashboard;
              break;
            case RoleSlug.SUPER_ADMIN:
              dashboardPath = "/super-admin/dashboard";
              break;
          }

          if (!isComplete) {
            push({
              to:
                Paths.HRLink.ResumeInformation || "/hrlink/resume/inforamtion",
            });
          } else {
            push({ to: dashboardPath });
          }
        } catch (err) {
          console.error("❌ خطا در چک پروفایل:", err);
        }
      }
    };

    checkProfileAndRedirect();
  }, [needsRoleSelection, selectedRole]);

  const handleRoleSelect = async (role: any) => {
    try {
      const accessToken = localStorage.getItem("token");

      roleSelected(role, accessToken);
      // localStorage.setItem('userProfile', JSON.stringify(profile));

      let dashboardPath = "/";
      switch (role.slug) {
        case RoleSlug.JOB_SEEKER:
          dashboardPath = Paths.HRLink.Dashboard;
          break;
        case RoleSlug.ORGANIZATION:
          dashboardPath = Paths.HRLink.Dashboard;
          break;
        case RoleSlug.SUPER_ADMIN:
          dashboardPath = "/super-admin/dashboard";
          break;
      }

      // if (!isComplete) {
      //     console.log('⚠️ Profile incomplete, redirecting to form');
      //     await push({ to:'/hrlink/profile-form' });
      // } else {
      //     console.log('✅ Redirecting to:', dashboardPath);
      //     await push({ to: dashboardPath });
      // }
    } catch (err) {
      console.error("❌ انتخاب نقش ناموفق:", err);
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
    <div className="flex gap-3">
      {roles.map((role: any) => (
        <div
          key={role.id}
          className="bg-white p-5  rounded-xl shadow-sm w-[200px] h-[290px] border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => handleRoleSelect(role)}
        >
          <div className="flex flex-col items-center gap-4">
            <button onclick={() => handleRoleSelect(role)}>
              <div className="w-40 h-40 rounded-2xl overflow-hidden">
                <img
                  src={user.avatar || "/images/profile.webp"}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-secondary-1000">
                  {user.name}
                </h3>
                <p className="text-sm text-primary-700 font-medium">
                  {role.name}
                </p>
                <div className="mt-2 inline-block px-3 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full">
                  {role.slug === "organization" && "Hrbox Holding"}
                </div>
              </div>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectRole;
