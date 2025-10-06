import { Listbox, ListboxItem, Avatar } from '@heroui/react';
import { AppButton } from '@core/components';

const users = [
  { id: '1', name: 'Zahra Pakniyat', role: 'UiUx Designer', section: 'Report To' },
  { id: '2', name: 'Iahma Pakniyat', role: 'UiUx Designer', section: 'Report To' },
  { id: '3', name: 'Zahra Pakniyat', role: 'UiUx Designer', section: 'Report To' },
  { id: '4', name: 'Zahra Pakniyat', role: 'UiUx Designer', section: 'Indirect Relationship With' },
  { id: '5', name: 'Zahra Pakniyat', role: 'UiUx Designer', section: 'Consultant' },
  { id: '6', name: 'Zahra Pakniyat', role: 'UiUx Designer', section: 'Subgroup Colleagues' },
  { id: '7', name: 'Zahra Pakniyat', role: 'UiUx Designer', section: 'Subgroup Colleagues' },
];

const OrganizationalChart = () => {
  return (
    <div className="p-4 w-full h-full ">
      <div className="w-full overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-200
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-blue-300">

        <h3 className="text-lg font-semibold mb-2">Report To</h3>
        <Listbox
          items={users.filter((user) => user.section === 'Report To')}
          label="Report To"
          selectionMode="none"
          variant="flat"
        >
          {(item) => (
            <ListboxItem key={item.id} textValue={item.name}>
              <div className="flex gap-2.5 items-center p-2">
                <Avatar alt={item.name} color="primary" radius="sm" size="sm" src="" />
                <div className="flex flex-col gap-1">
                  <span className="text-xs">{item.name}</span>
                  <AppButton
                    props={{
                      className: 'border border-[#DCF0F9] text-[10px] py-1 px-2 w-[80px] h-[20px] bg-blue-100 text-blue-800 rounded-lg',
                      color: 'primary',
                      variant: 'bordered',
                      size: 'sm',
                      radius: 'lg',
                      content: <span>{item.role}</span>,
                    }}
                  />
                </div>
              </div>
            </ListboxItem>
          )}
        </Listbox>

        <h3 className="text-lg font-semibold mb-2 mt-4">Indirect Relationship With</h3>
        <Listbox
          items={users.filter((user) => user.section === 'Indirect Relationship With')}
          label="Indirect Relationship With"
          selectionMode="none"
          variant="flat"
        >
          {(item) => (
            <ListboxItem key={item.id} textValue={item.name}>
              <div className="flex gap-2.5 items-center p-2">
                <Avatar alt={item.name} color="primary" radius="sm" size="sm" src="" />
                <div className="flex flex-col gap-1">
                  <span className="text-xs">{item.name}</span>
                  <AppButton
                    props={{
                      className: 'border border-[#DCF0F9] text-[10px] py-1 px-2 w-[80px] h-[20px] bg-blue-100 text-blue-800 rounded-lg',
                      color: 'primary',
                      variant: 'bordered',
                      size: 'sm',
                      radius: 'lg',
                      content: <span>{item.role}</span>,
                    }}
                  />
                </div>
              </div>
            </ListboxItem>
          )}
        </Listbox>

        <h3 className="text-lg font-semibold mb-2 mt-4">Consultant</h3>
        <Listbox
          items={users.filter((user) => user.section === 'Consultant')}
          label="Consultant"
          selectionMode="none"
          variant="flat"
        >
          {(item) => (
            <ListboxItem key={item.id} textValue={item.name}>
              <div className="flex gap-2.5 items-center p-2">
                <Avatar alt={item.name} color="primary" radius="sm" size="sm" src="" />
                <div className="flex flex-col gap-1">
                  <span className="text-xs">{item.name}</span>
                  <AppButton
                    props={{
                      className: 'border border-[#DCF0F9] text-[10px] py-1 px-2 w-[80px] h-[20px] bg-blue-100 text-blue-800 rounded-lg',
                      color: 'primary',
                      variant: 'bordered',
                      size: 'sm',
                      radius: 'lg',
                      content: <span>{item.role}</span>,
                    }}
                  />
                </div>
              </div>
            </ListboxItem>
          )}
        </Listbox>

        <h3 className="text-lg font-semibold mb-2 mt-4">Subgroup Colleagues</h3>
        <Listbox
          items={users.filter((user) => user.section === 'Subgroup Colleagues')}
          label="Subgroup Colleagues"
          selectionMode="none"
          variant="flat"
        >
          {(item) => (
            <ListboxItem key={item.id} textValue={item.name}>
              <div className="flex gap-2.5 items-center p-2">
                <Avatar alt={item.name} color="primary" radius="sm" size="sm" src="" />
                <div className="flex flex-col gap-1">
                  <span className="text-xs">{item.name}</span>
                  <AppButton
                    props={{
                      className: 'border border-[#DCF0F9] text-[10px] py-1 px-2 w-[80px] h-[20px] bg-blue-100 text-blue-800 rounded-lg',
                      color: 'primary',
                      variant: 'bordered',
                      size: 'sm',
                      radius: 'lg',
                      content: <span>{item.role}</span>,
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
