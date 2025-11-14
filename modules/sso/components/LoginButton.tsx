import {AppButton} from "@hrbox-monorepo/UIKit/components";
import {Paths} from "@hrbox-monorepo/modules/paths";
import {useNavigation} from "@hrbox-monorepo/core/hooks/useNavigation";
import {useTranslation} from "react-i18next";

export const LoginButton = () =>{
    const { push } = useNavigation()
    const { t } = useTranslation()
    return(
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center gap-3 w-full">
                <hr className="lg:w-full w-full h-[1px] text-neutral-400" />
                <span className="text-neutral-400 dark:neutral-250 text-sm font-bold">
            {t('or')}
          </span>
                <hr className="lg:w-full w-full h-[1px] text-neutral-400" />
            </div>

            <AppButton
                content={(t('sign_in_with_phone_number'))}
                size='xl'
                fullWidth={true}
                variant="light"
                startContent={<img src="/images/message.svg" alt="phone icon"/>}
                className="border !border-[rgba(216,216,216,0)]
       !bg-[radial-gradient(231%_135.8%_at_0.9%_2.98%,rgba(255,255,255,0.70)_0%,rgba(255,255,255,0.10)_100%)]
       !backdrop-blur-[20px] justify-start"
                onPress={() => push({to: Paths.SSO.loginByOtp})}
            />

            <AppButton
                content={(t('sign_in_with_google'))}
                size='xl'
                fullWidth={true}
                variant='light'
                startContent={<img src="/images/Google%20Logo.svg" alt="google icon"/>}
                className="border !border-[rgba(216,216,216,0)]
       !bg-[radial-gradient(231%_135.8%_at_0.9%_2.98%,rgba(255,255,255,0.70)_0%,rgba(255,255,255,0.10)_100%)]
       !backdrop-blur-[20px] justify-start"
                onPress={() => console.log('Sign in with phone number clicked!')}
            />
        </div>
    )
}