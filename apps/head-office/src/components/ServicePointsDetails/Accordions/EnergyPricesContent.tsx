import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import {
  useDeleteEnergyPriceMutation,
  useGetEnergyPriceDetailsMutation,
} from '../../../../app/api/services/service-point-details/servicePointDetails.service';
import { FaTrashCan } from 'react-icons/fa6';
import { showDialog } from '../../../../app/redux/features/dialogInformation';
import type { IEnergyPriceDetailsProps } from '../types';
import useModalManager from 'apps/head-office/src/hooks/useModalManager';
import ConfirmationModal from '../../Modals/ConfirmationModal';

const EnergyPricesContent: FC<{ stationId: number }> = ({ stationId }: { stationId: number }) => {
  const sectionPrefix = 'energy-prices-details';
  const dispatch = useDispatch();
  const [getEnergyPriceDetails] = useGetEnergyPriceDetailsMutation();
  const [energyPriceDetails, setEnergyPriceDetails] = useState<IEnergyPriceDetailsProps[]>([]);
  const { openModal } = useModalManager();
  const [deleteEnergyPrice] = useDeleteEnergyPriceMutation();

  const getEnergyPrice = async () => {
    const response = await getEnergyPriceDetails({ body: { stationId } });
    setEnergyPriceDetails(response.data);
  };

  useEffect(() => {
    getEnergyPrice();
  }, []);

  return (
    energyPriceDetails &&
    energyPriceDetails.map((energyPriceDetail: IEnergyPriceDetailsProps, idx: number) => {
      return (
        <div key={idx} className="flex flex-col items-end py-4 text-white bg-white p-4 rounded-b-md">
          <div className="flex w-full">
            <div className={`${sectionPrefix}-content py-4 text-text w-full`}>
              <div className={`${sectionPrefix}-info-container flex justify-between`}>
                <div
                  className={`${sectionPrefix}-info-item flex justify-between md:items-center flex-col md:flex-row w-full`}
                >
                  <div
                    className={`${sectionPrefix}-info-item-value text-lg font-normal flex items-center justify-between w-full`}
                  >
                    <p>
                      <span className="font-bold">{`${idx + 1}`}</span>
                      {`. ${energyPriceDetail.startDate.split('T')[0]}`}
                    </p>
                    <div className="flex items-center w-1/6">
                      {energyPriceDetail.isActive ? (
                        <div className="bg-green-500 rounded-full h-4 !w-4 mx-2"></div>
                      ) : (
                        <div className="bg-secondary rounded-full h-4 !w-4 mx-2"></div>
                      )}
                      <p className="justif">{energyPriceDetail.price}</p>
                    </div>
                  </div>
                </div>
                <div className={`${sectionPrefix}-info-item flex justify-between md:items-center flex-col md:flex-row`}>
                  <Button
                    buttonText={''}
                    className="bg-secondary rounded-md px-4 py-2 mx-4 text-white"
                    id={`energy-prices-delete-button`}
                    type={'button'}
                    dataAttributes={{ 'energy-price-id': energyPriceDetail.id.toString() }}
                    onClick={() =>
                      openModal(
                        'confirmationModal',
                        <ConfirmationModal
                          name="deleteEnergyPrice"
                          onConfirm={() => deleteEnergyPrice({ body: { Id: energyPriceDetail.id } })}
                        />,
                      )
                    }
                  >
                    <FaTrashCan />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })
  );
};

export default EnergyPricesContent;
