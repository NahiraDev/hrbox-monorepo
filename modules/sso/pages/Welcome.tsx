import { useEffect } from 'react';
import { Button } from '@heroui/react';
import { useAppSelector } from '@hrbox/core/redux/hooks';
import { useNavigation } from '@hrbox/core/hooks/useNavigation';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { Paths } from "@hrbox/modules/paths";

export function WelcomePage() {
  const { push } = useNavigation();
  const user = useAppSelector((state:any) => state.auth.user);
  const selectedRole = useAppSelector((state:any) => state.auth.selectedRole);
  const { width, height } = useWindowSize();

  useEffect(() => {
    // Auto redirect after 3 seconds
    const timer = setTimeout(() => {
      push({to:Paths.HRLink.Dashboard});
    }, 3000);

    return () => clearTimeout(timer);
  }, [push]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Confetti width={width} height={height} recycle={false} numberOfPieces={200} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6 max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <div className="text-6xl">🎉</div>
        </motion.div>

        <div>
          <h1 className="text-4xl font-bold">خوش آمدید!</h1>
          <p className="text-xl text-gray-600 mt-2">
            {user?.name} عزیز
          </p>
        </div>

        <div className="bg-primary/10 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            شما با نقش <span className="font-semibold text-primary">{selectedRole?.name}</span> وارد شده‌اید
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Button
            color="primary"
            size="lg"
            onPress={() => push({to:Paths.HRLink.Dashboard})}
          >
            ورود به داشبورد
          </Button>
        </motion.div>

        <p className="text-sm text-gray-500">
          در حال انتقال خودکار...
        </p>
      </motion.div>
    </div>
  );
}
