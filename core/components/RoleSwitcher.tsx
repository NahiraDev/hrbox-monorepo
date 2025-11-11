import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { useAuth } from '@hrbox/core/hooks/useAuth';
import { getRoleConfig } from '@hrbox/core/config/theme';
import { AppButton } from '@hrbox/uikit/components';
import { ArrowDown } from "iconsax-reactjs";

export const RoleSwitcher = () => {
  const { user, selectedRole, switchRole } = useAuth();

  if (!selectedRole || !user || user.roles.length <= 1) {
    return null;
  }

  const currentRoleConfig = getRoleConfig(selectedRole.slug);

  return (
    <Dropdown>
      <DropdownTrigger>
        <AppButton
          variant='bordered'
        color='primary'
        size='sm'
        radius='md'
        content={
          <div className="flex items-center gap-2">
            <span className="text-lg">{currentRoleConfig.icon}</span>
            <span className="text-xs font-medium">{currentRoleConfig.nameFA}</span>
            <ArrowDown size="16" />
          </div>
        }
        />
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Role Selection"
        onAction={(key) => {
          const role = user.roles.find((r) => r.id === key);
          if (role) {
            switchRole(role);
          }
        }}
      >
        {user.roles.map((role: { slug: any; id: string | number; }) => {
          const roleConfig = getRoleConfig(role.slug);
          return (
            <DropdownItem
              key={role.id}
              textValue={roleConfig.nameFA}
              className="gap-2"
              startContent={<span className="text-lg">{roleConfig.icon}</span>}
            >
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">{roleConfig.nameFA}</span>
                <span className="text-xs text-neutral-500">{roleConfig.description}</span>
              </div>
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};