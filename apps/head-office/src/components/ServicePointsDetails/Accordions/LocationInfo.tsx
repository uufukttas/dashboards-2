import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialServicePointDataValue, initialServicePointsDetailsInfoStateValue } from '../constants';
import { getSelectedStationFeatures } from '../../../../app/api/servicePointDetails/index';
import { getServicePointDataRequest, getServicePointInformationRequest } from '../../../../app/api/servicePoints/index';
import { getServicePointFeatureValues } from '../../../../app/api/servicePointDetails/getFeatureValuesRequest';
import { RootState } from '../../../../app/redux/store';
import { toggleLoadingVisibility } from '../../../../app/redux/features/isLoadingVisible';
import type {
    IFeatureValueProps,
    IServiceDetailsContentProps,
    IServicePointsDetailsInfoProps,
    IServicePointsDetailsProps
} from '../types';

const ServicePointDetailsContent: React.FC<IServiceDetailsContentProps> = ({ slug }: IServiceDetailsContentProps) => {
    const sectionPrefix = 'service-point-details';
    const dispatch = useDispatch();
    const { cities, districts } = useSelector((state: RootState) => state.setCityInformation);
    const [features, setFeatures] = useState<{ StationFeatureType: number; StationFeatureValue: string }[]>([]);
    const [opportunitiesFeatureName, setOpportunitiesFeatureName] = useState<string | null[]>();
    const [parkingFeatureValue, setParkingFeatureValue] = useState<string>();
    const [paymentFeatureName, setPaymentFeatureName] = useState<string | null[]>();
    const [servicePointDetailsInfo, setServicePointDetailsInfo] =
        useState<IServicePointsDetailsInfoProps>(
            initialServicePointsDetailsInfoStateValue
        );
    const [servicePointData, setServicePointData] = useState<IServicePointsDetailsProps>(initialServicePointDataValue);
    const getParkingValues = async () => {
        setParkingFeatureValue(features.find((feature) => feature.StationFeatureType === 8)?.StationFeatureValue);
    };
    const getSelectedCity = (cityId: number) => cities[cityId - 1]?.name;
    const getSelectedDistrict = (districtId: number) => districts[districtId]?.name || '';
    const getSelectedOpportunitiesName = async (): Promise<void> => {
        const opportunities = features.filter((feature) => feature.StationFeatureType === 2);
        const opportunitiesFeatureValues = await getServicePointFeatureValues(2);

        const selectedOpportunities = opportunitiesFeatureValues.data
            .filter((item: IFeatureValueProps) => {
                return opportunities.some(opportunity => item.rid === Number(opportunity.StationFeatureValue))
            })
            .map((item: IFeatureValueProps) => item.name);

        setOpportunitiesFeatureName(selectedOpportunities.join(', '));
    };
    const getSelectedPaymentsMethodsName = async (): Promise<void> => {
        const paymentMethods = features.filter((feature) => feature.StationFeatureType === 1);
        const paymentsFeatureValues = await getServicePointFeatureValues(1);

        const selectedPaymentMethodNames = paymentsFeatureValues.data
            .filter((item: IFeatureValueProps) =>
                paymentMethods.some(paymentMethod => item.rid === Number(paymentMethod.StationFeatureValue)))
            .map((item: IFeatureValueProps) => item.name);

        setPaymentFeatureName(selectedPaymentMethodNames.join(', '));

    };
    const getServicePointsDetailsInfo = async (slug: string): Promise<void> => {
        const stationInfo = await getServicePointInformationRequest(Number(slug));

        stationInfo.data[0] && setServicePointDetailsInfo(stationInfo.data[0]);
    };
    const getServicePointData = async (slug: string): Promise<void> => {
        const stationData = await getServicePointDataRequest(Number(slug));

        stationData.data && setServicePointData(stationData.data[0]);
    };
    const getServicePointFeatures = async (slug: string): Promise<void> => {
        const featureData = await getSelectedStationFeatures(Number(slug));

        setFeatures(featureData.data);
        dispatch(toggleLoadingVisibility(false));
    };

    const infoItems = [
        { label: 'Adres:', value: servicePointDetailsInfo.address },
        { label: 'Adres Tarifi:', value: servicePointDetailsInfo.addressDetail },
        { label: 'Telefon:', value: servicePointDetailsInfo.phone1 },
        { label: 'Telefon 2:', value: servicePointDetailsInfo.phone2 },
        { label: 'Il:', value: getSelectedCity(servicePointDetailsInfo.cityId) },
        { label: 'Ilce:', value: getSelectedDistrict(servicePointDetailsInfo.districtId) },
        { label: 'Enlem - Boylam:', value: `${servicePointDetailsInfo.lat} - ${servicePointDetailsInfo.lon}` },
        { label: 'Sirket:', value: servicePointData.companyName },
        { label: 'Bayi:', value: servicePointData.resellerName },
        { label: 'Odeme Yontemleri:', value: paymentFeatureName },
        { label: 'Ucretsiz Park Yeri:', value: parkingFeatureValue },
        { label: 'Istayon Olanaklari:', value: opportunitiesFeatureName }
    ];

    useEffect(() => {
        getServicePointsDetailsInfo(slug);
        getServicePointData(slug);
        getServicePointFeatures(slug);
    }, []);

    useEffect(() => {
        getSelectedPaymentsMethodsName();
        getParkingValues();
        getSelectedOpportunitiesName();
        getSelectedCity(servicePointDetailsInfo.cityId);
        getSelectedDistrict(servicePointDetailsInfo.districtId);
    }, [features]);

    return (
        <div className={`${sectionPrefix}-content py-8 text-black bg-white p-4 rounded-b-md`}>
            <div className={`${sectionPrefix}-info-container flex flex-col justify-between`}>
                {infoItems.map((item, index) => (
                    <div key={index} className={`${sectionPrefix}-info-item flex py-2 justify-start md:items-center md:flex-row`}>
                        <p className={`${sectionPrefix}-info-item-label w-1/3 md:w-1/4 text-lg font-bold`}>
                            {item.label}
                        </p>
                        <p className={`${sectionPrefix}-info-item-value w-2/3 md:w-3/4 text-lg font-normal px-2`}>
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicePointDetailsContent;
