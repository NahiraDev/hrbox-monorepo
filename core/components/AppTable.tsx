import { useEffect, useMemo, useState } from 'react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Tooltip } from '@heroui/react';
import { Add, Edit, Trash } from 'iconsax-react';
import { usePaginationManager } from '@core/helpers';
import { useModalContext } from '@core/context';

import { AppDeleteModal, AppShowModeModal , AppButton , AppPagination} from '@core/components';
// import { loader } from '../../public/lottie';

interface AppTableProps {
  data: any;
  columns?: {
    key: string;
    label: string;
    render?: (value: any, row: any) => React.ReactNode;
    sortable?: boolean;
  }[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  hasPagination?: boolean;
  loading?: boolean;
  error?: string;
  pageSize?: number;
  paginationConfig?: {
    total: number;
    pageKey?: string;
    sizeKey?: string;
    defaultSize?: number;
  };
  enableActions?: boolean;
  theme?: "default" | "classic";
}

export const AppTable = ({
  data,
  columns,
  onEdit,
  hasPagination = true,
  paginationConfig,
  enableActions = true,
  loading = false,
  error,
  pageSize = 10,
  theme = "default",
}: AppTableProps) => {
  const { openModal } = useModalContext();
  const [LottieComponent, setLottieComponent] = useState<any>(null);
  const [showBox, setShowBox] = useState<boolean>(false);
  const pagination = usePaginationManager({
    total: Math.ceil((data?.length || 0) / pageSize),
  });

  const paginatedData = useMemo(() => {
    if (!hasPagination) return data || [];
    const startIndex = (pagination.currentPage - 1) * pageSize;
    return (data || []).slice(startIndex, startIndex + pageSize);
  }, [data, pagination.currentPage, pageSize, hasPagination]);

  useEffect(() => {
    import('lottie-react').then((mod) => {
      setLottieComponent(() => mod.default);
    });
  }, []);

  if (!LottieComponent) return null;

  const autoColumns =
    columns ||
    (data?.length
      ? Object.keys(data[0])
          .filter((key) => key !== 'id')
          .map((key) => ({
            key,
            label: key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
            sortable: false,
            searchable: true,
          }))
      : []);

  const renderCell = (value: any, row: any, columnKey: string) => {
    if (columns?.find((col) => col.key === columnKey)?.render) {
      return columns.find((col) => col.key === columnKey)?.render!(value, row);
    }

    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }

    if (value === null || value === undefined) {
      return '';
    }

    if (columnKey.toLowerCase().includes('date')) {
      return value ? new Date(value).toLocaleDateString() : 'Present';
    }

    return value;
  };

  const handleRowClick = (row: any) => {
    if (enableActions) {
      const columnPairs = (columns || []).reduce((acc: any[][], col, index) => {
        if (index % 2 === 0) {
          acc.push([]);
        }
        acc[acc.length - 1].push(col);

        return acc;
      }, []);

      openModal('view', 'test', columnPairs);
    }
  };
  const handleShowBox=()=>{
    setShowBox((prev)=>!prev);
  };

  if (error) {
    return (
      <div
        className={`p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl shadow-light-tight/1`}
      >
        <div className="text-center text-red-600 dark:text-red-400">Error: {error}</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-8 bg-primary-50 dark:bg-[rgba(4,66,92,0.60)] rounded-2xl shadow-light-tight/1">
        <div className="flex justify-center items-center">
          {/*<LottieComponent animationData={loader} loop={true} />*/}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={`p-4 bg-primary-50 dark:bg-[rgba(4,66,92,0.60)] rounded-2xl shadow-light-tight/1`}>
        <div className="text-center text-gray-500">No data available</div>
      </div>
    );
  }
  const renderActions = (row: any) => (
    <div className="relative h-full flex items-center justify-center gap-2">
      <Tooltip content="Edit">
        <AppButton
          props={{
            size: 'sm',
            radius: 'full',
            variant: 'light',
            onPress: () => onEdit?.(row),
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
            size: 'sm',
            radius: 'full',
            variant: 'light',
            onPress: () => {
              openModal('delete', 'test', row);
            },
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

  const tableColumns = (
    <>
      {autoColumns.map((col, index) => {
        let ColumnsClass = '';
        if (index<2){
          ColumnsClass="bg-[#999] rounded-xl ";
        }else if (index>=2 && index<8){
          ColumnsClass = `bg-primary ${index===2?"rounded-l-xl":index===7?"rounded-r-xl":""}`;
        }else{
          ColumnsClass= "bg-green-500 text-center rounded-xl text-start ";
        }
        return(
          <TableColumn
            key={col.key}
            className={`${theme==='classic'?`${ColumnsClass}`: "text-white text-sm font-semibold bg-primary dark:bg-[rgba(4,66,92,0.60)] !rounded-0 text-center !h-12"} text-white`}
          >
            {col.label}
          </TableColumn>
        );
      })}
      {enableActions && (
        <TableColumn className="text-white text-sm font-semibold bg-primary dark:bg-[rgba(4,66,92,0.60)] text-center !h-12">
          Actions
        </TableColumn>
      )}
    </>
  );

  const tableRows = (row: { [x: string]: any }) => {
    const cells = autoColumns.map((col, index) => (
      <TableCell key={col.key} className="text-xs font-normal text-black text-center">
        {renderCell(row[col.key], row, col.key)}
      </TableCell>
    ));

    if (enableActions) {
      cells.push(
        <TableCell key="actions" className="text-xs text-secondary-400">
          {renderActions(row)}
        </TableCell>
      );
    }

    return cells;
  };

  return (
    <div className="w-full border border-primary dark:border-[#04425c66] bg-primary-50 h-full dark:bg-[rgba(4,66,92,0.60)] rounded-2xl shadow-light-tight/1 pb-4">
      <Table className="!h-full" >
        <TableHeader>{tableColumns}</TableHeader>
        <TableBody>
          {paginatedData.length === 0 ? (
            <TableRow>
              <TableCell className="text-center py-8 " colSpan={autoColumns.length + (enableActions ? 1 : 0)}>
                No data available
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((row: { [x: string]: any; id?: any }, index: any) => (
              <TableRow
                key={row.id ?? index}
                className="hover:bg-surface dark:hover:bg-[#04425c66] !rounded-md transition-colors !h-12 cursor-pointer"
                onClick={(row) =>
                  theme === "classic" ? handleShowBox() : handleRowClick?.(row)
                }
              >
                {tableRows(row)}
              </TableRow>
            ))
          )}

        </TableBody>
      </Table>
      {showBox && (
        <div className="flex flex-col  bg-white px-3 py-2  ">
          <AppButton props={{
            startContent:<span>
                  <Add/>
                </span>,
            content:"Daily Leave"
          }}/>
        </div>
      )}
      {hasPagination && paginationConfig && (
        <div className="flex justify-end mt-4">
          <AppPagination total={Math.ceil((data?.length || 0) / pageSize)} />
        </div>
      )}
    </div>
  );
};
