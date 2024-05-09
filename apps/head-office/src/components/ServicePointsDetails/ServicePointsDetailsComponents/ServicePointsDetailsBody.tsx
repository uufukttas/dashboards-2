import React from 'react';
import { FaChargingStation, FaSackDollar } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import Accordion from '../../Accordion/Accordion';
import ChargeUnitsContent from '../Accordions/ChargeUnitsContent';
import Comissions from '../Accordions/Comissions';
import EnergyPricesContent from '../Accordions/EnergyPricesContent';
import LocationInfo from '../Accordions/LocationInfo';
import ServicePointPermissions from '../Accordions/ServicePointPermissions';
import WorkingHoursContent from '../Accordions/WorkingHoursContent';
import { setChargeUnitData } from '../../../../app/redux/features/chargeUnitData';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import type { IServicePointsDetailsBodyProps } from '../types';

const ServicePointsDetailsBody: React.FC<IServicePointsDetailsBodyProps> = ({
    activeIndex,
    chargeUnits,
    connectorsList,
    energyPriceDetails,
    setAddChargeUnit,
    setAddComission,
    setAddConnector,
    setAddEnergyPrice,
    setAddPermission,
    setConnectorProperty,
    setIsEnergyPriceListUpdated,
    slug,
}: IServicePointsDetailsBodyProps) => {
    const initialChargeUnitData = {
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
    };
    const dispatch = useDispatch();
    const addChargeUnitButton = (
        <Button
            buttonText={``}
            className={`add-charge-unit-button bg-secondary text-white font-bold rounded-md px-4 py-2 mx-2`}
            id={`add-charge-unit-button`}
            type="button"
            onClick={() => {
                dispatch(toggleModalVisibility());
                dispatch(setChargeUnitData(initialChargeUnitData));
                setAddChargeUnit(true);
            }}
        >
            + Sarj Ünitesi
        </Button>
    );
    const addEnergyPriceButton = (
        <Button
            buttonText={""}
            className="button bg-secondary rounded-md px-4 py-2 mx-4 font-bold text-white"
            id={`energy-prices-add-button`}
            type={'button'}
            onClick={() => {
                setAddEnergyPrice(true);
                dispatch(toggleModalVisibility());
            }}
        >
            + Enerji Fiyati Ekle
        </Button>
    );
    const addServicePointPermissionButton = (
        <Button
            buttonText={""}
            className="button bg-secondary rounded-md px-4 py-2 mx-4 font-bold text-white"
            id={`service-point-permission-add-button`}
            type={'button'}
            onClick={() => {
                setAddPermission(true);
                dispatch(toggleModalVisibility());
            }}
        >
            + Servis Noktasi Yetkisi Ekle
        </Button>
    );
    const addComissionButton = (
        <Button
            buttonText={""}
            className="button bg-secondary rounded-md px-4 py-2 mx-4 font-bold text-white"
            id={`comission-add-button`}
            type={'button'}
            onClick={() => {
                setAddComission(true);
                dispatch(toggleModalVisibility());
            }}
        >
            + Komisyon Ekle
        </Button>
    );

    return (
        <div className="service-point-details-accordion-container">
            {
                activeIndex === 0 && (
                    <Accordion
                        accordionTitle="Servis Noktasi Bilgileri"
                        titleClassName="font-bold"
                    >
                        <LocationInfo slug={slug} />
                    </Accordion>
                )
            }
            {
                activeIndex === 1 && (
                    <Accordion
                        accordionIcon={<FaChargingStation />}
                        accordionTitle="Sarj Üniteleri"
                        actionButton={addChargeUnitButton}
                        contentClassName="overflow-y-auto"
                        titleClassName="font-bold"
                    >
                        {
                            chargeUnits.length > 0 && (
                                <ChargeUnitsContent
                                    chargeUnits={chargeUnits}
                                    connectorsList={connectorsList}
                                    slug={slug}
                                    setAddChargeUnit={setAddChargeUnit}
                                    setAddConnector={setAddConnector}
                                    setConnectorProperty={setConnectorProperty}
                                />
                            )
                        }
                    </Accordion>
                )
            }
            {
                activeIndex === 2 && (
                    <Accordion
                        accordionTitle="Calisma Saatleri"
                        titleClassName="font-bold"
                    >
                        <WorkingHoursContent slug={Number(slug)} />
                    </Accordion>
                )
            }
            {
                activeIndex === 3 && (
                    <Accordion
                        accordionIcon={<FaSackDollar />}
                        accordionTitle="Enerji Fiyat Ayarlari"
                        actionButton={addEnergyPriceButton}
                        titleClassName="font-bold"
                    >
                        <EnergyPricesContent
                            energyPriceDetails={energyPriceDetails}
                            slug={slug}
                            setIsEnergyPriceListUpdated={setIsEnergyPriceListUpdated}
                        />
                    </Accordion>
                )
            }
            {
                activeIndex === 4 && (
                    <Accordion
                        accordionTitle="Servis Noktasi Yetkisi"
                        actionButton={addServicePointPermissionButton}
                        titleClassName="font-bold"
                    >
                        <ServicePointPermissions />
                    </Accordion>
                )
            }
            {
                activeIndex === 5 && (
                    <Accordion
                        accordionTitle="Komisyonlar"
                        actionButton={addComissionButton}
                        titleClassName="font-bold"
                    >
                        <Comissions />
                    </Accordion>
                )
            }
        </div>
    );
};

export default ServicePointsDetailsBody;
