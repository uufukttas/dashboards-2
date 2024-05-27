import React, { useEffect, useState } from 'react';
import { FaPencil, FaPlugCirclePlus, FaTrash } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import ConnectorInfo from './ConnectorInfo';
import Accordion from '../../Accordion/Accordion';
import {
    getChargePointFeatureStatus,
    getChargePointInvestors,
    getChargeUnitFeatureValuesRequest,
    getConnectorModels
} from '../../../../app/api/servicePointDetails';
import { setChargeUnitData } from '../../../../app/redux/features/chargeUnitData';
import { setConnectorProperty } from '../../../../app/redux/features/connectorProperty';
import { showDialog } from '../../../../app/redux/features/dialogInformation';
import isConnectorUpdated from '../../../../app/redux/features/isConnectorUpdated';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { setAddChargeUnit, setAddConnector } from '../../../../app/redux/features/setVisibleModal';
import { RootState } from '../../../../app/redux/store';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import type {
    IAccessTypeListItemProps,
    IChargeUnitsContentProps,
    IChargeUnitsProps,
    IConnectorBrandProps,
    IInvestorsProps,
    IGetChargePointStationFeatureData,
    IGetChargePointStationFeatureResponse,
    IStatusListItemProps,
    IConnectorStateProps,
} from '../types';

