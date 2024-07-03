import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    const filters: IFilterItemProps[] = [
        { id: 'trx-no', label: 'TRX No', type: 'number', defaultValue: '', operatorId: 0 },
        { id: 'station-name', label: 'Istasyon Ismi', type: 'text', defaultValue: '', operatorId: 0 },
        { id: 'unit-code', label: 'Unit Code', type: 'text', defaultValue: '', operatorId: 0 },
        { id: 'socket-type', label: 'Soket Tipi', type: 'dropdown', dropdownItems: [{ name: 'Secim Yapiniz', rid: 0, id: null }, { name: 'Type2', rid: 1, id: null }, { name: 'CCS/SAE', rid: 2, id: null }], operatorId: 0},
        { id: 'start-time', label: 'Baslangic Zamani', type: 'date', defaultValue: '', operatorId: 0 },
        { id: 'charge-time', label: 'Sarj Suresi', type: 'number', defaultValue: '', operatorId: 0 },
        { id: 'end-time', label: 'Bitis Zamani', type: 'date', defaultValue: '', operatorId: 0 },
        { id: 'unit-price', label: 'Birim Fiyat', type: 'number', defaultValue: '', operatorId: 0 },
        { id: 'kwh', label: 'kWh', type: 'number', defaultValue: '', operatorId: 0 },
        { id: 'battery-percentage', label: 'Batarya Yuzdesi', type: 'number', defaultValue: '', operatorId: 0 },
        { id: 'total-price', label: 'Toplam Bedel', type: 'number', defaultValue: '', operatorId: 0 },
        { id: 'total-price-including-vat', label: 'Toplam Bedel (KDV Dahil)', type: 'number', defaultValue: '', operatorId: 0 },
        { id: 'electricity-price', label: 'Elektrik Bedeli', type: 'number', defaultValue: '', operatorId: 0 },
        { id: 'service-price', label: 'Hizmet Bedeli', type: 'number', defaultValue: '', operatorId: 0 },
        { id: 'service-point-commission', label: 'Hizmet Noktasi Komisyonu', type: 'number', defaultValue: '', operatorId: 0 },
        { id: 'reseller-commission', label: 'Reseller Komisyonu', type: 'number', defaultValue: '', operatorId: 0 },
        { id: 'user-id', label: 'Kullanici ID', type: 'number', defaultValue: '', operatorId: 0 },
        { id: 'bank-order-no', label: 'Banka Siparis No', type: 'number', defaultValue: '', operatorId: 0 },
        { id: 'paid-amount', label: 'Odenene Tutar', type: 'number', defaultValue: '', operatorId: 0 },
        { id: 'on-prov-amount', label: 'On Prov Tutari', type: 'number', defaultValue: '', operatorId: 0 },
        { id: 'plate', label: 'Plaka', type: 'text', defaultValue: '', operatorId: 0 },
        { id: 'brand', label: 'Marka', type: 'text', defaultValue: '', operatorId: 0 },
        { id: 'model', label: 'Model', type: 'text', defaultValue: '', operatorId: 0 },
    ];
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

    useEffect(() => {
        getAllChargeData();
    }, []);

    useEffect(() => {
        getAllChargeData();
    }, [currentPage]);

    return (
        <div className={`${BRAND_PREFIX}-reports-center-container flex justify-between items-center flex-col`}>
            <div className={`${pagePrefix}-listing-container flex items-center w-full`}>
                <DynamicFilters className={`w-1/4 h-full mx-2`} filters={filters} />
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
