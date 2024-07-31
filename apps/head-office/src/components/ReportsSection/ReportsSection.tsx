import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFilter } from 'react-icons/fa';
import { FaEquals, FaGreaterThan, FaLessThan } from 'react-icons/fa6';
import { TbTilde } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { Tooltip } from '@projects/tooltip';
import { tablePlaceholderInitialValue } from './constant';
import Filters from '../Filter/Filter';
import Loading from '../Loading/Loading';
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
                id: 0,
                title: (
                    <Tooltip text="Eşittir" textClassName={'left-10'} >
                        <FaEquals />
                    </Tooltip>
                )
            }, {
                id: 1,
                title: (
                    <Tooltip text="Buyuktur" textClassName={'left-10'}>
                        <FaGreaterThan />
                    </Tooltip>
                )
            }, {
                id: 2,
                title: (
                    <Tooltip text='Kucuktur' textClassName={'left-10'}>
                        <FaLessThan />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'stationName', label: 'Istasyon Ismi', type: 'text', defaultValue: '', operatorId: '0', value: '', value2: '', isHidden: false, isDoubleValue: false, operators: [{
                id: 0,
                title: (
                    <Tooltip text="Eşittir" textClassName={'left-10'} >
                        <FaEquals />
                    </Tooltip>
                )
            }, {
                id: 3,
                title: (
                    <Tooltip text="Icinde" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'stationChargePointCode', label: 'Unit Code', type: 'text', defaultValue: '', operatorId: '0', value: '', value2: '', isHidden: false, isDoubleValue: false, operators: [{
                id: 0,
                title: (
                    <Tooltip text="Eşittir" textClassName={'left-10'} >
                        <FaEquals />
                    </Tooltip>
                )
            }, {
                id: 3,
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
                id: 0,
                title: (
                    <Tooltip text="Eşittir" textClassName={'left-10'} >
                        <FaEquals />
                    </Tooltip>
                )
            }, {
                id: 1,
                title: (
                    <Tooltip text="Buyuktur" textClassName={'left-10'}>
                        <FaGreaterThan />
                    </Tooltip>
                )
            }, {
                id: 2,
                title: (
                    <Tooltip text='Kucuktur' textClassName={'left-10'}>
                        <FaLessThan />
                    </Tooltip>
                )
            }, {
                id: 4,
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
                id: 0,
                title: (
                    <Tooltip text="Eşittir" textClassName={'left-10'} >
                        <FaEquals />
                    </Tooltip>
                )
            }, {
                id: 1,
                title: (
                    <Tooltip text="Buyuktur" textClassName={'left-10'}>
                        <FaGreaterThan />
                    </Tooltip>
                )
            }, {
                id: 2,
                title: (
                    <Tooltip text='Kucuktur' textClassName={'left-10'}>
                        <FaLessThan />
                    </Tooltip>
                )
            }, {
                id: 4,
                title: (
                    <Tooltip text="Arasinda" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'kwh', label: 'kWh', type: 'number', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: true, isHidden: false, operators: [{
                id: 0,
                title: (
                    <Tooltip text="Eşittir" textClassName={'left-10'} >
                        <FaEquals />
                    </Tooltip>
                )
            }, {
                id: 1,
                title: (
                    <Tooltip text="Buyuktur" textClassName={'left-10'}>
                        <FaGreaterThan />
                    </Tooltip>
                )
            }, {
                id: 2,
                title: (
                    <Tooltip text='Kucuktur' textClassName={'left-10'}>
                        <FaLessThan />
                    </Tooltip>
                )
            }, {
                id: 4,
                title: (
                    <Tooltip text="Arasinda" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'BatteryPercent', label: 'Batarya Yuzdesi', type: 'number', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: true, isHidden: false, operators: [{
                id: 0,
                title: (
                    <Tooltip text="Eşittir" textClassName={'left-10'} >
                        <FaEquals />
                    </Tooltip>
                )
            }, {
                id: 1,
                title: (
                    <Tooltip text="Buyuktur" textClassName={'left-10'}>
                        <FaGreaterThan />
                    </Tooltip>
                )
            }, {
                id: 2,
                title: (
                    <Tooltip text='Kucuktur' textClassName={'left-10'}>
                        <FaLessThan />
                    </Tooltip>
                )
            }, {
                id: 4,
                title: (
                    <Tooltip text="Arasinda" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'TotalAmountWithOutKDV', label: 'Toplam Bedel', type: 'number', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: true, isHidden: false, operators: [{
                id: 0,
                title: (
                    <Tooltip text="Eşittir" textClassName={'left-10'} >
                        <FaEquals />
                    </Tooltip>
                )
            }, {
                id: 1,
                title: (
                    <Tooltip text="Buyuktur" textClassName={'left-10'}>
                        <FaGreaterThan />
                    </Tooltip>
                )
            }, {
                id: 2,
                title: (
                    <Tooltip text='Kucuktur' textClassName={'left-10'}>
                        <FaLessThan />
                    </Tooltip>
                )
            }, {
                id: 4,
                title: (
                    <Tooltip text="Arasinda" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'TotalAmount', label: 'Toplam Bedel (KDV Dahil)', type: 'number', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: true, isHidden: false, operators: [{
                id: 0,
                title: (
                    <Tooltip text="Eşittir" textClassName={'left-10'} >
                        <FaEquals />
                    </Tooltip>
                )
            }, {
                id: 1,
                title: (
                    <Tooltip text="Buyuktur" textClassName={'left-10'}>
                        <FaGreaterThan />
                    </Tooltip>
                )
            }, {
                id: 2,
                title: (
                    <Tooltip text='Kucuktur' textClassName={'left-10'}>
                        <FaLessThan />
                    </Tooltip>
                )
            }, {
                id: 4,
                title: (
                    <Tooltip text="Arasinda" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'PriceENRJ', label: 'Elektrik Bedeli', type: 'number', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: true, isHidden: false, operators: [{
                id: 0,
                title: (
                    <Tooltip text="Eşittir" textClassName={'left-10'} >
                        <FaEquals />
                    </Tooltip>
                )
            }, {
                id: 1,
                title: (
                    <Tooltip text="Buyuktur" textClassName={'left-10'}>
                        <FaGreaterThan />
                    </Tooltip>
                )
            }, {
                id: 2,
                title: (
                    <Tooltip text='Kucuktur' textClassName={'left-10'}>
                        <FaLessThan />
                    </Tooltip>
                )
            }, {
                id: 4,
                title: (
                    <Tooltip text="Arasinda" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'PriceSRV', label: 'Hizmet Bedeli', type: 'number', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: true, isHidden: false, operators: [{
                id: 0,
                title: (
                    <Tooltip text="Eşittir" textClassName={'left-10'} >
                        <FaEquals />
                    </Tooltip>
                )
            }, {
                id: 1,
                title: (
                    <Tooltip text="Buyuktur" textClassName={'left-10'}>
                        <FaGreaterThan />
                    </Tooltip>
                )
            }, {
                id: 2,
                title: (
                    <Tooltip text='Kucuktur' textClassName={'left-10'}>
                        <FaLessThan />
                    </Tooltip>
                )
            }, {
                id: 4,
                title: (
                    <Tooltip text="Arasinda" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'CommissionServicePointPrice', label: 'Hizmet Noktasi Komisyonu', type: 'number', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: true, isHidden: false, operators: [{
                id: 0,
                title: (
                    <Tooltip text="Eşittir" textClassName={'left-10'} >
                        <FaEquals />
                    </Tooltip>
                )
            }, {
                id: 1,
                title: (
                    <Tooltip text="Buyuktur" textClassName={'left-10'}>
                        <FaGreaterThan />
                    </Tooltip>
                )
            }, {
                id: 2,
                title: (
                    <Tooltip text='Kucuktur' textClassName={'left-10'}>
                        <FaLessThan />
                    </Tooltip>
                )
            }, {
                id: 4,
                title: (
                    <Tooltip text="Arasinda" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'CommissionResellerPrice', label: 'Reseller Komisyonu', type: 'number', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: true, isHidden: false, operators: [{
                id: 0,
                title: (
                    <Tooltip text="Eşittir" textClassName={'left-10'} >
                        <FaEquals />
                    </Tooltip>
                )
            }, {
                id: 1,
                title: (
                    <Tooltip text="Buyuktur" textClassName={'left-10'}>
                        <FaGreaterThan />
                    </Tooltip>
                )
            }, {
                id: 2,
                title: (
                    <Tooltip text='Kucuktur' textClassName={'left-10'}>
                        <FaLessThan />
                    </Tooltip>
                )
            }, {
                id: 4,
                title: (
                    <Tooltip text="Arasinda" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'user-id', label: 'Kullanici ID', type: 'number', defaultValue: '', operatorId: '0', value: '', value2: '', isHidden: false, isDoubleValue: false, operators: [{
                id: 0,
                title: (
                    <Tooltip text="Eşittir" textClassName={'left-10'} >
                        <FaEquals />
                    </Tooltip>
                )
            }, {
                id: 3,
                title: (
                    <Tooltip text="Icinde" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'bank-order-no', label: 'Banka Siparis No', type: 'number', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: false, isHidden: false, operators: [{
                id: 0,
                title: (
                    <Tooltip text="Eşittir" textClassName={'left-10'} >
                        <FaEquals />
                    </Tooltip>
                )
            }, {
                id: 3,
                title: (
                    <Tooltip text="Icinde" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'paid-amount', label: 'Odenen Tutar', type: 'number', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: true, isHidden: false, operators: [{
                id: 0,
                title: (
                    <Tooltip text="Eşittir" textClassName={'left-10'} >
                        <FaEquals />
                    </Tooltip>
                )
            }, {
                id: 1,
                title: (
                    <Tooltip text="Buyuktur" textClassName={'left-10'}>
                        <FaGreaterThan />
                    </Tooltip>
                )
            }, {
                id: 2,
                title: (
                    <Tooltip text='Kucuktur' textClassName={'left-10'}>
                        <FaLessThan />
                    </Tooltip>
                )
            }, {
                id: 4,
                title: (
                    <Tooltip text="Arasinda" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'on-prov-amount', label: 'On Prov Tutari', type: 'number', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: true, isHidden: false, operators: [{
                id: 0,
                title: (
                    <Tooltip text="Eşittir" textClassName={'left-10'} >
                        <FaEquals />
                    </Tooltip>
                )
            }, {
                id: 1,
                title: (
                    <Tooltip text="Buyuktur" textClassName={'left-10'}>
                        <FaGreaterThan />
                    </Tooltip>
                )
            }, {
                id: 2,
                title: (
                    <Tooltip text='Kucuktur' textClassName={'left-10'}>
                        <FaLessThan />
                    </Tooltip>
                )
            }, {
                id: 4,
                title: (
                    <Tooltip text="Arasinda" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'plate', label: 'Plaka', type: 'text', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: false, isHidden: false, operators: [{
                id: 0,
                title: (
                    <Tooltip text="Eşittir" textClassName={'left-10'} >
                        <FaEquals />
                    </Tooltip>
                )
            }, {
                id: 3,
                title: (
                    <Tooltip text="Icinde" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'brand', label: 'Marka', type: 'text', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: false, isHidden: false, operators: [{
                id: 0,
                title: (
                    <Tooltip text="Eşittir" textClassName={'left-10'} >
                        <FaEquals />
                    </Tooltip>
                )
            }, {
                id: 3,
                title: (
                    <Tooltip text="Icinde" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
        {
            id: 'ModelName', label: 'Model', type: 'text', defaultValue: '', operatorId: '0', value: '', value2: '', isDoubleValue: false, isHidden: false, operators: [{
                id: 0,
                title: (
                    <Tooltip text="Eşittir" textClassName={'left-10'} >
                        <FaEquals />
                    </Tooltip>
                )
            }, {
                id: 3,
                title: (
                    <Tooltip text="Icinde" textClassName={'left-10'}>
                        <TbTilde />
                    </Tooltip>
                )
            }]
        },
    ]);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isFilterUsed, setIsFilterUsed] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
        setIsLoading(false);
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

        setIsFilterUsed(true);
        setIsLoading(false);
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
            case '0':
                return "=";
            case '1':
                return ">";
            case '2':
                return "<";
            case '3':
                return "~|x|~";
            default:
                return "~{x}~";
        }
    };

    const downloadExcel = async (): Promise<void> => {
        try {
            const response = await axios.post('https://sharztestapi.azurewebsites.net/Report/ExcelExport', {
                "filterAttributes": [
                    {
                        "property": "RID",
                        "operator": "~{x}~",
                        "value": "28975",
                        "value2": "29975"
                    }
                ]
            }, {
                responseType: 'blob', // önemli kısım, blob türünde yanıt bekleniyor
            });

            // URL oluştur ve dosya indirme işlemini başlat
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.xlsx'); // İndirilecek dosyanın adı
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error("Excel dosyası indirilemedi:", error);
        }
    };

    useEffect(() => {
        getAllChargeData();
    }, []);

    useEffect(() => {
        setIsLoading(true);

        if (!isFilterUsed) {
            getAllChargeData();
        } else {
            handleFilterSubmit();
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
                                <Filters className={`${pagePrefix} h-full mx-2`} filters={filters} setFilters={setFilters} onFilterSubmit={handleFilterSubmit} isExpanded={isExpanded} />
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
                                            onClick={downloadExcel}
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
                            </>
                        )
                }
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
