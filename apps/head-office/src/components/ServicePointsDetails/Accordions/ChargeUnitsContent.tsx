import { Button } from '@projects/button';
import useModalManager from 'apps/head-office/src/hooks/useModalManager';
import Image from 'next/image';
import { MenuItem } from 'primereact/menuitem';
import { Tag } from 'primereact/tag';
import { TieredMenu } from 'primereact/tieredmenu';
import React, { useEffect, useRef, useState } from 'react';
import {
  useGetDeviceBrandsQuery,
  useGetDeviceModelByIdQuery,
} from '../../../../app/api/services/devices/devices.service';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import {
  useGetChargePointFeatureStatusQuery,
  useGetChargeUnitsMutation,
} from '../.././../../app/api/services/service-point-details/servicePointDetails.service';
import ChargeUnitAddModal from '../Modals/ChargeUnitAddModal';
import { IBrandItemProps, IChargeUnitProps, IChargeUnitsContentProps } from '../types';
import ConenctorsList from './ConenctorsList';

const ChargeUnitsContent: React.FC<IChargeUnitsContentProps> = ({ stationId }: IChargeUnitsContentProps) => {
  const chargeUnitPrefix: string = `${BRAND_PREFIX}-charge-unit`;
  const connectorPrefix: string = `${BRAND_PREFIX}-connector-item`;
  const sectionPrefix: string = `${BRAND_PREFIX}-charge-units`;
  const [modelId, setModelId] = useState<number>(0);
  const { data: chargePointFeatureStatus } = useGetChargePointFeatureStatusQuery({});
  const [getChargeUnits, { data: chargeUnits }] = useGetChargeUnitsMutation();
  const { data: brands } = useGetDeviceBrandsQuery({});
  const { data: model, refetch: getModelById } = useGetDeviceModelByIdQuery(modelId, { skip: modelId === 0 });
  const menu = useRef(null);

  const { openModal } = useModalManager();
  const getChargeUnitsList = async (): Promise<void> => {
    await getChargeUnits({ body: { stationId, PageNumber: 1, PageSize: 10 } }).unwrap();
  };
  const getBrandLogoUrl = (brandId: number): string => {
    const brand = brands?.filter((brand: IBrandItemProps) => brand.id === brandId)[0];

    return `${brand?.imageCdnUrl}?h=80&w=80&scale=both&mode=max` || '';
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
        command: (event) => {
          openModal(
            'updateChargeUnitModal',
            <ChargeUnitAddModal stationId={stationId} chargePointId={chargePointId} />,
          );
        },
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
    return 'https://via.placeholder.com/150';
  };

  useEffect(() => {
    getChargeUnitsList();
  }, []);

  return (
    <div className={`${sectionPrefix}-content p-4 rounded-b-md`}>
      <div className={`${sectionPrefix}-list flex flex-wrap w-full justify-between`}>
        {chargeUnits &&
          chargeUnits?.length > 0 &&
          chargeUnits?.map((chargeUnit: IChargeUnitProps, index: number) => {
            return (
              <div
                className={`${chargeUnitPrefix}-container w-[45%] mx-2 my-4 flex flex-col justify-start items-center border border-gray-300 rounded-md shadow`}
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
                      src={`${getBrandLogoUrl(chargeUnit.modelId)}`}
                      width={100}
                    />
                  </div>
                  <div className={`${chargeUnitPrefix}-device-code-container flex justify-center items-center w-1/3`}>
                    <p className={`${chargeUnitPrefix}-device-code font-bold`}>{chargeUnit?.deviceCode}</p>
                  </div>
                  <div className={`${chargeUnitPrefix}-info-container flex justify-end items-center w-1/3`}>
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
                        ref={menu}
                        className="ufuk-test"
                      />
                      <Button
                        type="button"
                        // @ts-ignore
                        onClick={(e) => menu?.current?.toggle(e)}
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
                    className={`${chargeUnitPrefix}-charge-unit-info-container border-r-1 w-full m-4 pr-10 flex h-[175px]`}
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
                  <div className={`${chargeUnitPrefix}-connector-list-card-contianer flex w-full w-1/2`}>
                    <ConenctorsList chargePointId={chargeUnit.chargePointId} />
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
