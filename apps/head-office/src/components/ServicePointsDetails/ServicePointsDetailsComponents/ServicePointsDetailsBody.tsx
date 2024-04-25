import React from 'react';
import { FaChargingStation } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import ChargeUnitsContent from '../Accordions/ChargeUnitsContent';
import EnergyPricesContent from '../Accordions/EnergyPricesContent';
import LocationInfo from '../Accordions/LocationInfo';
import WorkingHoursContent from '../Accordions/WorkingHoursContent';
import Accordion from '../../Accordion/Accordion';
import { setChargeUnitData } from '../../../../app/redux/features/chargeUnitData';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { RootState } from '../../../../app/redux/store';
import type { IServicePointsDetailsBodyProps } from '../types';

const ServicePointsDetailsBody: React.FC<IServicePointsDetailsBodyProps> = ({
    activeIndex,
    chargeUnits,
    connectorsList,
    setAddChargeUnit,
    setAddConnector,
    setAddEnergyPrice,
    setConnectorProperty,
    slug,
}: IServicePointsDetailsBodyProps) => {
    const dispatch = useDispatch();
    const isModalVisible = useSelector((state: RootState) => state.isModalVisible.isModalVisible);

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
                        actionButton={
                            <Button
                                buttonText={``}
                                className={`charge-units-add-button bg-primary bg-primary text-black rounded-md px-4 py-2 mx-2`}
                                id={`charge-units-add-button`}
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
                                + Sarj Ünitesi
                            </Button>
                        }
                        contentClassName="overflow-y-auto"
                        titleClassName="font-bold"
                    >
                        <ChargeUnitsContent
                            chargeUnits={chargeUnits}
                            connectorsList={connectorsList}
                            slug={slug}
                            setAddChargeUnit={setAddChargeUnit}
                            setAddConnector={setAddConnector}
                            setConnectorProperty={setConnectorProperty}
                        />
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
                        accordionTitle="Enerji Fiyat Ayarlari"
                        titleClassName="font-bold"
                    >
                        <EnergyPricesContent
                            setAddEnergyPrice={setAddEnergyPrice}
                            slug={slug}
                        />
                    </Accordion>
                )
            }
            {
                activeIndex === 4 && (
                    <Accordion
                        accordionTitle="Servis Noktasi Yetkisi"
                        titleClassName="font-bold"
                    >
                        <></>
                    </Accordion>
                )
            }
            {
                activeIndex === 5 && (
                    <Accordion
                        accordionTitle="Sharz.net Fiyatlandirma"
                        titleClassName="font-bold"
                    >
                        <></>
                    </Accordion>
                )
            }
        </div>
    );
};

export default ServicePointsDetailsBody;
