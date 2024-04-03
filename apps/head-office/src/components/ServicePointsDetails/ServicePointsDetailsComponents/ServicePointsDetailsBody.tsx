import React, { Dispatch, SetStateAction } from 'react';
import Accordion from '../../Accordion/Accordion';
import ServicePointDetailsContent from '../Accordions/ServicePointDetailsContent';
import ChargeUnitsContent from '../Accordions/ChargeUnitsContent';

interface IChargeUnitsProps {
    chargePointId: number;
    connectorNumber: number;
    connectorId: number;
    count: number;
    deviceCode: string;
    externalAddress: string;
    internalAddress: string;
    investor: string;
    isFreePoint: boolean;
    lastHeartBeat: string;
    limitedUsage: boolean;
    modelId: number;
    model: string;
    ocppVersion: string;
    sendRoaming: boolean;
    stationId: number;
    status: string;
  };

interface IConnectorProps {
    connectorName: string;
    connectorNr: number;
    id: number;
    isAC: boolean;
    kw: number;
    stationChargePointId: number;
  };

interface IConnectorStateProps {
    [key: number]: IConnectorProps[];
  };

interface IServicePointsDetailsBodyProps {
    activeIndex: number;
    chargeUnits: IChargeUnitsProps[];
    connectorCount: number;
    connectors: IConnectorStateProps[];
    setAddChargeUnit: Dispatch<SetStateAction<boolean>>;
    setAddConnector: Dispatch<SetStateAction<boolean>>;
    slug: string;
};

const ServicePointsDetailsBody = ({
    activeIndex,
    chargeUnits,
    connectorCount,
    connectors,
    setAddChargeUnit,
    setAddConnector,
    slug,
}: IServicePointsDetailsBodyProps) => {
    return (
        <div className="service-point-details-container lg:mx-8">
            {activeIndex === 0 && (
                <Accordion
                    accordionTitle="Lokasyon Bilgileri"
                    titleClassName="font-bold"
                >
                    <ServicePointDetailsContent slug={slug} />
                </Accordion>
            )}
            {activeIndex === 1 && (
                <Accordion
                    accordionTitle="Sarj Üniteleri"
                    contentClassName="overflow-y-auto"
                    titleClassName="font-bold"
                >
                    {
                        connectors.length > 0 &&
                        <ChargeUnitsContent
                            chargeUnits={chargeUnits}
                            connectorCount={connectorCount}
                            connectors={connectors}
                            setAddChargeUnit={setAddChargeUnit}
                            setAddConnector={setAddConnector}
                        />
                    }
                </Accordion>
            )}
            {activeIndex === 2 && (
                // <Accordion
                //     accordionTitle="Calisma Saatleri"
                //     titleClassName="font-bold"
                // >
                //     <WorkingHoursContent slug={Number(slug)} />
                // </Accordion>
                <></>
            )}
            {activeIndex === 3 && (
                // <Accordion
                //   accordionTitle="Enerji Fiyat Ayarlari"
                //   accordionContent={energySettingsContent}
                //   titleClassName="font-bold"
                // />
                <></>
            )}
            {activeIndex === 4 && (
                <Accordion
                    accordionTitle="Kullanici Ayarlari"
                    titleClassName="font-bold"
                >
                    <></>
                </Accordion>
            )}
            {activeIndex === 5 && (
                <Accordion
                    accordionTitle="Sharz.net Fiyatlandirma"
                    titleClassName="font-bold"
                >
                    <></>
                </Accordion>
            )}
        </div>
    )
}

export default ServicePointsDetailsBody