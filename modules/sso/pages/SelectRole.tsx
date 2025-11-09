import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@hrbox/core/redux/hooks';
import { roleSelected } from '@hrbox/core/redux/slices/authSlice';
import { useSelectRoleMutation } from '@module/sso/apis/Auth';
import { useNavigation } from '@hrbox/core/hooks/useNavigation';
import { getRoleConfig, type RoleSlug } from '@hrbox/core/config/theme/roles';
import { Button, Card, CardBody } from "@heroui/react";

export function SelectRolePage() {
  const dispatch = useAppDispatch();
  const { push } = useNavigation();
  const user = useAppSelector((state:any) => state.auth.user);
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');
  const [selectRole, { isLoading }] = useSelectRoleMutation();

  const handleContinue = async () => {
    if (!selectedRoleId) return;

    try {
      const result = await selectRole({ roleId: selectedRoleId }).unwrap();

      const role = user?.roles.find((r) => r.id === selectedRoleId);
      if (role) {
        dispatch(roleSelected({
          role,
          accessToken: result.accessToken,
        }));

        push({to:'/sso/welcome'});
      }
    } catch (error) {
      console.error('Role selection failed:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-6xl mb-4"
          >
            🎭
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            انتخاب نقش
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            شما دارای چند نقش هستید. لطفا نقش مورد نظر خود را انتخاب کنید
          </p>
        </div>

        {/* Role Cards */}
        <div className="space-y-4 mb-8">
          {user.roles.map((role, index) => {
            const roleConfig = getRoleConfig(role.slug as RoleSlug);
            const isSelected = selectedRoleId === role.id;

            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  isPressable
                  onPress={() => setSelectedRoleId(role.id)}
                  className={`cursor-pointer transition-all ${
                    isSelected
                      ? 'ring-4 scale-[1.02]'
                      : 'hover:scale-[1.01]'
                  }`}
                  style={{
                    ringColor: isSelected ? roleConfig.color : 'transparent',
                  }}
                >
                  <CardBody className="p-6">
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
                        style={{
                          backgroundColor: isSelected
                            ? `${roleConfig.color}20`
                            : '#F3F4F6',
                        }}
                      >
                        {roleConfig.icon}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {role.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {roleConfig.panel === 'hrlink' && 'پنل کارجو'}
                          {roleConfig.panel === 'hrbox' && 'پنل سازمانی'}
                          {roleConfig.panel === 'super-admin' && 'پنل مدیریت'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {role.permissions.length} مجوز دسترسی
                        </p>
                      </div>

                      {/* Checkmark */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex h-8 w-8 items-center justify-center rounded-full"
                          style={{ backgroundColor: roleConfig.color }}
                        >
                          <span className="text-white text-xl">✓</span>
                        </motion.div>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Continue Button */}
        <Button
          color="primary"
          size="lg"
          fullWidth
          isDisabled={!selectedRoleId}
          isLoading={isLoading}
          onPress={handleContinue}
          className="text-lg font-semibold"
        >
          ادامه
        </Button>
      </motion.div>
    </div>
  );
}
