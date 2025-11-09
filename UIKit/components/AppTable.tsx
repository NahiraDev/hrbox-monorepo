// ============================================
// components/tables/AppTable.tsx (ADVANCED)
// ============================================

import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Tooltip,
  Spinner,
} from '@heroui/react';
import { AppButton } from '@hrbox/uikit/components';
import { createPortal } from 'react-dom';
import { Edit, Trash, Eye, MoreVertical } from 'iconsax-react';
import clsx from 'clsx';

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
  align?: 'left' | 'center' | 'right';
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

export interface RowAction<T = any> {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T, index: number) => void | Promise<void>;
  visible?: (row: T, index: number) => boolean;
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  confirmMessage?: string; // نمایش تایید
  disabled?: (row: T) => boolean;
}

export interface ExpandableConfig<T = any> {
  render: (row: T, index: number) => React.ReactNode;
  expandedRowClassName?: string;
  onExpand?: (row: T, index: number, isExpanded: boolean) => void | Promise<void>;
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
  rowClassName?: string | ((row: any, index: number, isSelected: boolean) => string);
  cellClassName?: string;
  emptyClassName?: string;
  loadingClassName?: string;
}

export interface AppTableProps<T = any> {
  // Data
  data: T[];
  columns?: ColumnConfig<T>[];
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
  totalItems?: number; // برای server-side pagination
  currentPage?: number;
  onPageChange?: (page: number) => void;

  // Display
  variant?: 'default' | 'striped' | 'bordered' | 'minimal' | 'attendance';
  styles?: TableStyleConfig;
  density?: 'sm' | 'md' | 'lg'; // compact, normal, spacious

  // States
  loading?: boolean;
  error?: string;
  emptyMessage?: string | React.ReactNode;

  // Features
  showCheckbox?: boolean;
  showRowNumber?: boolean;
  showStatus?: boolean;
  sticky?: boolean; // Sticky header

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
      emptyMessage = 'اطلاعات موجود نیست',

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
    // States
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState<SortConfig | null>(defaultSort || null);
    const [filters, setFilters] = useState<FilterConfig>({});
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
    const [expandedRowPosition, setExpandedRowPosition] = useState<{
      top: number;
      left: number;
      width: number;
      rowIndex: number;
    } | null>(null);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const tableContainerRef = useRef<HTMLDivElement>(null);

    // Use controlled or uncontrolled page
    const page = controlledPage || currentPage;

    /**
     * ============================================
     * AUTO COLUMNS
     * ============================================
     */

    const autoColumns = useMemo<ColumnConfig<any>[]>(() => {
      if (columns) return columns;
      if (data.length === 0) return [];

      return Object.keys(data[0])
        .filter((key) => !['id', '_id'].includes(key))
        .map((key) => ({
          key,
          label: key.replace(/([A-Z])/g, ' $1').trim(),
          align: 'center' as const,
          type: 'text' as const,
        }));
    }, [columns, data]);

    /**
     * ============================================
     * PAGINATION
     * ============================================
     */

    const paginatedData = useMemo(() => {
      if (!hasPagination) return data;
      const startIndex = (page - 1) * pageSize;
      return data.slice(startIndex, startIndex + pageSize);
    }, [data, page, pageSize, hasPagination]);

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

    /**
     * ============================================
     * SORTING
     * ============================================
     */

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

    /**
     * ============================================
     * SELECTION
     * ============================================
     */

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

    /**
     * ============================================
     * ROW ACTIONS
     * ============================================
     */

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

