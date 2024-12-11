import { FC, useEffect } from 'react';
import { FaTrashCan } from 'react-icons/fa6';
import { Button } from '@projects/button';
import ConfirmationModal from '../../Modals/ConfirmationModal';
import {
  useDeleteEnergyPriceMutation,
  useGetEnergyPriceDetailsMutation,
} from '../../../../app/api/services/service-point-details/servicePointDetails.service';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import useModalManager from '../../../../src/hooks/useModalManager';
import type { IEnergyPriceDetailsProps, IStationIdProps } from '../types';

const EnergyPricesContent: FC<IStationIdProps> = ({ stationId }) => {
  const sectionPrefix: string = `${BRAND_PREFIX}-energy-prices-details`;
  const [deleteEnergyPrice] = useDeleteEnergyPriceMutation();
  const [getEnergyPriceDetails, { data: energyPriceDetails }] = useGetEnergyPriceDetailsMutation();
  const { closeModal, openModal } = useModalManager();

  const getEnergyPrice = async (): Promise<void> => {
    getEnergyPriceDetails({ body: { stationId } });
  };

  useEffect(() => {
    getEnergyPrice();
  }, []);

  return energyPriceDetails?.map((energyPriceDetail: IEnergyPriceDetailsProps, index: number) => {
    return (
      <div
        className={`${sectionPrefix}-container flex flex-col items-end py-4 text-white bg-white p-4 rounded-b-md`}
        key={index}
      >
        <div className={`${sectionPrefix}-content-container flex w-full`}>
          <div className={`${sectionPrefix}-content py-4 text-text w-full`}>
            <div className={`${sectionPrefix}-info-container flex justify-between`}>
              <div
                className={`${sectionPrefix}-info-item flex justify-between md:items-center flex-col md:flex-row w-full`}
              >
                <div
                  className={`${sectionPrefix}-info-item-value text-lg font-normal flex items-center justify-between w-full`}
                >
                  <p className={`${sectionPrefix}-date-container`}>
                    <span className={`${sectionPrefix}-date-item font-bold`}>{`${index + 1}`}</span>
                    {`. ${energyPriceDetail.startDate.split('T')[0]}`}
                  </p>
                  <div className={`${sectionPrefix}-price-container flex items-center w-1/6`}>
                    {energyPriceDetail.isActive ? (
                      <div className={`${sectionPrefix}-price-status bg-green-500 rounded-full h-4 !w-4 mx-2`}></div>
                    ) : (
                      <div className={`${sectionPrefix}-price-status bg-secondary rounded-full h-4 !w-4 mx-2`}></div>
                    )}
                    <p className={`${sectionPrefix}-price`}>{energyPriceDetail.price}</p>
                  </div>
                </div>
              </div>
              <div
                className={`${sectionPrefix}-info-action-button-container flex justify-between md:items-center flex-col md:flex-row`}
              >
                <Button
                  buttonText={''}
                  className={`${sectionPrefix}-energy-prices-delete-button bg-secondary rounded-md px-4 py-2 mx-4 text-white`}
                  id={`${sectionPrefix}-energy-prices-delete-button`}
                  type={'button'}
                  onClick={() => {
                    openModal(
                      'confirmationModal',
                      <ConfirmationModal
                        name="deleteEnergyPrice"
                        onConfirm={() => {
                          deleteEnergyPrice({ body: { Id: energyPriceDetail.id } });
                          closeModal('confirmationModal');
                        }}
                      />,
                    );
                  }
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
  });
};

export default EnergyPricesContent;
