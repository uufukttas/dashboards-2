import React from 'react';
import Accordion from '../../Accordion/Accordion';
import LocationInfo from '../Accordions/LocationInfo';
import ChargeUnitsContent from '../Accordions/ChargeUnitsContent';
import type { IServicePointsDetailsBodyProps } from '../types';

const ServicePointsDetailsBody = ({
    activeIndex,
    chargeUnits,
    connectors,
    setAddChargeUnit,
    setAddConnector,
    slug,
}: IServicePointsDetailsBodyProps) => {
    return (
        <div className="service-point-details-container lg:mx-8">
            {
                activeIndex === 0 && (
                    <Accordion
                        accordionTitle="Lokasyon Bilgileri"
                        titleClassName="font-bold"
                    >
                        <LocationInfo slug={slug} />
                    </Accordion>
                )}
            {
                activeIndex === 1 && (
                    <Accordion
                        accordionTitle="Sarj Üniteleri"
                        contentClassName="overflow-y-auto"
                        titleClassName="font-bold"
                    >
                        <ChargeUnitsContent
                            chargeUnits={chargeUnits}
                            connectors={connectors}
                            slug={slug}
                            setAddChargeUnit={setAddChargeUnit}
                            setAddConnector={setAddConnector}
                        />
                    </Accordion>
                )}
            {
                activeIndex === 2 && (
                    // <Accordion
                    //     accordionTitle="Calisma Saatleri"
                    //     titleClassName="font-bold"
                    // >
                    //     <WorkingHoursContent slug={Number(slug)} />
                    // </Accordion>
                    <></>
                )
            }
            {
                activeIndex === 3 && (
                    // <Accordion
                    //   accordionTitle="Enerji Fiyat Ayarlari"
                    //   accordionContent={energySettingsContent}
                    //   titleClassName="font-bold"
                    // />
                    <></>
                )
            }
            {
                activeIndex === 4 && (
                    <Accordion
                        accordionTitle="Kullanici Ayarlari"
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
