import { Button } from '@projects/button';
import { Card } from '@projects/card';
import { useGetChargePointConnetorsV2Mutation } from 'apps/head-office/app/api/services/service-point-details/servicePointDetails.service';
import { BRAND_PREFIX } from 'apps/head-office/src/constants/constants';
import useModalManager from 'apps/head-office/src/hooks/useModalManager';
import Link from 'next/link';
import { useEffect } from 'react';
import { FaPlugCirclePlus, FaQrcode } from 'react-icons/fa6';
import { TbProgressBolt } from 'react-icons/tb';
import ConnectorAddModal from '../Modals/ConnectorAddModal';
import StationManagementModal from '../Modals/StationManagementModal';
import { IConnectorProps } from '../types';

const ConenctorsList: React.FC<{ chargePointId: number; deviceCode: string }> = ({ chargePointId, deviceCode }) => {
  const chargeUnitPrefix: string = `${BRAND_PREFIX}-charge-unit`;
  const [getChargePointConnetors, { data: connectors }] = useGetChargePointConnetorsV2Mutation();
  const { openModal } = useModalManager();

  const getChargePointConnectorsList = async () => {
    await getChargePointConnetors({ body: { stationChargePointId: chargePointId } });
  };

  useEffect(() => {
    getChargePointConnectorsList();
  }, []);

  return (
    connectors &&
    // @ts-ignore
    connectors.map((connectorItem: IConnectorProps, index: number) => {
      return (
        <Card
          BRAND_PREFIX={BRAND_PREFIX}
          containerClassName={`${chargeUnitPrefix}-card-container text-text font-bold flex flex-col rounded-md w-1/2 m-4 border border-gray-200 shadow-none`}
          key={index}
        >
          <div className={`${chargeUnitPrefix}-card-content flex flex-col justify-between p-4`}>
            <div
              className={`${chargeUnitPrefix}-card-content-row flex flex-col justify-start items-start w-full border-b border-gray-200`}
            >
              <div className={`${chargeUnitPrefix}-info-content-row-item text-text flex`}>
                <div className={`${chargeUnitPrefix}-info-content-row-item-label text-text font-medium`}>
                  Konnektor Numarasi:
                </div>
                <div className={`${chargeUnitPrefix}-info-content-row-item-value text-text font-bolder`}>
                  {connectorItem.connectorNr}
                </div>
              </div>
              <div className={`${chargeUnitPrefix}-info-content-row-item text-text flex`}>
                <div className={`${chargeUnitPrefix}-info-content-row-item-label text-text font-medium`}>
                  EPDK Socket Numarasi:
                </div>
              </div>
              <div className={`${chargeUnitPrefix}-info-content-row-item text-text flex`}>
                <div className={`${chargeUnitPrefix}-info-content-row-item-value text-text font-bolder`}>
                  {connectorItem.epdkSocketNumber}
                </div>
              </div>
              <div className={`${chargeUnitPrefix}-info-content-row-item text-text flex`}>
                <div className={`${chargeUnitPrefix}-info-content-row-item text-text flex`}>
                  <div className={`${chargeUnitPrefix}-info-content-row-item-label text-text font-medium`}>
                    Konnektor Tipi:
                  </div>
                  <div className={`${chargeUnitPrefix}-info-content-row-item-value text-text font-bolder`}>
                    {connectorItem.stationConnectorAC ? 'AC' : 'DC'}
                  </div>
                </div>
              </div>
              <div className={`${chargeUnitPrefix}-info-content-row-item text-text flex`}>
                <div className={`${chargeUnitPrefix}-info-content-row-item text-text flex`}>
                  <div className={`${chargeUnitPrefix}-info-content-row-item-label text-text font-medium`}>
                    Konnektor KW:
                  </div>
                  <div className={`${chargeUnitPrefix}-info-content-row-item-value text-text font-bolder`}>
                    {connectorItem.stationConnectorKW}
                  </div>
                </div>
              </div>
              <div className={`${chargeUnitPrefix}-info-content-row-item text-text flex`}>
                <div className={`${chargeUnitPrefix}-info-content-row-item-label text-text font-medium`}>
                  Konnektor İsmi:
                </div>
                <div className={`${chargeUnitPrefix}-info-content-row-item-value text-text font-bolder`}>
                  {connectorItem.stationConnectorName}
                </div>
              </div>
              <div className={`${chargeUnitPrefix}-info-content-row-item text-text flex`}>
                <div className={`${chargeUnitPrefix}-info-content-row-item text-text flex`}>
                  <div className={`${chargeUnitPrefix}-info-content-row-item-label text-text font-medium`}>Tarife:</div>
                  <div className={`${chargeUnitPrefix}-info-content-row-item-value text-text font-bolder`}>
                    {connectorItem.tariffName}
                  </div>
                </div>
              </div>
            </div>
            <div className={`${chargeUnitPrefix}-info-actions-container text-text flex`}>
              <div className={`${chargeUnitPrefix}-info-edit-actions flex justify-between items-center w-full`}>
                <Link
                  className={`${chargeUnitPrefix}-qr-code-button rounded-md px-2 py-2 mx-4`}
                  href={`${
                    process.env.NEXT_PUBLIC_BASE_URL
                  }/Values/QRCodeCreate?text=${deviceCode}&connectorNr=${connectorItem.connectorNr.toString()}`}
                  id={`${chargeUnitPrefix}-qr-code-button`}
                  target="_blank"
                >
                  <FaQrcode />
                </Link>
                <Button
                  className="connector-add-button rounded-md px-2 py-2 mx-4"
                  id={`${chargeUnitPrefix}-connector-add-button`}
                  type={'button'}
                  onClick={() => {
                    openModal(
                      'addConnectorModal',
                      <ConnectorAddModal
                      connectorId={connectorItem.RID}
                      chargePointId={chargePointId}
                      connectorNumber={connectorItem.connectorNr}
                      modelId={connectorItem.modelId}
                      />,
                    )
                  }}
                >
                  <FaPlugCirclePlus />
                </Button>
                <Button
                  // dataAttributes={{
                  //   'data-device-code': chargeUnitsList[0].deviceCode.toString(),
                  // }}
                  id={`${chargeUnitPrefix}-connector-process-button`}
                  type={'button'}
                  onClick={(event) => {
                    openModal(
                      'stationManagementModal',
                      <StationManagementModal unitCode={chargePointId} connectorNumber={connectorItem.connectorNr} />,
                    );
                  }}
                >
                  <TbProgressBolt />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      );
    })
  );
};

export default ConenctorsList;
