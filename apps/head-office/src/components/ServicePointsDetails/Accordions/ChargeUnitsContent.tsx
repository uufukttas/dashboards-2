import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { RootState } from '../../../../app/redux/store';
import { FaChargingStation, FaPencil, FaPlugCirclePlus, FaTrash } from 'react-icons/fa6';
import Modal from '../../Modal/Modal';
import { BRAND_PREFIX } from '../../../constants/constants';
import { Dropdown } from '@projects/dropdown';
import { Label } from '@projects/label';
import axios from 'axios';
import ServicePointDetailsModal from '../ServicePointDetailsModal';

interface IChargeUnitsProps {
    chargePointId: number;
    connectorNumber: number;
    connectorId: number;
    count: number;
    deviceCode: string;
    externalAddress: string;
    internalAddress: string;
    investor: string;
    isFreePoint: boolean;
    lastHeartBeat: string;
    limitedUsage: boolean;
    modelId: number;
    model: string;
    ocppVersion: string;
    sendRoaming: boolean;
    stationId: number;
    status: string;
};
interface IConnectorProps {
    connectorName: string;
    connectorNr: number;
    id: number;
    isAc: boolean;
    kw: number;
    stationChargePointId: number;
};
interface IConnectorStateProps {
    [key: number]: IConnectorProps;
};
interface IChargeUnitsContentProps {
    accessTypeList: IAccessTypeProps[];
    brands: IBrandsProps[];
    chargeUnits: IChargeUnitsProps[];
    connectors: { [key: number]: IConnectorStateProps };
    investors: IInvestorsProps[];
    slug: string;
    statusList: IStatusListProps[];
};
interface IConnectorBrandProps {
    connectorTypeId: number;
    displayName: string;
};

interface IAccessTypeProps {
    id: number;
    stationChargePointFeatureType: number;
    name: string;
    rid: null;
};

interface IBrandsProps {
    id: number,
    name: string,
    isDeleted: boolean;
    rid: null;
};

interface IInvestorsProps {
    id: number,
    name: string,
    rid: null;
};
interface IStatusListProps {
    statusList: IStatusListProps[];
    accessTypeList: IAccessTypeProps[];
};

