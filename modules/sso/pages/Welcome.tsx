import { useEffect } from 'react';
import { Button } from '@heroui/react';
import { useAppSelector } from '@hrbox/core/redux/hooks';
import { useNavigation } from '@hrbox/core/hooks/useNavigation';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { Paths } from "@hrbox/modules/paths";
import {useTranslation} from "react-i18next";
import {AppButton} from "@hrbox-monorepo/UIKit/components";
import { useAuth } from '@hrbox/core/hooks/useAuth';

export const Welcome = () => {
  const { t } = useTranslation();
  const { push } = useNavigation();
  const user = useAppSelector((state:any) => state.auth.user);
  const selectedRole = useAppSelector((state:any) => state.auth.selectedRole);
  const { width, height } = useWindowSize();
  const userPannel = useAuth()

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     push({to:Paths.HRLink.Dashboard});
  //   }, 8000);
  //
  //   return () => clearTimeout(timer);
  // }, [push]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Confetti width={width} height={height} recycle={false} numberOfPieces={200} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className=" space-y-6 max-w-4xl"
      >

        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-5xl font-bold text-secondary-1000 mb-3">Welcome to {userPannel.currentDomain}!</h1>
            <h2 className="text-4xl font-normal text-secondary-1000">The Smart Human Resources Management Platform!</h2>
          </div>
          <p>
            In a world where time and precision matter more than ever, we empower you to manage all your HR needs in an integrated, fast, and efficient way. With HRBox, everything you need for employee management, training, payroll, and organizational interactions is brought together in one place. Welcome to the HRBox family – where simplicity and innovation work for you!
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <AppButton
            color="primary"
            size="lg"
            content="continue"
            onPress={() => push({to:Paths.HRLink.Dashboard})}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Welcome;