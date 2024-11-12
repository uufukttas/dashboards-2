import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FaPlugCirclePlus, FaQrcode } from 'react-icons/fa6';
import { TbProgressBolt } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
// import {
//     getChargePointFeatureStatus,
//     getChargePointInvestors,
//     getChargeUnitFeatureValuesRequest,
//     getConnectorModels
// } from '../../../../app/api/servicePointDetails';
// import { setChargeUnitData } from '../../../../app/redux/features/chargeUnitData';
import { getChargeUnitBrands } from '../../../../app/api/servicePointDetails';
import { setConnectorProperty } from '../../../../app/redux/features/connectorProperty';
// import { showDialog } from '../../../../app/redux/features/dialogInformation';
import isConnectorUpdated from '../../../../app/redux/features/isConnectorUpdated';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { setAddChargeUnit, setAddConnector, setConfigureStation, setManageStation } from '../../../../app/redux/features/setVisibleModal';
import { RootState } from '../../../../app/redux/store';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import { Button as PrimeButton } from 'primereact/button';
import type {
    IChargeUnitsContentProps,
    IChargeUnitsProps,
    IFeatureTypeListProps,
    // IInvestorsProps,
    // IGetChargePointStationFeatureData,
    // IGetChargePointStationFeatureResponse,
    IConnectorStateProps,
    IConnectorModel,
} from '../types';
import { Card } from '@projects/card';
import { Tag } from 'primereact/tag';
import Image from 'next/image';
import { TieredMenu } from 'primereact/tieredmenu';
import { MenuItem, MenuItemCommandEvent } from 'primereact/menuitem';

