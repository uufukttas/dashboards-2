import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@projects/alert';
import { Dialog } from '@projects/dialog';
import { tariffsTableHeadData } from './constants';
import TariffsModalComponent from './TariffsManagementModalComponents/TariffsModalComponent';
import Modal from '../Modal/Modal';
import { BRAND_PREFIX } from '../../constants/constants';
import { deleteTariffRequest, getAllTariffsRequest } from '../../../app/api/tariffsManagement';
import { hideDialog, showDialog } from '../../../app/redux/features/dialogInformation';
import { setTariffs } from '../../../app/redux/features/tariffs';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { toggleTariffListUpdated } from '../../../app/redux/features/isTariffListUpdated';
import { AppDispatch, RootState } from '../../../app/redux/store';
import { FaTrashCan } from 'react-icons/fa6';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ITariffDataProps } from './types';
import './TariffsManagementSection.css';

const TarifssManagementSection: React.FC = () => {
    const tarifssManagementSectionPrefix: string = `${BRAND_PREFIX}-tariffs-management`;
    const dispatch = useDispatch<AppDispatch>();
    const alertInformation = useSelector((state: RootState) => state.alertInformation);
    const dialogInformation = useSelector((state: RootState) => state.dialogInformation);
    const isModalVisible = useSelector((state: RootState) => state.isModalVisible.isModalVisible);
    const isTariffListUpdated = useSelector((state: RootState) => state.isTariffListUpdated.isTariffListUpdated);
    const searchProperties = useSelector((state: RootState) => state.searchedText);
    const tariffListData = useSelector((state: RootState) => state.tariffs);
    const [visibleColumns, setVisibleColumns] = useState(tariffsTableHeadData);

    const dataTableHeader = (): JSX.Element => {
        return (
            <>
                <div className={`${BRAND_PREFIX}-data-table-header-container w-full flex justify-between items-center`}>
                    <div className={`${BRAND_PREFIX}-data-table-select-container`}>
                        <MultiSelect value={visibleColumns} options={tariffsTableHeadData.filter((item) => item.isRemovable)} optionLabel="header" onChange={onColumnToggle} className="w-full sm:w-20rem" display="chip" />
                    </div>
                    <div className={`${BRAND_PREFIX}-data-table-action-button-container flex justify-center items-center`}>
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
                                content="Tarife Ekle"
                                position="bottom"
                                target={`#${BRAND_PREFIX}-table-header-add-button`}
                                style={{ fontSize: '12px', padding: '4px' }}
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    };
    const getAllTariffs = async (tariffName: string) => {
        const response = await getAllTariffsRequest(tariffName, 1);

        if (response) {
            dispatch(
                setTariffs({
                    tariffs: response.data,
                    count: 1000,
                })
            );
        }

        dispatch(toggleTariffListUpdated(false));
    };

    const handleCloseModal = (): void => {
        dispatch(toggleModalVisibility(false));
    };
    const onColumnToggle = (event: MultiSelectChangeEvent): void => {
        const selectedColumns = event.target.value;
        const orderedSelectedColumns = tariffsTableHeadData
            .filter((col) => selectedColumns
                .some((sCol: { field: string; header: string; isRemovable: boolean }) => {
                    return sCol.field === col.field
                }) || col.field === 'actions');

        setVisibleColumns(orderedSelectedColumns);
    };
    const prepareTableData = () => {
        const data = tariffListData.tariffs.map((tariff: ITariffDataProps) => {
            return {
                ...tariff,
                kwRange: `${tariff.minKW} - ${tariff.maxKW}`,
            }
        });

        return data;
    };

    useEffect(() => {
        getAllTariffs(searchProperties.searchedText);
    }, [isTariffListUpdated, searchProperties]);

    return (
        <div className={`${BRAND_PREFIX}-tariffs-management-container flex justify-between items-center flex-col`}>
            <div className={`${tarifssManagementSectionPrefix}-listing-container items-center w-full`}>
                <DataTable
                    className="w-full shadow"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                    filterDisplay="row"
                    header={dataTableHeader}
                    paginator={true}
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    removableSort
                    reorderableColumns
                    resizableColumns
                    rows={10}
                    rowsPerPageOptions={[10, 20, 50]}
                    showGridlines={true}
                    sortMode="multiple"
                    stripedRows={true}
                    value={prepareTableData()}
                >
                    {
                        visibleColumns.map((headerProps, index) => {
                            if (headerProps.field !== "actions") {
                                return (
                                    <Column
                                        className='border-none'
                                        field={headerProps.field}
                                        filter
                                        filterMenuClassName='border-none shadow-lg'
                                        filterPlaceholder={`${headerProps.header}...`}
                                        header={headerProps.header}
                                        headerClassName='border-0'
                                        key={index}
                                        sortable={true}
                                    />
                                );
                            } else {
                                return (
                                    <Column
                                        body={(rowData) => {
                                            return (
                                                <div className={`${BRAND_PREFIX}-data-table-actions-button-container flex justify-start items-center`}>
                                                    <a
                                                        className="font-medium text-red-600 cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"
                                                        data-user-management-id={rowData['id']}
                                                        onClick={() => {
                                                            dispatch(showDialog({
                                                                actionType: 'delete',
                                                                data: rowData['id']
                                                            }))
                                                        }}
                                                    >
                                                        <FaTrashCan />
                                                    </a>
                                                </div>
                                            )
                                        }}
                                        field={headerProps.field}
                                        frozen
                                        header={headerProps.header}
                                        headerClassName={`flex justify-start items-center`}
                                        key={index}
                                    />
                                );
                            }
                        })
                    }

                </DataTable>
            </div>
            {
                isModalVisible && (
                    <Modal
                        className={`${tarifssManagementSectionPrefix}-modal-container`}
                        modalHeaderTitle={`Tarife Ekle`}
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
        </div>
    );
};

export default TarifssManagementSection;
