import React, { useEffect, useState } from 'react';
import { BRAND_PREFIX } from '../../constants/constants';
import Table from '../Table/Table';
import axios from 'axios';
import { tablePlaceholderInitialValue } from './constant';

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
    ]
    const [reports, setReports] = useState([]);

    const getAllChargeData = async () => {
        const response = await axios.post(
            'https://sharztestapi.azurewebsites.net/Report/MainReport',
            {
                pageNumber: 1,
                userCount: 10,
            },
            { headers: { 'Content-Type': 'application/json' } }
        )

        console.log(response.data);
        setReports(response.data);
    };

    useEffect(() => {
        getAllChargeData();
    }, []);

    return (
        <div className={`${BRAND_PREFIX}-service-points-container flex justify-between items-center flex-col`}>
            <div className={`${pagePrefix}-listing-container flex items-center w-full`}>
                <Table
                    attributeName="reports-management"
                    buttonText='Istasyon'
                    filteredDropdownItems={[]}
                    tableData={reports}
                    tableDataCount={10}
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
            }
            {
                servicePointsCount > 10 && (
                    <Pagination
                        currentPage={currentPage}
                        totalCounts={servicePointsCount}
                        setCurrentPage={setCurrentPage}
                    />
                )
            } */}
        </div>
    );
};

export default ReportsSection;
