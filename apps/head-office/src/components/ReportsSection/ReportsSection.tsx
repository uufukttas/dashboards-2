import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFilter } from 'react-icons/fa';
import { FaEquals, FaGreaterThan, FaLessThan } from 'react-icons/fa6';
import { TbTilde } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
// import { Button } from '@projects/button';
import { Tooltip } from '@projects/tooltip';
import ReportDetailsModal from './ReportDetailsModal';
import Filters from '../Filter/Filter';
import Loading from '../Loading/Loading';
import Modal from '../Modal/Modal';
import Pagination from '../ServicePointSection/PaginationComponents/Pagination';
import Table from '../Table/Table';
import { BRAND_PREFIX } from '../../constants/constants';
import { getAllReportsRequest } from '../../../app/api/reports';
import { setReportsData } from '../../../app/redux/features/getAllReports';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { RootState } from '../../../app/redux/store';
import { IFilterItemProps } from '../Filter/types';
import './ReportsSection.css';

import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';

import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Slider, SliderChangeEvent } from 'primereact/slider';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox, TriStateCheckboxChangeEvent } from 'primereact/tristatecheckbox';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

interface Representative {
    name: string;
    image: string;
}
interface Country {
    name: string;
    code: string;
}
interface Customer {
    id: number;
    name: string;
    country: Country;
    company: string;
    date: string;
    status: string;
    verified: boolean;
    activity: number;
    representative: Representative;
    balance: number;
}
const defaultFilters: DataTableFilterMeta = ({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    trxId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    batteryBeginningPercent: { value: null, matchMode: FilterMatchMode.EQUALS },
    batteryPercent: { value: null, matchMode: FilterMatchMode.EQUALS },
    chargingStatus: { value: null, matchMode: FilterMatchMode.EQUALS },
    companyID: { value: null, matchMode: FilterMatchMode.EQUALS },
    energyUsed: { value: null, matchMode: FilterMatchMode.EQUALS },
    startDate: { value: null, matchMode: FilterMatchMode.DATE_IS },
    finishDate: { value: null, matchMode: FilterMatchMode.DATE_IS },
    stationName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    totalAmount: { value: null, matchMode: FilterMatchMode.EQUALS }
});
const ReportsSection: React.FC = () => {
    const pagePrefix = `${BRAND_PREFIX}-reports-center-section`;
    const tableHeadData = [{
        field: 'trxId',
        header: 'TRX ID',
    }, {
        field: 'batteryBeginningPercent',
        header: 'Battery Beginning Percent',
    }, {
        field: 'batteryPercent',
        header: 'Battery Percent',
    }, {
        field: 'batteryPercentDesc',
        header: 'Battery Percent Desc',
    }, {
        field: 'chargeProcessElapsedTime',
        header: 'Charge Process Elapsed Time',
    }, {
        field: 'chargingStatus',
        header: 'Charging Status',
    }, {
        field: 'chargingStatusMessage',
        header: 'Charging Status Message',
    }, {
        field: 'commissionResellerPrice',
        header: 'Commission Reseller Price',
    }, {
        field: 'commissionServicePointPrice',
        header: 'Commission Service Point Price',
    }, {
        field: 'companyID',
        header: 'Company ID',
    }, {
        field: 'consumerCompanyID',
        header: 'Consumer Company ID',
    }, {
        field: 'energyUsed',
        header: 'Energy Used',
    }, {
        field: 'finishDate',
        header: 'Finish Date',
    }, {
        field: 'meterFinishDate',
        header: 'Meter Finish Date',
    }, {
        field: 'meterStartDate',
        header: 'Meter Start Date',
    }, {
        field: 'priceENRJ',
        header: 'Price ENRJ',
    }, {
        field: 'priceSRV',
        header: 'Price SRV',
    }, {
        field: 'resellerCompanyID',
        header: 'Reseller Company ID',
    }, {
        field: 'startDate',
        header: 'Start Date',
    }, {
        field: 'stationChargePointCode',
        header: 'Station Charge Point Code',
    }, {
        field: 'stationChargePointConnectorTypeName',
        header: 'Station Charge Point Connector Type Name',
    }, {
        field: 'stationConnectorConnectorNr',
        header: 'Station Connector Connector Nr',
    }, {
        field: 'stationConnectorID',
        header: 'Station Connector ID',
    }, {
        field: 'stationID',
        header: 'Station ID',
    }, {
        field: 'stationName',
        header: 'Station Name',
    }, {
        field: 'totalAmount',
        header: 'Total Amount',
    }, {
        field: 'totalAmountWithOutKDV',
        header: 'Total Amount With Out KDV',
    }, {
        field: 'unitPrice',
        header: 'Unit Price',
    }];

    const dispatch = useDispatch();
    const isModalVisible = useSelector((state: RootState) => state.isModalVisible.isModalVisible);
    const reportsData = useSelector((state: RootState) => state.getAllReports.reportsData);
    const reportsCount = useSelector((state: RootState) => state.getAllReports.reportsCount);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isFilterUsed, setIsFilterUsed] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

    const formatDate = (value: Date) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const clearFilter = () => {
        initFilters();
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

        // @ts-ignore
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const initFilters = () => {
        setFilters(defaultFilters);
        setGlobalFilterValue('');
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </IconField>
            </div>
        );
    };

    // @ts-expect-error
    const filterClearTemplate = (options) => {
        return <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} severity="secondary"></Button>;
    };

    // @ts-expect-error
    const filterApplyTemplate = (options) => {
        return <Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback} severity="success"></Button>;
    };

    const filterFooterTemplate = (filterName: string) => {
        return <div className="px-3 pt-0 pb-3 text-center">Filter by {filterName}</div>;
    };

    const dateBodyTemplate = (rowData: Customer) => {
        return formatDate(new Date(rowData.date));
    };

    const dateFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
    };

    const balanceBodyTemplate = (rowData: Customer) => {
        return formatCurrency(rowData.balance);
    };

    const balanceFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <InputNumber value={options.value} onChange={(e: InputNumberChangeEvent) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />;
    };

    const activityBodyTemplate = (rowData: Customer) => {
        return <ProgressBar value={rowData.activity} showValue={false} style={{ height: '6px' }}></ProgressBar>;
    };

    const activityFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return (
            <React.Fragment>
                <Slider value={options.value} onChange={(e: SliderChangeEvent) => options.filterCallback(e.value)} range className="m-3"></Slider>
                <div className="flex align-items-center justify-content-between px-2">
                    <span>{options.value ? options.value[0] : 0}</span>
                    <span>{options.value ? options.value[1] : 100}</span>
                </div>
            </React.Fragment>
        );
    };

    const verifiedBodyTemplate = (rowData: Customer) => {
        return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData.verified, 'text-red-500 pi-times-circle': !rowData.verified })}></i>;
    };

    const verifiedFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return (
            <div className="flex align-items-center gap-2">
                <label htmlFor="verified-filter" className="font-bold">
                    Verified
                </label>
                <TriStateCheckbox id="verified-filter" value={options.value} onChange={(e: TriStateCheckboxChangeEvent) => options.filterCallback(e.value)} />
            </div>
        );
    };

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
                pageNumber: currentPage,
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

    useEffect(() => {
        getAllChargeData();
        initFilters();
    }, []);

    useEffect(() => {
        setIsLoading(true);

        if (!isFilterUsed) {
            getAllChargeData();
        } else {
            // handleFilterSubmit();
        }
    }, [currentPage]);

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
                                            filters={filters}
                                            globalFilterFields={['trxId', 'stationName', 'companyID', 'resellerCompanyID', 'consumerCompanyID', 'stationChargePointCode', 'stationChargePointConnectorTypeName', 'stationConnectorConnectorNr', 'stationConnectorID', 'chargingStatus', 'chargingStatusMessage', 'energyUsed', 'priceENRJ', 'priceSRV', 'totalAmount', 'totalAmountWithOutKDV', 'unitPrice']}
                                            header={header}
                                            loading={isLoading}
                                            paginator
                                            paginatorLeft={paginatorLeft}
                                            paginatorRight={paginatorRight}
                                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                            removableSort
                                            rows={10}
                                            rowsPerPageOptions={[5, 10, 25, 50]}
                                            showGridlines
                                            sortMode='multiple'
                                            stripedRows
                                            value={reportsData}
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
        </div>
    );
};

export default ReportsSection;
