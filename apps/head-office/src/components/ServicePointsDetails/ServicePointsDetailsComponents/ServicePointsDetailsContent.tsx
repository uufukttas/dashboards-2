import { Accordion, AccordionTab } from 'primereact/accordion';
import React from 'react';
import { FaChargingStation, FaSackDollar } from 'react-icons/fa6';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import ChargeUnitsContent from '../Accordions/ChargeUnitsContent';
import Comissions from '../Accordions/Comissions/Comissions';
import EnergyPricesContent from '../Accordions/EnergyPricesContent';
import LocationInfo from '../Accordions/LocationInfo';
import ServicePointPermissions from '../Accordions/ServicePointPermissions';
import WorkingHoursContent from '../Accordions/WorkingHoursContent';
import ChargeUnitAddModal from '../Modals/ChargeUnitAddModal';
import ComissionModal from '../Modals/ComissionModal';
import EnergyPricesModal from '../Modals/EnergyPricesModal';
import ImageAddModal from '../Modals/ImageAddModal';
import ServicePointPermissionsModal from '../Modals/ServicePointPermissionsModal';
import { IAccordionSection, IServicePointDetailsContentProps } from '../types';
import ActionButton from './AccordionHeaderActionButton';

const ServicePointsDetailsContent: React.FC<IServicePointDetailsContentProps> = ({
  activeTabIndex,
  stationId,
}: IServicePointDetailsContentProps) => {
  const accordionSections: IAccordionSection[] = [
    {
      actionButton: (stationId: number) => (
        <ActionButton
          buttonText="+ İstasyon Resmi Ekle"
          modalName="addServicePointImageModal"
          ModalComponent={ImageAddModal}
          stationId={stationId}
        />
      ),
      content: LocationInfo,
      key: 'locationInfo',
      title: 'İstasyon Bilgileri',
    },
    {
      actionButton: (stationId: number) => (
        <ActionButton
          buttonText="+ Şarj Ünitesi"
          modalName="addChargeUnitModal"
          ModalComponent={ChargeUnitAddModal}
          stationId={stationId}
        />
      ),
      content: ChargeUnitsContent,
      icon: <FaChargingStation />,
      key: 'chargeUnits',
      title: 'Şarj Üniteleri',
    },
    {
      actionButton: () => null,
      content: WorkingHoursContent,
      key: 'workingHours',
      title: 'Calisma Saatleri',
    },
    {
      key: 'energyPrices',
      title: 'Enerji Fiyat Ayarlari',
      content: EnergyPricesContent,
      icon: <FaSackDollar />,
      actionButton: (stationId: number) => (
        <ActionButton
          buttonText="+ Enerji Fiyatı Ekle"
          modalName="addEnergyPriceModal"
          ModalComponent={EnergyPricesModal}
          stationId={stationId}
        />
      ),
    },
    {
      key: 'commissions',
      title: 'Komisyonlar',
      content: Comissions,
      actionButton: (stationId: number) => (
        <ActionButton
          buttonText="+ Komisyon Ekle"
          modalName="addComissionModal"
          ModalComponent={ComissionModal}
          stationId={stationId}
        />
      ),
    },
    {
      key: 'permissions',
      title: 'İstasyon Yetkisi',
      content: ServicePointPermissions,
      actionButton: (stationId: number) => (
        <ActionButton
          buttonText="+ İstasyon Yetkisi Ekle"
          modalName="addServicePointPermissionModal"
          ModalComponent={ServicePointPermissionsModal}
          stationId={stationId}
        />
      ),
    },
  ];
  const sectionPrefix: string = `${BRAND_PREFIX}-service-point-details-accordion`;

  return (
    <div className={`${sectionPrefix}-container`}>
      {accordionSections.map((section, index) => {
        const { title, content: Content, actionButton } = section;

        return (
          <Accordion
            activeIndex={activeTabIndex}
            className={`${sectionPrefix} my-4 bg-primary border-gray-300 rounded-md`}
            key={section.key}
          >
            {index === activeTabIndex && (
              <AccordionTab
                header={() => (
                  <div
                    className={`${sectionPrefix}-header-container w-full flex justify-between items-center text-white h-12`}
                  >
                    <div className={`${sectionPrefix}-info-container text-white`}>
                      {title}
                    </div>
                    <div className={`${sectionPrefix}-header-action-container`}>
                      {actionButton && actionButton(stationId)}
                    </div>
                  </div>
                )}
                headerClassName={`${sectionPrefix}-header bg-primary border-gray-300 font-bold border rounded-md flex justify-between items-center`}
              >
                <div className={`${sectionPrefix}-info-container`}>
                  <Content stationId={stationId} />
                </div>
              </AccordionTab>
            )}
          </Accordion>
        );
      })}
    </div>
  );
};

export default React.memo(ServicePointsDetailsContent);
