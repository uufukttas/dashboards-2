import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { FC, useEffect, useRef, useState } from 'react';
import { IBaseTableProps, IColumnProps } from './BaseTableInterface';

export const BaseTable: FC<IBaseTableProps> = (props) => {
  const {
    className,
    columns,
    columnResizeMode = 'expand',
    currentPageReportTemplate = '{first} {last} of {totalRecords}',
    data,
    defaultRowCount = 10,
    exportableCSV,
    exportableExcel,
    filters,
    globalFilterFields,
    hasFilterMatchModes = true,
    hasPaginator = true,
    hasReorderableColumns = true,
    hasResizableColumn = true,
    tableHeader,
    id,
    isRemovableSort = true,
    isScrollable = true,
    paginatorTemplate = 'RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
    rowsPerPageOptions = [10, 20, 50],
    selectionMode = 'multiple',
    stateStorageType = 'local',
    userStateKey = `table-${id}`,
  } = props;
  const dataTableRef = useRef<DataTable<Record<string,unknown>[]>>(null);
  const [editingRows, setEditingRows] = useState({});
  const [defultFilters, setDefaultFilters] = useState<DataTableFilterMeta | undefined>(filters);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState<[]>([]);

  const exportCSV = (selectionOnly: boolean): void => {
    dataTableRef && dataTableRef.current?.exportCSV({ selectionOnly });
  };
  const exportExcel = (): void => {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });

      saveAsExcelFile(excelBuffer, 'products');
    });
  };
  const filterApplyTemplate = (options: IColumnProps) => {
    return <Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback} severity="success"></Button>;
  };
  const filterClearTemplate = (options: IColumnProps) => {
    return (
      <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} severity="secondary"></Button>
    );
  };
  const filterFooterTemplate = () => {
    return <div className="px-3 pt-0 pb-3 text-center"></div>;
  };
  const saveAsExcelFile = (buffer: string, fileName: string): void => {
    import('file-saver').then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      }
    });
  };
  const setHeader = () => {
    return (
      <div className="haeder-wrapper flex justify-between items-center">
        {tableHeader()}
        {globalFilterFields && (
          <>
            <div className={`global-filter-input-container flex justify-content-end`}>
              <InputText
                className={`global-filter-input p-2.5 border border-gray-200 rounded-md`}
                placeholder="Ara..."
                value={globalFilterValue}
                onChange={onGlobalFilterChange}
              />
            </div>
          </>
        )}
        <div className={`table-export-buttons flex mx-2`}>
          {exportableCSV && (
            <div className="export-csv mx-2">
              <Button
                className={`export-button flex justify-center items-center bg-primary text-white rounded text-base font-semibold hover:bg-primary-lighter p-2`}
                icon="pi pi-file-excel"
                id={`export-button`}
                rounded
                severity="success"
                type="button"
                onClick={() => exportCSV(false)}
              />
            </div>
          )}
          {exportableExcel && (
            <div className="export-excel mx-2">
              <Button
                className={`export-button flex justify-center items-center bg-primary text-white rounded text-base font-semibold hover:bg-primary-lighter p-2`}
                icon="pi pi-file-excel"
                id={`export-button`}
                rounded
                severity="success"
                type="button"
                onClick={exportExcel}
              />
            </div>
          )}
        </div>
      </div>
    );
  };
  const onGlobalFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const _filters = { ...filters };

    // @ts-ignore
    _filters['global'].value = value;

    setDefaultFilters(_filters);
    setGlobalFilterValue(value);
  };

  useEffect(() => {
    const globalFilterValue = localStorage.getItem(userStateKey) || '';

    globalFilterValue && JSON.parse(globalFilterValue).filters.global.value &&
      setGlobalFilterValue(JSON.parse(globalFilterValue).filters.global.value);
  }, []);

  return (
    <div className="w-full h-full">
      <DataTable
        className={className}
        columnResizeMode={columnResizeMode}
        currentPageReportTemplate={currentPageReportTemplate}
        editingRows={editingRows}
        globalFilterFields={globalFilterFields}
        filters={defultFilters}
        header={setHeader()}
        id={id}
        paginator={hasPaginator}
        paginatorTemplate={paginatorTemplate}
        ref={dataTableRef}
        removableSort={isRemovableSort}
        reorderableColumns={hasReorderableColumns}
        resizableColumns={hasResizableColumn}
        rows={defaultRowCount}
        rowsPerPageOptions={rowsPerPageOptions}
        selection={selectedRows}
        selectionMode={selectionMode}
        scrollable={isScrollable}
        stateKey={userStateKey}
        stateStorage={stateStorageType}
        value={data}
        onRowEditChange={(e) => setEditingRows(e.data)}
        onRowEditComplete={(e) => setEditingRows(e.data)}
        onSelectionChange={(e) => setSelectedRows(e.data)}
      >
        {columns.map((column, index) => (
          <Column
            align={column.align || 'left'}
            body={column?.bodyTemplate}
            className={column.className}
            field={column.accessor}
            header={column.header}
            filter={column.id !== 'actions'}
            filterApply={filterApplyTemplate}
            filterClear={filterClearTemplate}
            filterFooter={filterFooterTemplate}
            filterPlaceholder={`${column.header} ara`}
            filterMatchMode="contains"
            key={index}
            showFilterMatchModes={hasFilterMatchModes}
            sortable={column.id !== 'actions'}
            style={column.style}
          />
        ))}
      </DataTable>
    </div>
  );
};
