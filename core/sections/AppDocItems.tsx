import { AppButton } from 'core/components';

interface DocItemProps {
  props: {
    to?: string;
    icon: any;
    title?: string;
    outlined?: boolean;
    isActive?: boolean;
  };
}

export const DocItem = ({ props }: DocItemProps) => {
  const {
    to = '/',
    icon: Icon,
    title = '',
    outlined = false,
    isActive = false,
  } = props;

  const handleClick = () => {
    if (to) {
    }
  };

  return (
    <div>
      <AppButton
        props={{
          onPress: () => handleClick(),
          className: `p-3 flex items-center justify-center rounded-lg w-12 h-12
          ${
            outlined
              ? 'border border-dashed dark:border-white bg-transparent dark:text-white'
              : isActive
                ? 'w-[60px] h-[60px] bg-gradient-to-b from-[#1E3363] to-[#3D68C9] filter-[drop-shadow(0_1.26px_3.78px_rgba(0,0,0,0.3))] text-white dark:bg-gradient-to-t dark:from-[#064368] dark:to-[#BAD9EC] dark:filter-[drop-shadow(0_1.26px_3.78px_rgba(0,0,0,0.3))] dark:text-white'
                : 'bg-gradient-to-t from-[#DCE0E3] to-white filter-[drop-shadow(0_0.887px_2.661px_rgba(0,0,0,0.3))] dark:to-[rgba(4,66,92,0.4)] dark:filter-[drop-shadow(0_0.887px_2.661px_rgba(0,0,0,0.3))] dark:text-white'
          }`,
          content: <Icon size={isActive ? '32' : '24'} />,
        }}
      />
      {isActive && <span className="text-xs font-semibold text-center absolute text-secondary-1000">{title}</span>}
    </div>
  );
};

export default DocItem;
