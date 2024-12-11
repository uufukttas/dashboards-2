import React, { useCallback, useEffect, useState } from 'react';
import {
  useGetServicePointDataMutation,
  useGetServicePointInformationMutation,
  useGetStationFeatureValuesMutation,
  useGetStationSelectedValuesMutation,
} from '../../../../app/api/services/service-point-details/servicePointDetails.service';
import { BRAND_PREFIX, CITIES, DISTRICTS } from '../../../constants/constants';
import { initialServicePointDataValue, initialServicePointsDetailsInfoStateValue } from '../constants';
import type {
  IFeatureItemProps,
  IInfoItemsProps,
  IServicePointsDetailsInfoProps,
  IServicePointsDetailsProps,
  IStationFeatureProps,
  IStationFeatureValuesProps,
  IStationIdProps,
} from '../types';
import StationImages from './LocationInfo/StationImages';

const LocationInfo: React.FC<IStationIdProps> = ({ stationId }: IStationIdProps) => {
  const sectionPrefix: string = `${BRAND_PREFIX}-service-point-details`;
  const [getServicePointData] = useGetServicePointDataMutation();
  const [getServicePointInformation] = useGetServicePointInformationMutation();
  const [getStationFeatureValues] = useGetStationFeatureValuesMutation();
  const [getStationSelectedValues] = useGetStationSelectedValuesMutation();
  const [features, setFeatures] = useState<IStationFeatureProps[]>([]);
  const [opportunitiesFeatureName, setOpportunitiesFeatureName] = useState<string>('');
  const [parkingFeatureValue, setParkingFeatureValue] = useState<string>('0');
  const [paymentFeatureName, setPaymentFeatureName] = useState<string>('');
  const [servicePointData, setServicePointData] = useState<IServicePointsDetailsProps>(initialServicePointDataValue);
  const [servicePointDetailsInfo, setServicePointDetailsInfo] = useState<IServicePointsDetailsInfoProps>(
    initialServicePointsDetailsInfoStateValue,
  );

  const fetchServicePointData = useCallback(async (): Promise<void> => {
    const { data: servicePointData } = await getServicePointData({ body: { id: stationId } });

    servicePointData && setServicePointData(servicePointData[0]);
  }, [getServicePointData, stationId]);
  const fetchServicePointDetails = useCallback(async (): Promise<void> => {
    const [servicePointInfo, servicePointFeatures] = await Promise.all([
      getServicePointInformation({ body: { stationId } }).unwrap(),
      getStationSelectedValues({
        body: {
          featureTypeModel: [{ featureType: 1 }, { featureType: 2 }, { featureType: 8 }],
          stationId,
        },
      }).unwrap(),
    ]);

    setServicePointDetailsInfo(servicePointInfo[0]);
    setFeatures(servicePointFeatures);
  }, [getServicePointInformation, getStationSelectedValues, stationId]);
  const findFeatureValue = useCallback((type: number): string | undefined => {
    return features.find((feature) => feature.StationFeatureType === type)?.StationFeatureValue;
  }, [features]);
  const getSelectedFeatureNames = useCallback(async (type: number, setName: (value: string) => void): Promise<void> => {
    const featureValues: IFeatureItemProps[] = await mapFeatureValuesToNames(type);
    const filteredFeatures: IStationFeatureProps[] = features.filter((feature) => feature.StationFeatureType === type);
    const selectedNames: string[] = featureValues
      .filter((item: IFeatureItemProps) =>
        filteredFeatures.some((feature: IStationFeatureProps) => item.rid === Number(feature.StationFeatureValue)),
      )
      .map((item) => item.name);

    setName(selectedNames.join(', ') || '');
  }, [features]);
  const mapFeatureValuesToNames = useCallback(async (type: number) => {
    const response: IStationFeatureValuesProps = await getStationFeatureValues({ body: { stationFeatureType: type } });

    return response.data || [];
  }, [getStationFeatureValues]);

  const infoItems: IInfoItemsProps[] = [
    { label: 'Adres:', value: servicePointDetailsInfo.address },
    { label: 'Adres Tarifi:', value: servicePointDetailsInfo.addressDetail },
    { label: 'Telefon:', value: servicePointDetailsInfo.phone1 },
    { label: 'Telefon 2:', value: servicePointDetailsInfo.phone2 },
    { label: 'İl:', value: CITIES[servicePointDetailsInfo.cityId as unknown as keyof typeof CITIES] },
    { label: 'İlçe:', value: DISTRICTS[servicePointDetailsInfo.districtId as unknown as keyof typeof DISTRICTS] },
    { label: 'Enlem - Boylam:', value: `${servicePointDetailsInfo.lat} - ${servicePointDetailsInfo.lon}` },
    { label: 'Şirket:', value: servicePointData.companyName },
    { label: 'Bayi:', value: servicePointData.resellerName },
    { label: 'Ödeme Yöntemleri:', value: paymentFeatureName },
    { label: 'Ücretsiz Park Yeri:', value: parkingFeatureValue },
    { label: 'İstayon Olanakları:', value: opportunitiesFeatureName },
    { label: 'İstasyon Görselleri:', render: <StationImages stationId={stationId} /> },
  ];

  useEffect(() => {
    fetchServicePointData();
    fetchServicePointDetails();
  }, [fetchServicePointData, fetchServicePointDetails]);

  useEffect(() => {
    if (features.length > 0) {
      getSelectedFeatureNames(2, setOpportunitiesFeatureName);
      getSelectedFeatureNames(1, setPaymentFeatureName);
      setParkingFeatureValue(findFeatureValue(8) || '0');
    }
  }, [features, getSelectedFeatureNames, findFeatureValue]);

  return (
    <div className={`${sectionPrefix}-content text-black bg-white p-4 rounded-b-md`}>
      <div className={`${sectionPrefix}-info-container flex flex-col justify-between`}>
        {infoItems.map((item: IInfoItemsProps, index: number) => (
          <div key={index} className={`${sectionPrefix}-info-item flex py-2 justify-start md:items-center md:flex-row`}>
            <div className={`${sectionPrefix}-info-item-label w-1/3 md:w-1/4 text-lg font-bold`}>{item.label}</div>
            <div className={`${sectionPrefix}-info-item-value w-2/3 md:w-3/4 text-lg font-normal px-2`}>
              {item.value || item.render}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(LocationInfo);
