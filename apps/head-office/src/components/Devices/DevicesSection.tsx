import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Toast } from 'primereact/toast';
import { Tooltip } from 'primereact/tooltip';
import { FaTrashCan } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from '@projects/dialog';
import Modal from '../Modal/Modal';
import { BRAND_PREFIX } from '../../constants/constants';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { hideDialog, showDialog } from '../../../app/redux/features/dialogInformation';
import { RootState } from '../../../app/redux/store';
import { Dropdown } from 'primereact/dropdown';
import { Label } from '@projects/label';
import { Input } from '@projects/input';

const DevicesSection: React.FC = () => {
    const deviceManagementPrefix = `${BRAND_PREFIX}-device-management`;
    const deviceListData = [
        {
            id: 1,
            brand: 'Bosch',
            model: 'Bosch 1234',
            kwValue: 1234,
            image: 'https://via.placeholder.com/150',
            createDate: '2021-10-10T10:10:10',
            kwRange: '1000 - 2000',
            validityBeginDate: '2021-10-10T10:10:10',
            validityEndDate: '2021-10-10T10:10:10',
        },
        {
            id: 2,
            brand: 'Bosch',
            model: 'Bosch 1234',
            kwValue: 1234,
            image: 'https://via.placeholder.com/150',
            createDate: '2021-10-10T10:10:10',
            kwRange: '1000 - 2000',
            validityBeginDate: '2021-10-10T10:10:10',
            validityEndDate: '2021-10-10T10:10:10',
        }
    ];
    const tableHeaderData = [{
        header: 'Cihaz Markasi',
        field: 'brand',
        isRemovable: true,
    }, {
        header: 'Cihaz Modeli',
        field: 'model',
        isRemovable: true,
    }, {
        header: 'Kw Degeri',
        field: 'kwValue',
        isRemovable: true,
    }, {
        header: 'Resim',
        field: 'image',
        isRemovable: true,
    }, {
        header: 'İşlemler',
        field: 'actions',
        isRemovable: false,
    }];
    const dispatch = useDispatch();
    const alertInformation = useSelector((state: RootState) => state.alertInformation);
    const dialogInformation = useSelector((state: RootState) => state.dialogInformation);
    const isModalVisible = useSelector((state: RootState) => state.isModalVisible.isModalVisible);
    const toastRef = useRef<Toast>(null);
    const [visibleColumns, setVisibleColumns] = useState(tableHeaderData);
    const [selectedModel, setSelectedModel] = useState(null);

    const dataTableHeader = (): JSX.Element => {
        return (
            <>
                <div className={`${BRAND_PREFIX}-data-table-header-container w-full flex justify-between items-center`}>
                    <div className={`${BRAND_PREFIX}-data-table-select-container`}>
                        <MultiSelect value={visibleColumns} options={tableHeaderData.filter((item) => item.isRemovable)} optionLabel="header" onChange={onColumnToggle} className="w-full sm:w-20rem" display="chip" />
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
    const prepareTableData = () => {
        const data = deviceListData.map((device) => {
            return {
                ...device,
                image: <img alt={device.model} src={device.image} />,
            }
        });

        return data;
    };
    const onColumnToggle = (event: MultiSelectChangeEvent): void => {
        const selectedColumns = event.target.value;
        const orderedSelectedColumns = tableHeaderData
            .filter((col) => selectedColumns
                .some((sCol: { field: string; header: string; isRemovable: boolean }) => {
                    return sCol.field === col.field
                }) || col.field === 'actions');

        setVisibleColumns(orderedSelectedColumns);
    };

    return (
        <div className={`${BRAND_PREFIX}-device-management-container flex justify-between items-center flex-col`}>
            <div className={`${deviceManagementPrefix}-listing-container items-center w-full`}>
                <DataTable
                    className="w-full shadow"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                    filterDisplay="menu"
                    // filters={filters}
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
                        className={`${deviceManagementPrefix}-modal-container`}
                        modalHeaderTitle={`Cihaz Ekle`}
                        modalId={`${deviceManagementPrefix}-modal`}
                        onClose={() => dispatch(toggleModalVisibility(false))}
                    >
                        <>
                            <div className={`${deviceManagementPrefix}-name-input-container w-full flex justify-between items-center my-4`}>
                                <Label
                                    className={`${deviceManagementPrefix}-name-input-label`}
                                    htmlFor="Cihaz Adı"
                                    labelText="Cihaz Adı"
                                />
                                <Input
                                    className={`${deviceManagementPrefix}-name-input rounded-md`}
                                    id={`${deviceManagementPrefix}-name-input`}
                                    name="Cihaz Adı"
                                    placeholder="Cihaz Adı"
                                    type='text'
                                />
                            </div>
                            <div className={`${deviceManagementPrefix}-model-input-container w-full flex justify-between items-center my-4`}>
                                <Label
                                    className={`${deviceManagementPrefix}-model-input-label`}
                                    htmlFor="Cihaz Modeli"
                                    labelText="Cihaz Modeli"
                                />
                                <Dropdown
                                    className={`${deviceManagementPrefix}-model-input rounded-md`}
                                    id={`${deviceManagementPrefix}-model-input`}
                                    name="Cihaz Modeli"
                                    options={[
                                        { value: 'New York', code: 'NY' },
                                        { value: 'Rome', code: 'RM' },
                                        { value: 'London', code: 'LDN' },
                                        { value: 'Istanbul', code: 'IST' },
                                        { value: 'Paris', code: 'PRS' }
                                    ]}
                                    placeholder="Select a Model"
                                    value={selectedModel}
                                    onChange={(event) => {
                                        debugger;
                                        setSelectedModel(event.value)
                                    }
                                    }
                                />
                            </div>
                        </>
                    </Modal>
                )
            }
            {
                alertInformation.isVisible && (
                    <Toast ref={toastRef} />
                )
            }
            {
                dialogInformation.isVisible && (
                    <Dialog
                        handleCancel={() => dispatch(hideDialog())}
                        handleSuccess={() => {
                        }}
                    />
                )
            }
        </div>
    );
};

export default DevicesSection;
