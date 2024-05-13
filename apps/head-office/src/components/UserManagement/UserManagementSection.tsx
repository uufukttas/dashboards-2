import React, { useEffect, useState } from 'react';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/redux/store';
import { BRAND_PREFIX } from '../../constants/constants';
import Table from '../Table/Table';

const UserManagementSection: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [searchedText, setSearchedText] = useState<string>('');

    useEffect(() => {
        dispatch(toggleLoadingVisibility(true));
    }, []);

    return (
        <div className={`${BRAND_PREFIX}-service-points-container flex justify-between items-center flex-col`}>
            <div className={`${BRAND_PREFIX}-service-point-listing-container flex items-center w-full`}>
                <Table
                    searchedText={searchedText}
                    setSearchedText={setSearchedText}
                />
            </div>
            {/* {
                isModalVisible && (
                    <Modal
                        className={`${BRAND_PREFIX}-service-point-modal-container`}
                        modalHeaderTitle={`Servis Noktasi ${servicePointData.id > 0 ? 'Güncelle' : 'Ekle'}`}
                        modalId={`${BRAND_PREFIX}-service-point-modal`}
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
                        id={`service-point-alert`}
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
                        setCurrentPage={setCurrentPage}
                        totalCounts={servicePointsCount}
                    />
                )
            } */}
        </div>
    );
};

export default UserManagementSection;
