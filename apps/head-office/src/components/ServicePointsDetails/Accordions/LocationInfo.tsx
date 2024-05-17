import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { initialServicePointDataValue, initialServicePointsDetailsInfoStateValue } from '../constants';
import { CITIES, DISTRICTS } from '../../../constants/constants';
import { getSelectedStationFeatures } from '../../../../app/api/servicePointDetails/index';
import { getServicePointDataRequest, getServicePointInformationRequest } from '../../../../app/api/servicePoints/index';
import { getServicePointFeatureValues } from '../../../../app/api/servicePointDetails/getFeatureValuesRequest';
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
    const getSelectedCity = (cityId: number) => CITIES[cityId?.toString()];
    const getSelectedDistrict = (districtId: number) => DISTRICTS[districtId?.toString()];
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

    useEffect(() => {
        getServicePointsDetailsInfo(slug);
        getServicePointData(slug);
        getServicePointFeatures(slug);
    }, []);

    useEffect(() => {
        getSelectedPaymentsMethodsName();
        getParkingValues();
        getSelectedOpportunitiesName();
    }, [features]);

    return (
        <div className={`${sectionPrefix}-content py-8 text-text`}>
            <div className={`${sectionPrefix}-info-container flex flex-col justify-between`}>
                <div className={`${sectionPrefix}-left-info-container flex flex-col w-full`}>
                    <div className={`${sectionPrefix}-info-item flex py-2 justify-start md:items-center md:flex-row`}>
                        <p className={`${sectionPrefix}-info-item-label w-1/3 md:w-1/4 text-lg font-bold`}>
                            Adres:
                        </p>
                        <p className={`${sectionPrefix}-info-item-value w-2/3 md:w-3/4 text-lg font-normal px-2`}>
                            {servicePointDetailsInfo.address}
                        </p>
                    </div>
                    <div className={`${sectionPrefix}-info-item flex py-2 justify-start md:items-center md:flex-row`}>
                        <p className={`${sectionPrefix}-info-item-label w-1/3 md:w-1/4 text-lg font-bold`}>
                            Adres Tarifi:
                        </p>
                        <p className={`${sectionPrefix}-info-item-value w-2/3 md:w-3/4 text-lg font-normal px-2`}>
                            {servicePointDetailsInfo.addressDetail}
                        </p>
                    </div>
                    <div className={`${sectionPrefix}-info-item flex py-2 justify-start md:items-center md:flex-row`}>
                        <p className={`${sectionPrefix}-info-item-label w-1/3 md:w-1/4 text-lg font-bold `}>
                            Telefon:
                        </p>
                        <p className={`${sectionPrefix}-info-item-value w-2/3 md:w-3/4 text-lg font-normal px-2`}>
                            {servicePointDetailsInfo.phone1}
                        </p>
                    </div>
                    {
                        servicePointDetailsInfo.phone2 && (
                            <div className={`${sectionPrefix}-info-item flex py-2 justify-start md:items-center md:flex-row`}>
                                <p className={`${sectionPrefix}-info-item-label w-1/3 md:w-1/4 text-lg font-bold `}>
                                    Telefon 2:
                                </p>
                                <p className={`${sectionPrefix}-info-item-value w-2/3 md:w-3/4 text-lg px-2`}>
                                    {servicePointDetailsInfo.phone2}
                                </p>
                            </div>
                        )
                    }
                    <div className={`${sectionPrefix}-info-item flex py-2 justify-start md:items-center md:flex-row`}>
                        <p className={`${sectionPrefix}-info-item-label w-1/3 md:w-1/4 text-lg font-bold `}>
                            Il:
                        </p>
                        <p className={`${sectionPrefix}-info-item-value w-2/3 md:w-3/4 text-lg font-normal px-2`}>
                            {getSelectedCity(servicePointDetailsInfo.cityId)}
                        </p>
                    </div>
                    <div className={`${sectionPrefix}-info-item flex py-2 justify-start md:items-center md:flex-row`}>
                        <p className={`${sectionPrefix}-info-item-label w-1/3 md:w-1/4 text-lg font-bold `}>
                            Ilce:
                        </p>
                        <p className={`${sectionPrefix}-info-item-value w-2/3 md:w-3/4 text-lg font-normal px-2`}>
                            {getSelectedDistrict(servicePointDetailsInfo.districtId)}
                        </p>
                    </div>
                    <div className={`${sectionPrefix}-info-item flex py-2 justify-start md:items-center md:flex-row`}>
                        <p className={`${sectionPrefix}-info-item-label w-1/3 md:w-1/4 text-lg font-bold `}>
                            Enlem - Boylam:
                        </p>
                        <p className={`${sectionPrefix}-info-item-value w-2/3 md:w-3/4 text-lg font-normal px-2`}>
                            {servicePointDetailsInfo.lat} - {servicePointDetailsInfo.lon}
                        </p>
                    </div>
                </div>
                <div className={`${sectionPrefix}-right-info-container flex flex-col`}>
                    <div className={`${sectionPrefix}-info-item flex py-2 justify-start md:items-center md:flex-row`}>
                        <p className={`${sectionPrefix}-info-item-label w-1/3 md:w-1/4 text-lg font-bold`}>
                            Sirket:
                        </p>
                        <p className={`${sectionPrefix}-info-item-value w-2/3 md:w-3/4 text-lg font-normal px-2`}>
                            {servicePointData.companyName}
                        </p>
                    </div>
                    <div className={`${sectionPrefix}-info-item flex py-2 justify-start md:items-center md:flex-row`}>
                        <p className={`${sectionPrefix}-info-item-label w-1/3 md:w-1/4 text-lg font-bold`}>
                            Bayi:
                        </p>
                        <p className={`${sectionPrefix}-info-item-value w-2/3 md:w-3/4 text-lg font-normal px-2`}>
                            {servicePointData.resellerName}
                        </p>
                    </div>
                    <div className={`${sectionPrefix}-info-item flex py-2 justify-start md:items-center md:flex-row`}>
                        <p className={`${sectionPrefix}-info-item-label w-1/3 md:w-1/4 text-lg font-bold`}>
                            Odeme Yontemleri:
                        </p>
                        <p className={`${sectionPrefix}-info-item-value w-2/3 md:w-3/4 text-lg font-normal px-2`}>
                            {paymentFeatureName}
                        </p>
                    </div>
                    <div className={`${sectionPrefix}-info-item flex py-2 justify-start md:items-center md:flex-row`}>
                        <p className={`${sectionPrefix}-info-item-label w-1/3 md:w-1/4 text-lg font-bold`}>
                            Ucretsiz Park Yeri:
                        </p>
                        <p className={`${sectionPrefix}-info-item-value w-2/3 md:w-3/4 text-lg font-normal px-2`}>
                            {parkingFeatureValue}
                        </p>
                    </div>
                    <div className={`${sectionPrefix}-info-item flex py-2 justify-start md:items-center md:flex-row`}>
                        <p className={`${sectionPrefix}-info-item-label w-1/3 md:w-1/4 text-lg font-bold`}>
                            Istayon Olanaklari:
                        </p>
                        <p className={`${sectionPrefix}-info-item-value w-2/3 md:w-3/4 text-lg font-normal px-2`}>
                            {opportunitiesFeatureName}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicePointDetailsContent;
