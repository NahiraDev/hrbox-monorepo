import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
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

/**
 * ============================================
 * TYPES & INTERFACES
 * ============================================
 */

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export interface ColumnConfig<T = any> {
  key: string;
  label?: string;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  align?: 'left' | 'center' | 'right' | 'start' | 'end';
  sortable?: boolean;
  filterable?: boolean;

  // Rendering
  render?: (value: any, row: T, index: number) => React.ReactNode;
  headerRender?: () => React.ReactNode;

  // Styling
  headerClassName?: string | ((col: ColumnConfig<T>) => string);
  cellClassName?: string | ((value: any, row: T, index: number) => string);

  // Visibility
  visible?: boolean | ((row: T) => boolean);

  // Formatting
  format?: (value: any) => string;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'email' | 'phone' | 'custom';
}

export interface ColumnGroup {
  label: string;
  startKey: string;
  endKey: string;
  headerClassName?: string;
}

export interface RowAction<T = any> {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T, index: number) => void | Promise<void>;
  visible?: (row: T, index: number) => boolean;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger';
  confirmMessage?: string;
  disabled?: (row: T) => boolean;
}

export interface ExpandableConfig<T = any> {
  render: (row: T, index: number, cellType?: 'first' | 'second') => React.ReactNode;
  expandedRowClassName?: string;
  onExpand?: (
    row: T,
    index: number,
    isExpanded: boolean
  ) => void | Promise<void>;
  defaultExpanded?: boolean | ((row: T) => boolean);
  expandButtonPosition?: 'start' | 'end';
}

export interface SortConfig {
  key: string;
  direction: SortDirection;
}

export interface FilterConfig {
  [key: string]: any;
}

export interface TableStyleConfig {
  containerClassName?: string;
  tableClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  rowClassName?: string | ((row: any, index: number, isSelected?: boolean) => string);
  cellClassName?: string;
  emptyClassName?: string;
  loadingClassName?: string;
}

export interface AppTableProps<T = any> {
  // Data
  data: T[];
  columns?: ColumnConfig<T>[];
  columnGroups?: ColumnGroup[];
  rowKey?: string | ((row: T, index: number) => string | number);

  // Behavior
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[], selectedIndices: number[]) => void;
  onRowClick?: (row: T, index: number) => void;
  rowActions?: RowAction<T>[];
  expandable?: ExpandableConfig<T>;

  // Sorting & Filtering
  sortable?: boolean;
  onSort?: (sort: SortConfig) => void;
  defaultSort?: SortConfig;

  filterable?: boolean;
  onFilter?: (filters: FilterConfig) => void;

  // Pagination
  hasPagination?: boolean;
  pageSize?: number;
  totalItems?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;

  // Display
  variant?: 'default' | 'striped' | 'bordered' | 'minimal' | 'attendance';
  styles?: TableStyleConfig;
  density?: 'sm' | 'md' | 'lg';

  // States
  loading?: boolean;
  error?: string;
  emptyMessage?: string | React.ReactNode;

  // Features
  showCheckbox?: boolean;
  showRowNumber?: boolean;
  showStatus?: boolean;
  sticky?: boolean;

  // Callbacks
  onEdit?: (row: T, index: number) => void;
  onDelete?: (row: T, index: number) => void;
  onView?: (row: T, index: number) => void;
}

/**
 * ============================================
 * MAIN COMPONENT
 * ============================================
 */

