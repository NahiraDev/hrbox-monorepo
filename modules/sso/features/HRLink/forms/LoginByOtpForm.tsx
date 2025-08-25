import { AppButton } from '../../../../../core';
import { Avatar, Form, Input, Select, SelectItem } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import { Flag } from '../../../components';
import { useAppSelector } from '../../../../../core';
import { useFormContext } from '../../../../../core';

const LoginByOtpForm = () => {
  const {
    values,
    handleBlur,
    handleSubmit,
    isSubmitting,
    formError,
    setFieldValue,
  } = useFormContext();
  const { t } = useTranslation();
  const lang = useAppSelector((state) => state.language.lang);
  const handleChangeInputPhoneNumber = (e: any) => {
    const phoneNumber = e.target.value.replace(values.countryCode, '').trim();

    setFieldValue('phoneNumber', phoneNumber);
  };

  return (
    <Form
      className="w-full max-w-xs flex flex-col gap-6"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-1">
          <div className="flex w-full !px-0">
            <Input
              className="rounded-5 !px-0"
              classNames={{
                input: `${lang === 'fa' && 'text-left'}`,
                inputWrapper:
                  ' !bg-white dark:!bg-info-1000 border border-primary-0 rounded-5 !backdrop_blur[35px] dark:border-none dark:!shadow-secondary w-full px-0',
              }}
              endContent={
                lang === 'fa' ? (
                  <div className="flex items-center justify-center">
                    <Select
                      classNames={{
                        trigger: '!bg-transparent !shadow-none ltr',
                        base: 'w-20',
                        popoverContent: 'w-max w-full w-72',
                        selectorIcon: ' text-primary dark:text- w-5 h-5',
                      }}
                      defaultSelectedKeys={['78']}
                      items={Flag()}
                      name="countryCode"
                      radius="md"
                      renderValue={(items) => {
                        return items.map((item) => (
                          <div key={item.key} className="flex items-center">
                            <Avatar
                              alt={item.data?.name}
                              className="flex-shrink-0 w-6 h-4"
                              radius="none"
                              src={item.data?.avatar}
                            />
                          </div>
                        ));
                      }}
                      value={values.countryCode}
                      variant="flat"
                    >
                      {(user) => (
                        <SelectItem key={user.id} textValue={user.name}>
                          <div className="flex gap-2 items-center">
                            <Avatar
                              alt={user.name}
                              className="flex-shrink-0 w-6 h-4"
                              radius="none"
                              src={user.avatar}
                            />
                            <div className="flex flex-col">
                              <span className="text-small">{user.name}</span>
                            </div>
                          </div>
                        </SelectItem>
                      )}
                    </Select>
                  </div>
                ) : null
              }
              isRequired={true}
              label={t('pick_your_country')}
              labelPlacement="outside"
              name="UsernameOrMobile"
              placeholder="9123456789"
              startContent={
                lang === 'fa' ? null : (
                  <div className="flex items-center justify-center">
                    <Select
                      classNames={{
                        trigger: '!bg-transparent !shadow-none',
                        base: 'w-20',
                        popoverContent: 'w-max w-full w-72',
                        selectorIcon: ' text-primary dark:text-white w-5 h-5',
                      }}
                      defaultSelectedKeys={['78']}
                      items={Flag()}
                      name="countryCode"
                      radius="md"
                      renderValue={(items) => {
                        return items.map((item) => (
                          <div key={item.key} className="flex items-center">
                            <Avatar
                              alt={item.data?.name}
                              className="flex-shrink-0 w-6 h-4"
                              radius="none"
                              src={item.data?.avatar}
                            />
                          </div>
                        ));
                      }}
                      value={values.countryCode}
                      variant="flat"
                    >
                      {(user) => (
                        <SelectItem key={user.id} textValue={user.name}>
                          <div className="flex gap-2 items-center">
                            <Avatar
                              alt={user.name}
                              className="flex-shrink-0 w-6 h-4"
                              radius="none"
                              src={user.avatar}
                            />
                            <div className="flex flex-col">
                              <span className="text-small">{user.name}</span>
                            </div>
                          </div>
                        </SelectItem>
                      )}
                    </Select>
                  </div>
                )
              }
              type="text"
              value={values.UsernameOrMobile}
              onBlur={handleBlur}
              onChange={(e) => handleChangeInputPhoneNumber(e)}
            />
          </div>
        </div>
      </div>

      <div className="pb-32 w-full">
        <AppButton
          props={{
            text: t('send_code'),
            className:
              'bg-secondary-400 dark:bg-surface-200 text-white font-semibold text-base leading-[20px] !py-4 h-14',
            fullWidth: true,
            size: 'lg',
            type: 'submit',
            variant: 'primary',
            isLoading: isSubmitting,
          }}
        />
      </div>
      {formError && <div className="text-red-500 text-sm">{formError}</div>}
    </Form>
  );
};

export default LoginByOtpForm;