const ChargeUnitsContent: React.FC<IChargeUnitsContentProps> = ({ chargeUnits, slug }: IChargeUnitsContentProps) => {
    const chargeUnitPrefix = `${BRAND_PREFIX}-charge-unit`;
    const sectionPrefix = `${BRAND_PREFIX}-charge-units`;
    const dispatch = useDispatch();
    const connectorList = useSelector((state: RootState) => state.setConnectors.connectors);
    const [connectorTypes, setConnectorTypes] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(1);
    const [connectorUpdate, setConnectorUpdate] = useState(false);

    const buildChargeUnitRequestBody = (
        accessTypeId: string,
        chargePoint: IChargeUnitsProps,
        features: IGetChargePointStationFeatureData[],
        investorId: number,
        statusId: string,
    ) => {
        return ({
            chargePoint: {
                code: chargePoint.deviceCode.toString(),
                ExternalOCPPAdress: null,
                InternalOCPPAdress: null,
                isFreePoint: chargePoint.isFreePoint,
                isOnlyDefinedUserCards: chargePoint.limitedUsage,
                ocppVersion: chargePoint.ocppVersion,
                ownerType: investorId,
                isActive: false,
                isDeleted: true,
                sendRoaming: false,
                stationId: Number(slug),
                stationChargePointModelID: chargePoint.modelId,
            },
            chargePointFeatures: [
                {
                    stationChargePointFeatureType: 1,
                    stationChargePointFeatureTypeValue: statusId.toString(),
                    ...(features.length > 0 && { id: features[0].id }),
                },
                {
                    stationChargePointFeatureType: 2,
                    stationChargePointFeatureTypeValue: accessTypeId.toString(),
                    ...(features.length > 0 && { id: features[1].id }),
                }, {
                    stationChargePointFeatureType: 3,
                    stationChargePointFeatureTypeValue: (chargePoint.location || '').toString(),
                    ...(features.length > 0 && { id: features[2].id }),
                }
            ],
            connectorCount: chargePoint.connectorNumber,
        });
    };
    const createConnectorDropdownItems = () => {
        return connectorTypes.map((connectorType: IConnectorBrandProps) => {
            return {
                id: connectorType.connectorTypeId,
                name: connectorType.displayName,
                rid: null,
            };
        });
    };
    const getChargeUnitInfo = (chargeUnitId: number) => {
        return chargeUnits.filter(chargeUnit => chargeUnit.chargePointId === chargeUnitId);
    };
    const getChargeUnitLocation = async (chargePointId: string) => {
        const location = await getChargeUnitFeatureValuesRequest(chargePointId);

        return location.data[2].stationChargePointFeatureTypeValue;
    };
    const getChargeUnitStatus = (date: string) => {
        return new Date(date).getTime() > new Date().getTime() - (10 * 10 * 60 * 10 * 15);
    };
    const getConnectorTypes = async () => {
        const response = await getConnectorModels(selectedBrand.toString());

        setConnectorTypes(response.data);
        createConnectorDropdownItems();
    };
    const getStationFeaturesId = async (chargePointId: string) => {
        try {
            const data = await getChargeUnitFeatureValuesRequest(chargePointId);

            return data;
        } catch (error) {
            return error;
        }
    };
    const getGetChargePointFeaturesStatus = async (status: string, accessType: string) => {
        try {
            const data = await getChargePointFeatureStatus();

            const statusIds = data.data.statusList.filter((statusItem: IStatusListItemProps) => {
                return statusItem.name.toLowerCase() === status.toLowerCase();
            });
            const accessTypeIds = data.data.accessTypeList.filter((accessTypeListItem: IAccessTypeListItemProps) => {
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
            const investors = await getChargePointInvestors();

            const selectedInvestor = investors.data.filter((investor: IInvestorsProps) => {
                if (investor.name.toLowerCase() === investorName.toLowerCase()) {
                    return investor.id;
                };
            });

            return selectedInvestor[0].id;
        } catch (error) {
            console.log(error);
        };
    };
    const handleDelete = async (event: React.MouseEvent) => {
        const chargePointId = event.currentTarget.getAttribute(`data-charge-point-id`) || '0';

        const featuresData: IGetChargePointStationFeatureResponse = await getStationFeaturesId(chargePointId);
        const features = featuresData.data;

        const deletedChargeUnit = chargeUnits.filter(chargeUnit => chargeUnit.chargePointId === Number(chargePointId));

        const investorId = await getInvestorId((deletedChargeUnit[0].investor));
        const { statusId, accessTypeId } = await getGetChargePointFeaturesStatus(
            deletedChargeUnit[0].hoStatus, deletedChargeUnit[0].accessType
        );

        const getRequestBody =
            buildChargeUnitRequestBody(accessTypeId, deletedChargeUnit[0], features, investorId, statusId);

        dispatch(
            showDialog({
                actionType: 'deleteChargePoint',
                data: getRequestBody,
            })
        )
    };
    const handleUpdate = async (event: React.MouseEvent) => {
        const chargeUnitId = event.currentTarget.getAttribute(`data-charge-point-id`);
        const deviceCode = event.currentTarget.getAttribute(`data-charge-point-device-code`);
        const chargeUnitInfo = getChargeUnitInfo(parseInt(chargeUnitId || '0'));
        const investorId = await getInvestorId((chargeUnitInfo[0].investor));
        const { statusId, accessTypeId } = await getGetChargePointFeaturesStatus(
            chargeUnitInfo[0].hoStatus, chargeUnitInfo[0].accessType
        );
        const location = await getChargeUnitLocation(chargeUnitId || '0');

        dispatch(setAddChargeUnit(true));
        dispatch(
            setChargeUnitData({
                code: deviceCode,
                brandId: chargeUnitInfo[0].modelId,
                connectorCount: chargeUnitInfo[0].connectorNumber,
                ocppVersion: chargeUnitInfo[0].ocppVersion,
                investor: investorId,
                status: statusId,
                accessType: accessTypeId,
                location: location,
                isFreeUsage: chargeUnitInfo[0].isFreePoint,
                isLimitedUsage: chargeUnitInfo[0].limitedUsage,
                chargePointId: parseInt(chargeUnitId || '0'),
            })
        );
        setSelectedBrand(parseInt(chargeUnitId || '0'));
        dispatch(toggleModalVisibility(true));
        setConnectorUpdate(true);
    };
    const prepareTime = (date: string | null) => {
        if (date === null) {
            return ``;
        };

        const dateArray = date.split('T');
        const timeArray = dateArray[1].split(':');

        return `${dateArray[0]} ${timeArray[0]}:${timeArray[1]}`;
    };
    const renderConnectors = (chargePointId: number) => {

        return connectorList.map((chargeUnitConnectors: IConnectorStateProps[][][]) => {
            return chargeUnitConnectors.map((connectors: IConnectorStateProps[][]) => {
                return connectors.map((connector: IConnectorStateProps[], idx: number) => {
                    return connector.map((connectorItem: IConnectorStateProps, connectorIndex: number) => {
                        if (connectorItem.stationChargePointID === chargePointId && idx + 1 === connectorItem.connectorNr) {
                            const connectorId = connectorItem.RID;
                            return (
                                <div
                                    className={`${chargeUnitPrefix}-connector-list-item w-full flex flex-row items-baseline justify-between`}
                                    key={connectorIndex}
                                >
                                    <div className={`${chargeUnitPrefix}-connector-list-item-name-container p-2`}>
                                        <p
                                            className={`${chargeUnitPrefix}-connector-list-item-name text-lg font-bold text-heading`}
                                            key={`${connectorIndex}-${connectorIndex + 1}`}
                                        >
                                            <span className='font-bold'>{connectorIndex + 1}</span>.
                                        </p>
                                    </div>
                                    <div className={`${chargeUnitPrefix}-connector-list-item-content-container flex w-full justify-evenly p-2`}>
                                        <p
                                            className={`${chargeUnitPrefix}-connector-list-item-epdk text-lg text-text p-2`}
                                        >
                                            {connectorItem.epdkSocketNumber || 'EPDK Soket Numarası Yok'}
                                        </p>
                                        <p
                                            className={`${chargeUnitPrefix}-connector-list-item-kw text-lg text-text p-2`}
                                        >
                                            <ConnectorInfo connectorId={connectorId} />
                                        </p>
                                    </div>
                                    <Button
                                        buttonText={""}
                                        className="connector-add-button rounded-md px-4 py-2 mx-4"
                                        dataAttributes={{
                                            'data-charge-point-id': connectorItem.stationChargePointID.toString(),
                                            'data-charge-point-model-id': connectorItem.modelID.toString(),
                                            'data-connector-nr': connectorItem.connectorNr.toString(),
                                            'data-connector-id': connectorItem.RID.toString(),
                                        }}
                                        id={`${chargeUnitPrefix}-connector-add-button`}
                                        type={'button'}
                                        onClick={() => {
                                            dispatch(setAddChargeUnit(false));
                                            dispatch(setAddConnector(true));
                                            dispatch(toggleModalVisibility(true));
                                            dispatch(setConnectorProperty({
                                                chargePointModelId: connectorItem.modelID,
                                                chargePointId: connectorItem.stationChargePointID,
                                                connectorNumber: connectorItem.connectorNr,
                                                connectorId: connectorItem.RID,
                                            }));
                                        }}
                                    >
                                        <FaPlugCirclePlus />
                                    </Button>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    });
                });
            });
        });
    };

    useEffect(() => {
        setConnectorUpdate(true);
    }, []);

    useEffect(() => {
        getConnectorTypes();
    }, [chargeUnits, isConnectorUpdated]);

    return (
        <div className={`${sectionPrefix}-content py-8`}>
            <div className={`${sectionPrefix}-list`}>
                {
                    chargeUnits.map((chargeUnit, index) => {
                        const createAccordionTitle = () => {
                            return (
                                <div className={`${sectionPrefix}-info flex justify-between w-full`}>
                                    <div className={`${sectionPrefix} flex justify-between w-full`}>
                                        <div className={`${sectionPrefix}-name-container`}>
                                            <h3 className={`${chargeUnitPrefix}-name text-lg font-bold text-heading flex items-center text-[#FFF]`}>
                                                {getChargeUnitStatus(chargeUnit.lastHeartBeat)
                                                    ? (<div className='bg-green-500 rounded-full h-4 w-4 mr-2'></div>)
                                                    : (<div className='bg-red-500 rounded-full h-4 w-4 mr-2'></div>)
                                                }
                                                {`${chargeUnit.model}`}
                                            </h3>
                                            <div className={`${chargeUnitPrefix}-device-code-container`}>
                                                <h3 className={`${chargeUnitPrefix}-device-code text-lg font-bold text-[#FFF]`}>
                                                    {chargeUnit.deviceCode}
                                                </h3>
                                            </div>
                                            <div className={`${chargeUnitPrefix}-time-container`}>
                                                <h3 className={`${chargeUnitPrefix}-time text-lg text-text`}>
                                                    {`${prepareTime(chargeUnit.lastHeartBeat)}`}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className={`${sectionPrefix}-actions-container mx-2 flex items-center justify-center`}>
                                            <div className={`${chargeUnitPrefix}-actions mx-2 `}>
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
                            );
                        }

                        return (
                            <Accordion
                                accordionTitle={createAccordionTitle()}
                                backgroundColor='secondary text-[#FFF] '
                                isAccordionOpen={false}
                                titleClassName={`w-full flex jsutiify-evenly items-center`}
                                key={index}
                            >
                                <div className={`${sectionPrefix}-connectors-container text-white`}>
                                    <div className={`${sectionPrefix}-connectors pt-12 pl-4 mx-2 w-full`}>
                                        <div className={`${chargeUnitPrefix}-connector-info flex justify-between flex-col`}>
                                            <div className={`${chargeUnitPrefix}-connector-list-container`}>
                                                {
                                                    connectorUpdate &&
                                                    renderConnectors(chargeUnit.chargePointId)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Accordion>
                        );
                    })
                }
            </div>
        </div >
    );
};

export default ChargeUnitsContent;
