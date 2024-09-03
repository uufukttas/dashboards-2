import React from 'react';
import { FaChargingStation, FaSackDollar } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import ChargeUnitsContent from '../Accordions/ChargeUnitsContent';
import Comissions from '../Accordions/Comissions/Comissions';
import EnergyPricesContent from '../Accordions/EnergyPricesContent';
import LocationInfo from '../Accordions/LocationInfo';
import ServicePointPermissions from '../Accordions/ServicePointPermissions';
import WorkingHoursContent from '../Accordions/WorkingHoursContent';
import { initialChargeUnitDataValue } from '../constants';
// import Accordion from '../../Accordion/Accordion';
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
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import { IAccordionConfigProps, IServicePointDetailsContentProps } from '../types';

import { Accordion, AccordionTab } from 'primereact/accordion';

const ServicePointsDetailsContent: React.FC<IServicePointDetailsContentProps> =
    ({ activeTabIndex, slug }: IServicePointDetailsContentProps) => {
        const dispatch = useDispatch();
        const chargeUnits = useSelector((state: RootState) => state.chargeUnitList);

        const addChargeUnitButton: React.ReactNode = (
            <Button
                buttonText={` + Sarj Ünitesi`}
                className={`button bg-secondary rounded-md mx-4 font-bold text-white p-4`}
                id={`add-charge-unit-button`}
                type="button"
                onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    dispatch(toggleModalVisibility(true));
                    dispatch(setChargeUnitData(initialChargeUnitDataValue));
                    dispatch(setAddChargeUnit(true));
                }}
            />
        );
        const addEnergyPriceButton: React.ReactNode = (
            <Button
                buttonText={`+ Enerji Fiyati Ekle`}
                className="button bg-secondary rounded-md mx-4 font-bold text-white p-4"
                id={`energy-prices-add-button`}
                type={'button'}
                onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    dispatch(setAddEnergyPrice(true));
                    dispatch(toggleModalVisibility(true));
                }}
            />
        );
        const addImageButton: React.ReactNode = (
            <Button
                buttonText={`+ Istasyon Resmi Ekle`}
                className="button bg-secondary rounded-md mx-4 font-bold text-white p-4"
                id={`service-point-image-add-button`}
                type={'button'}
                onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    dispatch(setAddServicePointImage(true));
                    dispatch(toggleModalVisibility(true));
                }}
            />
        );
        const addServicePointPermissionButton: React.ReactNode = (
            <Button
                buttonText={`+ Istasyon Yetkisi Ekle`}
                className="button bg-secondary rounded-md mx-4 font-bold text-white p-4"
                id={`service-point-permission-add-button`}
                type={'button'}
                onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    dispatch(setAddPermission(true));
                    dispatch(toggleModalVisibility(true));
                }}
            />
        );
        const addComissionButton: React.ReactNode = (
            <Button
                buttonText={`+ Komisyon Ekle`}
                className="button bg-secondary rounded-md mx-4 font-bold text-white p-4"
                id={`comission-add-button`}
                type={'button'}
                onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
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
            <div className={`${BRAND_PREFIX}-service-point-details-accordion-container`}>
                {
                    accordionConfig.map((accordion, index) => (
                        <Accordion
                            activeIndex={activeTabIndex}
                            className={`${BRAND_PREFIX}-service-point-details-accordion my-4 bg-primary border-gray-300 rounded-md`}
                            key={index}
                        >
                            {
                                index === activeTabIndex && (
                                    <AccordionTab
                                        header={() => {
                                            return (
                                                <div className={`${BRAND_PREFIX}-service-point-details-accordion-header-container w-full flex justify-between items-center text-white`}>
                                                    <div className={`${BRAND_PREFIX}-service-point-details-accordion-header-info-container text-white`}>
                                                        {accordion.accordionTitle}
                                                    </div>
                                                    <div className={`${BRAND_PREFIX}-service-point-details-accordion-header-action-container`}>
                                                        {accordion.actionButton}
                                                    </div>
                                                </div>
                                            )
                                        }}
                                        headerClassName={`${BRAND_PREFIX}-service-point-details-accordion-header bg-primary border-gray-300 ${accordion.titleClassName} p-4 border rounded-md flex justify-between items-center`}
                                    >
                                        {
                                            index === activeTabIndex && (
                                                <div className={`${BRAND_PREFIX}-service-point-details-accordion-header-info-container`}>
                                                    {accordion.accordionContent}
                                                </div>
                                            )
                                        }
                                    </AccordionTab>
                                )
                            }
                        </Accordion>
                    ))
                }
            </div >
        );
    };

export default ServicePointsDetailsContent;