const ChargeUnitsContent = ({ accessTypeList, brands, chargeUnits, connectors, investors, slug, statusList }: IChargeUnitsContentProps) => {
    const dispatch = useDispatch();
    const [connectorBrands, setConnectorBrands] = useState([]);
    const [addChargeUnit, setAddChargeUnit] = useState(false);
    const [addConnector, setAddConnector] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(0);
    const isModalVisible = useSelector(
        (state: RootState) => state.isModalVisibleReducer.isModalVisible
    );

    const handleClick = (event: React.MouseEvent) => {
        const chargeUnitId = event.currentTarget.getAttribute('data-charge-unit-model-id');
        setSelectedBrand(parseInt(chargeUnitId || '0'));

        dispatch(toggleModalVisibility(isModalVisible));
    };

    const getConnectorBrands = () => {
        axios
            .post(
                'https://sharztestapi.azurewebsites.net/Values/GetConnectorModels',
                { brandId: selectedBrand },
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then(response => {
                setConnectorBrands(response.data.data);
                createDropdownItems();
            })
    }

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        console.log('event', event)

        // addConnector();
    };

    const createDropdownItems = () => {
        return connectorBrands.map((connectorBrand: IConnectorBrandProps) => {
            return {
                id: connectorBrand.connectorTypeId,
                name: connectorBrand.displayName,
                rid: null,
            };
        });
    };

    useEffect(() => {
        getConnectorBrands();
    }, [selectedBrand]);

    return (
        <div className="charge-units-content py-8">
            <div className="charge-units-header flex justify-end">
                <Button
                    buttonText={``}
                    className="charge-units-add-button bg-primary bg-primary text-white rounded-md px-4 py-2 mx-2"
                    type="button"
                    onClick={() => {
                        setAddChargeUnit(true);
                        dispatch(toggleModalVisibility(isModalVisible));
                    }}
                >
                    <FaChargingStation />
                </Button>
            </div>
            <div className="charge-units-list">
                {chargeUnits.map((chargeUnit, index) => (
                    <div
                        className="charge-unit flex justify-between items-baseline border-b-2 border-gray-200 py-4"
                        key={index}
                        data-charge-point-id={chargeUnit.chargePointId}
                    >
                        <div className="charge-unit-info w-full">
                            <div className='charge-unit flex justify-between'>
                                <h3 className="charge-unit-name text-lg font-bold text-heading">
                                    {chargeUnit.model}
                                </h3>
                                <div className="charge-unit-actions mx-2">
                                    <Button
                                        buttonText={``}
                                        className="charge-unit-edit-button bg-primary text-white rounded-md px-4 py-2 mx-2"
                                        dataAttributes={{
                                            'data-charge-point-id': chargeUnit.chargePointId.toString(),
                                        }}
                                        type={'button'}
                                        onClick={handleClick}
                                    >
                                        <FaPencil />
                                    </Button>
                                    <Button
                                        buttonText={''}
                                        className="charge-unit-delete-button bg-secondary text-white rounded-md px-4 py-2"
                                        type={'button'}
                                    >
                                        <FaTrash />
                                    </Button>
                                </div>
                            </div>
                            <div className="charge-unit-connector-number">
                                <h3 className="charge-unit-connector-number-label text-lg font-bold text-text">
                                    {chargeUnit.deviceCode || '90'}
                                </h3>
                                <div className="connectors-contianer pt-12 pl-12 mx-2 w-full">
                                    <div className='flex justify-between'>
                                        <h4 className='font-bold text-gray-700 mb-4'>Konnektörler: {Object.values(connectors[chargeUnit.chargePointId] || {}).length}</h4>
                                        <Button
                                            buttonText={``}
                                            className="connector-add-button bg-primary text-white rounded-md px-4 py-2 mx-4"
                                            type={'button'}
                                            dataAttributes={{
                                                'data-charge-point-id': chargeUnit.chargePointId.toString(),
                                                'data-charge-unit-model-id': chargeUnit.modelId.toString(),
                                            }}
                                            onClick={() => setAddConnector(true)}
                                        >
                                            <FaPlugCirclePlus />
                                        </Button>
                                    </div>
                                    <div>
                                        {
                                            Object.values(connectors[chargeUnit.chargePointId] || {}).map((connector: IConnectorProps) => {
                                                return (
                                                    <div key={connector.id} className='connector-item w-full justify-between my-2 px-4'>
                                                        <span>
                                                            {connector.connectorName}
                                                        </span>
                                                        <div className='connector-item-actions'>
                                                            <Button
                                                                buttonText={``}
                                                                className="connector-edit-button bg-primary text-white rounded-md px-4 py-2 mx-2"
                                                                type={'button'}
                                                                onClick={handleClick}
                                                            >
                                                                <FaPencil />
                                                            </Button>
                                                            <Button
                                                                buttonText={''}
                                                                className="connector-delete-button bg-secondary text-white rounded-md px-4 py-2"
                                                                type={'button'}
                                                            >
                                                                <FaTrash />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {
                addConnector && isModalVisible && (
                    <Modal
                        className={`${BRAND_PREFIX}-connector-modal-container`}
                        modalHeaderTitle={`Konnektor Ekle`}
                        modalId={`${BRAND_PREFIX}-connector-modal`}
                        onClose={() => { }}
                    >
                        <div className="relative p-6 bg-white rounded-lg">
                            <form onSubmit={handleFormSubmit}>
                                <Label
                                    className='block mb-2 text-heading font-semibold'
                                    htmlFor='location'
                                    labelText='Konnektör Tipi'
                                />

                                <Dropdown
                                    className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4'
                                    id='location'
                                    items={createDropdownItems()}
                                    name={'location'}
                                />
                                <Button
                                    buttonText={'Kaydet'}
                                    className='bg-primary text-white rounded-md px-4 py-2'
                                    type='submit'
                                />
                            </form>
                        </div>
                    </Modal>
                )
            }
            {
                addChargeUnit && isModalVisible && (
                    <Modal
                        className={`${BRAND_PREFIX}-container`}
                        modalHeaderTitle={`Sarj Unitesi Ekle`}
                        modalId={`${BRAND_PREFIX}-modal`}
                        onClose={() => { }}
                    >
                        <ServicePointDetailsModal
                            accessTypeList={accessTypeList}
                            brands={brands}
                            investors={investors}
                            slug={slug}
                            statusList={statusList}
                        />
                    </Modal>
                )
            }
        </div>
    );
};

export default ChargeUnitsContent;
