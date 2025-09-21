import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@heroui/react';
import { Setting } from 'iconsax-react';

import { BasicInfoLayout } from '../../common';

const columns = [
  { key: 'no', label: 'No.' },
  { key: 'name', label: 'Name' },
  { key: 'fromDate', label: 'From Date' },
  { key: 'toDate', label: 'To Date' },
  { key: 'contractName', label: 'Contract Name' },
  { key: 'description', label: 'Description' },
  { key: 'Status', label: 'Status' },
  { key: 'action', label: 'Action' },
];
const rows = [
  {
    key: '1',
    no: 1,
    name: 'Zahra Pakniyat',
    fromDate: '2025/09/11',
    toDate: '2025/09/11',
    contractName: 'Confidentiality Agreement',
    description: '-',
    Status: 'signed',
    action: 'View',
  },
  {
    key: '1',
    no: 1,
    name: 'Zahra Pakniyat',
    fromDate: '2025/09/11',
    toDate: '2025/09/11',
    contractName: 'Confidentiality Agreement',
    description: '-',
    Status: 'signed',
    action: 'View',
  },
  {
    key: '1',
    no: 1,
    name: 'Zahra Pakniyat',
    fromDate: '2025/09/11',
    toDate: '2025/09/11',
    contractName: 'Confidentiality Agreement',
    description: '-',
    Status: 'signed',
    action: 'View',
  },
  {
    key: '1',
    no: 1,
    name: 'Zahra Pakniyat',
    fromDate: '2025/09/11',
    toDate: '2025/09/11',
    contractName: 'Confidentiality Agreement',
    description: '-',
    Status: 'signed',
    action: 'View',
  },
  {
    key: '1',
    no: 1,
    name: 'Zahra Pakniyat',
    fromDate: '2025/09/11',
    toDate: '2025/09/11',
    contractName: 'Confidentiality Agreement',
    description: '-',
    Status: 'signed',
    action: 'View',
  },
  {
    key: '1',
    no: 1,
    name: 'Zahra Pakniyat',
    fromDate: '2025/09/11',
    toDate: '2025/09/11',
    contractName: 'Confidentiality Agreement',
    description: '-',
    Status: 'signed',
    action: 'View',
  },
  {
    key: '1',
    no: 1,
    name: 'Zahra Pakniyat',
    fromDate: '2025/09/11',
    toDate: '2025/09/11',
    contractName: 'Confidentiality Agreement',
    description: '-',
    Status: 'signed',
    action: 'View',
  },
  {
    key: '1',
    no: 1,
    name: 'Zahra Pakniyat',
    fromDate: '2025/09/11',
    toDate: '2025/09/11',
    contractName: 'Confidentiality Agreement',
    description: '-',
    Status: 'signed',
    action: 'View',
  },
  {
    key: '1',
    no: 1,
    name: 'Zahra Pakniyat',
    fromDate: '2025/09/11',
    toDate: '2025/09/11',
    contractName: 'Confidentiality Agreement',
    description: '-',
    Status: 'signed',
    action: 'View',
  },
];

const ContractList = () => {
  return (
    <BasicInfoLayout
      content={
        <>
          <div className="flex items-center gap-1 text-xl text-secondary-900 font-semibold py-5">
            <Setting size="24" />
            <span>Contract List</span>
          </div>
          <Table
            removeWrapper
            aria-label="Contracts Table with 8 columns"
            classNames={{
              th: 'bg-primary text-white py-3 px-2 text-sm font-semibold',
              tr: 'text-secondary-400 text-xs font-bold',
              td: 'py-5',
            }}
          >
            <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={rows}>
              {(item) => (
                <TableRow key={item.key}>
                  {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </>
      }
    />
  );
};

export default ContractList;
