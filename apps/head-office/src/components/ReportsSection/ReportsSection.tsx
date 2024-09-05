import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import { BRAND_PREFIX } from '../../constants/constants';
import { getAllReportsRequest } from '../../../app/api/reports';
import { setReportsData } from '../../../app/redux/features/getAllReports';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { RootState } from '../../../app/redux/store';
import './ReportsSection.css';

import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';

import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Slider, SliderChangeEvent } from 'primereact/slider';
import { TriStateCheckbox, TriStateCheckboxChangeEvent } from 'primereact/tristatecheckbox';
import { Tooltip } from 'primereact/tooltip';
import Modal from '../Modal/Modal';
import ReportDetailsModal from './ReportDetailsModal';
// interface Representative {
//     name: string;
//     image: string;
// }
// interface Country {
//     name: string;
//     code: string;
// }
// interface Customer {
//     id: number;
//     name: string;
//     country: Country;
//     company: string;
//     date: string;
//     status: string;
//     verified: boolean;
//     activity: number;
//     representative: Representative;
//     balance: number;
// }
const defaultFilters: DataTableFilterMeta = ({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    trxId: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    batteryBeginningPercent: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    batteryPercent: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    batteryPercentDesc: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    chargeProcessElapsedTime: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    chargingStatus: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    chargingStatusMessage: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    commissionResellerPrice: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    commissionServicePointPrice: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    companyID: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    consumerCompanyID: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    energyUsed: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },    
    finishDate: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    meterFinishDate: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    meterStartDate: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    priceENRJ: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    priceSRV: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    resellerCompanyID: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    startDate: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    stationChargePointCode: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    stationChargePointConnectorTypeName: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    stationConnectorConnectorNr: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    stationConnectorID: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    stationID: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    stationName: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    totalAmount: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    totalAmountWithOutKDV: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    unitPrice: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
});
const ReportsSection: React.FC = () => {
    const pagePrefix = `${BRAND_PREFIX}-reports-center-section`;
    const tableHeadData = [{
        field: 'trxId',
        header: 'TRX ID',
        isRemovable: true,
    }, {
        field: 'batteryBeginningPercent',
        header: 'Battery Beginning Percent',
        isRemovable: true,
    }, {
        field: 'batteryPercent',
        header: 'Battery Percent',
        isRemovable: true,
    }, {
        field: 'batteryPercentDesc',
        header: 'Battery Percent Desc',
        isRemovable: true,
    }, {
        field: 'chargeProcessElapsedTime',
        header: 'Charge Process Elapsed Time',
        isRemovable: true,
    }, {
        field: 'chargingStatus',
        header: 'Charging Status',
        isRemovable: true,
    }, {
        field: 'chargingStatusMessage',
        header: 'Charging Status Message',
        isRemovable: true,
    }, {
        field: 'commissionResellerPrice',
        header: 'Commission Reseller Price',
        isRemovable: true,
    }, {
        field: 'commissionServicePointPrice',
        header: 'Commission Service Point Price',
        isRemovable: true,
    }, {
        field: 'companyID',
        header: 'Company ID',
        isRemovable: true,
    }, {
        field: 'consumerCompanyID',
        header: 'Consumer Company ID',
        isRemovable: true,
    }, {
        field: 'energyUsed',
        header: 'Energy Used',
        isRemovable: true,
    }, {
        field: 'finishDate',
        header: 'Finish Date',
        isRemovable: true,
    }, {
        field: 'meterFinishDate',
        header: 'Meter Finish Date',
        isRemovable: true,
    }, {
        field: 'meterStartDate',
        header: 'Meter Start Date',
        isRemovable: true,
    }, {
        field: 'priceENRJ',
        header: 'Price ENRJ',
        isRemovable: true,
    }, {
        field: 'priceSRV',
        header: 'Price SRV',
        isRemovable: true,
    }, {
        field: 'resellerCompanyID',
        header: 'Reseller Company ID',
        isRemovable: true,
    }, {
        field: 'startDate',
        header: 'Start Date',
        isRemovable: true,
    }, {
        field: 'stationChargePointCode',
        header: 'Station Charge Point Code',
        isRemovable: true,
    }, {
        field: 'stationChargePointConnectorTypeName',
        header: 'Station Charge Point Connector Type Name',
        isRemovable: true,
    }, {
        field: 'stationConnectorConnectorNr',
        header: 'Station Connector Connector Nr',
        isRemovable: true,
    }, {
        field: 'stationConnectorID',
        header: 'Station Connector ID',
        isRemovable: true,
    }, {
        field: 'stationID',
        header: 'Station ID',
        isRemovable: true,
    }, {
        field: 'stationName',
        header: 'Station Name',
        isRemovable: true,
    }, {
        field: 'totalAmount',
        header: 'Total Amount',
        isRemovable: true,
    }, {
        field: 'totalAmountWithOutKDV',
        header: 'Total Amount With Out KDV',
        isRemovable: true,
    }, {
        field: 'unitPrice',
        header: 'Unit Price',
        isRemovable: true,
    }];

    const dispatch = useDispatch();
    const reportsData = useSelector((state: RootState) => state.getAllReports.reportsData);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
    // const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [visibleColumns, setVisibleColumns] = useState(tableHeadData);
    const isModalVisible = useSelector((state: RootState) => state.isModalVisible.isModalVisible);

    // const formatDate = (value: Date) => {
    //     return value.toLocaleDateString('en-US', {
    //         day: '2-digit',
    //         month: '2-digit',
    //         year: 'numeric'
    //     });
    // };

    // const formatCurrency = (value: number) => {
    //     return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    // };

    // const clearFilter = () => {
    //     initFilters();
    // };

    // const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = e.target.value;
    //     let _filters = { ...filters };

    //     // @ts-ignore
    //     _filters['global'].value = value;

    //     setFilters(_filters);
    //     setGlobalFilterValue(value);
    // };

    const initFilters = () => {
        setFilters(defaultFilters);
        // setGlobalFilterValue('');
    };

    const onColumnToggle = (event: MultiSelectChangeEvent): void => {
        const selectedColumns = event.target.value;
        const orderedSelectedColumns = tableHeadData
            .filter((col) => selectedColumns
                .some((sCol: { field: string; header: string; isRemovable: boolean }) => {
                    return sCol.field === col.field
                }) || col.field === 'actions');

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

    // const saveAsExcelFile = (buffer: ArrayBuffer, fileName: string): void => {
    //     import('file-saver').then((module) => {
    //         if (module && module.default) {
    //             const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    //             const EXCEL_EXTENSION = '.xlsx';
    //             const data = new Blob([buffer], {
    //                 type: EXCEL_TYPE
    //             });

    //             module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    //         }
    //     });
    // };

    const renderHeader = () => {
        return (
            <>
                <div className={`${BRAND_PREFIX}-data-table-header-container w-full flex justify-between items-center`}>
                    <div className={`${BRAND_PREFIX}-data-table-select-container flex flex-wrap w-3/4`}>
                        <MultiSelect value={visibleColumns} options={tableHeadData.filter((item) => item.isRemovable)} optionLabel="header" onChange={onColumnToggle} className="w-full sm:w-20rem" display="chip" />
                    </div>
                    <div className={`${BRAND_PREFIX}-data-table-action-button-container flex justify-center items-center`}>
                        <div className={`${BRAND_PREFIX}-data-table-export-button-container mx-4`}>
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
                                content="Disari Aktar"
                                position="bottom"
                                target={`#${BRAND_PREFIX}-table-header-export-button`}
                                style={{ fontSize: '12px', padding: '4px' }}
                            />
                        </div>
                        <div className={`${BRAND_PREFIX}-data-table-add-button-container mx-4`}>
                            <Button
                                className={`${BRAND_PREFIX}-table-header-add-button flex justify-center items-center bg-primary text-primary-font-color rounded text-base font-semibold hover:bg-primary-lighter p-2`}
                                icon="pi pi-plus"
                                id={`${BRAND_PREFIX}-table-header-add-button`}
                                rounded
                                type="button"
                                onClick={() => dispatch(toggleModalVisibility(true))}
                            />
                            <Tooltip
                                className={`${BRAND_PREFIX}-data-table-add-button-tooltip text-base`}
                                content="Istasyon Ekle"
                                position="bottom"
                                target={`#${BRAND_PREFIX}-table-header-add-button`}
                                style={{ fontSize: '12px', padding: '4px' }}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const filterClearTemplate = (options: {filterClearCallback: () => void}) => {
        return <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} severity="secondary"></Button>;
    };

    const filterApplyTemplate = (options: {filterApplyCallback: () => void}) => {
        return <Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback} severity="success"></Button>;
    };

    const filterFooterTemplate = (filterName: string) => {
        return <div className="px-3 pt-0 pb-3 text-center">Filter by {filterName}</div>;
    };

    // const dateBodyTemplate = (rowData: Customer) => {
    //     return formatDate(new Date(rowData.date));
    // };

    // const dateFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    //     return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
    // };

    // const balanceBodyTemplate = (rowData: Customer) => {
    //     return formatCurrency(rowData.balance);
    // };

    // const balanceFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    //     return <InputNumber value={options.value} onChange={(e: InputNumberChangeEvent) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />;
    // };

    // const activityBodyTemplate = (rowData: Customer) => {
    //     return <ProgressBar value={rowData.activity} showValue={false} style={{ height: '6px' }}></ProgressBar>;
    // };

    // const activityFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    //     return (
    //         <React.Fragment>
    //             <Slider value={options.value} onChange={(e: SliderChangeEvent) => options.filterCallback(e.value)} range className="m-3"></Slider>
    //             <div className="flex align-items-center justify-content-between px-2">
    //                 <span>{options.value ? options.value[0] : 0}</span>
    //                 <span>{options.value ? options.value[1] : 100}</span>
    //             </div>
    //         </React.Fragment>
    //     );
    // };

    // const verifiedBodyTemplate = (rowData: Customer) => {
    //     return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData.verified, 'text-red-500 pi-times-circle': !rowData.verified })}></i>;
    // };

    // const verifiedFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    //     return (
    //         <div className="flex align-items-center gap-2">
    //             <label htmlFor="verified-filter" className="font-bold">
    //                 Verified
    //             </label>
    //             <TriStateCheckbox id="verified-filter" value={options.value} onChange={(e: TriStateCheckboxChangeEvent) => options.filterCallback(e.value)} />
    //         </div>
    //     );
    // };

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    const header = renderHeader();

    // const fetchReports = async () => {
    //     const response = await getAllReportsRequest({
    //         pageNumber: currentPage,
    //         userCount: 10000000,
    //     });
    //     console.log('response', response)
    //     return response;
    // };

    // const { data, error, mutate } = useSWR(
    //     `${currentPage}`, // key of useSWR hook to cache the data
    //     fetchReports, // fetcher function
    //     {
    //         dedupingInterval: 180000, // 3 dakika boyunca tekrar request yapmaz 3 * 60 * 1000ms
    //     }
    // );
    // const exportDataButton = (): React.ReactNode => {
    //     return (
    //         <Button
    //             buttonText='Disari Aktar'
    //             className='mx-2 bg-primary text-white rounded-lg p-2'
    //             id={`${pagePrefix}-export-button`}
    //             type='button'
    //             onClick={downloadExcel}
    //         />
    //     );
    // };
    const getAllChargeData = async (): Promise<void> => {
        const response = await getAllReportsRequest(
            {
                pageNumber: 1,
                userCount: 100,
            }
        );

        dispatch(
            setReportsData({
                data: response.data,
                count: response.count,
            })
        );
        setIsLoading(false);
    };
    const handleCloseModal = (): void => {
        dispatch(toggleModalVisibility(false));
    };

    useEffect(() => {
        getAllChargeData();
        initFilters();
    }, []);

    return (
        <div className={`${BRAND_PREFIX}-reports-center-container flex justify-between items-center flex-col`}>
            <div className={`${pagePrefix}-listing-container flex w-full`}>
                {
                    isLoading ?
                        (
                            <Loading />
                        ) : (
                            <>
                                <div className={`${pagePrefix}-table-wrapper flex flex-col items-end relative w-full`}>
                                    <div className={`${pagePrefix}-table-container w-full h-full relative`}>
                                        <DataTable
                                            currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                            dataKey="id"
                                            emptyMessage="No customers found." onFilter={(e) => setFilters(e.filters)}
                                            filterDisplay="menu"
                                            filters={filters}
                                            globalFilterFields={['trxId', 'stationName', 'companyID', 'resellerCompanyID', 'consumerCompanyID', 'stationChargePointCode', 'stationChargePointConnectorTypeName', 'stationConnectorConnectorNr', 'stationConnectorID', 'chargingStatus', 'chargingStatusMessage', 'energyUsed', 'priceENRJ', 'priceSRV', 'totalAmount', 'totalAmountWithOutKDV', 'unitPrice']}
                                            header={header}
                                            loading={isLoading}
                                            paginator
                                            paginatorLeft={paginatorLeft}
                                            paginatorRight={paginatorRight}
                                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                            removableSort
                                            reorderableColumns
                                            resizableColumns
                                            rows={10}
                                            rowsPerPageOptions={[5, 10, 25, 50]}
                                            showGridlines
                                            sortMode='multiple'
                                            stripedRows
                                            value={reportsData}
                                            onRowClick={(event) => {
                                                dispatch(toggleModalVisibility(true))
                                            }}
                                        >
                                            {
                                                tableHeadData.map((td, index) => {
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
                                                    )
                                                })
                                            }
                                        </DataTable>
                                    </div>
                                </div>
                            </>
                        )
                }
            </div>
            {
                isModalVisible && (
                    <Modal
                        className={`${pagePrefix}-modal-container`}
                        modalHeaderTitle={`Rapor Detay`}
                        modalId={`${pagePrefix}-modal`}
                        onClose={handleCloseModal}
                    >
                        <ReportDetailsModal />
                    </Modal>
                )
            }
        </div>
    );
};

export default ReportsSection;
