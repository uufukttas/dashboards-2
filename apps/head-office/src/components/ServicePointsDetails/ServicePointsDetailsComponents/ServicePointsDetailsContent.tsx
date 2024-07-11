import React from 'react';
import { FaChargingStation, FaSackDollar } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import Accordion from '../../Accordion/Accordion';
import ChargeUnitsContent from '../Accordions/ChargeUnitsContent';
import Comissions from '../Accordions/Comissions/Comissions';
import EnergyPricesContent from '../Accordions/EnergyPricesContent';
import LocationInfo from '../Accordions/LocationInfo';
import ServicePointPermissions from '../Accordions/ServicePointPermissions';
import WorkingHoursContent from '../Accordions/WorkingHoursContent';
import { initialChargeUnitDataValue } from '../constants';
import { setChargeUnitData } from '../../../../app/redux/features/chargeUnitData';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import {
    setAddChargeUnit,
    setAddComission,
    setAddEnergyPrice,
    setAddPermission,
    setAddServicePointImage
} from '../../../../app/redux/features/setVisibleModal';
import { RootState } from '../../../../app/redux/store';
import { IAccordionConfigProps, IServicePointDetailsContentProps } from '../types';

const ServicePointsDetailsContent: React.FC<IServicePointDetailsContentProps> =
    ({ activeTabIndex, slug }: IServicePointDetailsContentProps) => {
        const dispatch = useDispatch();
        const chargeUnits = useSelector((state: RootState) => state.chargeUnitList);

        const addChargeUnitButton: React.ReactNode = (
            <Button
                buttonText={` + Sarj Ünitesi`}
                className={`charge-unit-add-button bg-secondary text-white font-bold rounded-md px-4 py-2 mx-2`}
                id={`add-charge-unit-button`}
                type="button"
                onClick={() => {
                    dispatch(toggleModalVisibility(true));
                    dispatch(setChargeUnitData(initialChargeUnitDataValue));
                    dispatch(setAddChargeUnit(true));
                }}
            />
        );
        const addEnergyPriceButton: React.ReactNode = (
            <Button
                buttonText={`+ Enerji Fiyati Ekle`}
                className="button bg-secondary rounded-md px-4 py-2 mx-4 font-bold text-white"
                id={`energy-prices-add-button`}
                type={'button'}
                onClick={() => {
                    dispatch(setAddEnergyPrice(true));
                    dispatch(toggleModalVisibility(true));
                }}
            />
        );
        const addImageButton: React.ReactNode = (
            <Button
                buttonText={`+ Istasyon Resmi Ekle`}
                className="button bg-secondary rounded-md px-4 py-2 mx-4 font-bold text-white"
                id={`service-point-image-add-button`}
                type={'button'}
                onClick={() => {
                    dispatch(setAddServicePointImage(true));
                    dispatch(toggleModalVisibility(true));
                }}
            />
        );
        const addServicePointPermissionButton: React.ReactNode = (
            <Button
                buttonText={`+ Istasyon Yetkisi Ekle`}
                className="button bg-secondary rounded-md px-4 py-2 mx-4 font-bold text-white"
                id={`service-point-permission-add-button`}
                type={'button'}
                onClick={() => {
                    dispatch(setAddPermission(true));
                    dispatch(toggleModalVisibility(true));
                }}
            />
        );
        const addComissionButton: React.ReactNode = (
            <Button
                buttonText={`+ Komisyon Ekle`}
                className="button bg-secondary rounded-md px-4 py-2 mx-4 font-bold text-white"
                id={`comission-add-button`}
                type={'button'}
                onClick={() => {
                    dispatch(setAddComission(true));
                    dispatch(toggleModalVisibility(true));
                }}
            />
        );
        const accordionConfig: IAccordionConfigProps[] = [
            {
                actionButton: addImageButton,
                accordionContent: <LocationInfo slug={slug} />,
                accordionTitle: "Istasyon Bilgileri",
                titleClassName: "font-bold",
            }, {
                actionButton: addChargeUnitButton,
                accordionContent: chargeUnits.length > 0 && <ChargeUnitsContent chargeUnits={chargeUnits} slug={slug} />,
                accordionIcon: <FaChargingStation />,
                accordionTitle: "Sarj Üniteleri",
                titleClassName: "font-bold",
            }, {
                accordionContent: <WorkingHoursContent slug={Number(slug)} />,
                accordionTitle: "Calisma Saatleri",
                titleClassName: "font-bold",
            }, {
                actionButton: addEnergyPriceButton,
                accordionContent: <EnergyPricesContent />,
                accordionIcon: <FaSackDollar />,
                accordionTitle: "Enerji Fiyat Ayarlari",
                titleClassName: "font-bold",
            }, {
                actionButton: addComissionButton,
                accordionContent: <Comissions slug={slug} />,
                accordionTitle: "Komisyonlar",
                titleClassName: "font-bold",
            }, {
                actionButton: addServicePointPermissionButton,
                accordionContent: <ServicePointPermissions />,
                accordionTitle: "Istasyon Yetkisi",
                titleClassName: "font-bold",
            },
        ];

        return (
            <div className="service-point-details-accordion-container">
                {
                    accordionConfig.map((accordion, index) => (
                        index === activeTabIndex &&
                        <Accordion
                            key={index}
                            accordionClassName="service-point-details-accordion my-4 bg-[#777777]"
                            accordionIcon={accordion.accordionIcon}
                            accordionTitle={accordion.accordionTitle}
                            actionButton={accordion.actionButton}
                            titleClassName={accordion.titleClassName}
                        >
                            {accordion.accordionContent}
                        </Accordion>
                    ))
                }
            </div>
        );
    };

export default ServicePointsDetailsContent;
