import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaPencil, FaPlugCirclePlus, FaQrcode, FaTrash } from 'react-icons/fa6';
import { TbProgressBolt } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { Tooltip } from '@projects/tooltip';
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
import { setAddChargeUnit, setAddConnector, setManageStation } from '../../../../app/redux/features/setVisibleModal';
import { RootState } from '../../../../app/redux/store';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import { Button as PrimeButton } from 'primereact/button';
import type {
    IChargeUnitsContentProps,
    IChargeUnitsProps,
    IFeatureTypeListProps,
    IInvestorsProps,
    IGetChargePointStationFeatureData,
    IGetChargePointStationFeatureResponse,
    IConnectorStateProps,
    IConnectorModel,
} from '../types';
import { Card } from '@projects/card';


const ChargeUnitsContent: React.FC<IChargeUnitsContentProps> = ({ chargeUnits, slug }: IChargeUnitsContentProps) => {
    const chargeUnitPrefix: string = `${BRAND_PREFIX}-charge-unit`;
    const sectionPrefix: string = `${BRAND_PREFIX}-charge-units`;
    const dispatch = useDispatch();
    const connectorList = useSelector((state: RootState) => state.setConnectors.connectors);
    const [connectorTypes, setConnectorTypes] = useState<IConnectorModel[]>([]);
    const [selectedBrand, setSelectedBrand] = useState(1);
    const [connectorUpdate, setConnectorUpdate] = useState(false);
    const [showDetails, setShowDetails] = useState(false);


    const buildChargeUnitRequestBody = (
        accessTypeId: number,
        chargePoint: IChargeUnitsProps,
        features: IGetChargePointStationFeatureData[],
        investorId: number,
        statusId: number,
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
    const createConnectorDropdownItems = (): IFeatureTypeListProps[] => {
        return connectorTypes.map((connectorType: IConnectorModel) => {
            return {
                id: connectorType.stationChargePointModelConnectorId,
                name: connectorType.displayName,
                rid: null,
            };
        });
    };
    const createConnectors = (chargeUnit: IChargeUnitsProps): React.ReactNode => {
        return (
            <div className={`${sectionPrefix}-connectors-container text-text w-full`}>
                <div className={`${sectionPrefix}-connectors pt-4 w-full`}>
                    <div className={`${chargeUnitPrefix}-connector-info flex justify-between flex-col`}>
                        <div className={`${chargeUnitPrefix}-connector-list-container text-text`}>
                            {
                                connectorUpdate &&
                                renderConnectors(chargeUnit)
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    };
    const getChargeUnitInfo = (chargeUnitId: number): IChargeUnitsProps => {
        return chargeUnits.filter(chargeUnit => chargeUnit.chargePointId === chargeUnitId)[0];
    };
    const getChargeUnitLocation = async (chargePointId: string) => {
        const location = await getChargeUnitFeatureValuesRequest(chargePointId);

        return location.data[2].stationChargePointFeatureTypeValue;
    };
    const getChargeUnitStatus = (date: string): boolean => {
        return new Date(date).getTime() > new Date().getTime() - (10 * 10 * 60 * 10 * 10);
    };
    const getConnectorTypes = async (): Promise<void> => {
        const response = await getConnectorModels(selectedBrand.toString());

        setConnectorTypes(response.data);
        createConnectorDropdownItems();
    };
    const getStationFeaturesId = async (chargePointId: string): Promise<IGetChargePointStationFeatureResponse> => {
        const data = await getChargeUnitFeatureValuesRequest(chargePointId);

        return data;
    };
    const getGetChargePointFeaturesStatus =
        async (status: string, accessType: string): Promise<{ accessTypeId: number; statusId: number }> => {
            const data = await getChargePointFeatureStatus();

            const statusIds = data.data.statusList.filter((statusItem: IFeatureTypeListProps) => {
                return statusItem.name.toLowerCase() === status.toLowerCase();
            });
            const accessTypeIds = data.data.accessTypeList.filter((accessTypeListItem: IFeatureTypeListProps) => {
                return accessTypeListItem.name.toLowerCase() === accessType.toLowerCase();
            });

            const statusId = statusIds.length > 0 ? statusIds[0].id : 0;
            const accessTypeId = accessTypeIds.length > 0 ? accessTypeIds[0].id : 0;

            return { statusId, accessTypeId };
        };
    const getInvestorId = async (investorName: string): Promise<number> => {
        const investors = await getChargePointInvestors();

        if (investors.data.length === 0) {
            return 0;
        };

        const selectedInvestor: IInvestorsProps[] = investors.data.filter((investor: IInvestorsProps) => {
            if (investor.name.toLowerCase() === investorName.toLowerCase()) {
                return investor.id;
            };
        });

        return selectedInvestor[0].id;
    };
    const handleDelete = async (event: React.MouseEvent) => {
        const chargePointId: string = event.currentTarget.getAttribute(`data-charge-point-id`) || '0';
        const featuresData: IGetChargePointStationFeatureResponse = await getStationFeaturesId(chargePointId);
        const features: IGetChargePointStationFeatureData[] = featuresData.data;
        const deletedChargeUnit: IChargeUnitsProps =
            chargeUnits.filter(chargeUnit => chargeUnit.chargePointId === Number(chargePointId))[0];
        const investorId: number = await getInvestorId((deletedChargeUnit.investor));
        const { statusId, accessTypeId }: { accessTypeId: number, statusId: number, } =
            await getGetChargePointFeaturesStatus(deletedChargeUnit.hoStatus, deletedChargeUnit.accessType);

        const getRequestBody =
            buildChargeUnitRequestBody(accessTypeId, deletedChargeUnit, features, investorId, statusId);

        dispatch(
            showDialog({
                actionType: 'deleteChargePoint',
                data: getRequestBody,
            })
        );
    };
    const handleUpdate = async (event: React.MouseEvent): Promise<void> => {
        const chargeUnitId = event.currentTarget.getAttribute(`data-charge-point-id`);
        const deviceCode = event.currentTarget.getAttribute(`data-charge-point-device-code`);
        const chargeUnitInfo = getChargeUnitInfo(parseInt(chargeUnitId || '0'));
        const investorId = await getInvestorId((chargeUnitInfo.investor));
        const { statusId, accessTypeId } = await getGetChargePointFeaturesStatus(
            chargeUnitInfo.hoStatus, chargeUnitInfo.accessType
        );
        const location = await getChargeUnitLocation(chargeUnitId || '0');

        dispatch(setAddChargeUnit(true));
        dispatch(
            setChargeUnitData({
                accessType: accessTypeId,
                code: deviceCode,
                brandId: chargeUnitInfo.modelId,
                chargePointId: parseInt(chargeUnitId || '0'),
                connectorCount: chargeUnitInfo.connectorNumber,
                investor: investorId,
                isFreeUsage: chargeUnitInfo.isFreePoint,
                isLimitedUsage: chargeUnitInfo.limitedUsage,
                location: location,
                ocppVersion: chargeUnitInfo.ocppVersion,
                status: statusId,
            })
        );
        setSelectedBrand(parseInt(chargeUnitId || '0'));
        dispatch(toggleModalVisibility(true));
        setConnectorUpdate(true);
    };
    const prepareTime = (date: string | null): string => {
        if (date === null) {
            return `1990/01/01 00:00`;
        };

        const dateArray = date.split('T');
        const timeArray = dateArray[1].split(':');

        return `${dateArray[0]} ${timeArray[0]}:${timeArray[1]}`;
    };
    const renderConnectors = (chargeUnit: IChargeUnitsProps): React.ReactNode | null => {
        return connectorList.map((connector: IConnectorStateProps[], connectorIndex: number) => {
            return connector.map((connectorItem: IConnectorStateProps, idx: number) => {
                if (connectorItem.stationChargePointID === chargeUnit.chargePointId && idx + 1 === connectorItem.connectorNr) {
                    return (
                        <div
                            className={`${chargeUnitPrefix}-connector-list-item w-full flex flex-row items-center justify-between`}
                            key={connectorIndex}
                        >
                            <div className={`${chargeUnitPrefix}-connector-list-item-name-container p-2`}>
                                <p
                                    className={`${chargeUnitPrefix}-connector-list-item-name text-sm font-bold text-heading text-text`}
                                    key={`${connectorIndex}-${idx + 1}`}
                                >
                                    <span className='font-bold'>{idx + 1}</span>.
                                </p>
                            </div>
                            <div className={`${chargeUnitPrefix}-connector-list-item-content-container flex w-full text-center items-center justify-center p-2`}>
                                <p
                                    className={`${chargeUnitPrefix}-connector-list-item-kw text-sm text-text p-2 w-1/2`}
                                >
                                    <Tooltip
                                        containerClassName='tooltip text-text'
                                        text={'Konnektör Özellikleri'}
                                    >
                                        {`${connectorItem.stationConnectorName} - ${connectorItem.stationConnectorKW} - ${connectorItem.stationConnectorAC ? 'AC' : 'DC'}`}
                                    </Tooltip>
                                </p>
                                <p className={`${chargeUnitPrefix}-tariff-info text-sm text-text p-2 w-1/2`}>
                                    <Tooltip
                                        containerClassName='tooltip'
                                        text={'Tarife'}
                                    >
                                        {connectorItem.tariffSaleUnitPrice ? `${connectorItem.tariffSaleUnitPrice} TL` : '-'}
                                    </Tooltip>
                                </p>
                            </div>
                            <div className={`${chargeUnitPrefix}-connector-list-item-actions-container p-2 flex`}>
                                <Link
                                    className={`${chargeUnitPrefix}-qr-code-button rounded-md px-2 py-2 mx-4`}
                                    href={`http://192.168.3.75:91/Values/QRCodeCreate?text=${chargeUnit.deviceCode.toString()}&connectorNr=${connectorItem.connectorNr.toString()}`}
                                    id={`${chargeUnitPrefix}-qr-code-button`}
                                    target='_blank'
                                >
                                    <FaQrcode />
                                </Link>
                                <Button
                                    className="connector-add-button rounded-md px-2 py-2 mx-4"
                                    dataAttributes={{
                                        'data-charge-point-id': connectorItem.stationChargePointID.toString(),
                                        'data-charge-point-model-id': connectorItem.modelId.toString(),
                                        'data-connector-nr': connectorItem.connectorNr.toString(),
                                        'data-connector-id': connectorItem.RID.toString(),
                                        'data-device-code': chargeUnit.deviceCode.toString(),
                                    }}
                                    id={`${chargeUnitPrefix}-connector-add-button`}
                                    type={'button'}
                                    onClick={() => {
                                        dispatch(setAddChargeUnit(false));
                                        dispatch(setAddConnector(true));
                                        dispatch(toggleModalVisibility(true));
                                        dispatch(setConnectorProperty({
                                            chargePointModelId: connectorItem.modelId,
                                            chargePointId: connectorItem.stationChargePointID,
                                            connectorNumber: connectorItem.connectorNr,
                                            connectorId: connectorItem.RID,
                                        }));
                                    }}
                                >
                                    <FaPlugCirclePlus />
                                </Button>
                                <Button
                                    dataAttributes={{
                                        'data-device-code': chargeUnit.deviceCode.toString(),
                                    }}
                                    id={`${chargeUnitPrefix}-connector-process-button`}
                                    type={'button'}
                                    onClick={(event) => {
                                        dispatch(
                                            setManageStation({
                                                isVisible: true,
                                                unitCode: event.currentTarget.getAttribute('data-device-code') || '',
                                                connectorNumber: connectorItem.connectorNr,
                                            })
                                        );
                                        dispatch(toggleModalVisibility(true));
                                    }}
                                >
                                    <TbProgressBolt />
                                </Button>
                            </div>
                        </div>
                    );
                } else {
                    return null;
                }
            });
        });
    };

    const setConnectorProperties = (chargeUnits: IChargeUnitsProps[]): void => {
        console.log('chargeUnits', chargeUnits)
    };

    useEffect(() => {
        setConnectorUpdate(true);
        setConnectorProperties(chargeUnits);
        console.log('connectorList', connectorList)
    }, []);

    useEffect(() => {
        getConnectorTypes();
    }, [chargeUnits, isConnectorUpdated]);

    return (
        <div className={`${sectionPrefix}-content p-4 rounded-b-md`}>
            <div className={`${sectionPrefix}-list flex flex-wrap w-full justify-between`}>
                {
                    connectorList.map((connector, index) => {
                        return (
                            connector.map((connectorItem, idx) => {
                                return (
                                    <Card
                                        BRAND_PREFIX={BRAND_PREFIX}
                                        containerClassName={`${BRAND_PREFIX}-charge-unit-card-container text-text font-bold flex flex-col rounded-md w-1/4 m-4 h-[250px]`}
                                        key={index}
                                    >
                                        <div className={`${BRAND_PREFIX}-charge-unit-card-header flex justify-evenly items-center p-4`}>
                                            {
                                                getChargeUnitStatus(connector.lastHeartBeat)
                                                    ? (<div className='bg-green-500 rounded-full h-4 w-4'></div>)
                                                    : (<div className='bg-red-500 rounded-full h-4 w-4'></div>)
                                            }
                                            {
                                                <div className='flex flex-col justify-between h-full'>
                                                    {chargeUnits[index].model}
                                                </div>
                                            }
                                            {
                                                <div className={`${BRAND_PREFIX}-charge-unit-card-actions flex justify-between items-center`}>
                                                    {chargeUnits[index].deviceCode}
                                                </div>
                                            }
                                        </div>
                                        <hr className="text-text w-full" />
                                        <div className={`${BRAND_PREFIX}-charge-unit-card-content flex flex-col justify-between p-4`}>
                                            <div className={`${BRAND_PREFIX}-charge-unit-card-content-row flex flex-col justify-start items-start w-full`}>
                                                <div className={`${BRAND_PREFIX}-charge-unit-card-content-item text-text`}>
                                                    Konnektor Numarasi: {connectorItem.connectorNr}
                                                </div>
                                                <div className={`${BRAND_PREFIX}-charge-unit-card-content-item text-text`}>
                                                    EPDK Socket Numarasi: {connectorItem.epdkSocketNumber}
                                                </div>
                                                <div className={`${BRAND_PREFIX}-charge-unit-card-content-item text-text`}>
                                                    Konnektor Tipi: {connectorItem.stationConnectorAC ? 'AC' : 'DC'}
                                                </div>
                                                <div className={`${BRAND_PREFIX}-charge-unit-card-content-item text-text`}>
                                                    Konnektor KW: {connectorItem.stationConnectorKW}
                                                </div>
                                                <div className={`${BRAND_PREFIX}-charge-unit-card-content-item text-text`}>
                                                    Konnektor Ismi: {connectorItem.stationConnectorName}
                                                </div>
                                                <div className={`${BRAND_PREFIX}-charge-unit-card-content-item text-text`}>
                                                    Tarife: {connectorItem.tariffName}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            })
                        )
                    })
                }
            </div >
        </div >
    );
};

export default ChargeUnitsContent;
