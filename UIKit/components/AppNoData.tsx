import { Image } from '@heroui/react';

export const AppNoData = ({ props }: { props: any }) => {
  const { message, size = { height: 300, width: 450 } } = props;

  return (
    <div className="text-center flex flex-col items-center justify-center w-full">
      <p className="text-secondary-1000 dark:text-white text-xl font-medium">
        {message}
      </p>
      <Image height={size.height} src="" width={size.width} />
    </div>
  );
};
