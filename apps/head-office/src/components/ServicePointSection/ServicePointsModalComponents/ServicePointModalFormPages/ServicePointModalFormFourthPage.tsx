import { Button } from '@projects/button';
import useModalManager from 'apps/head-office/src/hooks/useModalManager';
import React, { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import {
  useAddStationFeatureMutation,
  useAddStationInfoMutation,
  useGetFeatureValuesMutation,
  useGetStationFeaturesMutation,
} from '../../../../../app/api/services/service-points/servicePoints.service';
import { BRAND_PREFIX } from '../../../../constants/constants';
import BaseInput from '../../../Base/BaseInput';
import BaseMultiSelect from '../../../Base/BaseMultiSelect';
import { IFormDataProps, IModalFourthPageInputsProps } from '../../types';

const ServicePointModalFormFourthPage: React.FC<IModalFourthPageInputsProps> = ({
  form,
  activePage,
  setActivePage,
}: IModalFourthPageInputsProps) => {
  const { handleSubmit } = form;

  const stationId: number = form.watch(`id`);

  const { closeModal } = useModalManager();

  const [addStationFeature] = useAddStationFeatureMutation();
  const [addStationInfo] = useAddStationInfoMutation();
  const [getStationFeatures] = useGetStationFeaturesMutation();
  const [getPaymentMethods, { data: paymentMethods }] = useGetFeatureValuesMutation();
  const [getOpportunities, { data: opportunities }] = useGetFeatureValuesMutation();

  const createConfigData = () => ({
    ...(form.watch(`id`) > 0 ? { id: form.watch(`id`) } : { stationId: stationId }),
  });

  const createParkingConfigData = () => {
    return [
      {
        id: 0,
        rid: 0,
        name: `free-park-count`,
        stationId: stationId,
        stationFeatureType: 8,
        stationFeatureValue: Number(form.watch(`free-park-count`)),
        isDeleted: false,
      },
    ];
  };

  const createPaymentMethodsConfigData = () => {
    const data = paymentMethods
      ?.filter((paymentMethod: any) => form.watch(`payment-methods`).includes(paymentMethod.rid))
      .map((paymentMethod: any) => ({
        ...paymentMethod,
        stationId: stationId,
        stationFeatureType: 1,
        stationFeatureValue: Number(paymentMethod.stationFeatureValue),
        isDeleted: false,
      }));

    return data;
  };

  const createOpportunitiesConfigData = () => {
    const data = opportunities
      ?.filter((opportunity: any) => form.watch(`opportunities`).includes(opportunity.rid))
      .map((opportunity: any) => ({
        ...opportunity,
        stationId: stationId,
        stationFeatureType: 2,
        stationFeatureValue: Number(opportunity.stationFeatureValue),
        isDeleted: false,
      }));

    return data;
  };

  const createServicePointDetails = async () => {
    const actionData = createConfigData();

    addStationInfo({
      body: {
        stationId: stationId,
        ...actionData,
      },
    });
  };

  const handleFormSubmit: SubmitHandler<IFormDataProps> = () => {
    createServicePointDetails();
    const paymentMethodsData = createPaymentMethodsConfigData();
    const opportunitiesData = createOpportunitiesConfigData();
    const parkingData = createParkingConfigData();

    const requestData = {
      ...paymentMethodsData,
      ...opportunitiesData,
      ...parkingData,
    };

    addStationFeature({ body: requestData })
      .unwrap()
      .then(() => {
        closeModal('add-service-point');
      });
  };

  useEffect(() => {
    getPaymentMethods({ body: 1 }).unwrap();
    getOpportunities({ body: 2 }).unwrap();
    getStationFeatures({ body: stationId }).unwrap();
  }, []);

  return paymentMethods?.length === 0 ? null : (
    <form
      className={`${BRAND_PREFIX}-modal-page-4 ${activePage === 4 ? 'block' : 'hidden'}`}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className={`payment-methods-container mb-4`}>
        <BaseMultiSelect
          form={form}
          name={`payment-methods`}
          options={paymentMethods || []}
          optionLabel={`name`}
          optionValue={`rid`}
          placeholder={`Ödeme Yöntemleri`}
        />
      </div>
      <div>
        <BaseInput id={`free-park-count`} form={form} name={`free-park-count`} label={`Ücretsiz araç park sayısı`} />
      </div>
      <div className={`opportunities-container`}>
        <div className={`opportunities-container`}>
          <BaseMultiSelect
            form={form}
            name={`opportunities`}
            options={opportunities || []}
            optionLabel={`name`}
            optionValue={`rid`}
            placeholder={`Fırsatlar`}
          />
        </div>
      </div>
      <div className={`buttons-container flex justify-between items-center mt-4`}>
        <Button
          buttonText="Geri"
          className={`prev-button bg-primary text-text text-sm rounded-lg block p-2.5`}
          id={`prev-button`}
          type={`submit`}
          onClick={() => setActivePage(activePage - 1)}
        />
        <Button
          buttonText={form.watch(`id`) > 0 ? 'Güncelle' : 'Kaydet'}
          className={`submit-button bg-primary text-white text-sm rounded-lg block p-2.5`}
          id={`submit-button`}
          type={`submit`}
        />
      </div>
    </form>
  );
};

export default ServicePointModalFormFourthPage;
