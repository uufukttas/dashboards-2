import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { RootState } from '../../../../app/redux/store';
import { FaChargingStation, FaPencil, FaPlugCirclePlus, FaTrash } from 'react-icons/fa6';
import Modal from '../../Modal/Modal';
import { BRAND_PREFIX } from '../../../constants/constants';

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
    chargeUnits: IChargeUnitsProps[];
    connectors: { [key: number]: IConnectorStateProps };
};

const ChargeUnitsContent = ({ chargeUnits, connectors }: IChargeUnitsContentProps) => {
    const dispatch = useDispatch();
    const isModalVisible = useSelector(
        (state: RootState) => state.isModalVisibleReducer.isModalVisible
    );

    const handleClick = (event: React.MouseEvent) => {
        const chargeUnitId = event.currentTarget.getAttribute('data-charge-point-id');

        if (chargeUnitId) {
            console.log(chargeUnitId); //TO DO: Set Modal Input Value from Request
        }

        dispatch(toggleModalVisibility(isModalVisible));
    };

    const addChargeUnit = () => {
        dispatch(toggleModalVisibility(isModalVisible));
    };

    return (
        <div className="charge-units-content py-8">
            <div className="charge-units-header flex justify-end">
                <Button
                    buttonText={``}
                    className="charge-units-add-button bg-primary bg-primary text-white rounded-md px-4 py-2 mx-2"
                    type="button"
                    onClick={addChargeUnit}
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
                                            onClick={handleClick}
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
                isModalVisible && (
                    <Modal
                        className={`${BRAND_PREFIX}-service-point-modal-container`}
                        modalHeaderTitle={`Lokasyon Ekle'}`}
                        modalId={`${BRAND_PREFIX}-service-point-modal`}
                        onClose={() => {}}
                    >
                        <div>
                            ads
                        </div>

                    </Modal>
                )
            }
        </div>
    );
};

export default ChargeUnitsContent;