export const AppTable = React.forwardRef<HTMLDivElement, AppTableProps>(
  (
    {
      data = [],
      columns,
      columnGroups,
      rowKey = 'id',

      selectable = false,
      onSelectionChange,
      onRowClick,
      rowActions,
      expandable,

      sortable = false,
      onSort,
      defaultSort,

      filterable = false,
      onFilter,

      hasPagination = true,
      pageSize = 10,
      totalItems,
      currentPage: controlledPage,
      onPageChange,

      variant = 'default',
      styles = {},
      density = 'md',

      loading = false,
      error,
      emptyMessage = 'No data available',

      showCheckbox = selectable,
      showRowNumber = false,
      showStatus = false,
      sticky = true,

      onEdit,
      onDelete,
      onView,
    },
    ref
  ) => {
    // ============================================
    // STATES
    // ============================================

    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState<SortConfig | null>(defaultSort || null);
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
    const [expandedRowPosition, setExpandedRowPosition] = useState<{
      top: number;
      left: number;
      width: number;
      rowIndex: number;
      cellType?: 'first' | 'second';
    } | null>(null);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const tableContainerRef = useRef<HTMLDivElement>(null);

    const page = controlledPage || currentPage;

    // ============================================
    // AUTO COLUMNS
    // ============================================

    const autoColumns = useMemo<ColumnConfig<any>[]>(() => {
      if (columns) return columns;
      if (data.length === 0) return [];

      return Object.keys(data[0])
        .filter(key => key !== 'id')
        .map(key => ({
          key,
          label: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
          align: 'center' as const,
          type: 'text' as const,
        }));
    }, [columns, data]);

    // ============================================
    // PAGINATION
    // ============================================

    const shouldPaginate = variant === 'attendance' ? false : hasPagination;

    const paginatedData = useMemo(() => {
      if (!shouldPaginate) return data;
      const startIndex = (page - 1) * pageSize;
      return data.slice(startIndex, startIndex + pageSize);
    }, [data, page, pageSize, shouldPaginate]);

    const totalPages = useMemo(() => {
      return Math.ceil((totalItems || data.length) / pageSize);
    }, [totalItems, data.length, pageSize]);

    const handlePageChange = useCallback(
      (newPage: number) => {
        if (onPageChange) {
          onPageChange(newPage);
        } else {
          setCurrentPage(newPage);
        }
      },
      [onPageChange]
    );

    // ============================================
    // SORTING
    // ============================================

    const handleSort = useCallback(
      (key: string) => {
        if (!sortable) return;

        let newDirection = SortDirection.ASC;
        if (sort?.key === key && sort.direction === SortDirection.ASC) {
          newDirection = SortDirection.DESC;
        }

        const newSort: SortConfig = { key, direction: newDirection };
        setSort(newSort);
        onSort?.(newSort);
      },
      [sort, sortable, onSort]
    );

    // ============================================
    // SELECTION
    // ============================================

    const handleRowSelect = useCallback(
      (index: number) => {
        const newSelected = new Set(selectedRows);
        if (newSelected.has(index)) {
          newSelected.delete(index);
        } else {
          newSelected.add(index);
        }
        setSelectedRows(newSelected);

        const selectedItems = Array.from(newSelected)
          .map((idx) => paginatedData[idx])
          .filter(Boolean);
        onSelectionChange?.(selectedItems, Array.from(newSelected));
      },
      [selectedRows, paginatedData, onSelectionChange]
    );

    const handleSelectAll = useCallback(() => {
      if (selectedRows.size === paginatedData.length) {
        setSelectedRows(new Set());
        onSelectionChange?.([], []);
      } else {
        const newSelected = new Set(paginatedData.map((_, idx) => idx));
        setSelectedRows(newSelected);
        onSelectionChange?.(paginatedData, Array.from(newSelected));
      }
    }, [selectedRows, paginatedData, onSelectionChange]);

    // ============================================
    // ROW ACTIONS
    // ============================================

    const handleRowAction = useCallback(
      async (action: RowAction, row: any, index: number) => {
        if (action.confirmMessage) {
          if (!confirm(action.confirmMessage)) return;
        }

        setActionLoading(action.id);
        try {
          await action.onClick(row, index);
        } finally {
          setActionLoading(null);
        }
      },
      []
    );

    // ============================================
    // EXPAND
    // ============================================

    const handleRowExpand = useCallback(
      async (index: number) => {
        const newExpanded = new Set(expandedRows);
        const wasExpanded = newExpanded.has(index);

        if (wasExpanded) {
          newExpanded.delete(index);
          setExpandedRowPosition(null);
        } else {
          newExpanded.add(index);
          // Calculate position
          setTimeout(() => {
            const rowElement = document.querySelector(
              `[data-row-index="${index}"]`
            ) as HTMLTableRowElement;
            if (rowElement) {
              const rect = rowElement.getBoundingClientRect();
              setExpandedRowPosition({
                top: rect.bottom + window.scrollY + 8,
                left: rect.left + window.scrollX,
                width: rect.width,
                rowIndex: index,
              });
            }
          }, 0);
        }

        setExpandedRows(newExpanded);
        if (expandable?.onExpand) {
          await expandable.onExpand(paginatedData[index], index, !wasExpanded);
        }
      },
      [expandedRows, paginatedData, expandable]
    );

    // ============================================
    // POSITION TRACKING
    // ============================================

    useEffect(() => {
      if (!expandedRowPosition) return;

      const updatePosition = () => {
        const rowElement = document.querySelector(
          `[data-row-index="${expandedRowPosition.rowIndex}"]`
        ) as HTMLTableRowElement;

        if (!rowElement) return;

        const rowRect = rowElement.getBoundingClientRect();
        setExpandedRowPosition(prev =>
          prev ? {
            ...prev,
            top: rowRect.bottom + window.scrollY,
            left: rowRect.left + window.scrollX,
            width: rowRect.width,
          } : null
        );
      };

      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }, [expandedRowPosition]);

    // ============================================
    // COLUMN GROUP
    // ============================================

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

    // ============================================
    // RENDERING HELPERS
    // ============================================

    const getRowKey = (row: any, index: number): string | number => {
      if (typeof rowKey === 'function') return rowKey(row, index);
      return row[rowKey] ?? index;
    };

    const getRowClassName = (row: any, index: number): string => {
      const isSelected = selectedRows.has(index);
      const baseClass = 'hover:bg-surface dark:hover:bg-[#04425c66] transition-colors cursor-pointer ';
      let statusClass = '';

      if (variant === 'attendance') {
        const dateValue = row['Date']?.toString() || '';
        if (dateValue.includes('Absence')) {
          statusClass = 'bg-red-100';
        }
      }

      const customClass =
        typeof styles.rowClassName === 'function'
          ? styles.rowClassName(row, index, isSelected)
          : styles.rowClassName || '';

      return `${baseClass} ${statusClass} ${customClass}`;
    };

    const getCellClassName = (col: ColumnConfig<any>, value: any, row: any, index: number): string => {
      if (typeof col.cellClassName === 'function') {
        return col.cellClassName(value, row, index);
      }
      return col.cellClassName || '';
    };

    const getHeaderClassName = (col: ColumnConfig<any>): string => {
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

    const renderCellValue = (col: ColumnConfig<any>, row: any, index: number) => {
      const value = row[col.key];

      if (col.render) {
        return col.render(value, row, index);
      }

      if (col.format) {
        return col.format(value);
      }

      switch (col.type) {
        case 'boolean':
          return value ? 'Yes' : 'No';
        case 'date':
          return value ? new Date(value).toLocaleDateString() : '-';
        case 'number':
          return typeof value === 'number' ? value.toLocaleString() : value;
        case 'email':
          return (
            <a href={`mailto:${value}`} className="text-primary hover:underline">
              {value}
            </a>
          );
        default:
          return value ?? '-';
      }
    };

    const renderRowActions = (row: any, index: number) => {
      if (!rowActions || rowActions.length === 0) return null;

      return (
        <div className='flex items-center justify-center gap-2'>
          {rowActions.map((action) => {
            const visible = action.visible ? action.visible(row, index) : true;
            const disabled = action.disabled ? action.disabled(row) : false;

            if (!visible) return null;

            return (
              <Tooltip key={action.id} content={action.label}>
                <AppButton
                    size= 'sm'
                    radius= 'full'
                    variant= 'light'
                    color= {action.color}
                    isDisabled= {disabled || actionLoading === action.id}
                    isLoading= {actionLoading === action.id}
                    onPress= {() => handleRowAction(action, row, index)}
                    content= {(
                      <span className='cursor-pointer text-lg'>{action.icon || action.label}.</span>
                    )}
                />
              </Tooltip>
            );
          })}
        </div>
      );
    };

    // ============================================
    // CONDITIONAL RENDERING
    // ============================================

    if (loading) {
      return (
        <div
          ref={ref}
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
        <div
          ref={ref}
          className='rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20'
        >
          <div className='text-center text-red-600 dark:text-red-400'>Error: {error}</div>
        </div>
      );
    }

    if (!data || data.length === 0) {
      return (
        <div
          ref={ref}
          className={`bg-primary-50 rounded-2xl p-4 dark:bg-[rgba(4,66,92,0.60)] ${styles.emptyClassName || ''}`}
        >
          <div className='text-center text-gray-500'>{emptyMessage}</div>
        </div>
      );
    }

    // ============================================
    // HEADER COLUMNS BUILDING
    // ============================================

    const headerColumns: React.ReactNode[] = [];

    // Data Columns
    autoColumns.forEach((col) => {
      headerColumns.push(
        <TableColumn
          key={col.key}
          className={getHeaderClassName(col)}
          style={{ width: col.width, minWidth: col.minWidth, maxWidth: col.maxWidth }}
          onClick={() => sortable && handleSort(col.key)}
        >
          <div className='flex items-center justify-center gap-1'>
            {col.headerRender ? col.headerRender() : col.label || col.key}
            {sortable && sort?.key === col.key && (
              <span>{sort.direction === SortDirection.ASC ? '↑' : '↓'}</span>
            )}
          </div>
        </TableColumn>
      );
    });

    // Actions
    if (rowActions && rowActions.length > 0) {
      headerColumns.push(
        <TableColumn
          key='actions'
          className='bg-primary h-12! text-center text-sm font-semibold text-white dark:bg-[rgba(4,66,92,0.60)]'
        >
          Actions
        </TableColumn>
      );
    }

    // ============================================
    // RETURN JSX
    // ============================================

    return (
      <div
        ref={ref}
        className={`w-full border-primary bg-surface-50! shadow-light-tight/1 rounded-2xl border dark:border-[#04425c66] ${styles.containerClassName || ''}`}
      >
        <Table
          aria-label='Data table'
          className={`${styles.tableClassName}`}
          isHeaderSticky={variant === 'attendance' || sticky}
          classNames={{
            base: variant === 'attendance' ? 'max-h-[760px] bg-transparent' : '!h-full bg-transparent',
            wrapper: variant === 'attendance'
              ? 'max-h-full overflow-y-scroll custom-scroll bg-transparent'
              : 'bg-transparent h-full',
            table: 'min-w-full',
            thead: '[&>tr]:first:shadow-none',
            tr: 'rounded-6',
            th: variant === 'attendance'
              ? 'first:border-r-8 first:border-r-transparent first:rounded-r-2xl first:bg-[#999999] [&:nth-of-type(2)]:border-r-8 [&:nth-of-type(2)]:rounded-2xl [&:nth-of-type(2)]:bg-[#999999] [&:nth-of-type(2)]:border-r-transparent [&:nth-of-type(3)]:border-l-transparent [&:nth-of-type(3)]:border-l-8 [&:nth-of-type(3)]:rounded-l-2xl [&:nth-of-type(8)]:rounded-r-2xl [&:nth-of-type(8)]:border-r-8 [&:nth-of-type(8)]:border-r-transparent [&:nth-of-type(9)]:rounded-l-2xl [&:nth-of-type(9)]:border-l-8 [&:nth-of-type(9)]:border-l-transparent text-white [&:nth-of-type(3)]:bg-primary [&:nth-of-type(4)]:bg-primary [&:nth-of-type(5)]:bg-primary [&:nth-of-type(6)]:bg-primary [&:nth-of-type(7)]:bg-primary [&:nth-of-type(8)]:bg-primary [&:nth-of-type(9)]:bg-green-500'
              : 'bg-primary-400',
          }}
        >
          <TableHeader className={styles.headerClassName}>{headerColumns}</TableHeader>

          <TableBody className={styles.bodyClassName}>
            {paginatedData.map((row, index) => {
              const key = getRowKey(row, index);
              const isSelected = selectedRows.has(index);
              const isExpanded = expandedRows.has(index);

              const cells: React.ReactNode[] = [];

              // Data Cells
              autoColumns.forEach((col, colIndex) => {
                const value = row[col.key];
                const cellClass = getCellClassName(col, value, row, index);
                const isFirstCell = colIndex === 0;

                cells.push(
                  <TableCell
                    key={col.key}
                    className={`text-center text-xs font-normal text-black ${cellClass} ${styles.cellClassName || ''} ${
                      expandable && isFirstCell ? 'cursor-pointer hover:bg-opacity-80' : ''
                    }`}
                    onClick={(e) => {
                      if (expandable && isFirstCell) {
                        e.stopPropagation();
                        handleRowExpand(index);
                      } else {
                        onRowClick?.(row, index);
                      }
                    }}
                  >
                    <div className='flex items-center justify-center gap-2'>
                    
                      <span>{renderCellValue(col, row, index)}</span>
                    </div>
                  </TableCell>
                );
              });

              // Actions
              if (rowActions && rowActions.length > 0) {
                cells.push(
                  <TableCell key='actions' className='text-secondary-400 text-xs'>
                    {renderRowActions(row, index)}
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

        {/* Expandable Row Portal */}
        {expandable && expandedRowPosition && expandedRows.has(expandedRowPosition.rowIndex) && createPortal(
          <div
            style={{
              position: 'absolute',
              top: `${expandedRowPosition.top}px`,
              left: `${expandedRowPosition.left}px`,
              zIndex: 1000,
            }}
          >
            {expandable.render(
              paginatedData[expandedRowPosition.rowIndex],
              expandedRowPosition.rowIndex
            )}
          </div>,
          document.body
        )}

        {/* Pagination */}
        {shouldPaginate && (
          <div className='mt-4 flex justify-end px-4'>
            <AppPagination
              total={totalPages}
              page={page}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    );
  }
);

AppTable.displayName = 'AppTable';