const ChargeUnitsContent: React.FC<IChargeUnitsContentProps> = ({ chargeUnits, slug }: IChargeUnitsContentProps) => {
    const chargeUnitPrefix: string = `${BRAND_PREFIX}-charge-unit`;
    const sectionPrefix: string = `${BRAND_PREFIX}-charge-units`;
    const connectorPrefix: string = `${BRAND_PREFIX}-connector-item`;
    const dispatch = useDispatch();
    const menu = useRef(null);
    const connectorList = useSelector((state: RootState) => state.setConnectors.connectors);
    const [connectorTypes, setConnectorTypes] = useState<IConnectorModel[]>([]);
    // const [selectedBrand, setSelectedBrand] = useState(1);
    // const [connectorUpdate, setConnectorUpdate] = useState(false);

    const items: MenuItem[] = [
        {
            label: 'Edit',
            icon: 'pi pi-pencil',
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
        },
        {
            label: 'Konfigurasyon',
            icon: 'pi pi-cog',
            command: (event: MenuItemCommandEvent) => {
                dispatch(toggleModalVisibility(true));
                dispatch(setConfigureStation(true));
            }
        },
        {
            label: 'Loglar',
            icon: 'pi pi-list',
        }
    ];
    // const buildChargeUnitRequestBody = (
    //     accessTypeId: number,
    //     chargePoint: IChargeUnitsProps,
    //     features: IGetChargePointStationFeatureData[],
    //     investorId: number,
    //     statusId: number,
    // ) => {
    //     return ({
    //         chargePoint: {
    //             code: chargePoint.deviceCode.toString(),
    //             ExternalOCPPAdress: null,
    //             InternalOCPPAdress: null,
    //             isFreePoint: chargePoint.isFreePoint,
    //             isOnlyDefinedUserCards: chargePoint.limitedUsage,
    //             ocppVersion: chargePoint.ocppVersion,
    //             ownerType: investorId,
    //             isActive: false,
    //             isDeleted: true,
    //             sendRoaming: false,
    //             stationId: Number(slug),
    //             stationChargePointModelID: chargePoint.modelId,
    //         },
    //         chargePointFeatures: [
    //             {
    //                 stationChargePointFeatureType: 1,
    //                 stationChargePointFeatureTypeValue: statusId.toString(),
    //                 ...(features.length > 0 && { id: features[0].id }),
    //             },
    //             {
    //                 stationChargePointFeatureType: 2,
    //                 stationChargePointFeatureTypeValue: accessTypeId.toString(),
    //                 ...(features.length > 0 && { id: features[1].id }),
    //             }, {
    //                 stationChargePointFeatureType: 3,
    //                 stationChargePointFeatureTypeValue: (chargePoint.location || '').toString(),
    //                 ...(features.length > 0 && { id: features[2].id }),
    //             }
    //         ],
    //         connectorCount: chargePoint.connectorNumber,
    //     });
    // };
    const createConnectorDropdownItems = (): IFeatureTypeListProps[] => {
        return connectorTypes.map((connectorType: IConnectorModel) => {
            return {
                id: connectorType.stationChargePointModelConnectorId,
                name: connectorType.displayName,
                rid: null,
            };
        });
    };
    // const getChargeUnitInfo = (chargeUnitId: number): IChargeUnitsProps => {
    //     return chargeUnits.filter(chargeUnit => chargeUnit.chargePointId === chargeUnitId)[0];
    // };
    // const getChargeUnitLocation = async (chargePointId: string) => {
    //     const location = await getChargeUnitFeatureValuesRequest(chargePointId);

    //     return location.data[2].stationChargePointFeatureTypeValue;
    // };
    const getConnectorTypes = async (): Promise<void> => {
        // const response = await getConnectorModels(selectedBrand.toString());

        // setConnectorTypes(response.data);
        createConnectorDropdownItems();
    };
    // const getStationFeaturesId = async (chargePointId: string): Promise<IGetChargePointStationFeatureResponse> => {
    //     const data = await getChargeUnitFeatureValuesRequest(chargePointId);

    //     return data;
    // };
    // const getGetChargePointFeaturesStatus =
    //     async (status: string, accessType: string): Promise<{ accessTypeId: number; statusId: number }> => {
    //         const data = await getChargePointFeatureStatus();

    //         const statusIds = data.data.statusList.filter((statusItem: IFeatureTypeListProps) => {
    //             return statusItem.name.toLowerCase() === status.toLowerCase();
    //         });
    //         const accessTypeIds = data.data.accessTypeList.filter((accessTypeListItem: IFeatureTypeListProps) => {
    //             return accessTypeListItem.name.toLowerCase() === accessType.toLowerCase();
    //         });

    //         const statusId = statusIds.length > 0 ? statusIds[0].id : 0;
    //         const accessTypeId = accessTypeIds.length > 0 ? accessTypeIds[0].id : 0;

    //         return { statusId, accessTypeId };
    //     };
    // const getInvestorId = async (investorName: string): Promise<number> => {
    //     const investors = await getChargePointInvestors();

    //     if (investors.data.length === 0) {
    //         return 0;
    //     };

    //     const selectedInvestor: IInvestorsProps[] = investors.data.filter((investor: IInvestorsProps) => {
    //         if (investor.name.toLowerCase() === investorName.toLowerCase()) {
    //             return investor.id;
    //         };
    //     });

    //     return selectedInvestor[0].id;
    // };
    // const handleDelete = async (event: React.MouseEvent) => {
    //     const chargePointId: string = event.currentTarget.getAttribute(`data-charge-point-id`) || '0';
    //     const featuresData: IGetChargePointStationFeatureResponse = await getStationFeaturesId(chargePointId);
    //     const features: IGetChargePointStationFeatureData[] = featuresData.data;
    //     const deletedChargeUnit: IChargeUnitsProps =
    //         chargeUnits.filter(chargeUnit => chargeUnit.chargePointId === Number(chargePointId))[0];
    //     const investorId: number = await getInvestorId((deletedChargeUnit.investor));
    //     const { statusId, accessTypeId }: { accessTypeId: number, statusId: number, } =
    //         await getGetChargePointFeaturesStatus(deletedChargeUnit.hoStatus, deletedChargeUnit.accessType);

    //     const getRequestBody =
    //         buildChargeUnitRequestBody(accessTypeId, deletedChargeUnit, features, investorId, statusId);

    //     dispatch(
    //         showDialog({
    //             actionType: 'deleteChargePoint',
    //             data: getRequestBody,
    //         })
    //     );
    // };
    // const handleUpdate = async (event: React.MouseEvent): Promise<void> => {
    //     const chargeUnitId = event.currentTarget.getAttribute(`data-charge-point-id`);
    //     const deviceCode = event.currentTarget.getAttribute(`data-charge-point-device-code`);
    //     const chargeUnitInfo = getChargeUnitInfo(parseInt(chargeUnitId || '0'));
    //     const investorId = await getInvestorId((chargeUnitInfo.investor));
    //     const { statusId, accessTypeId } = await getGetChargePointFeaturesStatus(
    //         chargeUnitInfo.hoStatus, chargeUnitInfo.accessType
    //     );
    //     const location = await getChargeUnitLocation(chargeUnitId || '0');

    //     dispatch(setAddChargeUnit(true));
    //     dispatch(
    //         setChargeUnitData({
    //             accessType: accessTypeId,
    //             code: deviceCode,
    //             brandId: chargeUnitInfo.modelId,
    //             chargePointId: parseInt(chargeUnitId || '0'),
    //             connectorCount: chargeUnitInfo.connectorNumber,
    //             investor: investorId,
    //             isFreeUsage: chargeUnitInfo.isFreePoint,
    //             isLimitedUsage: chargeUnitInfo.limitedUsage,
    //             location: location,
    //             ocppVersion: chargeUnitInfo.ocppVersion,
    //             status: statusId,
    //         })
    //     );
    //     setSelectedBrand(parseInt(chargeUnitId || '0'));
    //     dispatch(toggleModalVisibility(true));
    //     setConnectorUpdate(true);
    // };
    const prepareTime = (date: string | null): string => {
        if (date === null) {
            return `1990/01/01 00:00`;
        };

        const dateArray = date.split('T');
        const timeArray = dateArray[1].split(':');

        return `${dateArray[0]} ${timeArray[0]}:${timeArray[1]}`;
    };
    const setConnectorProperties = (chargeUnits: IChargeUnitsProps[]): void => {
        console.log('chargeUnits', chargeUnits)
    };
    const getHOStatus = (status: string) => {
        console.log('status', status)
        switch (status) {
            case 'Kullanılabilir':
                return 'success';
            case 'Passive':
                return 'danger';
            case 'Bakimda':
                return 'warning';
            case 'Planlanmış':
                return 'info';
        }
    };
    const getBrandLogo = (brand: string) => {
        if (brand === 'Sinexcel') {
            return '/sinexcel.png';
        } else if (brand === 'Circontrol') {
            return '/circontrol_logo.png';
        } else if (brand === 'HyperCharger') {
            return '/hypercharger_logo.png';
        }
    };


    const getStatusName = (statusId: number) => {
    };

    // @ts-ignore
    // const createConfMenu = (item) => {
    //     return (
    //         <div data-charge-unit-id={item.chargePointId} data-charge-point-device-code={item.deviceCode}>
    //             {item.label}
    //         </div>
    //     )
    // };

    const getBrandName = async (brandId: number) => {
        const modelNames = await getChargeUnitBrands();
        // @ts-ignore
        return modelNames.data.filter((model: IConnectorModel) => model?.id === brandId);
    };

    const renderMenuItems = (items: MenuItem[]) => {
        return items.map((item) => (
            <div className="custom-menu-item" key={item.label}>
                <i className={item.icon}></i>
                <span>{item.label}</span>
            </div>
        ));
    };

    useEffect(() => {
        // setConnectorUpdate(true);
        setConnectorProperties(chargeUnits);
    }, []);

    useEffect(() => {
        getConnectorTypes();
    }, [chargeUnits, isConnectorUpdated]);

    return (
        <div className={`${sectionPrefix}-content p-4 rounded-b-md`}>
            <div className={`${sectionPrefix}-list flex flex-wrap w-full justify-between`}>
                {
                    connectorList.map((connector: IConnectorStateProps[], index: number) => {
                        return (
                            <div
                                className={`${connectorPrefix}-container flex justify-center items-center w-[45%] shadow rounded-md flex flex-col mx-2 my-4`}
                                key={index}
                            >
                                <div className={`${connectorPrefix}-header-container w-full`}>
                                    <div className={`${connectorPrefix}-header flex justify-between items-center w-full p-4`}>
                                        {
                                            <div className={`${connectorPrefix}-brand-logo-container flex justify-start items-center w-1/3`}>
                                                <Image
                                                    alt={`${chargeUnits[index].model}`}
                                                    height={80}
                                                    src={`${getBrandLogo(chargeUnits[index].model)}`}
                                                    width={80}
                                                />
                                            </div>
                                        }
                                        {
                                            <div className={`${connectorPrefix}-device-code-container flex justify-center items-center w-1/3`}>
                                                <p className={`${connectorPrefix}-device-code-text font-bold`}>{chargeUnits[index].deviceCode}</p>
                                            </div>
                                        }
                                        {
                                            <div className={`${connectorPrefix}-info-container flex justify-end items-center w-1/3`}>
                                                <div className={`${connectorPrefix}-status-tag-container flex items-center justify-end relative`}>
                                                    <Tag
                                                        className={`${connectorPrefix}-status-tag`}
                                                        severity={getHOStatus(chargeUnits[index].hoStatus)}
                                                        value={chargeUnits[index].status}
                                                    >
                                                    </Tag>
                                                </div>
                                                <div className={`${connectorPrefix}-menu-container flex justify-end items-center`}>
                                                    <TieredMenu
                                                        model={items}
                                                        popup
                                                        ref={menu}
                                                    >
                                                        {renderMenuItems(items)}
                                                    </TieredMenu>
                                                    <Button type='button'
                                                        // @ts-ignore
                                                        onClick={(e) => menu?.current?.toggle(e)}
                                                        id='menu-button'
                                                        className='w-8 h-8 rounded-full items-center justify-center bg-gray-700 opacity-60 flex ml-4 '
                                                    >
                                                        <i className="pi pi-ellipsis-v text-white"></i>
                                                    </Button>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <hr className="seperator text-text w-full" />
                                <div className={`${connectorPrefix}-content-container w-full flex flex-col`}>
                                    <div className={`${connectorPrefix}-charge-unit-info-container border-r-1 w-full m-4 flex`}>
                                        <div className={`${connectorPrefix}-charge-unit-info w-2/3`}>
                                            <h2 className={`${connectorPrefix}-charge-unit-info-header`}>Ünite Bilgileri</h2>
                                            <div className={`${BRAND_PREFIX}-charge-unit-info-content-row flex flex-col justify-start items-start w-full px-4`}>
                                                <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item text-text flex`}>
                                                    <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item-label text-text font-medium`}>
                                                        Marka:
                                                    </div>
                                                    <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item-value text-text font-bolder`}>
                                                        {chargeUnits[index].model}
                                                        {/* {getBrandName(Number(chargeUnits[index].modelId))} */}
                                                    </div>
                                                </div>
                                                <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item text-text flex`}>
                                                    <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item-label text-text font-medium`}>
                                                        Model:
                                                    </div>
                                                    <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item text-text flex`}>
                                                        <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item-value text-text font-bolder`}>
                                                            {chargeUnits[index].model}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item text-text flex`}>
                                                    <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item text-text flex`}>
                                                        <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item-label text-text font-medium`}>
                                                            Seri Numarasi:
                                                        </div>
                                                        <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item-value text-text font-bolder`}>
                                                            {chargeUnits[index].serialNumber}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item text-text flex`}>
                                                    <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item-label text-text font-medium`}>
                                                        Eklenme Tarihi:
                                                    </div>
                                                    <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item-value text-text font-bolder`}>
                                                        {chargeUnits[0].createdDate || new Date().toLocaleDateString()}
                                                    </div>
                                                </div>
                                                <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item text-text flex`}>
                                                    <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item text-text flex`}>
                                                        <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item-label text-text font-medium`}>
                                                            Ünite Yatırımcısı:
                                                        </div>
                                                        <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item-value text-text font-bolder`}>
                                                            {chargeUnits[index].investor}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item text-text flex`}>
                                                    <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item text-text flex`}>
                                                        <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item-label text-text font-medium`}>
                                                            Son İletişim Zamanı:
                                                        </div>
                                                        <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item-value text-text font-bolder`}>
                                                            {prepareTime(chargeUnits[0].lastHeartBeat) || new Date().toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`${connectorPrefix}-charge-unit-info w-1/3`}>
                                            <img src="https://en.sinexcel.com/evcharger/240w/pic3-1.png?v=1.0" />
                                        </div>
                                    </div>
                                    <div className={`${chargeUnitPrefix}-connector-list-card-contianer flex w-full w-1/2`}>
                                        {
                                            connector.map((connectorItem: IConnectorStateProps) => {
                                                return (
                                                    <Card
                                                        BRAND_PREFIX={BRAND_PREFIX}
                                                        containerClassName={`${chargeUnitPrefix}-card-container text-text font-bold flex flex-col rounded-md w-1/2 m-4 border border-gray-200 shadow-none`}
                                                        key={index}
                                                    >
                                                        <div className={`${chargeUnitPrefix}-card-content flex flex-col justify-between p-4`}>
                                                            <div className={`${chargeUnitPrefix}-card-content-row flex flex-col justify-start items-start w-full border-b border-gray-200`}>
                                                                <div className={`${chargeUnitPrefix}-info-content-row-item text-text flex`}>
                                                                    <div className={`${chargeUnitPrefix}-info-content-row-item-label text-text font-medium`}>
                                                                        Konnektor Numarasi:
                                                                    </div>
                                                                    <div className={`${chargeUnitPrefix}-info-content-row-item-value text-text font-bolder`}>
                                                                        {connectorItem.connectorNr}
                                                                    </div>
                                                                </div>
                                                                <div className={`${chargeUnitPrefix}-info-content-row-item text-text flex`}>
                                                                    <div className={`${chargeUnitPrefix}-info-content-row-item-label text-text font-medium`}>
                                                                        EPDK Socket Numarasi:
                                                                    </div>
                                                                </div>
                                                                <div className={`${chargeUnitPrefix}-info-content-row-item text-text flex`}>
                                                                    <div className={`${chargeUnitPrefix}-info-content-row-item-value text-text font-bolder`}>
                                                                        {connectorItem.epdkSocketNumber}
                                                                    </div>
                                                                </div>
                                                                <div className={`${chargeUnitPrefix}-info-content-row-item text-text flex`}>
                                                                    <div className={`${chargeUnitPrefix}-info-content-row-item text-text flex`}>
                                                                        <div className={`${chargeUnitPrefix}-info-content-row-item-label text-text font-medium`}>
                                                                            Konnektor Tipi:
                                                                        </div>
                                                                        <div className={`${chargeUnitPrefix}-info-content-row-item-value text-text font-bolder`}>
                                                                            {connectorItem.stationConnectorAC ? 'AC' : 'DC'}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className={`${chargeUnitPrefix}-info-content-row-item text-text flex`}>
                                                                    <div className={`${chargeUnitPrefix}-info-content-row-item text-text flex`}>
                                                                        <div className={`${chargeUnitPrefix}-info-content-row-item-label text-text font-medium`}>
                                                                            Konnektor KW:
                                                                        </div>
                                                                        <div className={`${chargeUnitPrefix}-info-content-row-item-value text-text font-bolder`}>
                                                                            {connectorItem.stationConnectorKW}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className={`${chargeUnitPrefix}-info-content-row-item text-text flex`}>
                                                                    <div className={`${chargeUnitPrefix}-info-content-row-item-label text-text font-medium`}>
                                                                        Konnektor İsmi:
                                                                    </div>
                                                                    <div className={`${chargeUnitPrefix}-info-content-row-item-value text-text font-bolder`}>
                                                                        {connectorItem.stationConnectorName}
                                                                    </div>
                                                                </div>
                                                                <div className={`${chargeUnitPrefix}-info-content-row-item text-text flex`}>
                                                                    <div className={`${chargeUnitPrefix}-info-content-row-item text-text flex`}>
                                                                        <div className={`${chargeUnitPrefix}-info-content-row-item-label text-text font-medium`}>
                                                                            Tarife:
                                                                        </div>
                                                                        <div className={`${chargeUnitPrefix}-info-content-row-item-value text-text font-bolder`}>
                                                                            {connectorItem.tariffName}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={`${chargeUnitPrefix}-info-actions-container text-text flex`}>
                                                                <div className={`${chargeUnitPrefix}-info-edit-actions flex justify-between items-center w-full`}>
                                                                    <Link
                                                                        className={`${chargeUnitPrefix}-qr-code-button rounded-md px-2 py-2 mx-4`}
                                                                        href={`${process.env.NEXT_PUBLIC_BASE_URL}/Values/QRCodeCreate?text=${chargeUnits[0].deviceCode.toString()}&connectorNr=${connectorItem.connectorNr.toString()}`}
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
                                                                            'data-device-code': chargeUnits[0].deviceCode.toString(),
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
                                                                            'data-device-code': chargeUnits[0].deviceCode.toString(),
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
                                                        </div>
                                                    </Card>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div >
        </div >
    );
};

export default ChargeUnitsContent;
