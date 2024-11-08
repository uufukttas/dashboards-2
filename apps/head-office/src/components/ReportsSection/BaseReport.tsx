import React, { useState } from 'react';
import Loading from '../Loading/Loading';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { Column } from 'primereact/column';
import { BRAND_PREFIX } from '../../constants/constants';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Tooltip } from 'primereact/tooltip';
import { defaultFilters } from './constants';
import { AppDispatch } from '../../../app/redux/store';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { ITableHeadData } from './types';

interface IBaseReportProps {
  id: string;
  data: Array<Record<string, unknown>>;
  isLoading: boolean;
  pagePrefix: string;
  tableHeadData: Array<ITableHeadData>;
}

const BaseReport: React.FC<IBaseReportProps> = (props) => {
  const { id,data, isLoading, pagePrefix, tableHeadData } = props;
  const [visibleColumns, setVisibleColumns] = useState(tableHeadData);
  const dispatch = useDispatch<AppDispatch>();

  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);

  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;

  const onColumnToggle = (event: MultiSelectChangeEvent): void => {
    const selectedColumns = event.target.value;
    const orderedSelectedColumns = tableHeadData.filter(
      (col) =>
        selectedColumns.some(
          (sCol: { field: string; header: string; isRemovable: boolean }) => {
            return sCol.field === col.field;
          }
        ) || col.field === 'actions'
    );

    setVisibleColumns(orderedSelectedColumns);
  };

  const exportExcel = (): void => {
    // const worksheet = XLSX.utils.json_to_sheet(servicePointsData)
    // const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    // const excelBuffer = XLSX.write(workbook, {
    //   bookType: 'xlsx',
    //   type: 'array'
    // });
    // saveAsExcelFile(excelBuffer, 'service-points');
  };

  const saveAsExcelFile = (buffer: ArrayBuffer, fileName: string): void => {
    // import('file-saver').then((module) => {
    //     if (module && module.default) {
    //         const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    //         const EXCEL_EXTENSION = '.xlsx';
    //         const data = new Blob([buffer], {
    //             type: EXCEL_TYPE
    //         });
    //         module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    //     }
    // });
  };

  const filterClearTemplate = (options: {
    filterClearCallback: () => void;
  }) => {
    return (
      <Button
        type="button"
        icon="pi pi-times"
        onClick={options.filterClearCallback}
        severity="secondary"
      ></Button>
    );
  };

  const filterApplyTemplate = (options: {
    filterApplyCallback: () => void;
  }) => {
    return (
      <Button
        type="button"
        icon="pi pi-check"
        onClick={options.filterApplyCallback}
        severity="success"
      ></Button>
    );
  };

  const Header = () => {
    return (
      <div className="flex items-center justify-between w-full">
        <>
          <div
            className={`${BRAND_PREFIX}-data-table-header-container w-full flex justify-between items-center`}
          >
            <div
              className={`${BRAND_PREFIX}-data-table-select-container flex flex-wrap w-3/4`}
            >
              <MultiSelect
                value={visibleColumns}
                options={tableHeadData.filter((item) => item.isRemovable)}
                optionLabel="header"
                onChange={onColumnToggle}
                className="sm:w-20rem"
                display="chip"
              />
            </div>
            <div
              className={`${BRAND_PREFIX}-data-table-action-button-container flex justify-center items-center`}
            >
              <div
                className={`${BRAND_PREFIX}-data-table-export-button-container mx-4`}
              >
                <Button
                  className={`${BRAND_PREFIX}-data-table-export-button flex justify-center items-center bg-primary text-primary-font-color rounded text-base font-semibold hover:bg-primary-lighter p-2`}
                  data-pr-tooltip="XLS"
                  icon="pi pi-file-excel"
                  rounded
                  severity="success"
                  type="button"
                  onClick={exportExcel}
                />
                <Tooltip
                  className={`${BRAND_PREFIX}-data-table-export-button-tooltip text-base`}
                  content="Dışarı Aktar"
                  position="bottom"
                  target={`#${BRAND_PREFIX}-table-header-export-button`}
                  style={{ fontSize: '12px', padding: '4px' }}
                />
              </div>
            </div>
          </div>
        </>
      </div>
    );
  };

  const filterFooterTemplate = (filterName: string) => {
    return (
      <div className="px-3 pt-0 pb-3 text-center">Filter by {filterName}</div>
    );
  };

  return (
    <div className={`${pagePrefix}-listing-container flex w-full relative`}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div
            className={`${pagePrefix}-table-wrapper flex flex-col items-end relative w-full overflow-x-scroll`}
          >
            <DataTable
              currentPageReportTemplate="{first} to {last} of {totalRecords}"
              dataKey="id"
              emptyMessage="No data found."
              onFilter={(e) => setFilters(e.filters)}
              filterDisplay="menu"
              filters={filters}
              globalFilterFields={tableHeadData.map((t) => t.field)}
              header={Header}
              loading={isLoading}
              paginator
              paginatorLeft={paginatorLeft}
              paginatorRight={paginatorRight}
              paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
              removableSort
              reorderableColumns
              resizableColumns
              rows={10}
              stateKey={`table-report-${id}`}
              stateStorage='local'
              rowsPerPageOptions={[5, 10, 25, 50]}
              showGridlines
              sortMode="multiple"
              style={{
                width: '100%',
                height: '100%',
              }}
              stripedRows
              value={data}
              onRowClick={() => {
                dispatch(toggleModalVisibility(true));
              }}
            >
              {tableHeadData.map((td, index) => {
                return (
                  <Column
                    field={td.field}
                    filter
                    filterField={td.field}
                    filterApply={filterApplyTemplate}
                    filterClear={filterClearTemplate}
                    filterFooter={filterFooterTemplate(td.header)}
                    filterPlaceholder={`Search by ${td.header}`}
                    header={td.header}
                    key={index}
                    sortable
                    style={{ minWidth: '310px' }}
                  />
                );
              })}
            </DataTable>
          </div>
        </>
      )}
    </div>
  );
};

export default BaseReport;
