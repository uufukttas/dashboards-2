import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { FC, useRef, useState } from 'react';
import { IBaseTableProps } from './BaseTableInterface';

export const BaseTable: FC<IBaseTableProps> = (props) => {
  const { id, data, columns, onRowEditComplete, expandable = false, multiSelect = false } = props;

  const dt = useRef(null);
  const [selectedRows, setSelectedRows] = useState(null);
  const [expandedRows, setExpandedRows] = useState(null);
  const [editingRows, setEditingRows] = useState({});

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const rowExpansionTemplate = (data: Record<string, unknown>) => {
    return (
      <div className="p-3">
        <h5>Details for {data[columns[0].field]}</h5>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="w-full h-full">
      <DataTable
        ref={dt}
        value={data}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 20, 50]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        globalFilterFields={columns.map((t) => t.field)}
        resizableColumns
        columnResizeMode="expand"
        reorderableColumns
        scrollable
        selection={selectedRows}
        onSelectionChange={(e) => setSelectedRows(e.value)}
        selectionMode="multiple"
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
        stateKey={`table-${id}`}
        stateStorage="local"
        editingRows={editingRows}
        onRowEditChange={(e) => setEditingRows(e.data)}
        onRowEditComplete={onRowEditComplete}
      >
        {multiSelect && <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />}
        {expandable && <Column expander headerStyle={{ width: '3em' }} />}
        {columns.map((column) => (
          <Column
            key={column.id}
            field={column.accessor}
            header={column.Header}
            sortable
            filter
            filterMatchMode="contains"
            align={column.align || 'left'}
            style={column.style}
            className={column.className}
            body={column.bodyTemplate}
          />
        ))}
        <Column rowEditor headerStyle={{ width: '7rem' }} bodyStyle={{ textAlign: 'center' }} />
      </DataTable>
    </div>
  );
};
