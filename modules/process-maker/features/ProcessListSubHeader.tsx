import { Add, Hierarchy3, SearchNormal, Setting4 } from 'iconsax-reactjs';

import { AppButton } from '@hrbox/uikit/components';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import { NewOneModal } from '@module/process-maker/features/modals';

const ProcessListSubHeader = () => {
  const { openModal } = useModalContext();

  return (
    <div className="flex flex-row-reverse w-full justify-between">
      <div className="flex flex-row-reverse gap-2">
        <AppButton
          props={{
            color: 'white',
            size: 'md',
            radius: 'lg',
            startContent: <Add />,
            onPress: () => openModal('confirm', 'NewOneModal', <NewOneModal/>),
            className: 'border-1 border-primary',
            content: 'Add new One',
          }}
        />
        {/*{isModalOpen('confirm', 'NewOneModal') && <NewOneModal />}*/}
        <AppButton
          props={{
            color: 'bg-white',
            size: 'md',
            radius: 'lg',
            className: 'border-1 border-primary',
            startContent: <Setting4 />,
          }}
        />
        <AppButton
          props={{
            color: 'bg-white',
            size: 'md',
            radius: 'lg',
            className: 'border-1 border-primary',
            startContent: <SearchNormal />,
          }}
        />
      </div>
      <div className="flex">
        <AppButton
          props={{
            color: 'primary',
            size: 'md',
            radius: 'lg',
            startContent: <Hierarchy3 />,
            content: 'Processes',
          }}
        />
      </div>
    </div>
  );
};

export default ProcessListSubHeader;
