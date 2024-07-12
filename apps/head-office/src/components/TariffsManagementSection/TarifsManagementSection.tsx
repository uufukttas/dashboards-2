import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@projects/alert';
import { Dialog } from '@projects/dialog';
import { tablePlaceholderInitialValue, tariffsTableHeadData } from './constants';
import TariffsModalComponent from './TariffsManagementModalComponents/TariffsModalComponent';
import Modal from '../Modal/Modal';
import Pagination from '../ServicePointSection/PaginationComponents/Pagination';
import Table from '../Table/Table';
import { BRAND_PREFIX } from '../../constants/constants';
import { deleteTariffRequest, getAllTariffsRequest } from '../../../app/api/tariffsManagement';
import { hideDialog } from '../../../app/redux/features/dialogInformation';
import { setTariffs } from '../../../app/redux/features/tariffs';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { toggleTariffListUpdated } from '../../../app/redux/features/isTariffListUpdated';
import { AppDispatch, RootState } from '../../../app/redux/store';

const TarifssManagementSection: React.FC = () => {
    const tarifssManagementSectionPrefix: string = `${BRAND_PREFIX}-tariffs-management`;
    const dispatch = useDispatch<AppDispatch>();
    const alertInformation = useSelector((state: RootState) => state.alertInformation);
    const dialogInformation = useSelector((state: RootState) => state.dialogInformation);
    const isModalVisible = useSelector((state: RootState) => state.isModalVisible.isModalVisible);
    const isTariffListUpdated = useSelector((state: RootState) => state.isTariffListUpdated.isTariffListUpdated);
    const searchProperties = useSelector((state: RootState) => state.searchedText);
    const tariffListData = useSelector((state: RootState) => state.tariffs);
    const [currentPage, setCurrentPage] = useState(1);

    const getAllTariffs = async (tariffName: string) => {
        const response = await getAllTariffsRequest(tariffName, currentPage);

        if (response) {
            dispatch(
                setTariffs({
                    tariffs: response.data,
                    count: response.count,
                })
            );
        }

        dispatch(toggleTariffListUpdated(false));
    };

    const handleCloseModal = (): void => {
        dispatch(toggleModalVisibility(false));
    };

    useEffect(() => {
        getAllTariffs(searchProperties.searchedText);
    }, [currentPage, isTariffListUpdated, searchProperties]);

    return (
        <div className={`${BRAND_PREFIX}-tariffs-management-container flex justify-between items-center flex-col`}>
            <div className={`${tarifssManagementSectionPrefix}-listing-container items-center w-full`}>
                <Table
                    attributeName="tariff-list"
                    buttonText='Tarife'
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
                        modalHeaderTitle={`Tarife ${tariffListData.id > 0 ? 'Güncelle' : 'Ekle'}`}
                        modalId={`${tarifssManagementSectionPrefix}-modal`}
                        onClose={handleCloseModal}
                    >
                        <TariffsModalComponent />
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
                            deleteTariffRequest(dialogInformation.data);
                            dispatch(hideDialog());
                            dispatch(toggleTariffListUpdated(true));
                        }}
                    />
                )
            }
            {
                tariffListData.count > 10 && (
                    <Pagination
                        currentPage={currentPage}
                        totalCounts={tariffListData.count}
                        setCurrentPage={setCurrentPage}
                    />
                )
            }
        </div>
    );
};

export default TarifssManagementSection;
