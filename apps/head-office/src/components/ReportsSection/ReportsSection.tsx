import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFilter } from 'react-icons/fa';
import { FaEquals, FaGreaterThan, FaLessThan } from 'react-icons/fa6';
import { TbTilde } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { Tooltip } from '@projects/tooltip';
import { tablePlaceholderInitialValue } from './constant';
import DynamicFilters from '../Filter/Filter';
import Pagination from '../ServicePointSection/PaginationComponents/Pagination';
import Table from '../Table/Table';
import { BRAND_PREFIX } from '../../constants/constants';
import { getAllReportsRequest } from '../../../app/api/reports';
import { setReportsData } from '../../../app/redux/features/getAllReports';
import { RootState } from '../../../app/redux/store';
import { IFilterItemProps } from '../Filter/types';
import './ReportsSection.css';

const ReportsSection: React.FC = () => {
    const pagePrefix = `${BRAND_PREFIX}-reports-center-section`;
    const tableHeadData = [
        'TRX No',
        'Istasyon',
        'UnitCode',
        'Soket No',
        'Soket Tipi',
        'Baslangic Zamani',
        'Sarj Suresi',
        'Bitis Zamani',
        'Birim Fiyat',
        'kWh',
        'Batarya Yuzdesi',
        'Toplam Bedel',
        'Toplam Bedel (KDV Dahil)',
        'Hizmet Bedeli',
        'Hizmet Noktasi Komisyonu',
        'Reseller Komisyonu',
        'Kullanici ID',
        'Banka Siparis No',
        'Odenen Tutar',
        'On Prov Tutari',
        'Plaka',
        'Marka',
        'Model',
    ];
    const dispatch = useDispatch();
    const reportsData = useSelector((state: RootState) => state.getAllReports.reportsData);
    const reportsCount = useSelector((state: RootState) => state.getAllReports.reportsCount);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filters, setFilters] = useState<IFilterItemProps[]>([
        {
            id: 'RID', label: 'TRX No', type: 'number', defaultValue: '', operatorId: '0', value: '', isHidden: false, isDoubleValue: false, operators: [{
                title: (
                    <Tooltip text="Eşittir" textClassName={'left-10'} >
                        <FaEquals />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text="Buyuktur" textClassName={'left-10'}>
                        <FaGreaterThan />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text='Kucuktur' textClassName={'left-10'}>
                        <FaLessThan />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'stationName', label: 'Istasyon Ismi', type: 'text', defaultValue: '', operatorId: '0', value: '', value2: '', isHidden: false, isDoubleValue: false, operators: [{
                title: (
                    <Tooltip text="Eşittir" textClassName={'left-10'} >
                        <FaEquals />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text="Icinde" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'stationChargePointCode', label: 'Unit Code', type: 'text', defaultValue: '', operatorId: '0', value: '', value2: '', isHidden: false, isDoubleValue: false, operators: [{
                title: (<Tooltip text="Eşittir" textClassName={'left-10'} >
                    <FaEquals />
                </Tooltip>)
            }, {
                title: (
                    <Tooltip text="Icinde" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        { id: 'stationChargePointConnectorTypeName', label: 'Soket Tipi', type: 'checkboxInDropdown', isDoubleValue: false, dropdownItems: [{ name: 'Secim Yapiniz', rid: 0, id: null, stationFeatureType: 0, stationFeatureValue: 0, isChecked: false }, { name: 'Type2', rid: 1, id: null, stationFeatureType: 0, stationFeatureValue: 0, isChecked: false }, { name: 'CCS/SAE', rid: 2, id: null, stationFeatureType: 0, stationFeatureValue: 0, isChecked: false }], operatorId: '0', value: '', value2: '', isHidden: false, operators: [] },
        { id: 'StartDate', label: 'Baslangic Zamani', type: 'date', defaultValue: '', isDoubleValue: true, operatorId: '0', value: '', value2: '', isHidden: false, operators: [] },
        {
            id: 'charge-time', label: 'Sarj Suresi', type: 'number', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: true, isHidden: false, operators: [{
                title: (<Tooltip text="Eşittir" textClassName={'left-10'} >
                    <FaEquals />
                </Tooltip>)
            }, {
                title: (
                    <Tooltip text="Buyuktur" textClassName={'left-10'}>
                        <FaGreaterThan />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text='Kucuktur' textClassName={'left-10'}>
                        <FaLessThan />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text="Arasinda" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        { id: 'FinishDate', label: 'Bitis Zamani', type: 'date', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: true, isHidden: false, operators: [] },
        {
            id: 'UnitPrice', label: 'Birim Fiyat', type: 'number', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: true, isHidden: false, operators: [{
                title: (<Tooltip text="Eşittir" textClassName={'left-10'} >
                    <FaEquals />
                </Tooltip>)
            }, {
                title: (
                    <Tooltip text="Buyuktur" textClassName={'left-10'}>
                        <FaGreaterThan />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text='Kucuktur' textClassName={'left-10'}>
                        <FaLessThan />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text="Arasinda" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'kwh', label: 'kWh', type: 'number', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: true, isHidden: false, operators: [{
                title: (<Tooltip text="Eşittir" textClassName={'left-10'} >
                    <FaEquals />
                </Tooltip>)
            }, {
                title: (
                    <Tooltip text="Buyuktur" textClassName={'left-10'}>
                        <FaGreaterThan />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text='Kucuktur' textClassName={'left-10'}>
                        <FaLessThan />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text="Arasinda" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'BatteryPercent', label: 'Batarya Yuzdesi', type: 'number', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: true, isHidden: false, operators: [{
                title: (<Tooltip text="Eşittir" textClassName={'left-10'} >
                    <FaEquals />
                </Tooltip>)
            }, {
                title: (
                    <Tooltip text="Buyuktur" textClassName={'left-10'}>
                        <FaGreaterThan />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text='Kucuktur' textClassName={'left-10'}>
                        <FaLessThan />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text="Arasinda" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'TotalAmountWithOutKDV', label: 'Toplam Bedel', type: 'number', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: true, isHidden: false, operators: [{
                title: (<Tooltip text="Eşittir" textClassName={'left-10'} >
                    <FaEquals />
                </Tooltip>)
            }, {
                title: (
                    <Tooltip text="Buyuktur" textClassName={'left-10'}>
                        <FaGreaterThan />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text='Kucuktur' textClassName={'left-10'}>
                        <FaLessThan />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text="Arasinda" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'TotalAmount', label: 'Toplam Bedel (KDV Dahil)', type: 'number', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: true, isHidden: false, operators: [{
                title: (<Tooltip text="Eşittir" textClassName={'left-10'} >
                    <FaEquals />
                </Tooltip>)
            }, {
                title: (
                    <Tooltip text="Buyuktur" textClassName={'left-10'}>
                        <FaGreaterThan />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text='Kucuktur' textClassName={'left-10'}>
                        <FaLessThan />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text="Arasinda" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'PriceENRJ', label: 'Elektrik Bedeli', type: 'number', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: true, isHidden: false, operators: [{
                title: (<Tooltip text="Eşittir" textClassName={'left-10'} >
                    <FaEquals />
                </Tooltip>)
            }, {
                title: (
                    <Tooltip text="Buyuktur" textClassName={'left-10'}>
                        <FaGreaterThan />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text='Kucuktur' textClassName={'left-10'}>
                        <FaLessThan />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text="Arasinda" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'PriceSRV', label: 'Hizmet Bedeli', type: 'number', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: true, isHidden: false, operators: [{
                title: (<Tooltip text="Eşittir" textClassName={'left-10'} >
                    <FaEquals />
                </Tooltip>)
            }, {
                title: (
                    <Tooltip text="Buyuktur" textClassName={'left-10'}>
                        <FaGreaterThan />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text='Kucuktur' textClassName={'left-10'}>
                        <FaLessThan />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text="Arasinda" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'CommissionServicePointPrice', label: 'Hizmet Noktasi Komisyonu', type: 'number', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: true, isHidden: false, operators: [{
                title: (<Tooltip text="Eşittir" textClassName={'left-10'} >
                    <FaEquals />
                </Tooltip>)
            }, {
                title: (
                    <Tooltip text="Buyuktur" textClassName={'left-10'}>
                        <FaGreaterThan />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text='Kucuktur' textClassName={'left-10'}>
                        <FaLessThan />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text="Arasinda" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'CommissionResellerPrice', label: 'Reseller Komisyonu', type: 'number', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: true, isHidden: false, operators: [{
                title: (<Tooltip text="Eşittir" textClassName={'left-10'} >
                    <FaEquals />
                </Tooltip>)
            }, {
                title: (
                    <Tooltip text="Buyuktur" textClassName={'left-10'}>
                        <FaGreaterThan />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text='Kucuktur' textClassName={'left-10'}>
                        <FaLessThan />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text="Arasinda" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'user-id', label: 'Kullanici ID', type: 'number', defaultValue: '', operatorId: '0', value: '', value2: '', isHidden: false, isDoubleValue: false, operators: [{
                title: (<Tooltip text="Eşittir" textClassName={'left-10'} >
                    <FaEquals />
                </Tooltip>)
            }, {
                title: (
                    <Tooltip text="Icinde" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'bank-order-no', label: 'Banka Siparis No', type: 'number', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: false, isHidden: false, operators: [{
                title: (<Tooltip text="Eşittir" textClassName={'left-10'} >
                    <FaEquals />
                </Tooltip>)
            }, {
                title: (
                    <Tooltip text="Icinde" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'paid-amount', label: 'Odenen Tutar', type: 'number', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: true, isHidden: false, operators: [{
                title: (<Tooltip text="Eşittir" textClassName={'left-10'} >
                    <FaEquals />
                </Tooltip>)
            }, {
                title: (
                    <Tooltip text="Buyuktur" textClassName={'left-10'}>
                        <FaGreaterThan />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text='Kucuktur' textClassName={'left-10'}>
                        <FaLessThan />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text="Arasinda" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'on-prov-amount', label: 'On Prov Tutari', type: 'number', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: true, isHidden: false, operators: [{
                title: (<Tooltip text="Eşittir" textClassName={'left-10'} >
                    <FaEquals />
                </Tooltip>)
            }, {
                title: (
                    <Tooltip text="Buyuktur" textClassName={'left-10'}>
                        <FaGreaterThan />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text='Kucuktur' textClassName={'left-10'}>
                        <FaLessThan />
                    </Tooltip>
                )
            }, {
                title: (
                    <Tooltip text="Arasinda" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'plate', label: 'Plaka', type: 'text', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: false, isHidden: false, operators: [{
                title: (<Tooltip text="Eşittir" textClassName={'left-10'} >
                    <FaEquals />
                </Tooltip>)
            }, {
                title: (
                    <Tooltip text="Icinde" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'brand', label: 'Marka', type: 'text', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: false, isHidden: false, operators: [{
                title: (<Tooltip text="Eşittir" textClassName={'left-10'} >
                    <FaEquals />
                </Tooltip>)
            }, {
                title: (
                    <Tooltip text="Icinde" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'ModelName', label: 'Model', type: 'text', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: false, isHidden: false, operators: [{
                title: (<Tooltip text="Eşittir" textClassName={'left-10'} >
                    <FaEquals />
                </Tooltip>)
            }, {
                title: (
                    <Tooltip text="Icinde" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
    ]);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const getAllChargeData = async (): Promise<void> => {
        const response = await getAllReportsRequest(
            {
                pageNumber: currentPage,
                userCount: 10,
            }
        );

        dispatch(
            setReportsData({
                data: response.data,
                count: response.count,
            })
        );
    };

    const handleFilterSubmit = async (): Promise<void> => {
        const payload = {
            userId: 33,
            pageNumber: currentPage,
            userCount: 10,
            filterAttributes: getFilterPayload().length > 0 ? getFilterPayload() : [],
        }

        const response = await getAllReportsRequest(payload);

        dispatch(
            setReportsData({
                data: response.data,
                count: response.count,
            })
        );
    };

    const getFilterPayload = () => {
        const filterAttributes = filters.map((filter, index) => {
            // Check if `filter.value` is a string and not an empty string
            if ((typeof filter.value === 'string' || typeof filter.value === 'number') && filter.value.trim() !== '') {
                return {
                    "property": filter.id,
                    "operator": findOperator(filter.operatorId),
                    "value": filter.value,
                    "value2": filter.value2 || ''
                };
            }
        });

        // Filter out undefined values from the array
        return filterAttributes.filter(attribute => attribute !== undefined);
    };

    const findOperator = (operatorId: string) => {
        switch (operatorId) {
            case 'Esittir':
                return "=";
            case 'Buyuktur':
                return ">";
            case 'Kucuktur':
                return "<";
            case 'Icinde':
                return "~|x|~";
            default:
                return "~{x}~";
        }
    };

    const getExportTableData = async (): Promise<void> => {
        const response = await axios
            .post(
                'https://sharztestapi.azurewebsites.net/Report/ExcelExport',

                {
                    "property": "StationId",
                    "operator": "{x}",
                    "value": "38000",
                    "value2": "43637"
                },
                { headers: { 'Content-Type': 'application/json' } }
            );

        exportTableToCSV(response.data);
        console.log('response', response)
    };

    function downloadCSV(csv: string, filename: string): void {
        // CSV file
        const csvFile = new Blob([csv], { type: "text/csv" });

        // Download link
        const downloadLink = document.createElement("a");

        // File name
        downloadLink.download = "reports.csv";  // Uzantıyı doğru şekilde ekledik

        // Create a link to the file
        downloadLink.href = window.URL.createObjectURL(csvFile);

        // Hide download link
        downloadLink.style.display = "none";

        // Add the link to DOM
        document.body.appendChild(downloadLink);

        // Click download link
        downloadLink.click();
    }

    function exportTableToCSV(filename: string) {
        const csv = [];
        const rows = document.querySelectorAll("table tr");

        for (let i = 0; i < rows.length; i++) {
            const row = [], cols = rows[i].querySelectorAll("td, th");

            for (let j = 0; j < cols.length; j++)
                row.push('"' + cols[j].textContent + '"'); // Her hücreyi tırnak içine al

            csv.push(row.join(";")); // Noktalı virgülle ayır
        }

        downloadCSV(csv.join("\r\n"), filename); // Windows uyumlu satır sonları
    }

    useEffect(() => {
        getAllChargeData();
    }, []);

    useEffect(() => {
        getAllChargeData();
    }, [currentPage]);

    return (
        <div className={`${BRAND_PREFIX}-reports-center-container flex justify-between items-center flex-col`}>
            <div className={`${pagePrefix}-listing-container flex w-full`}>
                <DynamicFilters className={`${pagePrefix} h-full mx-2`} filters={filters} setFilters={setFilters} onFilterSubmit={handleFilterSubmit} isExpanded={isExpanded} />
                <div className={`${pagePrefix}-table-container flex flex-col items-end relative ${isExpanded ? 'w-5/6' : 'w-full'}`}>
                    <Tooltip
                        containerClassName={`${pagePrefix}-tooltip -left-4 inset-y-1/2 shadow-custom border rounded-md text-center bg-secondary h-8 w-8 text-white flex justify-center items-center z-10 !absolute`}
                        text="Filtrele"
                        textClassName='left-8'
                    >
                        <Button
                            className={`${pagePrefix}-filter-toggle-button flex justify-center items-center h-8 w-8`}
                            id='filter-button'
                            type='button'
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            <FaFilter />
                        </Button>
                    </Tooltip>
                    <div className='table-container w-full relative'>
                        <Button
                            buttonText='Disari Aktar'
                            className='w-1/6 mx-2 bg-primary text-white rounded-lg p-2'
                            id={`${pagePrefix}-export-button`}
                            type='button'
                            onClick={getExportTableData}
                        />
                        <Table
                            attributeName="reports-management"
                            buttonText='Istasyon'
                            className={`w-full`}
                            filteredDropdownItems={[]}
                            tableData={reportsData}
                            tableDataCount={reportsCount}
                            tableHeadData={tableHeadData}
                            tablePlaceholderInitialValue={tablePlaceholderInitialValue}
                        />
                    </div>
                </div>
            </div>
            {/* {
                isModalVisible && (
                    <Modal
                        className={`${pagePrefix}-modal-container`}
                        modalHeaderTitle={`Istasyon ${servicePointData.id > 0 ? 'Güncelle' : 'Ekle'}`}
                        modalId={`${pagePrefix}-modal`}
                        onClose={handleCloseModal}
                    >
                        <ServicePointModalForm />
                    </Modal>
                )
            }
            {
                alertInformation.isVisible && (
                    <Alert
                        alertText={alertInformation.message}
                        alertType={alertInformation.type}
                        id={`${pagePrefix}-alert`}
                    />
                )
            }
            {
                dialogInformation.isVisible && (
                    <Dialog
                        handleCancel={() => dispatch(hideDialog())}
                        handleSuccess={() => {
                            deleteServicePoint(dialogInformation.data);
                            dispatch(hideDialog());
                            dispatch(toggleServicePointDataUpdated(true));
                        }}
                    />
                )
            } */}
            {
                reportsCount > 10 && (
                    <Pagination
                        currentPage={currentPage}
                        totalCounts={reportsCount}
                        setCurrentPage={setCurrentPage}
                    />
                )
            }
        </div>
    );
};

export default ReportsSection;
