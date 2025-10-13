import React, { useMemo, useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Tooltip,
} from '@heroui/react';
import { Edit, Trash, Add } from 'iconsax-react';
import { AppButton, AppPagination } from '@core/components';
export interface ColumnConfig<T = any> {
  key: string;
  label?: string;
  width?: string | number;
  align?: 'left' | 'center' | 'right' | 'start' | 'end';
  render?: (value: any, row: T, index: number) => React.ReactNode;
  headerRender?: () => React.ReactNode;
  headerClassName?: string | ((col: ColumnConfig<T>) => string);
  cellClassName?: string | ((value: any, row: T, index: number) => string);
  visible?: boolean | ((row: T) => boolean);
  sortable?: boolean;
}

export interface ColumnGroup {
  label: string;
  startKey: string;
  endKey: string;
  headerClassName?: string;
}

export interface RowAction<T = any> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T, index: number) => void;
  visible?: (row: T) => boolean;
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

export interface ExpandableConfig<T = any> {
  render: (row: T, index: number) => React.ReactNode;
  expandedRowClassName?: string;
  onExpand?: (row: T, index: number, isExpanded: boolean) => void;
  defaultExpanded?: boolean | ((row: T) => boolean);
}

export interface TableStyleConfig {
  containerClassName?: string;
  tableClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  rowClassName?: string | ((row: any, index: number) => string);
  cellClassName?: string;
  emptyClassName?: string;
  loadingClassName?: string;
}

export interface AppTableProps<T = any> {
  data: T[];
  columns?: ColumnConfig<T>[];
  columnGroups?: ColumnGroup[];
  rowActions?: RowAction<T>[];
  expandable?: ExpandableConfig<T>;
  selectable?: boolean;
  onRowClick?: (row: T, index: number) => void;
  onSelectionChange?: (selectedRows: T[], selectedIndices: number[]) => void;
  rowKey?: string | ((row: T, index: number) => string | number);
  hasPagination?: boolean;
  pageSize?: number;
  variant?: 'default' | 'attendance' | 'bordered' | 'striped' | 'minimal';
  styles?: TableStyleConfig;
  loading?: boolean;
  error?: string;
  emptyMessage?: string | React.ReactNode;
}

