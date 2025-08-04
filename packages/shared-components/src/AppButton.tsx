import { Button } from "@heroui/react";

export const AppButton = ({ props }: { props: any }) => {
  const {
    text,
    fullWidth,
    size,
    type,
    variant,
    onClick,
    startContent,
    endContent,
    isIconOnly,
  } = props;

  return (
    <Button
      className="rounded-2"
      endContent={endContent}
      fullWidth={fullWidth}
      isIconOnly={isIconOnly}
      size={size}
      startContent={startContent}
      type={type}
      variant={variant}
      onPress={onClick}
    >
      {text}
    </Button>
  );
};
