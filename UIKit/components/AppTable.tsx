import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Checkbox, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@heroui/react";
import { AppButton, AppPagination } from "@hrbox/uikit/components";
import { createPortal } from "react-dom";
import { Edit, Eye, Trash } from "iconsax-reactjs";

export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

export interface ColumnConfig<T = any> {
  key: string;
  label?: string;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  align?: "left" | "center" | "right" | "start" | "end";
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  headerRender?: () => React.ReactNode;
  headerClassName?: string | ((col: ColumnConfig<T>) => string);
  cellClassName?: string | ((value: any, row: T, index: number) => string);
  visible?: boolean | ((row: T) => boolean);
  format?: (value: any) => string;
  type?: "text" | "number" | "date" | "boolean" | "email" | "phone" | "custom";
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
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  confirmMessage?: string;
  disabled?: (row: T) => boolean;
}

export interface ExpandableConfig<T = any> {
  render: (row: T, index: number, cellType?: "first" | "second") => React.ReactNode;
  expandedRowClassName?: string;
  onExpand?: (row: T, index: number, isExpanded: boolean) => void | Promise<void>;
  defaultExpanded?: boolean | ((row: T) => boolean);
  expandButtonPosition?: "start" | "end";
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
  data: T[];
  columns?: ColumnConfig<T>[];
  columnGroups?: ColumnGroup[];
  rowKey?: string | ((row: T, index: number) => string | number);
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[], selectedIndices: number[]) => void;
  onRowClick?: (row: T, index: number) => void;
  rowActions?: RowAction<T>[];
  expandable?: ExpandableConfig<T>;
  sortable?: boolean;
  onSort?: (sort: SortConfig) => void;
  defaultSort?: SortConfig;
  filterable?: boolean;
  onFilter?: (filters: FilterConfig) => void;
  hasPagination?: boolean;
  pageSize?: number;
  totalItems?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  variant?: "default" | "striped" | "bordered" | "minimal";
  styles?: TableStyleConfig;
  density?: "sm" | "md" | "lg";
  loading?: boolean;
  error?: string;
  emptyMessage?: string | React.ReactNode;
  showCheckbox?: boolean;
  showRowNumber?: boolean;
  showStatus?: boolean;
  sticky?: boolean;
  onEdit?: (row: T, index: number) => void;
  onDelete?: (row: T, index: number) => void;
  onView?: (row: T, index: number) => void;
}

