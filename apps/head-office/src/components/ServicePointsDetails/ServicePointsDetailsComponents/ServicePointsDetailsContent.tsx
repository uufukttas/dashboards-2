import React from 'react';
import { FaChargingStation, FaSackDollar } from 'react-icons/fa6';
import ActionButton from './AccordionHeaderActionButton';
import AccordionSection from './AccordionSection';
import ChargeUnitsContent from '../Accordions/ChargeUnitsContent';
import Comissions from '../Accordions/Comissions/Comissions';
import EnergyPricesContent from '../Accordions/EnergyPricesContent';
import LocationInfo from '../Accordions/LocationInfo';
import ServicePointPermissions from '../Accordions/ServicePointPermissions';
import WorkingHoursContent from '../Accordions/WorkingHoursContent';
import ChargeUnitAddModal from '../Modals/ChargeUnitAddModal';
import ComissionModal from '../Modals/ComissionModal';
import EnergyPricesModal from '../Modals/EnergyPricesModal';
import ServicePointImageModal from '../Modals/ServicePointImageModal';
import ServicePointPermissionsModal from '../Modals/ServicePointPermissionsModal';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import type { IAccordionSection, IServicePointDetailsContentProps } from '../types';

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
          ModalComponent={ServicePointImageModal}
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
      actionButton: (stationId: number) => (
        <ActionButton
          buttonText="+ Enerji Fiyatı Ekle"
          modalName="addEnergyPriceModal"
          ModalComponent={EnergyPricesModal}
          stationId={stationId}
        />
      ),
      content: EnergyPricesContent,
      icon: <FaSackDollar />,
      key: 'energyPrices',
      title: 'Enerji Fiyat Ayarlari',
    },
    {
      actionButton: (stationId: number) => (
        <ActionButton
          buttonText="+ Komisyon Ekle"
          modalName="addComissionModal"
          ModalComponent={ComissionModal}
          stationId={stationId}
        />
      ),
      content: Comissions,
      key: 'commissions',
      title: 'Komisyonlar',
    },
    {
      actionButton: (stationId: number) => (
        <ActionButton
          buttonText="+ İstasyon Yetkisi Ekle"
          modalName="addServicePointPermissionModal"
          ModalComponent={ServicePointPermissionsModal}
          stationId={stationId}
        />
      ),
      content: ServicePointPermissions,
      key: 'permissions',
      title: 'İstasyon Yetkisi',
    },
  ];
  const sectionPrefix: string = `${BRAND_PREFIX}-service-point-details-accordion`;

  return (
    <div className={`${sectionPrefix}-container`}>
      {accordionSections.map((section: IAccordionSection, index: number) => (
        <AccordionSection
          activeTabIndex={activeTabIndex}
          index={index}
          key={section.key}
          section={section}
          stationId={stationId}
        />
      ))}
    </div>
  );
};

export default React.memo(ServicePointsDetailsContent);
