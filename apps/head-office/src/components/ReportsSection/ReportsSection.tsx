import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
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
    const pagePrefix = `${BRAND_PREFIX}-reports-section`;
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
        'Fiyat Hesaplama Zamani',
        'Toplam Bedel',
        'Toplam Bedel (KDV Dahil)',
        'Elektrik Bedeli',
        'Hizmet Bedeli',
        'Hizmet Noktasi Komisyonu',
        'Reseller Komisyonu',
        'Kullanici ID',
        'Banka Siparis No',
        'Odenene Tutar',
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
        { id: 'trxId', label: 'TRX No', type: 'number', defaultValue: '', operatorId: 0, value: '', value2: '', isHidden: false },
        { id: 'StationID', label: 'Istasyon Ismi', type: 'text', defaultValue: '', operatorId: 0, value: '', value2: '', isHidden: false },
        { id: 'StationChargePointCode', label: 'Unit Code', type: 'text', defaultValue: '', operatorId: 0, value: '', value2: '', isHidden: false },
        { id: 'socket-type', label: 'Soket Tipi', type: 'dropdown', dropdownItems: [{ name: 'Secim Yapiniz', rid: 0, id: null }, { name: 'Type2', rid: 1, id: null }, { name: 'CCS/SAE', rid: 2, id: null }], operatorId: 0, value: '', value2: '', isHidden: false },
        { id: 'StartDate', label: 'Baslangic Zamani', type: 'date', defaultValue: '', operatorId: 0, value: '', value2: '', isHidden: false },
        { id: 'charge-time', label: 'Sarj Suresi', type: 'number', defaultValue: '', operatorId: 0, value: '', value2: '', isHidden: false },
        { id: 'FinishDate', label: 'Bitis Zamani', type: 'date', defaultValue: '', operatorId: 0, value: '', value2: '', isHidden: false },
        { id: 'UnitPrice', label: 'Birim Fiyat', type: 'number', defaultValue: '', operatorId: 0, value: '', value2: '', isHidden: false },
        { id: 'kwh', label: 'kWh', type: 'number', defaultValue: '', operatorId: 0, value: '', value2: '', isHidden: false },
        { id: 'BatteryPercent', label: 'Batarya Yuzdesi', type: 'number', defaultValue: '', operatorId: 0, value: '', value2: '', isHidden: false },
        { id: 'TotalAmountWithOutKDV', label: 'Toplam Bedel', type: 'number', defaultValue: '', operatorId: 0, value: '', value2: '', isHidden: false },
        { id: 'TotalAmount', label: 'Toplam Bedel (KDV Dahil)', type: 'number', defaultValue: '', operatorId: 0, value: '', value2: '', isHidden: false },
        { id: 'PriceENRJ', label: 'Elektrik Bedeli', type: 'number', defaultValue: '', operatorId: 0, value: '', value2: '', isHidden: false },
        { id: 'PriceSRV', label: 'Hizmet Bedeli', type: 'number', defaultValue: '', operatorId: 0, value: '', value2: '', isHidden: false },
        { id: 'CommissionServicePointPrice', label: 'Hizmet Noktasi Komisyonu', type: 'number', defaultValue: '', operatorId: 0, value: '', value2: '', isHidden: false },
        { id: 'CommissionResellerPrice', label: 'Reseller Komisyonu', type: 'number', defaultValue: '', operatorId: 0, value: '', value2: '', isHidden: false },
        { id: 'user-id', label: 'Kullanici ID', type: 'number', defaultValue: '', operatorId: 0, value: '', value2: '', isHidden: false },
        { id: 'bank-order-no', label: 'Banka Siparis No', type: 'number', defaultValue: '', operatorId: 0, value: '', value2: '', isHidden: false },
        { id: 'paid-amount', label: 'Odenene Tutar', type: 'number', defaultValue: '', operatorId: 0, value: '', value2: '', isHidden: false },
        { id: 'on-prov-amount', label: 'On Prov Tutari', type: 'number', defaultValue: '', operatorId: 0, value: '', value2: '', isHidden: false },
        { id: 'plate', label: 'Plaka', type: 'text', defaultValue: '', operatorId: 0, value: '', value2: '', isHidden: false },
        { id: 'brand', label: 'Marka', type: 'text', defaultValue: '', operatorId: 0, value: '', value2: '', isHidden: false },
        { id: 'ModelName', label: 'Model', type: 'text', defaultValue: '', operatorId: 0, value: '', value2: '', isHidden: false },
    ]);
    const [isExpanded, setIsExpanded] = useState<boolean>(true);

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
            filterAttributes: getFilterPayload(),
        }

        const response = await getAllReportsRequest(payload);

        console.log('response', response)
    };

    const getFilterPayload = () => {
        const filterAttributes = filters.map((filter, index) => {
            return {
                "property": filter.id,
                "operator": findOpeartor(filter.operatorId),
                "value": filter.value,
                "value2": filter.value2 || ''
            }
        });

        return filterAttributes;
    };

    const findOpeartor = (operatorId: number) => {
        switch (operatorId) {
            case 0:
                return "=";
            case 1:
                return ">";
            case 2:
                return "<";
            case 3:
                return "~{x}~";
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

    function downloadCSV(csv, filename) {
        let csvFile;
        let downloadLink;
    
        // CSV file
        csvFile = new Blob([csv], {type: "text/csv"});
    
        // Download link
        downloadLink = document.createElement("a");
    
        // File name
        downloadLink.download = filename + ".csv";  // Uzantıyı doğru şekilde ekledik
    
        // Create a link to the file
        downloadLink.href = window.URL.createObjectURL(csvFile);
    
        // Hide download link
        downloadLink.style.display = "none";
    
        // Add the link to DOM
        document.body.appendChild(downloadLink);
    
        // Click download link
        downloadLink.click();
    }
    
    function exportTableToCSV(filename) {
        let csv = [];
        let rows = document.querySelectorAll("table tr");
        
        for (let i = 0; i < rows.length; i++) {
            let row = [], cols = rows[i].querySelectorAll("td, th");
            
            for (let j = 0; j < cols.length; j++) 
                row.push('"' + cols[j].innerText + '"'); // Her hücreyi tırnak içine al
            
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
            <div className={`${pagePrefix}-listing-container flex items-center w-full`}>
                <DynamicFilters className={`h-full mx-2`} filters={filters} setFilters={setFilters} onFilterSubmit={handleFilterSubmit} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                <Button
                    buttonText='Export'
                    className='w-1/6 mx-2 bg-primary text-white rounded-lg p-2'
                    id={`${pagePrefix}-export-button`}
                    type='button'
                    onClick={getExportTableData}
                />
                <Table
                    attributeName="reports-management"
                    buttonText='Istasyon'
                    className={`w-5/6 mx-2`}
                    filteredDropdownItems={[]}
                    tableData={reportsData}
                    tableDataCount={reportsData.length}
                    tableHeadData={tableHeadData}
                    tablePlaceholderInitialValue={tablePlaceholderInitialValue}
                />
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
