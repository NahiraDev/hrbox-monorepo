import { useAuth } from "@hrbox/core/hooks/useAuth";
import { useNavigation } from "@hrbox/core/hooks/useNavigation";
import { Paths } from "../../paths";
import { RoleSlug } from "@hrbox/core/config/theme";
import { useEffect } from "react";
import {
  useFetchProfileInfoQuery,
  useGetProfilePhotoQuery,
} from "@hrbox/modules/hrlink/apis/Resume";
import { roleSelected } from "@hrbox/core/redux";

const SelectRole = () => {
  const { user, roles } = useAuth();
  const { push } = useNavigation();

  const handleRoleSelect = async (role: any) => {
    try {
      roleSelected(role);
      push({ to: Paths.SSO.welcome });
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
          className="bg-white p-5  rounded-xl shadow-sm w-[200px] h-[300px] hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => handleRoleSelect(role)}
        >
          <div>
            <button
              className="flex flex-col gap-3"
              onclick={() => handleRoleSelect(role)}
            >
              <div className="w-40 h-40 rounded-2xl overflow-hidden">
                <img
                  src={user.avatar || "/images/profile.webp"}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-secondary-1000 text-start">
                  {user.name}
                </h3>
                {role.slug === "organization" ? (
                  <p className="text-sm text-primary-700 font-semibold text-start">
                    {role.name}
                  </p>
                ) : (
                  <p className="text-sm text-[#900F2E] font-semibold text-start">
                    {role.name}
                  </p>
                )}
                {role.slug === "organization" ? (
                  <div className="inline-block px-3 py-0.5 bg-[#DCF0F9]  text-primary-600 text-sm font-medium rounded-lg">
                    Hrbox Holding
                  </div>
                ) : (
                  <div className="inline-block px-3 py-0.5 bg-[#FEDEE6] text-[#900F2E] text-sm font-semibold rounded-lg">
                    HRLink
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectRole;
