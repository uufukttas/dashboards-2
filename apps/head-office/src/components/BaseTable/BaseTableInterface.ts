export interface IBasetableColumn {
  id: string;
  Header: string;
  accessor: string;
  align?: 'left' | 'right' | 'center';
  style?: Record<string, unknown>;
  className?: string;
  bodyTemplate?: (rowData: Record<string, unknown>) => JSX.Element;
}
export interface IBaseTableProps {
  id: string;
  columns: Array<IBasetableColumn>;
  data: Array<Record<string, unknown>>;
  onRowEditComplete?: (e: any) => void;
  expandable?: boolean;
  multiSelect?: boolean;
}
