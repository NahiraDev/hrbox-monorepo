import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Tooltip,
  // Button,
} from '@heroui/react';
import { Edit, Trash } from 'iconsax-react';
import { useState } from 'react';

import { CloseIcon } from '../icons';
import { AppButton } from '../index.ts';

import AppPagination from './AppPagination';
import AppModal from './AppModal';

const AppTable = ({ props }: { props: any }) => {
  const {
    data,
    columns,
    onOpenEditDialog,
    hasPagination = true,
    hasPadding = true,
    hasShadow = true,
    hasRowBorder = true,
  } = props;

  const [isDeleteOpen, setDeleteOpen] = useState(false);

  if (!data.length) return <div className="p-4">No data available</div>;

  const autoColumns =
    columns ||
    Object.keys(data[0])
      .filter((key) => key !== 'id')
      .map((key) => ({ key, label: key }));

  const renderActions = () => (
    <div className="relative flex items-center justify-center gap-2">
      <Tooltip content="Edit">
        <AppButton
          props={{
            size: '',
            radius: 'none',
            onPress: () => {
              onOpenEditDialog;
            },
            content: (
              <span className="text-lg cursor-pointer">
                <Edit size="16" />
              </span>
            ),
          }}
        />
      </Tooltip>
      <Tooltip content="Delete">
        <AppButton
          props={{
            size: '',
            radius: 'none',
            onPress: () => setDeleteOpen(true),
            content: (
              <span className="text-lg cursor-pointer">
                <Trash size="16" />
              </span>
            ),
          }}
        />
      </Tooltip>
    </div>
  );

  return (
    <div
      className={`bg-primary-50 w-full border border-primary dark:bg-[rgba(4,66,92,0.60)] ${hasPadding && 'pt-5 pl-5 pr-6'} pb-4 h-full !rounded-[14px] ${hasShadow && 'shadow-shadow-light-tight/1'}`}
    >
      <Table aria-label="Customizable Table" className="!h-[95%]">
        <TableHeader className="!rounded-0">
          {autoColumns.map((col: any) => (
            <TableColumn
              key={col.key}
              className="text-white dark:text-white text-sm font-semibold bg-primary dark:bg-[rgba(4,66,92,0.60)] !rounded-0 text-center !h-12"
            >
              {col.label}
            </TableColumn>
          ))}
          <TableColumn className="text-white dark:text-white text-sm font-semibold bg-primary dark:bg-[rgba(4,66,92,0.60)] text-center">
            Actions
          </TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((row: any, index: number) => (
            <TableRow
              key={row.id ?? index}
              className={`${hasRowBorder && 'border-b border-[#dcf0f966] dark:border-[#04425c66]'} hover:bg-surface dark:hover:bg-[#04425c66] !rounded-4 transition-colors !h-12`}
            >
              {autoColumns.map((col: any) => (
                <TableCell
                  key={col.key}
                  className="text-xs font-normal text-black text-center"
                >
                  {row[col.key] ??
                    (col.key.toLowerCase().includes('date') ? 'Present' : '')}
                </TableCell>
              ))}
              <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0">
                {renderActions()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {hasPagination && (
        <div className="flex justify-end">
          <AppPagination
            props={{
              size: 'md',
              total: data.length,
            }}
          />
        </div>
      )}

      <AppModal
        isOpen={isDeleteOpen}
        size="2xl"
        onClose={() => setDeleteOpen(false)}
      >
        <AppModal.Header>
          <div className="flex justify-between items-center w-full">
            <div className="bg-danger flex gap-2 !rounded-4 !px-3 !py-1.5 items-center">
              <Trash className="text-white" size="18" />
              <span className="text-xl text-white font-normal leading-normal">
                Would it be acceptable for you to remove this?
              </span>
            </div>
            <AppButton
              props={{
                size: '',
                radius: 'none',
                onPress: () => setDeleteOpen(false),
                content: <CloseIcon />,
              }}
            />
          </div>
        </AppModal.Header>
        <AppModal.Footer>
          <AppButton
            props={{
              size: '',
              radius: 'radius-4',
              onPress: () => setDeleteOpen(false),
              content: (
                <span className="text-secondary-800 !px-3 !py-1.5 !font-normal !min-w-fit">
                  Cancel
                </span>
              ),
            }}
          />
          <AppButton
            props={{
              size: '',
              radius: 'radius-4',
              onPress: () => setDeleteOpen(false),
              content: (
                <span className="text-secondary-800 !px-3 !py-1.5 !font-normal !min-w-fit">
                  Delete
                </span>
              ),
            }}
          />
        </AppModal.Footer>
      </AppModal>
    </div>
  );
};

export default AppTable;
