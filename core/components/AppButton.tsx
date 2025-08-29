import { Button } from '@heroui/react';
import clsx from 'clsx';

const baseClasses = `
  rounded-2 text-white leading-5 text-base font-normal
  transition-colors duration-200 ease-in-out
  bg-primary-400 flex
  hover:bg-primary-500 dark:hover:bg-surface-300
  focus:outline-none focus:ring-2 focus:ring-primary-300 dark:focus:ring-surface-100 focus:ring-offset-2
  active:bg-primary-600 dark:active:bg-surface-400
  disabled:opacity-50 disabled:cursor-not-allowed
`;

const sizeClasses: Record<string, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
  xl: 'px-6 py-4 text-xl',
};

const radiusClasses: Record<string, string> = {
  none: 'rounded-none',
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  full: 'rounded-full',
};

const AppButton = ({ props }: { props: any }) => {
  if (!props) return null;

  const {
    content,
    fullWidth,
    type = 'button',
    variant = 'solid',
    color,
    size = 'md',
    radius = 'md',
    onPress,
    onClick,
    startContent,
    endContent,
    isIconOnly = false,
    className,
    disabled,
    isSubmitting,
    spinner,
    spinnerPlacement,
    disableRipple,
    disableAnimation,
    ...rest
  } = props;
  const handlePress = onPress || onClick;
  return (
    <Button
      disableAnimat
      className={clsx(
        baseClasses,
        sizeClasses[size],
        radiusClasses[radius],
        className,
      )}
      color={color}
      disableRipple={disableRipple}
      endContent={endContent}
      fullWidth={fullWidth}
      ion={disableAnimation}
      isDisabled={disabled}
      isIconOnly={isIconOnly}
      isLoading={isSubmitting}
      radius={radius}
      size={size}
      spinner={spinner}
      spinnerPlacement={spinnerPlacement}
      startContent={startContent}
      type={type}
      variant={variant}
      onClick={handlePress}
      onPress={handlePress}
      {...rest}
    >
      {content}
    </Button>
  );
};

AppButton.displayName = 'AppButton';

export default AppButton;