export const AppTable = React.forwardRef<HTMLDivElement, AppTableProps>(
  (
    {
      data = [],
      columns,
      rowKey = "id",
      selectable = false,
      onSelectionChange,
      onRowClick,
      rowActions,
      expandable,
      sortable = false,
      onSort,
      defaultSort,
      hasPagination = true,
      pageSize = 10,
      totalItems,
      currentPage: controlledPage,
      onPageChange,
      variant = "primary",
      styles = {},
      density = "md",
      loading = false,
      error,
      emptyMessage = "No data available",
      showCheckbox = selectable,
      showRowNumber = false,
      sticky = true,
      onEdit,
      onDelete,
      onView
    },
    ref
  ) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState<SortConfig | null>(defaultSort || null);
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
    const [expandedRowPosition, setExpandedRowPosition] = useState<{
      top: number;
      left: number;
      width: number;
      rowIndex: number;
      cellType?: "first" | "second";
    } | null>(null);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const tableContainerRef = useRef<HTMLDivElement>(null);

    const page: any = controlledPage || currentPage;

    const autoColumns = useMemo<ColumnConfig<any>[]>(() => {
      if (columns) return columns;
      if (data.length === 0) return [];
      return Object.keys(data[0])
        .filter((key) => key !== "id")
        .map((key) => ({
          key,
          label: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
          align: "center" as const,
          type: "text" as const
        }));
    }, [columns, data]);

    const paginatedData = useMemo(() => {
      if (!hasPagination) return data;
      const startIndex = (page - 1) * pageSize;
      return data.slice(startIndex, startIndex + pageSize);
    }, [data, page, pageSize, hasPagination]);

    const totalPages = useMemo(() => {
      return Math.ceil((totalItems || data.length) / pageSize);
    }, [totalItems, data.length, pageSize]);

    const densityClasses = useMemo(() => {
      switch (density) {
        case "sm":
          return "py-1 px-2 text-xs";
        case "lg":
          return "py-4 px-4 text-base";
        default:
          return "py-3 px-2 text-sm";
      }
    }, [density]);

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

    const handleRowAction = useCallback(
      async (action: RowAction, row: any, index: number) => {
        if (action.confirmMessage && !confirm(action.confirmMessage)) return;
        setActionLoading(action.id);
        try {
          await action.onClick(row, index);
        } finally {
          setActionLoading(null);
        }
      },
      []
    );

    const handleRowExpand = useCallback(
      async (index: number, cellType: "first" | "second" = "first") => {
        const newExpanded = new Set(expandedRows);
        const wasExpanded = newExpanded.has(index);

        if (wasExpanded) {
          newExpanded.delete(index);
          setExpandedRowPosition(null);
        } else {
          newExpanded.add(index);
          setTimeout(() => {
            const rowElement = document.querySelector(`[data-row-index="${index}"]`) as HTMLTableRowElement;
            if (rowElement) {
              const rect = rowElement.getBoundingClientRect();
              setExpandedRowPosition({
                top: rect.bottom + window.scrollY + 8,
                left: rect.left + window.scrollX,
                width: rect.width,
                rowIndex: index,
                cellType
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

    useEffect(() => {
      if (!expandedRowPosition) return;
      const updatePosition = () => {
        const rowElement = document.querySelector(`[data-row-index="${expandedRowPosition.rowIndex}"]`) as HTMLTableRowElement;
        if (!rowElement) return;
        const rowRect = rowElement.getBoundingClientRect();
        setExpandedRowPosition((prev) =>
          prev ? {
            ...prev,
            top: rowRect.bottom + window.scrollY,
            left: rowRect.left + window.scrollX,
            width: rowRect.width
          } : null
        );
      };
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }, [expandedRowPosition]);

    const getRowKey = (row: any, index: number): string | number => {
      if (typeof rowKey === "function") return rowKey(row, index);
      return row[rowKey] ?? index;
    };

    const getRowClassName = (row: any, index: number): string => {
      const isSelected = selectedRows.has(index);
      const baseClass = "hover:bg-surface dark:hover:bg-[#04425c66] transition-colors cursor-pointer";
      const stripedClass = variant === "striped" && index % 2 === 1 ? "bg-gray-50 dark:bg-gray-800/30" : "";
      const borderedClass = variant === "bordered" ? "border-b border-gray-200 dark:border-gray-700" : "";
      const selectedClass = isSelected ? "bg-primary-400 dark:bg-primary-900/30" : "";
      const customClass = typeof styles.rowClassName === "function" ? styles.rowClassName(row, index, isSelected) : styles.rowClassName || "";
      return `${baseClass} ${stripedClass} ${borderedClass} ${selectedClass} ${customClass}`;
    };

    const getCellClassName = (col: ColumnConfig<any>, value: any, row: any, index: number): string => {
      if (typeof col.cellClassName === "function") {
        return col.cellClassName(value, row, index);
      }
      return col.cellClassName || "";
    };

    const getHeaderClassName = (col: ColumnConfig<any>): string => {
      const baseClass = "text-white text-sm font-semibold !bg-primary dark:bg-[#0D4D6A]! text-center !h-12";
      if (typeof col.headerClassName === "function") {
        return `${baseClass} ${col.headerClassName(col)}`;
      }
      return `${baseClass} ${col.headerClassName || ""}`;
    };

    const renderCellValue = (col: ColumnConfig<any>, row: any, index: number) => {
      const value = row[col.key];
      if (col.render) return col.render(value, row, index);
      if (col.format) return col.format(value);
      switch (col.type) {
        case "boolean":
          return value ? "Yes" : "No";
        case "date":
          return value ? new Date(value).toLocaleDateString() : "-";
        case "number":
          return typeof value === "number" ? value.toLocaleString() : value;
        case "email":
          return <a href={`mailto:${value}`} className="text-primary hover:underline">{value}</a>;
        default:
          return value ?? "-";
      }
    };

    const renderRowActions = (row: any, index: number) => {
      if (!rowActions || rowActions.length === 0) return null;
      const actions = rowActions.filter((action) => (action.visible ? action.visible(row, index) : true));
      if (actions.length === 0) return null;
      return (
        <div className="flex items-center justify-center gap-2">
          {actions.map((action) => {
            const disabled = action.disabled ? action.disabled(row) : false;
            return (
              <Tooltip key={action.id} content={action.label}>
                <AppButton
                  size="sm"
                  radius="full"
                  variant="light"
                  color={action.color}
                  isDisabled={disabled || actionLoading === action.id}
                  isLoading={actionLoading === action.id}
                  onPress={() => handleRowAction(action, row, index)}
                  content={<span
                    className="cursor-pointer text-lg">{action.icon || action.label}</span>}
                />
              </Tooltip>
            );
          })}
        </div>
      );
    };

    if (loading) {
      return (
        <div ref={ref}
             className={`bg-primary-50 rounded-2xl p-8 dark:bg-[rgba(4,66,92,0.60)] ${styles.loadingClassName || ""}`}>
          <div className="flex items-center justify-center">
            <div className="text-center text-gray-500">Loading...</div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div ref={ref}
             className="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <div className="text-center text-red-600 dark:text-red-400">Error: {error}</div>
        </div>
      );
    }

    if (!data || data.length === 0) {
      return (
        <div ref={ref}
             className={`bg-primary-50 rounded-2xl p-4 dark:bg-[rgba(4,66,92,0.60)] ${styles.emptyClassName || ""}`}>
          <div className="text-center text-gray-500">{emptyMessage}</div>
        </div>
      );
    }

    const headerColumns: React.ReactNode[] = [];

    if (showRowNumber) {
      headerColumns.push(
        <TableColumn key="row-number" className={getHeaderClassName({ key: "row-number" } as any)}
                     style={{ width: "60px" }}>
          #
        </TableColumn>
      );
    }

    if (showCheckbox) {
      headerColumns.push(
        <TableColumn key="checkbox" className={getHeaderClassName({ key: "checkbox" } as any)}
                     style={{ width: "60px" }}>
          <Checkbox isSelected={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    onChange={handleSelectAll} />
        </TableColumn>
      );
    }

    autoColumns.forEach((col) => {
      headerColumns.push(
        <TableColumn
          key={col.key}
          className={getHeaderClassName(col)}
          style={{ width: col.width, minWidth: col.minWidth, maxWidth: col.maxWidth }}
          onClick={() => sortable && col.sortable !== false && handleSort(col.key)}
        >
          <div className="flex items-center justify-start gap-1">
            {col.headerRender ? col.headerRender() : col.label || col.key}
            {sortable && sort?.key === col.key &&
              <span>{sort.direction === SortDirection.ASC ? "↑" : "↓"}</span>}
          </div>
        </TableColumn>
      );
    });

    if (onEdit || onDelete || onView || (rowActions && rowActions.length > 0)) {
      headerColumns.push(
        <TableColumn key="actions"
                     className="bg-primary h-12! text-center text-sm font-semibold text-white dark:bg-[#0D4D6A]">
          Actions
        </TableColumn>
      );
    }

    return (
      <div ref={tableContainerRef}
           className={`w-full h-full border-primary bg-surface-50! shadow-light-tight/1 rounded-2xl border dark:border-[#04425c66] ${styles.containerClassName || ""}`}>
        <Table
          aria-label="Data table"
          isStriped={variant === "striped"}
          className={`${styles.tableClassName} h-full`}
          classNames={{
            base: "!h-full !w-full",
            wrapper: `h-full !w-full bg-[#DCF0F940] dark:bg-[#04425C60] dark:border dark:border-primary ${sticky ? "overflow-auto" : ""}`,
            table: "!w-full",
            tbody: "!w-full",
            td: densityClasses,
            tr: "rounded-6 !w-full"
          }}
        >
          <TableHeader className={styles.headerClassName}>
            {headerColumns}
          </TableHeader>
          <TableBody className={styles.bodyClassName}>
            {paginatedData.map((row, index) => {
              const key = getRowKey(row, index);
              const isSelected = selectedRows.has(index);
              const cells: React.ReactNode[] = [];

              if (showRowNumber) {
                cells.push(
                  <TableCell key="row-number"
                             className={`${densityClasses} text-center text-gray-500 font-medium`}>
                    {(page - 1) * pageSize + index + 1}
                  </TableCell>
                );
              }

              if (showCheckbox) {
                cells.push(
                  <TableCell key="checkbox" className={densityClasses}>
                    <Checkbox isSelected={isSelected} onChange={() => handleRowSelect(index)} />
                  </TableCell>
                );
              }

              autoColumns.forEach((col, colIndex) => {
                const value = row[col.key];
                const cellClass = getCellClassName(col, value, row, index);
                const isFirstCell = colIndex === 0;
                const isSecondCell = colIndex === 1;

                cells.push(
                  <TableCell
                    key={col.key}
                    className={`text-center font-normal text-black ${densityClasses} ${cellClass} ${styles.cellClassName || ""} ${
                      expandable && (isFirstCell || isSecondCell) ? "cursor-pointer hover:bg-opacity-80" : ""
                    }`}
                    onClick={(e) => {
                      if (expandable) {
                        if (isFirstCell) {
                          e.stopPropagation();
                          handleRowExpand(index, "first");
                        } else if (isSecondCell) {
                          e.stopPropagation();
                          handleRowExpand(index, "second");
                        }
                      } else {
                        onRowClick?.(row, index);
                      }
                    }}
                  >
                    <div className="flex items-center justify-start gap-2">
                      <span>{renderCellValue(col, row, index)}</span>
                    </div>
                  </TableCell>
                );
              });

              if (onEdit || onDelete || onView || (rowActions && rowActions.length > 0)) {
                cells.push(
                  <TableCell key="actions" className={`text-secondary-400 `}>
                    <div className="flex items-center justify-center gap-2">
                      {onView && (
                        <Tooltip content="View">
                          <AppButton size="sm" variant="light"
                                     onPress={() => onView(row, index)}
                                     content={<span
                                       className="cursor-pointer text-lg"><Eye color="#DEE1E8" /></span>} />
                        </Tooltip>
                      )}
                      {onEdit && (
                        <Tooltip content="Edit">
                          <AppButton size="sm" variant=""
                          className="p-0!"
                                     onPress={() => onEdit(row, index)}
                                     content={<><Edit size={16} className="dark:text-[#DEE1E8] text-[#1E3363]" />️</>} />
                        </Tooltip>
                      )}
                      {onDelete && (
                        <Tooltip content="Delete">
                          <AppButton size="sm" variant=""
                                     onPress={() => onDelete(row, index)}
                                     className="p-0!"
                                     content={<><Trash size={16}
                                       className="dark:text-[#DEE1E8] text-[#1E3363]" /></>} />
                        </Tooltip>
                      )}
                      {renderRowActions(row, index)}
                    </div>
                  </TableCell>
                );
              }

              return (
                <TableRow key={key} data-row-index={index} className={getRowClassName(row, index)}
                          onClick={() => onRowClick?.(row, index)}>
                  {cells}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {expandable && expandedRowPosition && expandedRows.has(expandedRowPosition.rowIndex) &&
          createPortal(
            <div style={{
              position: "absolute",
              top: `${expandedRowPosition.top}px`,
              left: `${expandedRowPosition.left}px`,
              zIndex: 1000
            }}>
              {expandable.render(paginatedData[expandedRowPosition.rowIndex], expandedRowPosition.rowIndex, expandedRowPosition.cellType)}
            </div>,
            document.body
          )}

        {hasPagination && totalPages > 1 && (
          <div className="mt-4 flex justify-end px-4">
            <AppPagination meta={{ page, totalPages }} onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    );
  }
);

AppTable.displayName = "AppTable";