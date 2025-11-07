import { Button } from '@heroui/react';
import clsx from 'clsx';
import { useImperativeHandle } from 'react';

const sizeClasses: Record<string, string> = {
  xs: 'p-1.5 text-xs',
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-1.5 text-base',
  lg: 'px-4 py-3 text-lg',
  xl: 'px-6 py-4 text-xl',
};

const radiusClasses: Record<string, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
};

export const AppButton = ({ props }: any) => {
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
  } = props;
  const handlePress = onPress || onClick;
  const { ref: forwardedRef, ...rest } = props;
  if (forwardedRef && typeof forwardedRef === 'object' && forwardedRef.hasOwnProperty('current')) {
    useImperativeHandle(forwardedRef, () => ({
      // Exposed methods
    }));
  }
  return (
    <Button
      ref={forwardedRef}
      className={clsx(
        'leading-5 font-normal transition-colors duration-200 ease-in-out flex min-w-fit h-fit',
        variant !== 'light' && 'shadow-theme-sm',
        sizeClasses[size],
        radiusClasses[radius],
        className
      )}
      color={color}
      disableRipple={disableRipple}
      endContent={endContent}
      fullWidth={fullWidth}
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
}

AppButton.displayName = 'AppButton';