    /**
     * ============================================
     * EXPAND
     * ============================================
     */

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
          await expandable.onExpand(
            paginatedData[index],
            index,
            !wasExpanded
          );
        }
      },
      [expandedRows, paginatedData, expandable]
    );

    /**
     * ============================================
     * RENDERING
     * ============================================
     */

    const getRowClassName = (row: any, index: number): string => {
      const isSelected = selectedRows.has(index);
      const baseClass =
        'hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors';

      const customClass =
        typeof styles.rowClassName === 'function'
          ? styles.rowClassName(row, index, isSelected)
          : styles.rowClassName || '';

      const variantClass = {
        striped: index % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-800' : '',
        bordered: 'border-b border-neutral-200 dark:border-neutral-700',
        minimal: '',
        attendance: '',
        default: '',
      }[variant];

      return clsx(baseClass, variantClass, customClass, isSelected && 'bg-primary-100 dark:bg-primary-900/40');
    };

    const getDensityClass = () => {
      return {
        sm: 'py-2 px-2',
        md: 'py-3 px-3',
        lg: 'py-4 px-4',
      }[density];
    };

    const renderCellValue = (col: ColumnConfig, row: any, index: number) => {
      const value = row[col.key];

      if (col.render) {
        return col.render(value, row, index);
      }

      if (col.format) {
        return col.format(value);
      }

      switch (col.type) {
        case 'boolean':
          return value ? '✓' : '✗';
        case 'date':
          return value
            ? new Date(value).toLocaleDateString()
            : '-';
        case 'number':
          return typeof value === 'number'
            ? value.toLocaleString()
            : value;
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

    /**
     * ============================================
     * LOADING & ERROR STATES
     * ============================================
     */

    if (loading) {
      return (
        <div
          ref={ref}
          className={clsx(
            'flex items-center justify-center rounded-2xl p-8',
            'bg-neutral-50 dark:bg-neutral-800',
            styles.loadingClassName
          )}
        >
          <Spinner label="بارگذاری..." color="primary" />
        </div>
      );
    }

    if (error) {
      return (
        <div
          ref={ref}
          className="rounded-2xl border border-danger-200 bg-danger-50 p-4 dark:border-danger-800 dark:bg-danger-900/20"
        >
          <div className="text-center text-danger dark:text-danger-400">
            ❌ خطا: {error}
          </div>
        </div>
      );
    }

    if (!data || data.length === 0) {
      return (
        <div
          ref={ref}
          className={clsx(
            'rounded-2xl p-8 text-center',
            'bg-neutral-50 dark:bg-neutral-800',
            styles.emptyClassName
          )}
        >
          <div className="text-neutral-500 dark:text-neutral-400">
            {emptyMessage}
          </div>
        </div>
      );
    }

    /**
     * ============================================
     * HEADER COLUMNS
     * ============================================
     */

    const headerColumns: React.ReactNode[] = [];

    // Checkbox
    if (showCheckbox) {
      headerColumns.push(
        <TableColumn key="checkbox" width={40} className="text-center">
          <input
            type="checkbox"
            checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
            onChange={handleSelectAll}
            className="cursor-pointer"
          />
        </TableColumn>
      );
    }

    // Row Number
    if (showRowNumber) {
      headerColumns.push(
        <TableColumn key="rowNumber" width={40} className="text-center">
          #
        </TableColumn>
      );
    }

    // Expand Button
    if (expandable) {
      headerColumns.push(
        <TableColumn key="expand" width={40} className="text-center">
          ⬇️
        </TableColumn>
      );
    }

    // Data Columns
    autoColumns.forEach((col) => {
      headerColumns.push(
        <TableColumn
          key={col.key}
          width={col.width}
          className={clsx(
            'font-semibold text-white text-center',
            'bg-primary dark:bg-primary-900',
            getDensityClass(),
            typeof col.headerClassName === 'function'
              ? col.headerClassName(col)
              : col.headerClassName
          )}
          onClick={() => sortable && handleSort(col.key)}
          style={{
            cursor: sortable ? 'pointer' : 'default',
            minWidth: col.minWidth,
            maxWidth: col.maxWidth,
          }}
        >
          <div className="flex items-center justify-center gap-1">
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
        <TableColumn key="actions" width={100} className="text-center font-semibold">
          عملیات
        </TableColumn>
      );
    }

    if (showStatus) {
      headerColumns.push(
        <TableColumn key="status" width={100} className="text-center font-semibold">
          وضعیت
        </TableColumn>
      );
    }

    /**
     * ============================================
     * RENDER
     * ============================================
     */

    return (
      <div
        ref={ref}
        className={clsx('w-full rounded-2xl overflow-hidden', styles.containerClassName)}
      >
        <Table
          aria-label="Data table"
          className={styles.tableClassName}
          isHeaderSticky={sticky}
          classNames={{
            wrapper: 'shadow-none bg-white dark:bg-neutral-800',
            table: 'min-w-full',
            th: clsx(getDensityClass(), 'bg-primary dark:bg-primary-900 text-white'),
            td: clsx(getDensityClass(), 'border-b border-neutral-200 dark:border-neutral-700'),
            tr: 'hover:bg-primary-50 dark:hover:bg-primary-900/20',
          }}
        >
          <TableHeader>{headerColumns}</TableHeader>

          <TableBody>
            {paginatedData.map((row, index) => {
              const key = typeof rowKey === 'function'
                ? rowKey(row, index)
                : row[rowKey] || index;

              const isSelected = selectedRows.has(index);
              const isExpanded = expandedRows.has(index);

              const cells: React.ReactNode[] = [];

              // Checkbox
              if (showCheckbox) {
                cells.push(
                  <TableCell key="checkbox" className="text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleRowSelect(index)}
                      className="cursor-pointer"
                    />
                  </TableCell>
                );
              }

              // Row Number
              if (showRowNumber) {
                cells.push(
                  <TableCell key="rowNumber" className="text-center text-sm">
                    {(page - 1) * pageSize + index + 1}
                  </TableCell>
                );
              }

              // Expand Button
              if (expandable) {
                cells.push(
                  <TableCell
                    key="expand"
                    className="text-center cursor-pointer hover:text-primary"
                    onClick={() => handleRowExpand(index)}
                  >
                    {isExpanded ? '⬆️' : '⬇️'}
                  </TableCell>
                );
              }

              // Data Cells
              autoColumns.forEach((col) => {
                const value = row[col.key];
                cells.push(
                  <TableCell
                    key={col.key}
                    className={clsx(
                      'text-center text-sm',
                      typeof col.cellClassName === 'function'
                        ? col.cellClassName(value, row, index)
                        : col.cellClassName
                    )}
                    onClick={() => onRowClick?.(row, index)}
                  >
                    {renderCellValue(col, row, index)}
                  </TableCell>
                );
              });

              // Actions
              if (rowActions && rowActions.length > 0) {
                cells.push(
                  <TableCell key="actions" className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      {rowActions.map((action) => {
                        const visible = action.visible
                          ? action.visible(row, index)
                          : true;
                        const disabled = action.disabled
                          ? action.disabled(row)
                          : false;

                        if (!visible) return null;

                        return (
                          <Tooltip key={action.id} content={action.label}>
                            <AppButton
                              props={{
                                size: 'sm',
                                isIconOnly: true,
                                variant: 'light',
                                color: action.color,
                                isDisabled: disabled || actionLoading === action.id,
                                isLoading: actionLoading === action.id,
                                onPress: () =>
                                  handleRowAction(action, row, index),
                                content: action.icon || '⋯',
                              }}
                            />
                          </Tooltip>
                        );
                      })}
                    </div>
                  </TableCell>
                );
              }

              // Status
              if (showStatus) {
                cells.push(
                  <TableCell key="status" className="text-center">
                    <div className="flex gap-1 justify-center">
                      {onView && (
                        <AppButton
                          props={{
                            size: 'sm',
                            isIconOnly: true,
                            variant: 'light',
                            onPress: () => onView(row, index),
                            content: <Eye size={16} />,
                          }}
                        />
                      )}
                      {onEdit && (
                        <AppButton
                          props={{
                            size: 'sm',
                            isIconOnly: true,
                            variant: 'light',
                            color: 'primary',
                            onPress: () => onEdit(row, index),
                            content: <Edit size={16} />,
                          }}
                        />
                      )}
                      {onDelete && (
                        <AppButton
                          props={{
                            size: 'sm',
                            isIconOnly: true,
                            variant: 'light',
                            color: 'danger',
                            onPress: () => onDelete(row, index),
                            content: <Trash size={16} />,
                          }}
                        />
                      )}
                    </div>
                  </TableCell>
                );
              }

              return (
                <TableRow
                  key={key}
                  data-row-index={index}
                  className={getRowClassName(row, index)}
                  onClick={() => !showCheckbox && onRowClick?.(row, index)}
                >
                  {cells}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Pagination */}
        {hasPagination && (
          <div className="flex justify-end items-center gap-2 p-4 bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              صفحه {page} از {totalPages}
            </span>
            <div className="flex gap-1">
              <button
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
                className="px-3 py-1 rounded border disabled:opacity-50"
              >
                ←
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => handlePageChange(page + 1)}
                className="px-3 py-1 rounded border disabled:opacity-50"
              >
                →
              </button>
            </div>
          </div>
        )}

        {/* Expandable Row */}
        {expandable &&
          expandedRowPosition &&
          expandedRows.has(expandedRowPosition.rowIndex) &&
          createPortal(
            <div
              style={{
                position: 'absolute',
                top: `${expandedRowPosition.top}px`,
                left: `${expandedRowPosition.left}px`,
                width: `${expandedRowPosition.width}px`,
                zIndex: 1000,
              }}
              className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700"
            >
              {expandable.render(
                paginatedData[expandedRowPosition.rowIndex],
                expandedRowPosition.rowIndex
              )}
            </div>,
            document.body
          )}
      </div>
    );
  }
);

AppTable.displayName = 'AppTable';