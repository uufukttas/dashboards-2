import { Button } from '@projects/button';
import React, { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import {
  useAddStationFeatureMutation,
  useAddStationInfoMutation,
  useGetFeatureValuesMutation,
  useGetStationFeaturesMutation,
  useUpdateStationInfoMutation,
} from '../../../../../app/api/services/service-points/servicePoints.service';
import { BRAND_PREFIX } from '../../../../constants/constants';
import BaseInput from '../../../Base/BaseInput';
import BaseMultiSelect from '../../../Base/BaseMultiSelect';
import { IFeatureProps, IFormDataProps, IModalFourthPageInputsProps } from '../../types';

const ServicePointModalFormFourthPage: React.FC<IModalFourthPageInputsProps> = ({
  form,
  activePage,
  setActivePage,
}: IModalFourthPageInputsProps) => {
  const { handleSubmit } = form;

  const stationId: number = form.watch(`id`);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const [addStationFeature] = useAddStationFeatureMutation();
  const [addStationInfo] = useAddStationInfoMutation();
  const [updateStationInfo] = useUpdateStationInfoMutation();
  const [getStationFeatures] = useGetStationFeaturesMutation();
  const [getPaymentMethods, { data: paymentMethods }] = useGetFeatureValuesMutation();
  const [getOpportunities, { data: opportunities }] = useGetFeatureValuesMutation();

  const createConfigData = () => ({
    address: form.watch(`address`),
    addressDetail: form.watch(`address-detail`),
    phone1: form.watch(`phone1`),
    phone2: form.watch(`phone2`),
    lat: form.watch(`lat`),
    lon: form.watch(`lon`),
    cityId: form.watch(`cityId`),
    districtId: form.watch(`districtId`),
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

  const createPaymentMethodsConfigData = (): Promise<IFeatureProps[] | []> => {
    return new Promise((resolve) => {
      if (paymentMethods?.length === 0) {
        resolve([]);
      } else {
        const filteredPaymentMethods = paymentMethods
          ?.filter((paymentMethod) => paymentMethod.isChecked)
          .map((paymentMethod) => ({
            ...paymentMethod,
            stationId: stationId,
            id: null,
            name: '',
            rid: null,
            stationFeatureType: 1,
            stationFeatureValue: Number(paymentMethod.stationFeatureValue),
            isDeleted: false,
          }));
        resolve(filteredPaymentMethods);
      }
    });
  };

  const createOpportunitiesConfigData = (): Promise<IFeatureProps[] | []> => {
    return new Promise((resolve, reject) => {
      if (opportunities?.length === 0) {
        resolve([]);
      } else {
        const filteredOpportunities = opportunities
          ?.filter((opportunity) => opportunity.isChecked)
          .map((opportunity) => ({
            ...opportunity,
            stationId: stationId,
            stationFeatureType: 2,
            stationFeatureValue: Number(opportunity.stationFeatureValue),
            isDeleted: false,
          }));
        resolve(filteredOpportunities);
      }
    });
  };

  const createServicePointDetails = async () => {
    const actionData = createConfigData();

    if (form.watch(`id`) > 0) {
      updateStationInfo({
        body: {
          id: form.watch(`id`),
          stationInfo: actionData,
        },
      });

      return;
    } else {
      addStationInfo({
        body: {
          stationId: stationId,
          stationInfo: actionData,
        },
      });
    }
  };

  const getStationParkingFeatures = async () => {
    const response = await getStationFeatures({ body: stationId }).unwrap();
    const parkingCount =
      response?.filter((feature: IFeatureProps) => feature.stationFeatureType === 8)[0]?.stationFeatureValue || 0;

    form.setValue(`free-park-count`, parkingCount);
  };

  const setStationFeatures = (featuresData: IFeatureProps[]) => {
    addStationFeature({
      body: JSON.stringify(featuresData),
    });
  };

  const handleFormSubmit: SubmitHandler<IFormDataProps> = () => {
    setIsDisabled(true);

    createServicePointDetails();

    Promise.all([createPaymentMethodsConfigData(), createOpportunitiesConfigData(), createParkingConfigData()])
      .then(([filteredPaymentMethods, filteredOpportunities, freeParkCount]) => {
        if (filteredPaymentMethods && filteredOpportunities) {
          setStationFeatures([...filteredPaymentMethods, ...filteredOpportunities, ...freeParkCount]);
        } else {
          console.error('One of the arrays is empty or undefined');
        }
      })
      .catch((error) => console.error('Error in Promise.all:', error));
  };

  useEffect(() => {
    if (form.watch(`id`) > 0) {
      getStationParkingFeatures();
    }
  }, [form.watch(`id`)]);

  useEffect(() => {
    getPaymentMethods({ body: 1 }).unwrap();
    getOpportunities({ body: 2 }).unwrap();
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
          // disabled={isDisabled}
          id={`submit-button`}
          type={`submit`}
        />
      </div>
    </form>
  );
};

export default ServicePointModalFormFourthPage;
