import React, { Dispatch, useEffect, useState } from 'react';
import axios from 'axios';
import { FaChargingStation, FaPencil, FaPlugCirclePlus, FaTrash } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { RootState } from '../../../../app/redux/store';

interface IChargeUnitsContentProps {
    chargeUnits: IChargeUnitsProps[];
    connectorCount: number;
    connectors: IConnectorStateProps[];
    setAddChargeUnit: Dispatch<React.SetStateAction<boolean>>;
    setAddConnector: Dispatch<React.SetStateAction<boolean>>;
};
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
    isAC: boolean;
    kw: number;
    stationChargePointId: number;
};
interface IConnectorStateProps {
    [key: number]: IConnectorProps[];
}
interface IConnectorBrandProps {
    connectorTypeId: number;
    displayName: string;
};

const ChargeUnitsContent = ({ chargeUnits, connectorCount, connectors, setAddChargeUnit, setAddConnector }: IChargeUnitsContentProps) => {
    const sectionPrefix = 'charge-units';
    const chargeUnitPrefix = 'charge-unit';
    const dispatch = useDispatch();
    const isModalVisible = useSelector(
        (state: RootState) => state.isModalVisibleReducer.isModalVisible
    );
    const [connectorBrands, setConnectorBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(0);

    const createConnectorList = (chargeUnit: IChargeUnitsProps) => {
        return (
            <>
                <div className={`${chargeUnitPrefix}-connector-title-container`}>
                    <h4 className={`${chargeUnitPrefix}-connector-title font-bold text-gray-700 mb-4`}>
                        Konnektörler: {connectorCount}
                    </h4>
                </div>
                <div className={`${chargeUnitPrefix}-connectors-list-container`}>
                    {
                        connectorCount > 0 && connectors.map(connectorList => {
                            const key: number = Number(Object.keys(connectorList)[0]);
                            const values = connectorList[key];

                            return (
                                <div className={`${chargeUnitPrefix}-connector-list-item-container flex flex-col`} key={key}>
                                    {
                                        values.map((value, index) => (
                                            value.stationChargePointId === chargeUnit.chargePointId && (
                                                <div className={`${chargeUnitPrefix}-connector-list-item w-full flex flex-row w-full items-center justify-between`} key={index}>
                                                    <p key={`${key}-${index + 1}`}>
                                                        <span className='font-bold'>{index + 1}</span>. {value.id}
                                                    </p>
                                                    <Button
                                                        buttonText={``}
                                                        className="connector-add-button rounded-md px-4 py-2 mx-4"
                                                        type={'button'}
                                                        dataAttributes={{
                                                            'data-charge-point-id': chargeUnit.chargePointId.toString(),
                                                            'data-charge-point-model-id': chargeUnit.modelId.toString(),
                                                        }}
                                                        onClick={() => setAddConnector(true)}
                                                    >
                                                        <FaPlugCirclePlus />
                                                    </Button>
                                                </div>
                                            )
                                        ))
                                    }
                                </div>
                            )
                        })
                    }
                </div >
            </>
        )
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
    const handleClick = (event: React.MouseEvent) => {
        const chargeUnitId = event.currentTarget.getAttribute(`data-charge-unit-model-id`);
        setSelectedBrand(parseInt(chargeUnitId || '0'));

        dispatch(toggleModalVisibility(isModalVisible));
    };

    useEffect(() => {
        // getConnectorBrands();
    }, []);

    return (
        <div className={`${sectionPrefix}-content py-8`}>
            <div className={`${sectionPrefix}-header flex justify-end mb-10`}>
                <Button
                    buttonText={``}
                    className={`${sectionPrefix}-add-button bg-primary bg-primary text-white rounded-md px-4 py-2 mx-2`}
                    type="button"
                    onClick={() => {
                        setAddChargeUnit(true);
                        dispatch(toggleModalVisibility(isModalVisible));
                    }}
                >
                    <FaChargingStation />
                </Button>
            </div>
            <div className={`${sectionPrefix}-list`}>
                {
                    chargeUnits.length > 0 &&
                    chargeUnits.map((chargeUnit, index) => (
                        <div
                            className={`${chargeUnitPrefix}-item flex justify-between items-baseline border-b-2 border-gray-200 py-4`}
                            data-charge-point-id={chargeUnit.chargePointId}
                            key={index}
                        >
                            <div className={`${chargeUnitPrefix}-item-info-container w-full`}>
                                <div className={`${chargeUnitPrefix}-info flex justify-between w-full`}>
                                    <div className={`${chargeUnitPrefix} flex justify-between w-full`}>
                                        <div className={`${chargeUnitPrefix}-name-container`}>
                                            <h3 className={`${chargeUnitPrefix}-name text-lg font-bold text-heading`}>
                                                {chargeUnit.model}
                                            </h3>
                                            <div className={`${chargeUnitPrefix}-device-code-container`}>
                                                <h3 className={`${chargeUnitPrefix}-device-code text-lg font-bold text-text`}>
                                                    {chargeUnit.deviceCode || '9034009212'}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className={`${chargeUnitPrefix}-actions-container mx-2`}>
                                            <div className={`${chargeUnitPrefix}-actions mx-2`}>
                                                <Button
                                                    buttonText={``}
                                                    className={`${chargeUnitPrefix}-edit-button bg-primary text-white rounded-md px-4 py-2 mx-2`}
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
                                                    className={`${chargeUnitPrefix}-delete-button bg-secondary text-white rounded-md px-4 py-2`}
                                                    type={'button'}
                                                >
                                                    <FaTrash />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${chargeUnitPrefix}-connectors-container`}>
                                    <div className={`${chargeUnitPrefix}-connectors pt-12 pl-4 mx-2 w-full`}>
                                        <div className={`${chargeUnitPrefix}-info-container flex justify-between flex-col`}>
                                            {
                                                createConnectorList(chargeUnit)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ChargeUnitsContent;
