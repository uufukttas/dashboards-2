import { StationFeatureType } from 'apps/head-office/src/enums/stationFeature.enums';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useGetByStationIdMutation,
  useGetServicePointDataMutation,
  useGetStationFeaturesMutation,
} from '../../../../app/api/services/service-points/servicePoints.service';
import ModalLayout from '../../Modal/Layouts/ModalLayout';
import { IModalLayoutProps } from '../../Modal/Layouts/ModalLayout.interface';
import ServicePointModalFormFirstPage from './ServicePointModalFormPages/ServicePointModalFormFirstPage';
import ServicePointModalFormFourthPage from './ServicePointModalFormPages/ServicePointModalFormFourthPage';
import ServicePointModalFormSecondPage from './ServicePointModalFormPages/ServicePointModalFormSecondPage';
import ServicePointModalFormThirdPage from './ServicePointModalFormPages/ServicePointModalFormThirdPage';

interface IServicePointModalFormProps {
  id?: number;
}

const ServicePointModalForm: React.FC<IServicePointModalFormProps> = ({ id }) => {
  const [activePage, setActivePage] = useState(1);
  const [getServicePointData] = useGetServicePointDataMutation();
  const [getByStationId] = useGetByStationIdMutation();
  const [getStationFeatures] = useGetStationFeaturesMutation();

  const form = useForm<{
    id: number | undefined;
    name: string;
    company: number;
    resslerCompanyId: number;
    phone1: string;
    phone2: string;
    address: string;
    cityId: number;
    districtId: number;
    'address-detail': string;
    'free-park-count': number | null;
    opportunities: Array<{
      id: number;
      name: string;
    }>;
    'payment-methods': Array<{
      id: number;
      name: string;
    }>;
    lat: number;
    lon: number;
  }>({
    defaultValues: {
      id: undefined,
      name: '',
      company: 0,
      resslerCompanyId: 1,
      phone1: '',
      phone2: '',
      address: '',
      'address-detail': '',
      cityId: undefined,
      districtId: undefined,
      'free-park-count': null,
      opportunities: [],
      'payment-methods': [],
      lat: 0,
      lon: 0,
    },
  });

  const modalConfig: IModalLayoutProps = {
    name: 'add-service-point',
    title: 'Yeni İstasyon Ekle',
  };

  const initializeForm = async () => {
    if (id) {
      const servicePointData = await getServicePointData({ body: id }).unwrap();
      const stationInfoData = await getByStationId({
        body: {
          stationId: id,
        },
      }).unwrap();
      const stationFeaturesData = await getStationFeatures({ body: id }).unwrap();

      const paymentMethods = stationFeaturesData.filter((i: any) => {
        return i.stationFeatureType === StationFeatureType.PaymentMethods;
      });

      const opportunities = stationFeaturesData.filter((i: any) => {
        return i.stationFeatureType === StationFeatureType.FunActivities;
      });

      form.reset({
        id: stationInfoData[0]?.id,
        name: servicePointData[0]?.name,
        cityId: stationInfoData[0]?.cityId,
        districtId: stationInfoData[0]?.districtId,
        lat: stationInfoData[0]?.lat,
        lon: stationInfoData[0]?.lng,
        company: servicePointData[0]?.companyId,
        resslerCompanyId: stationInfoData[0]?.resslerId,
        phone1: stationInfoData[0]?.phone1,
        phone2: stationInfoData[0]?.phone2,
        address: stationInfoData[0]?.address,
        'address-detail': stationInfoData[0]?.addressDetail,
      });
    }
  };

  useEffect(() => {
    initializeForm();
  }, [id]);

  return (
    <ModalLayout {...modalConfig}>
      {activePage === 1 && (
        <ServicePointModalFormFirstPage form={form} activePage={activePage} setActivePage={setActivePage} />
      )}
      {activePage === 2 && (
        <ServicePointModalFormSecondPage form={form} activePage={activePage} setActivePage={setActivePage} />
      )}
      {activePage === 3 && (
        <ServicePointModalFormThirdPage form={form} activePage={activePage} setActivePage={setActivePage} />
      )}
      {activePage === 4 && (
        <ServicePointModalFormFourthPage form={form} activePage={activePage} setActivePage={setActivePage} />
      )}
    </ModalLayout>
  );
};

export default ServicePointModalForm;
