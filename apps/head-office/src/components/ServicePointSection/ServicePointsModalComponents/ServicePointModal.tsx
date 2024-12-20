import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ServicePointModalFormFirstPage from './ServicePointModalFormPages/ServicePointModalFormFirstPage';
import ServicePointModalFormFourthPage from './ServicePointModalFormPages/ServicePointModalFormFourthPage';
import ServicePointModalFormSecondPage from './ServicePointModalFormPages/ServicePointModalFormSecondPage';
import ServicePointModalFormThirdPage from './ServicePointModalFormPages/ServicePointModalFormThirdPage';
import ModalLayout from '../../Modal/Layouts/ModalLayout';
import {
  useGetByStationIdMutation,
  useGetServicePointDataMutation,
  useGetStationFeaturesMutation,
} from '../../../../app/api/services/service-points/servicePoints.service';
import { StationFeatureType } from '../../../../src/enums/stationFeature.enums';
import { IModalLayoutProps } from '../../Modal/Layouts/ModalLayout.interface';
import { IFeatureProps, IServicePointModalFormData, IServicePointModalFormProps } from '../types';

const ServicePointModalForm: React.FC<IServicePointModalFormProps> =
  ({ modalName, stationId = 0 }: IServicePointModalFormProps) => {
    const initialFormValues = {
      address: '',
      'address-detail': '',
      'city-id': 1,
      'company-id': 1,
      'district-id': 1,
      'free-park-count': 0,
      id: 0,
      lat: 0,
      lng: 0,
      name: '',
      opportunities: [],
      'payment-methods': [],
      phone1: '',
      phone2: '',
      'reseller-company-id': 1,
    };
    const [activePage, setActivePage] = useState(1);
    const [getByStationId] = useGetByStationIdMutation();
    const [getServicePointData] = useGetServicePointDataMutation();
    const [getStationFeatures] = useGetStationFeaturesMutation();
    const form = useForm<IServicePointModalFormData>({ defaultValues: initialFormValues });
    const modalConfig: IModalLayoutProps = {
      name: modalName,
      title: stationId ? 'İstasyon Düzenle' : 'Yeni İstasyon Ekle',
    };

    const setInitialFormValues = async () => {
      if (stationId) {
        const servicePointData = await getServicePointData({ body: stationId }).unwrap();
        const stationInfoData = await getByStationId({ body: { stationId } }).unwrap();
        const stationFeaturesData = await getStationFeatures({ body: stationId }).unwrap();
        const freeParkCount = stationFeaturesData.find((freeParkCount: IFeatureProps) => {
          return freeParkCount.stationFeatureType === StationFeatureType.FreeParkCount;
        });
        const opportunities = stationFeaturesData.filter((opportunity: IFeatureProps) => {
          return opportunity.stationFeatureType === StationFeatureType.Amenities;
        });
        const paymentMethods = stationFeaturesData.filter((paymentMethod: IFeatureProps) => {
          return paymentMethod.stationFeatureType === StationFeatureType.PaymentMethods;
        });

        form.reset({
          address: stationInfoData[0]?.address || '',
          'address-detail': stationInfoData[0]?.addressDetail || '',
          'city-id': stationInfoData[0]?.cityId || 1,
          'company-id': servicePointData[0]?.companyId || 1,
          'district-id': stationInfoData[0]?.districtId || 1,
          'free-park-count': freeParkCount?.stationFeatureValue ? Number(freeParkCount?.stationFeatureValue) : 0,
          id: servicePointData[0]?.id || undefined,
          lat: stationInfoData[0]?.lat,
          lng: stationInfoData[0]?.lon,
          name: servicePointData[0]?.name || 'Yeni İstasyon',
          opportunities: opportunities || [],
          'payment-methods': paymentMethods || [],
          phone1: stationInfoData[0]?.phone1 || '',
          phone2: stationInfoData[0]?.phone2 || '',
          'reseller-company-id': servicePointData[0]?.resellerCompanyId || 1,
        });
      }
    };

    useEffect(() => {
      setInitialFormValues();
    }, [stationId]);

    return (
      <ModalLayout {...modalConfig}>
        {activePage === 1 && (
          <ServicePointModalFormFirstPage
            activePage={activePage}
            form={form}
            modalName={modalName}
            setActivePage={setActivePage}
          />
        )}
        {activePage === 2 && (
          <ServicePointModalFormSecondPage activePage={activePage} form={form} setActivePage={setActivePage} />
        )}
        {activePage === 3 && (
          <ServicePointModalFormThirdPage activePage={activePage} form={form} setActivePage={setActivePage} />
        )}
        {activePage === 4 && (
          <ServicePointModalFormFourthPage
            activePage={activePage}
            form={form}
            modalName={modalName}
            setActivePage={setActivePage}
          />
        )}
      </ModalLayout>
    );
  };

export default ServicePointModalForm;
