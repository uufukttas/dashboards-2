import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button } from '@projects/button';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { RootState } from '../../../../app/redux/store';


interface IChargeUnitsContentProps {
    slug: string;
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
    model: string;
    ocppVersion: number;
    sendRoaming: boolean;
    stationId: number;
    status: string;
};

const initialChargeUnitsStateValue = {
    chargePointId: 2026,
    connectorNumber: 1,
    connectorId: 1,
    count: 1,
    deviceCode: '9081000201',
    externalAddress: '',
    internalAddress: '',
    investor: 'Operatör',
    isFreePoint: false,
    lastHeartBeat: '',
    limitedUsage: false,
    model: 'Gersan',
    ocppVersion: 1500,
    sendRoaming: true,
    stationId: 2022,
    status: 'Kullanılabilir',
};

const ChargeUnitsContent = ({ slug }: IChargeUnitsContentProps) => {
    const dispatch = useDispatch();
    const [chargeUnits, setChargeUnits] = useState<IChargeUnitsProps[]>([initialChargeUnitsStateValue]);
    const isModalVisible = useSelector(
        (state: RootState) => state.isModalVisibleReducer.isModalVisible
    );

    const getChargeUnits = () => {
        axios
            .post(
                'https://sharztestapi.azurewebsites.net/ServicePoint/GetStationSettings',
                JSON.stringify({ stationId: Number(slug), PageNumber: 1, PageSize: 5 }),
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((response) => response.data.data)
            .then((data) => {
                setChargeUnits(data);
            })
            .catch((error) => console.log(error));
    };

    const handleClick = (event: React.MouseEvent) => {
        const chargeUnitId = event.currentTarget.getAttribute(
            'data-charge-point-id'
        );

        if (chargeUnitId) {
            console.log(chargeUnitId); //TO DO: Set Modal Input Value from Request
        }

        dispatch(toggleModalVisibility(isModalVisible));
    };

    useEffect(() => {
        getChargeUnits();
    }, []);

    return (
        <div className="charge-units-content py-8">
            <div className="charge-units-header flex justify-end">
                <Button
                    buttonText={`Ekle`}
                    className="charge-units-add-button bg-primary bg-primary text-white rounded-md px-4 py-2 mx-2"
                    type="button"
                    onClick={handleClick}
                />
            </div>
            <div className="charge-units-list">
                {chargeUnits.map((chargeUnit, index) => (
                    <div
                        className="charge-unit flex justify-between items-baseline border-b-2 border-gray-200 py-4"
                        key={index}
                        data-charge-point-id={chargeUnit.chargePointId}
                    >
                        <div className="charge-unit-info">
                            <h3 className="charge-unit-name text-lg font-bold text-heading">
                                {chargeUnit.model}
                            </h3>
                            <div className="charge-unit-connector-number">
                                <h3 className="charge-unit-connector-number-label text-lg font-bold text-text">
                                    {chargeUnit.deviceCode || '90'}
                                </h3>
                                <p>
                                    {
                                        // console.log(getConnectors(chargeUnit.chargePointId))
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="charge-unit-actions mx-2">
                            <Button
                                buttonText={`Düzenle`}
                                className="charge-unit-edit-button bg-primary text-white rounded-md px-4 py-2 mx-2"
                                dataAttributes={{
                                    'data-charge-point-id': chargeUnit.chargePointId.toString(),
                                }}
                                type={'button'}
                                onClick={handleClick}
                            />
                            <Button
                                buttonText={'Sil'}
                                className="charge-unit-delete-button bg-secondary text-white rounded-md px-4 py-2"
                                type={'button'}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChargeUnitsContent;
