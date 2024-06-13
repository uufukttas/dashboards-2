import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@projects/alert';
import { Dialog } from '@projects/dialog';
import { tablePlaceholderInitialValue, tariffsTableHeadData } from './constants';
import Modal from '../Modal/Modal';
import Pagination from '../ServicePointSection/PaginationComponents/Pagination';
import Table from '../Table/Table';
import { BRAND_PREFIX } from '../../constants/constants';
import { getAllTariffsRequest } from '../../../app/api/tariffsManagement';
import { hideDialog } from '../../../app/redux/features/dialogInformation';
import { setTariffs } from '../../../app/redux/features/tariffs';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { toggletariffListUpdated } from '../../../app/redux/features/isTariffListUpdated';
import { AppDispatch, RootState } from '../../../app/redux/store';

const TarifssManagementSection: React.FC = () => {
    const tarifssManagementSectionPrefix: string = `${BRAND_PREFIX}-tarifss-management`;
    const dispatch = useDispatch<AppDispatch>();
    const alertInformation = useSelector((state: RootState) => state.alertInformation);
    const dialogInformation = useSelector((state: RootState) => state.dialogInformation);
    const isModalVisible = useSelector((state: RootState) => state.isModalVisible.isModalVisible);
    const isTariffListUpdated = useSelector((state: RootState) => state.isTariffListUpdated.isTariffListUpdated);
    const tariffListData = useSelector((state: RootState) => state.tariffs);
    const [currentPage, setCurrentPage] = useState(1);

    const getAllTariffs = async () => {
        const response = await getAllTariffsRequest(null);

        if (response) {
            console.log('response.data', response.data)
            dispatch(
                setTariffs({
                    tariffs: response.data,
                    count: response.count,
                })
            );
        }

    };

    const handleCloseModal = (): void => {
        dispatch(toggleModalVisibility(false));
    };

    useEffect(() => {
        getAllTariffs();
    }, []);

    return (
        <div className={`${BRAND_PREFIX}-service-points-container flex justify-between items-center flex-col`}>
            <div className={`${tarifssManagementSectionPrefix}-listing-container flex items-center w-full`}>
                <Table
                    attributeName="tariff-list"
                    buttonText='Istasyon'
                    filteredDropdownItems={[]}
                    tableData={tariffListData.tariffs}
                    tableDataCount={tariffListData.count}
                    tableHeadData={tariffsTableHeadData}
                    tablePlaceholderInitialValue={tablePlaceholderInitialValue}
                />
            </div>
            {
                isModalVisible && (
                    <Modal
                        className={`${tarifssManagementSectionPrefix}-modal-container`}
                        modalHeaderTitle={`Istasyon ${tariffListData.id > 0 ? 'Güncelle' : 'Ekle'}`}
                        modalId={`${tarifssManagementSectionPrefix}-modal`}
                        onClose={handleCloseModal}
                    >
                        {/* <ServicePointModalForm />*/}
                        asd
                    </Modal>
                )
            }
            {
                alertInformation.isVisible && (
                    <Alert
                        alertText={alertInformation.message}
                        alertType={alertInformation.type}
                        id={`${tarifssManagementSectionPrefix}-alert`}
                    />
                )
            }
            {
                dialogInformation.isVisible && (
                    <Dialog
                        handleCancel={() => dispatch(hideDialog())}
                        handleSuccess={() => {
                            // deleteServicePoint(dialogInformation.data);
                            dispatch(hideDialog());
                            dispatch(toggletariffListUpdated(true));
                        }}
                    />
                )
            }
            {
                12 > 10 && (
                    <Pagination
                        currentPage={currentPage}
                        totalCounts={29}
                        setCurrentPage={setCurrentPage}
                    />
                )
            }
        </div>
    );
};

export default TarifssManagementSection;
