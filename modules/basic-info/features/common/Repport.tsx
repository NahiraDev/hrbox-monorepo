import { Listbox, ListboxItem, Avatar } from '@heroui/react';
import { AppButton, AppDeleteModal, AppInput } from '@core/components';
import { MessageEdit, Trash } from 'iconsax-react';
import { useModalContext } from '@root/core';

const users = [
  { id: '1', name: 'Zahra Pakniyati', role: 'UiUx Designer', section: 'Report To' },
  { id: '2', name: 'Zahra Pakniyati', role: 'UiUx Designer', section: 'Report To' },
  { id: '3', name: 'Zahra Pakniyati', role: 'UiUx Designer', section: 'Report To' },
  { id: '4', name: 'Zahra Pakniyati', role: 'UiUx Designer', section: 'Indirect Relationship With' },
  { id: '5', name: 'Zahra Pakniyati', role: 'UiUx Designer', section: 'Consultant' },
  { id: '6', name: 'Zahra Pakniyati', role: 'UiUx Designer', section: 'Subgroup Colleagues' },
  { id: '7', name: 'Zahra Pakniyati', role: 'UiUx Designer', section: 'Subgroup Colleagues' },
  { id: '7', name: 'Zahra Pakniyati', role: 'UiUx Designer', section: 'Subgroup Colleagues' },
];

const cardContainerClass = `m-4 overflow-y-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200 max-h-[calc(100vh-100px)]
  [&::-webkit-scrollbar]:w-3
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300`;

const OrganizationalChart = () => {
  const { openModal } = useModalContext();

  return (
    <div className={cardContainerClass}>
      <div className="flex flex-col gap-1 ">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs !font-semibold text-secondary-1000">
              Sign
            </span>
          </div>
          <div className="flex gap-1">
            <AppButton
              props={{
                size: 'xs',
                radius: 'sm',
                color: 'white',
                variant: 'solid',
                className: 'p-2 hover:!bg-primary transition-all duration-200',
                content: <MessageEdit className="text-secondary-1000 group-hover:text-white" />,
              }}
            />
            <AppButton
              props={{
                size: 'xs',
                radius: 'sm',
                variant: 'light',
                isIconOnly: true,
                onPress: () => openModal('delete',"", <AppDeleteModal />, undefined, 'lg',"Do you want to remove it?",<Trash className='text-white'/>),
                content: <Trash className="text-secondary-1000 group-hover:text-white" />,
                className: 'p-2 hover:!bg-red-500 transition-all duration-200',
              }}
            />
          </div>
        </div>
        <div>
          <AppInput
            props={{
              className:"border border-surface ",
              label: '',
              size: 'lg',
              color: 'primary',
              radius: 'lg',
            }}
          />
        </div>

      </div>
      <div className="w-full mt-3 ">
        <h3 className="text-lg !font-semibold mb-2 text-secondary-1000">Report To</h3>
        <Listbox
          items={users.filter((user) => user.section === 'Report To')}
          label="Report To"
          selectionMode="none"
          variant="flat"
        >
          {(item) => (
            <ListboxItem key={item.id} textValue={item.name}>
              <div className="flex items-center justify-start gap-4 w-full ">
                <Avatar alt={item.name}  radius="sm" size="lg" src="https://i.pravatar.cc/150?u=b04258114e29026302d" />
                <div className="flex flex-col items-center gap-1">
                  <span className="!text-xs text-secondary-1000">{item.name}</span>
                  <AppButton
                    props={{
                      className: 'border border-[#DCF0F9] bg-surface h-5 text-primary',
                      variant: 'bordered',
                      radius: 'full',
                      content: <span className="!text-[10px]  ">{item.role}</span>,
                    }}
                  />
                </div>
              </div>
            </ListboxItem>
          )}
        </Listbox>

        <h3 className="text-lg !font-semibold mb-2 text-secondary-1000">Indirect Relationship With</h3>
        <Listbox
          items={users.filter((user) => user.section === 'Report To')}
          label="Report To"
          selectionMode="none"
          variant="flat"
        >
          {(item) => (
            <ListboxItem key={item.id} textValue={item.name}>
              <div className="flex items-center justify-start gap-4 w-full ">
                <Avatar alt={item.name}  radius="sm" size="lg" src="https://i.pravatar.cc/150?u=b04258114e29026302d" />
                <div className="flex flex-col items-center gap-1">
                  <span className="!text-xs text-secondary-1000">{item.name}</span>
                  <AppButton
                    props={{
                      className: 'border border-[#DCF0F9] bg-surface h-5 text-primary',
                      variant: 'bordered',
                      radius: 'full',
                      content: <span className="!text-[10px]  ">{item.role}</span>,
                    }}
                  />
                </div>
              </div>
            </ListboxItem>
          )}
        </Listbox>

        <h3 className="text-lg !font-semibold mb-2 text-secondary-1000">Consultant</h3>
        <Listbox
          items={users.filter((user) => user.section === 'Report To')}
          label="Report To"
          selectionMode="none"
          variant="flat"
        >
          {(item) => (
            <ListboxItem key={item.id} textValue={item.name}>
              <div className="flex items-center justify-start gap-4 w-full ">
                <Avatar alt={item.name}  radius="sm" size="lg" src="https://i.pravatar.cc/150?u=b04258114e29026302d" />
                <div className="flex flex-col items-center gap-1">
                  <span className="!text-xs text-secondary-1000">{item.name}</span>
                  <AppButton
                    props={{
                      className: 'border border-[#DCF0F9] bg-surface h-5 text-primary',
                      variant: 'bordered',
                      radius: 'full',
                      content: <span className="!text-[10px]  ">{item.role}</span>,
                    }}
                  />
                </div>
              </div>
            </ListboxItem>
          )}
        </Listbox>

        <h3 className="text-lg !font-semibold mb-2 text-secondary-1000">Subgroup Colleagues</h3>
        <Listbox
          items={users.filter((user) => user.section === 'Report To')}
          label="Report To"
          selectionMode="none"
          variant="flat"
        >
          {(item) => (
            <ListboxItem key={item.id} textValue={item.name}>
              <div className="flex items-center justify-start gap-4 w-full ">
                <Avatar alt={item.name}  radius="sm" size="lg" src="https://i.pravatar.cc/150?u=b04258114e29026302d" />
                <div className="flex flex-col items-center gap-1">
                  <span className="!text-xs text-secondary-1000">{item.name}</span>
                  <AppButton
                    props={{
                      className: 'border border-[#DCF0F9] bg-surface h-5 text-primary',
                      variant: 'bordered',
                      radius: 'full',
                      content: <span className="!text-[10px]  ">{item.role}</span>,
                    }}
                  />
                </div>
              </div>
            </ListboxItem>
          )}
        </Listbox>
      </div>
    </div>
  );
};

export default OrganizationalChart;