export const AppTable = <T extends Record<string, any>>({
  data = [],
  columns,
  columnGroups,
  rowActions,
  expandable,
  selectable = false,
  onRowClick,
  onSelectionChange,
  rowKey = 'id',
  hasPagination = true,
  pageSize = 10,
  variant = 'default',
  styles = {},
  loading = false,
  error,
  emptyMessage = 'No data available',
}: AppTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const autoColumns = useMemo<ColumnConfig<T>[]>(() => {
    if (columns) return columns;
    if (data.length === 0) return [];

    return Object.keys(data[0])
      .filter(key => key !== 'id')
      .map(key => ({
        key,
        label: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
        align: 'center' as const,
      }));
  }, [columns, data]);

  const paginatedData = useMemo(() => {
    if (!hasPagination) return data;
    const startIndex = (currentPage - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  }, [data, currentPage, pageSize, hasPagination]);

  const getColumnGroupInfo = (colKey: string) => {
    if (!columnGroups) return null;

    for (const group of columnGroups) {
      const startIdx = autoColumns.findIndex(c => c.key === group.startKey);
      const endIdx = autoColumns.findIndex(c => c.key === group.endKey);
      const currentIdx = autoColumns.findIndex(c => c.key === colKey);

      if (currentIdx >= startIdx && currentIdx <= endIdx) {
        return {
          group,
          isFirst: currentIdx === startIdx,
          isLast: currentIdx === endIdx,
          isOnly: startIdx === endIdx,
        };
      }
    }
    return null;
  };

  const getRowKey = (row: T, index: number): string | number => {
    if (typeof rowKey === 'function') return rowKey(row, index);
    return row[rowKey] ?? index;
  };

  const getRowClassName = (row: T, index: number): string => {
    const baseClass = 'hover:bg-surface dark:hover:bg-[#04425c66] transition-colors cursor-pointer';
    const customClass =
      typeof styles.rowClassName === 'function'
        ? styles.rowClassName(row, index)
        : styles.rowClassName || '';
    return `${baseClass} ${customClass}`;
  };

  const getCellClassName = (col: ColumnConfig<T>, value: any, row: T, index: number): string => {
    if (typeof col.cellClassName === 'function') {
      return col.cellClassName(value, row, index);
    }
    return col.cellClassName || '';
  };

  const getHeaderClassName = (col: ColumnConfig<T>): string => {
    const groupInfo = getColumnGroupInfo(col.key);

    let baseClass =
      variant === 'default'
        ? 'text-white text-sm font-semibold bg-primary dark:bg-[rgba(4,66,92,0.60)] text-center !h-12'
        : '';

    if (groupInfo && variant === 'attendance') {
      const { group, isFirst, isLast, isOnly } = groupInfo;
      const roundedClass = isOnly
        ? 'rounded-xl'
        : isFirst
          ? 'rounded-l-xl'
          : isLast
            ? 'rounded-r-xl'
            : '';
      const spacingClass = !isLast ? 'border-r-4 border-transparent' : '';
      baseClass = `${spacingClass} ${group.headerClassName || ''} ${roundedClass}`;
    }

    if (typeof col.headerClassName === 'function') {
      return `${baseClass} ${col.headerClassName(col)}`;
    }
    return `${baseClass} ${col.headerClassName || ''}`;
  };

  const renderCellValue = (col: ColumnConfig<T>, row: T, index: number) => {
    const value = row[col.key];

    if (col.render) {
      return col.render(value, row, index);
    }

    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }

    if (value === null || value === undefined) {
      return '-';
    }

    if (col.key.toLowerCase().includes('date') && value) {
      return new Date(value).toLocaleDateString();
    }

    return String(value);
  };

  const toggleRowExpansion = (row: T, index: number) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      const isExpanded = newSet.has(index);

      if (isExpanded) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }

      expandable?.onExpand?.(row, index, !isExpanded);
      return newSet;
    });
  };

  const renderRowActions = (row: T, index: number) => {
    if (!rowActions || rowActions.length === 0) return null;

    return (
      <div className='flex items-center justify-center gap-2'>
        {rowActions.map((action, idx) => {
          const visible = action.visible ? action.visible(row) : true;
          if (!visible) return null;

          return (
            <Tooltip key={idx} content={action.label}>
              <AppButton
                props={{
                  size: 'sm',
                  radius: 'full',
                  variant: 'light',
                  color: action.color,
                  onPress: () => action.onClick(row, index),
                  content: (
                    <span className='cursor-pointer text-lg'>{action.icon || action.label}.</span>
                  ),
                }}
              />
            </Tooltip>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div
        className={`bg-primary-50 rounded-2xl p-8 dark:bg-[rgba(4,66,92,0.60)] ${styles.loadingClassName || ''}`}
      >
        <div className='flex items-center justify-center'>
          <div className='text-center text-gray-500'>Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20'>
        <div className='text-center text-red-600 dark:text-red-400'>Error: {error}</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div
        className={`bg-primary-50 rounded-2xl p-4 dark:bg-[rgba(4,66,92,0.60)] ${styles.emptyClassName || ''}`}
      >
        <div className='text-center text-gray-500'>{emptyMessage}</div>
      </div>
    );
  }

  // CRITICAL: Render columns directly, not in array
  const headerColumns = autoColumns.map(col => (
    <TableColumn key={col.key} className={getHeaderClassName(col)} style={{ width: col.width }}>
      {col.headerRender ? col.headerRender() : col.label || col.key}
    </TableColumn>
  ));

  // Add actions column if needed
  if (rowActions && rowActions.length > 0) {
    headerColumns.push(
      <TableColumn
        key='actions'
        className='bg-primary !h-12 text-center text-sm font-semibold text-white dark:bg-[rgba(4,66,92,0.60)]'
      >
        Actions
      </TableColumn>
    );
  }

  return (
    <div
      className={`w-full ${variant === 'default' ? 'border-primary bg-primary-50 shadow-light-tight/1 rounded-2xl border pb-4 dark:border-[#04425c66] dark:bg-[rgba(4,66,92,0.60)]' : ''} ${styles.containerClassName || ''}`}
    >
      <Table
        className={styles.tableClassName}
        classNames={{
          th: 'first:border-r-8 first:border-r-white first:rounded-r-2xl first:bg-[#999999] [&:nth-of-type(2)]:border-r-8 [&:nth-of-type(2)]:rounded-2xl [&:nth-of-type(2)]:bg-[#999999] [&:nth-of-type(2)]:border-r-white [&:nth-of-type(3)]:border-l-white [&:nth-of-type(3)]:border-l-8 [&:nth-of-type(3)]:rounded-l-2xl [&:nth-of-type(8)]:rounded-r-2xl [&:nth-of-type(8)]:border-r-8 [&:nth-of-type(8)]:border-r-white [&:nth-of-type(9)]:rounded-l-2xl [&:nth-of-type(9)]:border-l-8 [&:nth-of-type(9)]:border-l-white text-white [&:nth-of-type(3)]:bg-primary [&:nth-of-type(4)]:bg-primary [&:nth-of-type(5)]:bg-primary [&:nth-of-type(6)]:bg-primary [&:nth-of-type(7)]:bg-primary [&:nth-of-type(8)]:bg-primary [&:nth-of-type(9)]:bg-green-500',
        }}
      >
        <TableHeader className={styles.headerClassName}>{headerColumns}</TableHeader>

        <TableBody className={styles.bodyClassName}>
          {paginatedData.map((row, index) => {
            const key = getRowKey(row, index);
            const isExpanded = expandedRows.has(index);

            const cells = autoColumns.map(col => {
              const value = row[col.key];
              const cellClass = getCellClassName(col, value, row, index);

              return (
                <TableCell
                  key={col.key}
                  className={`text-center text-xs font-normal text-black ${cellClass} ${styles.cellClassName || ''}`}
                >
                  {renderCellValue(col, row, index)}
                </TableCell>
              );
            });

            if (rowActions && rowActions.length > 0) {
              cells.push(
                <TableCell key='actions' className='text-secondary-400 text-xs'>
                  {renderRowActions(row, index)}
                </TableCell>
              );
            }

            return (
              <React.Fragment key={key}>
                <TableRow
                  className={getRowClassName(row, index)}
                  onClick={() => {
                    if (expandable) {
                      toggleRowExpansion(row, index);
                    } else {
                      onRowClick?.(row, index);
                    }
                  }}
                >
                  {cells}
                </TableRow>

                {expandable && isExpanded && (
                  <div className={`bg-white px-3 py-2 ${expandable.expandedRowClassName || ''} `}>
                    {expandable.render(row, index)}
                  </div>
                  // <TableRow>
                  //   <TableCell
                  //     colSpan={autoColumns.length + (rowActions ? 1 : 0)}
                  //     className={`bg-white px-3 py-2 ${expandable.expandedRowClassName || ''}`}
                  //   >
                  //     {expandable.render(row, index)}
                  //   </TableCell>
                  // </TableRow>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>

      {hasPagination && (
        <div className='mt-4 flex justify-end px-4'>
          <AppPagination
            total={Math.ceil(data.length / pageSize)}
            page={currentPage}
            onChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};
