import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChargingStation, FaPencil, FaPlugCirclePlus, FaTrash } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { setChargeUnitData } from '../../../../app/redux/features/chargeUnitData';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { RootState } from '../../../../app/redux/store';
import type {
    IChargeUnitsContentProps,
    IConnectorBrandProps,
    IInvestorsProps,
    IGetChargePointStationFeatureData,
    IGetChargePointStationFeatureResponse,
    IStatusListItemProps,
    IAccessTypeListItemProps
} from '../types';

const ChargeUnitsContent = ({
    chargeUnits, connectors, slug, setAddChargeUnit, setAddConnector
}: IChargeUnitsContentProps) => {
    const sectionPrefix = 'charge-units';
    const chargeUnitPrefix = 'charge-unit';
    const dispatch = useDispatch();
    const isModalVisible = useSelector((state: RootState) => state.isModalVisibleReducer.isModalVisible);
    const [connectorBrands, setConnectorBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(0);

    const createDropdownItems = () => {
        return connectorBrands.map((connectorBrand: IConnectorBrandProps) => {
            return {
                id: connectorBrand.connectorTypeId,
                name: connectorBrand.displayName,
                rid: null,
            };
        });
    };
    const createReqData = (features: IGetChargePointStationFeatureData[], deviceCode: string) => {
        return ({
            "connectorCount": 4,
            "chargePoint": {
                "code": deviceCode,
                "stationId": parseInt(slug),
                "ownerType": 0,
                "stationChargePointModelID": 1,
                "ocppVersion": 1600,
                "isFreePoint": true,
                "InternalOCPPAdress": null,
                "ExternalOCPPAdress": null,
                "isActive": false,
                "isDeleted": true,
                "isOnlyDefinedUserCards": true,
                "sendRoaming": false
            },
            "chargePointFeatures": [
                {
                    "id": features[0]?.id || 0,
                    "stationChargePointFeatureType": 1,
                    "stationChargePointFeatureTypeValue": "1"
                },
                {
                    "id": features[1]?.id || 0,
                    "stationChargePointFeatureType": 2,
                    "stationChargePointFeatureTypeValue": "2"
                }
            ]
        });
    };
    const getChargeUnitInfo = (chargeUnitId: number) => {
        return chargeUnits.filter(chargeUnit => {
            if (chargeUnit.chargePointId === chargeUnitId) {
                return chargeUnit;
            };
        });
    };
    const getConnectorBrands = () => {
        axios
            .post(
                process.env.GET_CONNECTOR_MODELS || '',
                { brandId: selectedBrand },
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then(response => {
                setConnectorBrands(response.data.data);
                createDropdownItems();
            });
    };
    const getFeaturesId = async (chargePointId: number) => {
        try {
            const data = await axios
                .post(
                    process.env.GET_CHARGE_POINT_STATION_FEATURE || '',
                    { "StationChargePointID": Number(chargePointId) },
                    { headers: { 'Content-Type': 'application/json' } }
                );

            return data.data;
        } catch (error) {
            return error;
        }
    };
    const getGetChargePointFeaturesStatus = async (status: string, accessType: string) => {
        try {
            const { data: { data } } = await axios.get(process.env.GET_CHARGE_POINT_FEATURES || '');

            const statusIds = data.statusList.filter((statusItem: IStatusListItemProps) => {
                return statusItem.name.toLowerCase() === status.toLowerCase();
            });
            const accessTypeIds = data.accessTypeList.filter((accessTypeListItem: IAccessTypeListItemProps) => {
                return accessTypeListItem.name.toLowerCase() === accessType.toLowerCase();
            });

            const statusId = statusIds.length > 0 ? statusIds[0].id : 0;
            const accessTypeId = accessTypeIds.length > 0 ? accessTypeIds[0].id : 0;

            return { statusId, accessTypeId };
        } catch (error) {
            console.log(error);
            return { statusId: null, accessTypeId: null };
        };
    };
    const getInvestorId = async (investorName: string) => {
        try {
            const investor = await axios
                .get(process.env.GET_INVESTORS || '')
                .then((response) => response.data)
                .then((response) => {
                    return response.data.filter((investor: IInvestorsProps) => {
                        if (investor.name.toLowerCase() === investorName.toLowerCase()) {
                            return investor.id;
                        };
                    });
                })
                .catch((error) => console.log(error));

            return investor[0].id;
        } catch (error) {
            console.log(error);
        };
    };
    const getLocation = async (chargePointId: string) => {
        const location = await axios
            .post(
                process.env.GET_CHARGE_POINT_STATION_FEATURE || '',
                { "StationChargePointID": Number(chargePointId) },
                { headers: { 'Content-Type': 'application/json' } }
            );

        return location.data.data[2].stationChargePointFeatureTypeValue;
    }
    const handleDelete = async (event: React.MouseEvent) => {
        const chargePointId = event.currentTarget.getAttribute(`data-charge-point-id`) || '0';
        const deviceCode = event.currentTarget.getAttribute(`data-charge-point-device-code`) || '0';

        try {
            const featuresData: IGetChargePointStationFeatureResponse = await getFeaturesId(parseInt(chargePointId));
            const features = featuresData.data;

            await axios.post(
                process.env.UPDATE_STATION_SETTINGS || '',
                JSON.stringify(createReqData(features, deviceCode)),
                { headers: { 'Content-Type': 'application/json' } }
            );
        } catch (error) {
            console.log(error);
        };
    };
    const handleUpdate = async (event: React.MouseEvent) => {
        const chargeUnitId = event.currentTarget.getAttribute(`data-charge-point-id`);
        const chargeUnitInfo = getChargeUnitInfo(parseInt(chargeUnitId || '0'));
        const investorId = await getInvestorId((chargeUnitInfo[0].investor));
        const { statusId, accessTypeId } = await getGetChargePointFeaturesStatus(
            chargeUnitInfo[0].hoStatus, chargeUnitInfo[0].accessType
        );
        const location = await getLocation(chargeUnitId || '0');

        setAddChargeUnit(true);
        dispatch(setChargeUnitData({
            brandId: chargeUnitInfo[0].modelId,
            connectorCount: chargeUnitInfo[0].connectorNumber,
            ocppVersion: chargeUnitInfo[0].ocppVersion === '1600' ? 1 : 2,
            investor: investorId,
            status: statusId,
            accessType: accessTypeId,
            location: location,
            isFreeUsage: chargeUnitInfo[0].isFreePoint,
            isLimitedUsage: chargeUnitInfo[0].limitedUsage,
        }));
        setSelectedBrand(parseInt(chargeUnitId || '0'));
        dispatch(toggleModalVisibility(isModalVisible));
    };

    useEffect(() => {
        getConnectorBrands();
    }, [chargeUnits]);

    return (
        <div className={`${sectionPrefix}-content py-8`}>
            <div className={`${sectionPrefix}-header flex justify-end mb-10`}>
                <Button
                    buttonText={``}
                    className={`${sectionPrefix}-add-button bg-primary bg-primary text-white rounded-md px-4 py-2 mx-2`}
                    id={`${sectionPrefix}-add-button`}
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
                    chargeUnits.map((chargeUnit, index) => {
                        return (
                            <div
                                className={`${sectionPrefix}-container flex justify-between items-baseline border-t-2 border-gray-200 py-4`}
                                data-charge-point-id={chargeUnit.chargePointId}
                                key={index}
                            >
                                <div className={`${sectionPrefix}-item-info-container w-full`}>
                                    <div className={`${sectionPrefix}-info flex justify-between w-full`}>
                                        <div className={`${sectionPrefix} flex justify-between w-full`}>
                                            <div className={`${sectionPrefix}-name-container`}>
                                                <h3 className={`${chargeUnitPrefix}-name text-lg font-bold text-heading`}>
                                                    {chargeUnit.model}
                                                </h3>
                                                <div className={`${chargeUnitPrefix}-device-code-container`}>
                                                    <h3 className={`${chargeUnitPrefix}-device-code text-lg font-bold text-text`}>
                                                        {chargeUnit.deviceCode || '9034009212'}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className={`${sectionPrefix}-actions-container mx-2`}>
                                                <div className={`${chargeUnitPrefix}-actions mx-2`}>
                                                    <Button
                                                        buttonText={``}
                                                        className={`${chargeUnitPrefix}-edit-button bg-primary text-white rounded-md px-4 py-2 mx-2`}
                                                        dataAttributes={{
                                                            'data-charge-point-id': chargeUnit.chargePointId.toString(),
                                                            'data-charge-point-device-code': chargeUnit.deviceCode.toString(),
                                                        }}
                                                        id={`${chargeUnitPrefix}-edit-button`}
                                                        type={'button'} onClick={handleUpdate}
                                                    >
                                                        <FaPencil />
                                                    </Button>
                                                    <Button
                                                        buttonText={''}
                                                        className={`${chargeUnitPrefix}-delete-button bg-secondary text-white rounded-md px-4 py-2`}
                                                        dataAttributes={{
                                                            'data-charge-point-id': chargeUnit.chargePointId.toString(),
                                                            'data-charge-point-device-code': chargeUnit.deviceCode.toString(),
                                                        }}
                                                        id={`${chargeUnitPrefix}-delete-button`}
                                                        type={'button'}
                                                        onClick={(event) => handleDelete(event)}
                                                    >
                                                        <FaTrash />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${sectionPrefix}-connectors-container`}>
                                        <div className={`${sectionPrefix}-connectors pt-12 pl-4 mx-2 w-full`}>
                                            <div className={`${chargeUnitPrefix}-info-container flex justify-between flex-col`}>
                                                <div className={`${chargeUnitPrefix}-connector-title-container`}>
                                                    <h4 className={`${chargeUnitPrefix}-connector-title font-bold text-gray-700 mb-4`}>
                                                        Konnektörler: {chargeUnit.connectorNumber}
                                                    </h4>
                                                </div>
                                                <div className={`${chargeUnitPrefix}-connector-list-container`}>
                                                    {
                                                        connectors.map((connectorList, index) => {
                                                            return connectorList[chargeUnit.chargePointId]?.reverse().map((connector, idx) => {
                                                                return (
                                                                    <div
                                                                        className={`${chargeUnitPrefix}-connector-list-item w-full flex flex-row w-full items-center justify-between`}
                                                                        key={idx}
                                                                    >
                                                                        <div className={`${chargeUnitPrefix}-connector-list-item-name-container`}>
                                                                            <p
                                                                                className={`${chargeUnitPrefix}-connector-list-item-name text-lg font-bold text-heading`}
                                                                                key={`${index}-${index + 1}`}
                                                                            >
                                                                                <span className='font-bold'>{idx + 1}</span>.
                                                                            </p>
                                                                        </div>
                                                                        <div className={`${chargeUnitPrefix}-connector-list-item-epdk-container`}>
                                                                            <p
                                                                                className={`${chargeUnitPrefix}-connector-list-item-epdk text-lg text-text`}
                                                                            >
                                                                                {chargeUnit.deviceCode}
                                                                            </p>
                                                                        </div>
                                                                        <Button
                                                                            buttonText={``}
                                                                            className="connector-add-button rounded-md px-4 py-2 mx-4"
                                                                            dataAttributes={{
                                                                                'data-charge-point-id': chargeUnit.chargePointId.toString(),
                                                                                'data-charge-point-model-id': chargeUnit.modelId.toString(),
                                                                            }}
                                                                            id={`${chargeUnitPrefix}-connector-add-button`}
                                                                            type={'button'}
                                                                            onClick={() => setAddConnector(true)}
                                                                        >
                                                                            <FaPlugCirclePlus />
                                                                        </Button>
                                                                    </div>
                                                                );
                                                            });
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div >
    );
};

export default ChargeUnitsContent;
