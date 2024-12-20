import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Button } from '@projects/button';
import BaseInput from '../../../Base/BaseInput';
import BaseMultiSelect from '../../../Base/BaseMultiSelect';
import { BRAND_PREFIX } from '../../../../constants/constants';
import { EVENTS_EMMITER_CONSTANTS } from '../../../../constants/event.constants';
import EventManager from '../../../../managers/Event.manager';
import {
  useAddStationFeatureMutation,
  useAddStationInfoMutation,
  useGetFeatureValuesMutation,
  useGetStationFeaturesMutation,
} from '../../../../../app/api/services/service-points/servicePoints.service';
import useModalManager from '../../../../../src/hooks/useModalManager';
import { IFeatureConfigData, IFeatureProps, IFormDataProps, IServicePointModalPageProps } from '../../types';

const ServicePointModalFormFourthPage: React.FC<IServicePointModalPageProps> = ({
  activePage,
  form,
  modalName = '',
  setActivePage,
}: IServicePointModalPageProps) => {
  const sectionPrefix: string = `${BRAND_PREFIX}-service-point-modal-page-4`;
  const initialFeatureData = [{ rid: 0, name: '' }];
  const { handleSubmit } = form;
  const stationId: number = form.watch(`id`);
  const [addStationFeature] = useAddStationFeatureMutation();
  const [addStationInfo] = useAddStationInfoMutation();
  const [getStationFeatures] = useGetStationFeaturesMutation();
  const [getOpportunities, { data: opportunities = initialFeatureData }] = useGetFeatureValuesMutation();
  const [getPaymentMethods, { data: paymentMethods = initialFeatureData }] = useGetFeatureValuesMutation();
  const { closeModal } = useModalManager();

  const createFeatureData =
    (selectedItems: IFeatureProps[], featureType: number, selectedValues: number[]): IFeatureConfigData[] => {
      return selectedItems
        ?.filter((item: IFeatureProps) => selectedValues?.includes(item.rid))
        .map((item: IFeatureProps) => ({
          ...item,
          stationId,
          stationFeatureType: featureType,
          stationFeatureValue: Number(item.rid),
          isDeleted: false,
        })) || [];
    };
  const handleSelectedFeatures = async (
    featureType: number,
    items: IFeatureProps[],
    fieldName: string
  ): Promise<void> => {
    const features = await getStationFeatures({ body: stationId }).unwrap();
    const selectedFeatures = features.filter((feature: IFeatureProps) => feature.stationFeatureType === featureType);
    const selectedItems = items?.filter((item: IFeatureProps) =>
      selectedFeatures?.some((feature: IFeatureProps) => Number(feature.stationFeatureValue) === item.rid)
    );

    form.setValue(fieldName, selectedItems.map((item: IFeatureProps) => item.rid));
  };
  const handleFormSubmit: SubmitHandler<IFormDataProps> = async (): Promise<void> => {
    const requestData = [
      ...createFeatureData(paymentMethods, 1, form.watch('payment-methods')),
      ...createFeatureData(opportunities, 2, form.watch('opportunities')),
      {
        stationId,
        stationFeatureType: 8,
        stationFeatureValue: Number(form.watch('free-park-count')),
        isDeleted: false,
      },
    ];

    await addStationInfo({
      body: {
        address: form.watch('address'),
        addressDetail: form.watch('address-detail'),
        cityId: Number(form.watch('city-id')),
        districtId: Number(form.watch('district-id')),
        lat: form.watch('lat'),
        lon: form.watch('lng'),
        phone1: form.watch('phone1'),
        phone2: form.watch('phone2'),
        stationId,
      },
    }).unwrap();
    await addStationFeature({ body: requestData }).unwrap();

    closeModal(modalName);
    EventManager.emit(EVENTS_EMMITER_CONSTANTS.FIRE_REFECTCH_STATIONS, {});
  };

  useEffect(() => {
    const initializeData = async (): Promise<void> => {
      const [paymentMethodsData, opportunitiesData] = await Promise.all([
        getOpportunities({ body: 2 }).unwrap(),
        getPaymentMethods({ body: 1 }).unwrap(),
      ]);

      await Promise.all([
        handleSelectedFeatures(2, opportunitiesData, 'opportunities'),
        handleSelectedFeatures(1, paymentMethodsData, 'payment-methods'),
      ]);
    };

    initializeData();
  }, [stationId]);

  return (
    <form
      className={`${sectionPrefix} w-full ${activePage === 4 ? 'block' : 'hidden'}`}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className={`${sectionPrefix}-payment-methods-container mb-4`}>
        <BaseMultiSelect
          form={form}
          name={`payment-methods`}
          placeholder={`Ödeme Yöntemleri`}
          optionLabel={`name`}
          optionValue={`rid`}
          options={paymentMethods || []}
        />
      </div>
      <div className={`${sectionPrefix}-free-park-count-container`}>
        <BaseInput
          form={form}
          id={`free-park-count`}
          label={`Ücretsiz araç park sayısı`}
          name={`free-park-count`}
          type={'text'}
        />
      </div>
      <div className={`${sectionPrefix}-opportunities-container`}>
        <BaseMultiSelect
          form={form}
          name={`opportunities`}
          options={opportunities || []}
          optionLabel={`name`}
          optionValue={`rid`}
          placeholder={`Fırsatlar`}
        />
      </div>
      <div className={`${sectionPrefix}-buttons-container flex justify-between items-center mt-4`}>
        <Button
          buttonText="Geri"
          className={`prev-button bg-primary text-white text-sm rounded-lg block p-2.5`}
          id={`prev-button`}
          type={`submit`}
          onClick={() => setActivePage(activePage - 1)}
        />
        <Button
          buttonText={modalName === 'addServicePointModal' ? 'Kaydet' : 'Güncelle'}
          className={`submit-button bg-primary text-white text-sm rounded-lg block p-2.5`}
          id={`submit-button`}
          type={`submit`}
        />
      </div>
    </form>
  );
};

export default ServicePointModalFormFourthPage;
