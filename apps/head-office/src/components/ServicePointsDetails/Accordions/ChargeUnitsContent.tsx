import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChargingStation, FaPencil, FaPlugCirclePlus, FaTrash } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { setChargeUnitData } from '../../../../app/redux/features/chargeUnitData';
import { showDialog } from '../../../../app/redux/features/dialogInformation';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { RootState } from '../../../../app/redux/store';
import type {
    IAccessTypeListItemProps,
    IChargeUnitsContentProps,
    IChargeUnitsProps,
    IConnectorBrandProps,
    IInvestorsProps,
    IGetChargePointStationFeatureData,
    IGetChargePointStationFeatureResponse,
    IStatusListItemProps,
} from '../types';

const ChargeUnitsContent = ({
    chargeUnits, connectorsList, slug, setAddChargeUnit, setAddConnector, setConnectorBrandId
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
    const createReqData = (chargePoint: IChargeUnitsProps, features: IGetChargePointStationFeatureData[], investorId: number, statusId: string, accessTypeId: string) => {
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
                    { StationChargePointID: Number(chargePointId) },
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

        const featuresData: IGetChargePointStationFeatureResponse = await getFeaturesId(parseInt(chargePointId));
        const features = featuresData.data;

        const deletedChargeUnit = chargeUnits.filter(chargeUnit => {
            return chargeUnit.chargePointId === Number(chargePointId);
        });

        const investorId = await getInvestorId((deletedChargeUnit[0].investor));
        const { statusId, accessTypeId } = await getGetChargePointFeaturesStatus(
            deletedChargeUnit[0].hoStatus, deletedChargeUnit[0].accessType
        );

        const getRequestBody = createReqData(deletedChargeUnit[0], features, investorId, statusId, accessTypeId);

        dispatch(
            showDialog({
                actionType: 'delete',
                data: getRequestBody,
            })
        );
    };
    const handleUpdate = async (event: React.MouseEvent) => {
        const chargeUnitId = event.currentTarget.getAttribute(`data-charge-point-id`);
        const deviceCode = event.currentTarget.getAttribute(`data-charge-point-device-code`);
        const chargeUnitInfo = getChargeUnitInfo(parseInt(chargeUnitId || '0'));
        const investorId = await getInvestorId((chargeUnitInfo[0].investor));
        const { statusId, accessTypeId } = await getGetChargePointFeaturesStatus(
            chargeUnitInfo[0].hoStatus, chargeUnitInfo[0].accessType
        );
        const location = await getLocation(chargeUnitId || '0');

        setAddChargeUnit(true);
        setAddConnector(false);
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
            }));
        setSelectedBrand(parseInt(chargeUnitId || '0'));
        dispatch(toggleModalVisibility(isModalVisible));
    };

    const renderConnectors = (chargePointId: number) => {
        return connectorsList.map(chargeUnitConnectors => {
            return chargeUnitConnectors.map(connectors => {
              return connectors.map((connector, idx) => {
                return connector.map((connectorItem, connectorIndex) => {
                  // Koşullu renderlama
                  if (connectorItem.stationChargePointID === chargePointId && idx + 1 === connectorItem.connectorNr) {
                    return (
                      <div
                        className={`${chargeUnitPrefix}-connector-list-item w-full flex flex-row items-center justify-between`}
                        key={connectorIndex}  // Her bir item için unique bir key kullanılmalı.
                      >
                        <div className={`${chargeUnitPrefix}-connector-list-item-name-container`}>
                          <p
                            className={`${chargeUnitPrefix}-connector-list-item-name text-lg font-bold text-heading`}
                            key={`${connectorIndex}-${connectorIndex + 1}`}
                          >
                            <span className='font-bold'>{connectorIndex + 1}</span>.
                          </p>
                        </div>
                        <div className={`${chargeUnitPrefix}-connector-list-item-content-container flex w-full justify-evenly`}>
                          <p
                            className={`${chargeUnitPrefix}-connector-list-item-epdk text-lg text-text`}
                          >
                            {connectorItem.epdkSocketNumber || 'EPDK Soket Numarası Yok'}
                          </p>
                          <p
                            className={`${chargeUnitPrefix}-connector-list-item-kw text-lg text-text`}
                          >
                            {`${connectorItem.kw} - ${connectorItem.isAc ? 'AC' : 'DC'}` || '22KW - AC'}
                          </p>
                        </div>
                        <Button
                          buttonText={""}
                          className="connector-add-button rounded-md px-4 py-2 mx-4"
                          dataAttributes={{
                            'data-charge-point-id': connectorItem.stationChargePointID.toString(),
                            'data-charge-point-model-id': connectorItem.modelID.toString(),
                          }}
                          id={`${chargeUnitPrefix}-connector-add-button`}
                          type={'button'}
                          onClick={() => {
                            setAddConnector(true);
                            setAddChargeUnit(false);
                            dispatch(toggleModalVisibility(isModalVisible));
                            setConnectorBrandId(connectorItem.modelID);
                          }}
                        >
                          <FaPlugCirclePlus />
                        </Button>
                      </div>
                    );
                  } else {
                    return null;  // Eğer koşul sağlanmıyorsa, null dön.
                  }
                });
              });
            });
          });
          
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
                        setAddConnector(false);
                        dispatch(toggleModalVisibility(isModalVisible));
                        dispatch(
                            setChargeUnitData({
                                code: '',
                                brandId: 0,
                                connectorCount: 0,
                                ocppVersion: 0,
                                investor: 0,
                                status: 0,
                                accessType: 0,
                                location: '',
                                isFreeUsage: false,
                                isLimitedUsage: false,
                                chargePointId: 0,
                            })
                        );
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
                                                        {chargeUnit.deviceCode}
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
                                                        renderConnectors(chargeUnit.chargePointId)
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
