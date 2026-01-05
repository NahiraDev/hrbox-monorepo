import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Chip } from '@heroui/react';
import { ReceiveSquare, Setting, DocumentDownload, TickCircle, Refresh2 } from "iconsax-reactjs";
import { BasicInfoLayout } from '@hrbox/modules/basic-info/components';
import { useTranslation } from "react-i18next";

const columns = [
  { key: 'no', label: 'No.' },
  { key: 'name', label: 'User' },
  { key: 'fromDate', label: 'From Date' },
  { key: 'toDate', label: 'To Date' },
  { key: 'contractName', label: 'Contract Name' },
  { key: 'description', label: 'Description' },
  { key: 'status', label: 'Status' },
  { key: 'action', label: 'Action' },
];

const rows = [

  {
    key: '6',
    no: 6,
    name: 'Zahra Pakniyat',
    fromDate: '2025/09/11',
    toDate: '2025/09/11',
    contractName: 'Confidentiality Agreement',
    description: '-',
    status: 'Signed',
    action: <ReceiveSquare size={16} className="cursor-pointer hover:text-primary transition-colors" />,
  },

  {
    key: '7',
    no: 7,
    name: 'Zahra Pakniyat',
    fromDate: '2025/09/11',
    toDate: '2025/09/11',
    contractName: 'Confidentiality Agreement',
    description: '-',
    status: 'Signed',
    action: <ReceiveSquare size={16} className="cursor-pointer hover:text-primary transition-colors" />,
  },  {
    key: '6',
    no: 6,
    name: 'Zahra Pakniyat',
    fromDate: '2025/09/11',
    toDate: '2025/09/11',
    contractName: 'Confidentiality Agreement',
    description: '-',
    status: 'Signed',
    action: <ReceiveSquare size={16} className="cursor-pointer hover:text-primary transition-colors" />,
  },

  {
    key: '7',
    no: 7,
    name: 'Zahra Pakniyat',
    fromDate: '2025/09/11',
    toDate: '2025/09/11',
    contractName: 'Confidentiality Agreement',
    description: '-',
    status: 'Signed',
    action: <ReceiveSquare size={16} className="cursor-pointer hover:text-primary transition-colors" />,
  },  {
    key: '6',
    no: 6,
    name: 'Zahra Pakniyat',
    fromDate: '2025/09/11',
    toDate: '2025/09/11',
    contractName: 'Confidentiality Agreement',
    description: '-',
    status: 'Signed',
    action: <ReceiveSquare size={16} className="cursor-pointer hover:text-primary transition-colors" />,
  },

  {
    key: '7',
    no: 7,
    name: 'Zahra Pakniyat',
    fromDate: '2025/09/11',
    toDate: '2025/09/11',
    contractName: 'Confidentiality Agreement',
    description: '-',
    status: 'Signed',
    action: <ReceiveSquare size={16} className="cursor-pointer hover:text-primary transition-colors" />,
  },  {
    key: '6',
    no: 6,
    name: 'Zahra Pakniyat',
    fromDate: '2025/09/11',
    toDate: '2025/09/11',
    contractName: 'Confidentiality Agreement',
    description: '-',
    status: 'Signed',
    action: <ReceiveSquare size={16} className="cursor-pointer hover:text-primary transition-colors" />,
  },

  {
    key: '7',
    no: 7,
    name: 'Zahra Pakniyat',
    fromDate: '2025/09/11',
    toDate: '2025/09/11',
    contractName: 'Confidentiality Agreement',
    description: '-',
    status: 'Signed',
    action: <ReceiveSquare size={16} className="cursor-pointer hover:text-primary transition-colors" />,
  },  {
    key: '6',
    no: 6,
    name: 'Zahra Pakniyat',
    fromDate: '2025/09/11',
    toDate: '2025/09/11',
    contractName: 'Confidentiality Agreement',
    description: '-',
    status: 'Signed',
    action: <ReceiveSquare size={16} className="cursor-pointer hover:text-primary transition-colors" />,
  },

  {
    key: '7',
    no: 7,
    name: 'Zahra Pakniyat',
    fromDate: '2025/09/11',
    toDate: '2025/09/11',
    contractName: 'Confidentiality Agreement',
    description: '-',
    status: 'Signed',
    action: <ReceiveSquare size={16} className="cursor-pointer hover:text-primary transition-colors" />,
  },
];

const ContractList = () => {
  const { t } = useTranslation();

  const renderStatusChip = (status: string) => {
    if (status === 'Signed') {
      return (
        <Chip
          startContent={<TickCircle size="16" color="#22AD5C" variant={"Bold"}/>}
          variant=""
          className=" text-[#22AD5C] text-xs"
        >
          Signed
        </Chip>
      );
    } else if (status === 'Pending') {
      return (
        <Chip
          startContent={<Refresh2 size="16" color="#0B76B7"/>}
          variant=""
          className=" text-primary-400 text-xs"
        >
          Pending
        </Chip>
      );
    }
    return status;
  };


  const cardContainerClass = ` gap-3  overflow-y-scroll  max-h-[calc(65.5vh)] my-5 mx-2.5 pr-2.5
  [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-blue-600
  [&::-webkit-scrollbar-thumb]:hover:bg-blue-800`;


  return (
    <BasicInfoLayout
      content={
        <div className={cardContainerClass}>
          <div className="flex items-center gap-1 text-xl text-secondary-900 font-semibold py-5">
            <Setting size="24" />
            <span>{t('contract_list')}</span>
          </div>
          <div className=" ">
            <Table
              removeWrapper
              aria-label="Contracts Table"
              classNames={{
                th: 'bg-primary text-white py-3 px-2 text-sm font-semibold text-left rounded-none text-center',
                td: 'py-5 px-2 text-xs text-[#1E3363] text-center',
                thead: '[&>tr]:rounded-none',
              }}
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.key} className="text-white">
                    {column.label}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={rows}>
                {(item) => (
                  <TableRow key={item.key}>
                    {(columnKey) => (
                      <TableCell>
                        {columnKey === 'status' ? (
                          renderStatusChip(getKeyValue(item, columnKey))
                        ) : columnKey === 'action' ? (
                          <div className="flex justify-center">
                            {getKeyValue(item, columnKey)}
                          </div>
                        ) : (
                          getKeyValue(item, columnKey)
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      }
    />
  );
};

export default ContractList;