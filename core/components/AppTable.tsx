import React, { useMemo, useState } from 'react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Tooltip } from '@heroui/react';
import { Edit, Trash, Add } from 'iconsax-react';
import { AppButton, AppPagination } from '@core/components'
export interface ColumnConfig<T = any> {
  key: string;
  label?: string; // Optional - auto-generated from key
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
  startKey: string; // First column key in group
  endKey: string;   // Last column key in group
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
  // Data
  data: T[];
  columns?: ColumnConfig<T>[]; // Optional - auto-generated if not provided

  // Features
  columnGroups?: ColumnGroup[];
  rowActions?: RowAction<T>[];
  expandable?: ExpandableConfig<T>;
  selectable?: boolean;

  // Behavior
  onRowClick?: (row: T, index: number) => void;
  onSelectionChange?: (selectedRows: T[], selectedIndices: number[]) => void;
  rowKey?: string | ((row: T, index: number) => string | number);

  // Pagination
  hasPagination?: boolean;
  pageSize?: number;

  // Styling
  variant?: 'default' | 'attendance' | 'bordered' | 'striped' | 'minimal';
  styles?: TableStyleConfig;

  // States
  loading?: boolean;
  error?: string;
  emptyMessage?: string | React.ReactNode;
}


// ============================================
// AppTable.tsx - Main Component
// ============================================
;

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
  // ============================================
  // STATE
  // ============================================
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  // ============================================
  // AUTO-GENERATE COLUMNS
  // ============================================
  const autoColumns = useMemo<ColumnConfig<T>[]>(() => {
    if (columns) return columns;

    if (data.length === 0) return [];

    return Object.keys(data[0])
      .filter((key) => key !== 'id')
      .map((key) => ({
        key,
        label: key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
        align: 'center' as const,
      }));
  }, [columns, data]);

  // ============================================
  // PAGINATION
  // ============================================
  const paginatedData = useMemo(() => {
    if (!hasPagination) return data;
    const startIndex = (currentPage - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  }, [data, currentPage, pageSize, hasPagination]);

  // ============================================
  // COLUMN GROUPS LOGIC
  // ============================================
  const getColumnGroupInfo = (colKey: string) => {
    if (!columnGroups) return null;

    for (const group of columnGroups) {
      const startIdx = autoColumns.findIndex((c) => c.key === group.startKey);
      const endIdx = autoColumns.findIndex((c) => c.key === group.endKey);
      const currentIdx = autoColumns.findIndex((c) => c.key === colKey);

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
  // HELPERS
  // ============================================
  const getRowKey = (row: T, index: number): string | number => {
    if (typeof rowKey === 'function') return rowKey(row, index);
    return row[rowKey] ?? index;
  };

  const getRowClassName = (row: T, index: number): string => {
    const baseClass = 'hover:bg-surface dark:hover:bg-[#04425c66] transition-colors cursor-pointer';
    const customClass = typeof styles.rowClassName === 'function'
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

    let baseClass = variant === 'default'
      ? 'text-white text-sm font-semibold bg-primary dark:bg-[rgba(4,66,92,0.60)] text-center !h-12'
      : '';

    // Apply column group styling
    if (groupInfo && variant === 'attendance') {
      const { group, isFirst, isLast, isOnly } = groupInfo;
      const roundedClass = isOnly
        ? 'rounded-xl'
        : isFirst
          ? 'rounded-l-xl'
          : isLast
            ? 'rounded-r-xl'
            : '';
      baseClass = `${group.headerClassName || ''} ${roundedClass}`;
    }

    // Apply custom className
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

  // ============================================
  // SELECTION
  // ============================================
  const toggleRowSelection = (index: number) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }

      if (onSelectionChange) {
        const selectedData = Array.from(newSet).map(i => data[i]);
        onSelectionChange(selectedData, Array.from(newSet));
      }

      return newSet;
    });
  };

  const toggleAllRows = () => {
    const newSet = selectedRows.size === data.length
      ? new Set<number>()
      : new Set(data.map((_, i) => i));

    setSelectedRows(newSet);

    if (onSelectionChange) {
      const selectedData = Array.from(newSet).map(i => data[i]);
      onSelectionChange(selectedData, Array.from(newSet));
    }
  };

  // ============================================
  // EXPANDABLE
  // ============================================
  const toggleRowExpansion = (row: T, index: number) => {
    setExpandedRows((prev) => {
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

  // ============================================
  // ROW ACTIONS
  // ============================================
  const renderRowActions = (row: T, index: number) => {
    if (!rowActions || rowActions.length === 0) return null;

    return (
      <div className="flex items-center justify-center gap-2">
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
                    <span className="text-lg cursor-pointer">
                      {action.icon || action.label}
                    </span>
                  ),
                }}
              />
            </Tooltip>
          );
        })}
      </div>
    );
  };

  // ============================================
  // RENDER STATES
  // ============================================
  if (loading) {
    return (
      <div className={`p-8 bg-primary-50 dark:bg-[rgba(4,66,92,0.60)] rounded-2xl ${styles.loadingClassName || ''}`}>
        <div className="flex justify-center items-center">
          <div className="text-center text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl">
        <div className="text-center text-red-600 dark:text-red-400">Error: {error}</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={`p-4 bg-primary-50 dark:bg-[rgba(4,66,92,0.60)] rounded-2xl ${styles.emptyClassName || ''}`}>
        <div className="text-center text-gray-500">{emptyMessage}</div>
      </div>
    );
  }

  // ============================================
  // MAIN RENDER
  // ============================================
  return (
    <div className={`w-full ${variant === 'default' ? 'border border-primary dark:border-[#04425c66] bg-primary-50 dark:bg-[rgba(4,66,92,0.60)] rounded-2xl shadow-light-tight/1 pb-4' : ''} ${styles.containerClassName || ''}`}>
      <Table className={styles.tableClassName}>
        <TableHeader className={styles.headerClassName}>
          {autoColumns.map((col:any) => (
            <TableColumn
              key={col.key}
              className={getHeaderClassName(col)}
              style={{ width: col.width }}
            >
              {col.headerRender ? col.headerRender() : (col.label || col.key)}
            </TableColumn>
          ))}
          {rowActions && rowActions.length > 0 && (
            <TableColumn className="text-white text-sm font-semibold bg-primary dark:bg-[rgba(4,66,92,0.60)] text-center !h-12">
              Actions
            </TableColumn>
          )}
        </TableHeader>

        <TableBody className={styles.bodyClassName}>
          {paginatedData.map((row:any, index:any) => {
            const key = getRowKey(row, index);
            const isExpanded = expandedRows.has(index);

            // @ts-ignore
            return (
              <React.Fragment key={key}>
                <TableRow
                  key={key}
                  className={getRowClassName(row, index)}
                  onClick={() => {
                    if (expandable) {
                      toggleRowExpansion(row, index);
                    } else {
                      onRowClick?.(row, index);
                    }
                  }}
                >
                  {autoColumns.map((col:any) => {
                    const value = row[col.key];
                    const cellClass = getCellClassName(col, value, row, index);
                    return (
                      <TableCell
                        key={col.key}
                        className={`text-xs font-normal text-black text-center ${cellClass} ${styles.cellClassName || ''}`}
                      >
                        {renderCellValue(col, row, index)}
                      </TableCell>
                    );
                  })}
                  {rowActions && (
                    <TableCell className="text-xs text-secondary-400">
                      {renderRowActions(row, index)}
                    </TableCell>
                  )}
                </TableRow>

                {/* Expanded Row Content */}
                {expandable && isExpanded && (
                  <TableRow key={`${key}-expanded`}>
                    <TableCell
                      colSpan={autoColumns.length + (rowActions ? 1 : 0)}
                      className={`bg-white px-3 py-2 ${expandable.expandedRowClassName || ''}`}
                    >
                      {expandable.render(row, index)}
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>

      {hasPagination && (
        <div className="flex justify-end mt-4 px-4">
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
