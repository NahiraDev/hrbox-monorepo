import { Button } from '@heroui/react';
import clsx from 'clsx';

const baseClasses = `
  leading-5 font-normal
  transition-colors duration-200 ease-in-out
  flex min-w-fit
`;

const sizeClasses: Record<string, string> = {
  xs: 'p-1.5 text-xs',
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
      className={clsx(baseClasses, sizeClasses[size], radiusClasses[radius], className)}
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
      onPress={handlePress}
      {...rest}
    >
      {content}
    </Button>
  );
};

AppButton.displayName = 'AppButton';

export default AppButton;
