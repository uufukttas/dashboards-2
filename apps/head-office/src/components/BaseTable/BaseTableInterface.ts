import { DataTableFilterMeta } from "primereact/datatable";
export interface IColumnProps {
  filterApplyCallback?: () => void;
  filterClearCallback?: () => void;
};
export interface IBaseTableColumn {
  accessor: string;
  align?: 'left' | 'right' | 'center';
  bodyTemplate?: JSX.Element;
  className?: string;
  field: string;
  header: string,
  id: string;
  isRemovable: boolean;
  style?: Record<string, unknown>;
  type: 'string' | 'number' | 'date' | 'boolean' | 'custom';
};
export interface IBaseTableProps {
  className?: string;
  columns: IBaseTableColumn[];
  columnResizeMode?: 'expand' | 'fit';
  currentPageReportTemplate?: string;
  data: Record<string, unknown>[];
  defaultRowCount?: number;
  expandable?: boolean;
  exportableExcel?: boolean;
  exportableCSV?: boolean;
  filters?: DataTableFilterMeta;
  globalFilterFields?: string[];
  hasFilterMatchModes?: boolean;
  hasPaginator?: boolean;
  hasReorderableColumns?: boolean;
  hasResizableColumn?: boolean;
  tableHeader: () => JSX.Element;
  id: string;
  isRemovableSort?: boolean;
  isScrollable?: boolean;
  multiSelect?: boolean;
  paginatorTemplate?: string;
  rowsPerPageOptions?: number[];
  selectionMode?: 'multiple' | 'checkbox' | null;
  stateStorageType?: 'local' | 'session';
  userStateKey?: string;
};