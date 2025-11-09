  import React, { useEffect, useMemo, useRef, useState } from 'react';
  import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Tooltip,
  } from '@heroui/react';
  import { AppButton, AppPagination } from '@hrbox/uikit/components';
  import { createPortal } from 'react-dom';
  import { Edit, Trash } from 'iconsax-react';
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
    render: (row: T, index: number, cellType?: 'first' | 'second') => React.ReactNode;
    secondCellRender?: (row: T, index: number) => React.ReactNode;
    expandedRowClassName?: string;
    onExpand?: (row: T, index: number, isExpanded: boolean, cellType?: 'first' | 'second') => void;
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
    showStatus?: boolean;
    onEdit?: (row: T, index: number) => void;
    onDelete?: (row: T, index: number) => void;
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
    showStatus = false,
    onEdit,
    onDelete,
    emptyMessage = 'No data available',
  }: AppTableProps<T>) => {
    const shouldPaginate = variant === 'attendance' ? false : hasPagination;
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
    const [expandedRowPosition, setExpandedRowPosition] = useState<{
      top: number;
      left: number;
      width: number;
      rowIndex: number;
      cellType: 'first' | 'second';
    }|null>(null);
    const tableContainerRef = useRef<HTMLDivElement>(null);
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
      if (!shouldPaginate) return data;
      const startIndex = (currentPage - 1) * pageSize;
      return data.slice(startIndex, startIndex + pageSize);
    }, [data, currentPage, pageSize, shouldPaginate]);

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
      const baseClass = 'hover:bg-[#DCF0F9] dark:hover:bg-[#04425c66] transition-colors cursor-pointer  ';
      let statusClass='';
      if(variant==='attendance'){
        const dateValue=row['Date']?.toString()||'';
      if(dateValue.includes('Absence')){
        statusClass='bg-red-100 !rounded-2xl'
      }
      }
      const customClass =
        typeof styles.rowClassName === 'function'
          ? styles.rowClassName(row, index)
          : styles.rowClassName || '';
      return `${baseClass} ${statusClass} ${customClass}`;
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
    useEffect(() => {
      if (!expandedRowPosition) return;

      const updatePosition = () => {
        const rowElement = document.querySelector(
          `[data-row-index="${expandedRowPosition.rowIndex}"]`
        ) as HTMLTableRowElement;

        if (!rowElement) return;
        const cellIndex = expandedRowPosition.cellType === 'first' ? 0 : 1;
        const cellElement = rowElement.children[cellIndex] as HTMLTableCellElement;
        if (!cellElement) return;
        const cellRect = cellElement.getBoundingClientRect();
        setExpandedRowPosition(prev =>
          prev ? {
            ...prev,
            top: cellRect.bottom + window.scrollY + 8,
            left: cellRect.left + window.scrollX,
            width: cellRect.width,
          } : null
        );
      };

      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition,true);
        window.removeEventListener('resize', updatePosition);
      };
    }, [expandedRowPosition]);

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
    }
    const renderStatusActions = (row: T, index: number) => {
      return (
        <div className='flex items-center justify-center gap-2'>
              <AppButton
                props={{
                  size: 'sm',
                  radius: 'full',
                  variant: 'light',
                  color: 'black',
                  onPress: () => onEdit(row, index),
                  content: <Edit />,
                }}
              />
              <AppButton
                props={{
                  size: 'sm',
                  radius: 'full',
                  variant: 'light',
                  color: 'black',
                  onPress: () => onDelete(row, index),
                  content: <Trash />,
                }}
              />
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

    const headerColumns = autoColumns.map(col => (
      <TableColumn key={col.key} className={getHeaderClassName(col)} style={{ width: col.width }}>
        {col.headerRender ? col.headerRender() : col.label || col.key}
      </TableColumn>
    ));

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

    if (showStatus) {
      headerColumns.push(
        <TableColumn
          key='status'
          className='bg-primary !h-12 text-center text-sm font-semibold text-white dark:bg-[rgba(4,66,92,0.60)]'
        >
          Status
        </TableColumn>
      );
    }
    return (
      <div
        ref={tableContainerRef}
        className={`w-full shadow-light-tight/1 rounded-2xl  ${styles.containerClassName || ''}`}
      >
        <Table
          aria-label="Data table"
          className={`${styles.tableClassName}`}
          isHeaderSticky={variant === 'attendance'}
          classNames={{
            base: variant === 'attendance' ? "max-h-[750px] bg-transparent " : "!h-full bg-transparent !shadow-none",
            wrapper: variant === 'attendance'
              ? "max-h-full bg-transparent overflow-hidden"
              : "bg-transparent h-full !shadow-none",
            table: "min-w-full ",
            thead: "[&>tr]:first:shadow-none ",
            tr:'!rounded-lg',
            th: variant==='attendance'?'first:border-r-8 first:border-r-transparent first:rounded-lg first:bg-neutral-250 [&:nth-of-type(2)]:border-r-8 [&:nth-of-type(2)]:rounded-lg [&:nth-of-type(2)]:bg-neutral-250 [&:nth-of-type(2)]:border-r-transparent [&:nth-of-type(3)]:border-l-transparent [&:nth-of-type(3)]:border-l-8 [&:nth-of-type(3)]:rounded-l-lg [&:nth-of-type(8)]:rounded-r-lg [&:nth-of-type(8)]:border-r-8 [&:nth-of-type(8)]:border-r-transparent [&:nth-of-type(9)]:rounded-l-lg [&:nth-of-type(9)]:border-l-8 [&:nth-of-type(9)]:border-l-transparent text-white [&:nth-of-type(3)]:bg-primary [&:nth-of-type(4)]:bg-primary [&:nth-of-type(5)]:bg-primary [&:nth-of-type(6)]:bg-primary [&:nth-of-type(7)]:bg-primary [&:nth-of-type(8)]:bg-primary [&:nth-of-type(9)]:bg-green-500 py-3 px-2'
              :"bg-primary-400",
            td:'py-3 px-2 first:rounded-l-lg last:rounded-r-lg'
          }}
        >
          <TableHeader className={styles.headerClassName}>{headerColumns}</TableHeader>

          <TableBody className={styles.bodyClassName}>
            {paginatedData.map((row, index) => {
              const key = getRowKey(row, index);

              const cells = autoColumns.map((col, colIndex) => {
                const value = row[col.key];
                const cellClass = getCellClassName(col, value, row, index);
                const isFirstCell = colIndex === 0;
                const isSecondCell = colIndex === 1;

                const handleCellClick = (cellType: 'first' | 'second') => (e: React.MouseEvent) => {
                  e.stopPropagation();
                  const cellElement = e.currentTarget as HTMLTableCellElement;
                  const rowElement = cellElement.closest('tr') as HTMLTableRowElement;

                  if (!rowElement || !cellElement) return;

                  setExpandedRows(prev => {
                    const newSet = new Set(prev);
                    const wasExpanded = newSet.has(index) && expandedRowPosition?.cellType === cellType;

                    if (wasExpanded) {
                      newSet.delete(index);
                      setExpandedRowPosition(null);
                    } else {
                      newSet.add(index);

                      const tableContainer = tableContainerRef.current;
                      const scrollWrapper = tableContainer?.querySelector('[data-slot="wrapper"]') as HTMLDivElement;

                      const cellRect = cellElement.getBoundingClientRect();
                      const tableRect = scrollWrapper?.getBoundingClientRect() || tableContainer?.getBoundingClientRect();

                      if (!tableRect) return newSet;

                      const tooltipHeight = 170;
                      const spaceBelow = tableRect.bottom - cellRect.bottom;
                      const shouldShowAbove = spaceBelow < tooltipHeight;

                      setExpandedRowPosition({
                        top: shouldShowAbove
                          ? cellRect.top + window.scrollY - tooltipHeight - 8
                          : cellRect.bottom + window.scrollY + 8,
                        left: cellRect.left + window.scrollX,
                        width: cellRect.width,
                        rowIndex: index,
                        cellType,
                      });
                    }

                    expandable?.onExpand?.(row, index, !wasExpanded, cellType);
                    return newSet;
                  });
                };
                return (
                  <TableCell
                    key={col.key}
                    className={`text-center text-xs font-normal text-black ${cellClass} ${styles.cellClassName || ''}`}
                    onClick={
                      expandable && isFirstCell
                        ? handleCellClick('first')
                        : expandable && isSecondCell && expandable.secondCellRender
                          ? handleCellClick('second')
                          : undefined
                    }
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

              if (showStatus) {
                cells.push(
                  <TableCell key='status' className='text-secondary-400 text-xs'>
                    {renderStatusActions(row, index)}
                  </TableCell>
                );
              }

              return (
                <TableRow
                  key={key}
                  data-row-index={index}
                  className={getRowClassName(row, index)}
                  onClick={() => onRowClick?.(row, index)}
                >
                  {cells}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {shouldPaginate && (
        <div className=' flex justify-end px-4'>
          <AppPagination
            total={Math.ceil(data.length / pageSize)}
            page={currentPage}
            onChange={setCurrentPage}
          />
        </div>
      )}
        {expandable && expandedRowPosition && expandedRows.has(expandedRowPosition.rowIndex) && createPortal(
          <div
            style={{
              position: 'absolute',
              top: `${expandedRowPosition.top}px`,
              left: `${expandedRowPosition.left}px`,
              zIndex: 1000,
            }}
          >
            {expandedRowPosition.cellType === 'first'
              ? expandable.render(
                paginatedData[expandedRowPosition.rowIndex],
                expandedRowPosition.rowIndex,
                'first'
              )
              : expandable.secondCellRender?.(
                paginatedData[expandedRowPosition.rowIndex],
                expandedRowPosition.rowIndex
              )
            }
          </div>,
          document.body
        )}

      </div>
    );
  };
