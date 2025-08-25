import { Pagination as HeroPagination } from '@heroui/react';

interface AppPaginationProps {
  props: {
    size?: 'sm' | 'md' | 'lg';
    total: number;
    initialPage?: number;
    onChange?: (page: number) => void;
    showControls?: boolean;
    dotsJump?: number;
  };
}

const AppPagination = ({ props }: AppPaginationProps) => {
  const {
    size = 'md',
    total,
    initialPage = 1,
    onChange,
    showControls = true,
    dotsJump = 3,
  } = props;

  return (
    <HeroPagination
      size={size}
      total={total}
      initialPage={initialPage}
      showControls={showControls}
      dotsJump={dotsJump}
      onChange={onChange}
      radius='sm'
      classNames={{
        item: 'bg-white text-secondary-1000 shadow-md dark:bg-info-1000 hover:dark:bg-transparent',
        cursor: 'bg-secondary-400 text-white',
        next: 'dark:bg-transparent bg-white text-secondary-1000',
        prev: 'dark:text-white bg-white text-secondary-1000',
      }}
    />
  );
};

export default AppPagination;
