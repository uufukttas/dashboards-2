import { Button } from '@projects/button';
import useModalManager from '../../../../src/hooks/useModalManager';
import Image from 'next/image';
import { MenuItem } from 'primereact/menuitem';
import { Tag } from 'primereact/tag';
import { TieredMenu } from 'primereact/tieredmenu';
import React, { useEffect, useRef } from 'react';
import { useGetDeviceBrandsQuery, useGetDeviceModelsQuery } from '../../../../app/api/services/devices/devices.service';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import {
  useGetChargePointFeatureMutation,
  useGetChargePointFeatureStatusQuery,
  useGetChargeUnitsMutation,
  useUpdateStationSettingsMutation,
} from '../.././../../app/api/services/service-point-details/servicePointDetails.service';
import ChargeUnitAddModal from '../Modals/ChargeUnitAddModal';
import { IBrandItemProps, IChargeUnitProps, IChargeUnitsContentProps } from '../types';
import ConenctorsList from './ConenctorsList';
import ConfirmationModal from '../../Modals/ConfirmationModal';
import EventManager from '../../../../src/managers/Event.manager';

const ChargeUnitsContent: React.FC<IChargeUnitsContentProps> = ({ stationId }: IChargeUnitsContentProps) => {
  const chargeUnitPrefix: string = `${BRAND_PREFIX}-charge-unit`;
  const connectorPrefix: string = `${BRAND_PREFIX}-connector-item`;
  const sectionPrefix: string = `${BRAND_PREFIX}-charge-units`;
  const { data: chargePointFeatureStatus } = useGetChargePointFeatureStatusQuery({});
  const [updateStationSettings] = useUpdateStationSettingsMutation();
  const [getChargeUnits, { data: chargeUnits }] = useGetChargeUnitsMutation();
  const { data: brands } = useGetDeviceBrandsQuery({});
  const menuRefs = useRef<{ [key: number]: any }>({});
  const [currentBrandId, setCurrentBrandId] = React.useState<number>(3);
  const { data: models } = useGetDeviceModelsQuery(currentBrandId);

  const { closeModal, openModal } = useModalManager();
  const getChargeUnitsList = async (): Promise<void> => {
    await getChargeUnits({ body: { stationId, PageNumber: 1, PageSize: 10 } }).unwrap();
  };
  const getBrandLogoUrl = (brandId: number): string => {
    const model = brands?.filter((brand: IBrandItemProps) => brand.id === brandId)[0];

    return `${model?.imageCdnUrl}?h=80&w=80&scale=both&mode=max` || '';
  };
  const getStatus = (statusId: number): string => {
    const status = chargePointFeatureStatus?.statusList?.filter(
      (statusItem: { id: number }) => statusItem.id === statusId,
    )[0];

    return status?.name;
  };
  const items: MenuItem[] = [
    {
      label: 'Guncelle',
      icon: 'pi pi-pencil',
    },
    {
      label: 'Sil',
      icon: 'pi pi-trash',
    },
    {
      label: 'Konfigurasyon',
      icon: 'pi pi-cog',
    },
    {
      label: 'Loglar',
      icon: 'pi pi-list',
    },
  ];

  const [getChargePointFeature] = useGetChargePointFeatureMutation();

  const handleDeleteChargeUnit = async (chargePointId: number) => {
    const { data: features } = await getChargePointFeature({ body: { StationChargePointID: chargePointId } })
    const chargeUnit = chargeUnits?.filter(chargeUnit => chargeUnit.chargePointId === chargePointId)[0];

    const requestData = {
      chargePoint: {
        code: chargeUnit?.deviceCode,
        ExternalOCPPAdress: null,
        InternalOCPPAdress: null,
        isFreePoint: chargeUnit?.isFreePoint,
        isOnlyDefinedUserCards: chargeUnit?.limitedUsage,
        ocppVersion: chargeUnit?.ocppVersion,
        ownerType: Number(chargeUnit?.investorId) || 10,
        sendRoaming: chargeUnit?.sendRoaming,
        serialNumber: chargeUnit?.serialNumber,
        stationId,
        stationChargePointModelID: Number(chargeUnit?.modelId),
        isDeleted: true,
      },
      chargePointFeatures: [
        {
          stationChargePointFeatureType: 1,
          stationChargePointFeatureTypeValue: chargeUnit?.status.toString(),
          // @ts-ignore
          id: features.filter(feature => feature.stationChargePointFeatureType === 1)[0]?.id,
        },
        {
          stationChargePointFeatureType: 2,
          stationChargePointFeatureTypeValue: "4",
          // @ts-ignore
          id: features.filter(feature => feature.stationChargePointFeatureType === 2)[0]?.id,
        },
        {
          stationChargePointFeatureType: 3,
          stationChargePointFeatureTypeValue: chargeUnit?.location || '',
          // @ts-ignore
          id: features.filter(feature => feature.stationChargePointFeatureType === 3)[0]?.id,
        },
      ],
      connectorCount: chargeUnit?.connectorNumber,
    };

    // @ts-ignore
    await updateStationSettings({ body: requestData });
    EventManager.emit('charge-unit-updated', {});
    closeModal('confirmationModal');
  };

  const setCommandFn = (item: MenuItem, chargePointId: number) => {
    switch (item.label) {
      case 'Guncelle':
        return () => {
          openModal('updateChargeUnitModal', <ChargeUnitAddModal modalName={'updateChargeUnitModal'} stationId={stationId} chargePointId={chargePointId} />);
        };
      case 'Sil':
        return () => {
          openModal(
            'confirmationModal',
            <ConfirmationModal name={'deleteChargeUnit'} onConfirm={() => handleDeleteChargeUnit(chargePointId)} />,
          );
        };
    }
  };

  const setMenuItems = (chargePointId: number) => {
    return items.map((item) => {
      return {
        ...item,
        template: () => {
          return (
            <div className="item-container cursor-pointer" data-charge-unit-attributes={chargePointId}>
              {item.icon && <i className={item.icon}></i>}
              {item.label}
            </div>
          );
        },
        command: setCommandFn(item, chargePointId),
      };
    });
  };

  const setSeverity = (status: string) => {
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

  const getModelImage = (modelId: number): string => {
    const model = models?.filter((model: { id: number, imageCdnUrl: string, brandId: number, name: string }) => model.id === modelId)[0];
    return `${model?.imageCdnUrl}?h=150&w=150&scale=both&mode=max` || '';
  };

  useEffect(() => {
    getChargeUnitsList();
  }, []);

  useEffect(() => {
    EventManager.subscribe('charge-unit-updated', () => {
      getChargeUnitsList();
    });

    EventManager.subscribe('connector-updated', () => {
      getChargeUnitsList();
    });

    return () => {
      EventManager.removeAllListeners('charge-unit-updated');
      EventManager.removeAllListeners('connector-updated');
    };
  }, []);

  useEffect(() => {
    if (chargeUnits && chargeUnits.length > 0) {
      const uniqueBrandIds = chargeUnits?.map(unit => unit.brandId);
      setCurrentBrandId(uniqueBrandIds[0] || 3);
    }
  }, [chargeUnits]);

  return (
    <div className={`${sectionPrefix}-content p-4 rounded-b-md`}>
      <div className={`${sectionPrefix}-list flex flex-wrap w-full justify-between`}>
        {chargeUnits &&
          chargeUnits?.length > 0 &&
          chargeUnits?.map((chargeUnit: IChargeUnitProps, index: number) => {
            if (!menuRefs.current[chargeUnit.chargePointId]) {
              menuRefs.current[chargeUnit.chargePointId] = React.createRef();
            }

            return (
              <div
                className={`${chargeUnitPrefix}-container w-[45%] h-[600px] mx-2 my-4 flex flex-col justify-start items-center border border-gray-300 rounded-md shadow`}
                key={index}
              >
                <div
                  className={`${chargeUnitPrefix}-header-container w-full h-[75px] p-5 flex justify-between items-center`}
                >
                  <div className={`${chargeUnitPrefix}-brand-logo-container flex justify-start items-center w-1/3`}>
                    <Image
                      alt={`${chargeUnit.model}`}
                      className={`${chargeUnitPrefix}-brand-logo`}
                      height={100}
                      src={`${getBrandLogoUrl(chargeUnit.brandId)}`}
                      width={100}
                    />
                  </div>
                  <div className={`${chargeUnitPrefix}-device-code-container flex justify-center items-center w-1/3`}>
                    <p className={`${chargeUnitPrefix}-device-code font-bold`}>{chargeUnit?.deviceCode}</p>
                  </div>
                  <div className={`${chargeUnitPrefix}-info-container flex justify-end items-center w-1/3 h-auto`}>
                    <div className={`${chargeUnitPrefix}-status-tag-container flex items-center justify-end relative`}>
                      <Tag
                        className={`${chargeUnitPrefix}-status-tag`}
                        severity={setSeverity(getStatus(chargeUnit.status))}
                        value={getStatus(chargeUnit?.status)}
                      ></Tag>
                    </div>
                    <div className={`${chargeUnitPrefix}-menu-container flex justify-end items-center`}>
                      <TieredMenu
                        model={setMenuItems(chargeUnit.chargePointId)}
                        popup
                        ref={menuRefs.current[chargeUnit.chargePointId]}
                      />
                      <Button
                        type="button"
                        onClick={(e) => menuRefs.current[chargeUnit.chargePointId]?.current?.toggle(e)}
                        id="menu-button"
                        className="w-8 h-8 rounded-full items-center justify-center bg-gray-700 opacity-60 flex ml-4 "
                      >
                        <i className="pi pi-ellipsis-v text-white"></i>
                      </Button>
                    </div>
                  </div>
                </div>
                <hr className="seperator text-text w-full" />
                <div className={`${chargeUnitPrefix}-content-container w-full flex flex-col h-full justify-between`}>
                  <div
                    className={`${chargeUnitPrefix}-charge-unit-info-container border-r-1 w-full m-4 flex`}
                  >
                    <div className={`${connectorPrefix}-charge-unit-info w-2/3`}>
                      <h1 className={`${connectorPrefix}-charge-unit-info-header font-extrabold`}>Ünite Bilgileri</h1>
                      <div
                        className={`${BRAND_PREFIX}-charge-unit-info-content-row w-full px-4 flex flex-col justify-start items-start `}
                      >
                        <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item text-text flex`}>
                          <div
                            className={`${BRAND_PREFIX}-charge-unit-info-content-row-item-label text-text font-medium`}
                          >
                            Marka:
                          </div>
                          <div
                            className={`${BRAND_PREFIX}-charge-unit-info-content-row-item-value text-text font-bolder`}
                          >
                            {chargeUnit.brandName}
                          </div>
                        </div>
                        <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item text-text flex`}>
                          <div
                            className={`${BRAND_PREFIX}-charge-unit-info-content-row-item-label text-text font-medium`}
                          >
                            Model:
                          </div>
                          <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item text-text flex`}>
                            <div
                              className={`${BRAND_PREFIX}-charge-unit-info-content-row-item-value text-text font-bolder`}
                            >
                              {chargeUnit.model}
                            </div>
                          </div>
                        </div>
                        <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item text-text flex`}>
                          <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item text-text flex`}>
                            <div
                              className={`${BRAND_PREFIX}-charge-unit-info-content-row-item-label text-text font-medium`}
                            >
                              Seri Numarasi:
                            </div>
                            <div
                              className={`${BRAND_PREFIX}-charge-unit-info-content-row-item-value text-text font-bolder`}
                            >
                              {chargeUnit.serialNumber}
                            </div>
                          </div>
                        </div>
                        <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item text-text flex`}>
                          <div
                            className={`${BRAND_PREFIX}-charge-unit-info-content-row-item-label text-text font-medium`}
                          >
                            Eklenme Tarihi:
                          </div>
                          <div
                            className={`${BRAND_PREFIX}-charge-unit-info-content-row-item-value text-text font-bolder`}
                          >
                            {chargeUnit.createdDate || new Date().toLocaleDateString()}
                          </div>
                        </div>
                        <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item text-text flex`}>
                          <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item text-text flex`}>
                            <div
                              className={`${BRAND_PREFIX}-charge-unit-info-content-row-item-label text-text font-medium`}
                            >
                              Ünite Yatırımcısı:
                            </div>
                            <div
                              className={`${BRAND_PREFIX}-charge-unit-info-content-row-item-value text-text font-bolder`}
                            >
                              {chargeUnit.investor}
                            </div>
                          </div>
                        </div>
                        <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item text-text flex`}>
                          <div className={`${BRAND_PREFIX}-charge-unit-info-content-row-item text-text flex`}>
                            <div
                              className={`${BRAND_PREFIX}-charge-unit-info-content-row-item-label text-text font-medium`}
                            >
                              Son İletişim Zamanı:
                            </div>
                            <div
                              className={`${BRAND_PREFIX}-charge-unit-info-content-row-item-value text-text font-bolder`}
                            >
                              {chargeUnit.lastHeartBeat || new Date().toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`${connectorPrefix}-charge-unit-info w-1/3`}>
                      <Image
                        alt={`${chargeUnit.model}`}
                        className={`${chargeUnitPrefix}-model-image`}
                        height={150}
                        src={getModelImage(chargeUnit.modelId)}
                        width={150}
                      />
                    </div>
                  </div>
                  <div className={`${chargeUnitPrefix}-connector-list-card-contianer flex w-full flex-wrap`}>
                    <ConenctorsList chargePointId={chargeUnit.chargePointId} deviceCode={chargeUnit.deviceCode} />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ChargeUnitsContent;
