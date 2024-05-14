import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { CITIES, DISTRICTS } from '../../../constants/constants';
import { toggleLoadingVisibility } from '../../../../app/redux/features/isLoadingVisible';
import type { IFeatureProps, IServiceDetailsContentProps, IServicePointsDetailsInfoProps, IServicePointsDetailsProps } from '../types';

const ServicePointDetailsContent: React.FC<IServiceDetailsContentProps> = ({ slug }: IServiceDetailsContentProps) => {
    const initialServicePointsDetailsInfoStateValue = {
        address: '',
        addressDetail: '',
        cityId: 0,
        districtId: 0,
        id: 0,
        lat: 0,
        lon: 0,
        phone1: '',
        phone2: '',
        stationId: 0,
    };
    const initialServicePointDataValue = {
        id: 0,
        name: '',
        companyId: 1,
        companyName: '',
        resellerCompanyId: 0,
        resellerName: '',
        isActive: true,
        isDeleted: false
    }
    const sectionPrefix = 'service-point-details';
    const dispatch = useDispatch();
    const [features, setFeatures] = useState<{ StationFeatureType: number; StationFeatureValue: string }[]>([]);
    const [opportunitiesFeatureName, setOpportunitiesFeatureName] = useState<string[]>();
    const [parkingFeatureValue, setParkingFeatureValue] = useState<string>();
    const [paymentFeatureName, setPaymentFeatureName] = useState<string[]>();
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
    const getSelectedOpportunitiesName = async () => {
        const opportunities = features.filter((feature) => feature.StationFeatureType === 2);

        await axios
            .post(
                process.env.GET_FEATURE_VALUES || '',
                JSON.stringify({ stationFeatureType: 2 }),
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((response) => response.data)
            .then((data) => {

                const selectedOpportunities = data.data
                    .filter((item: IFeatureProps) =>
                        opportunities.some(opportunity => item.rid === Number(opportunity.StationFeatureValue)))
                    .map((item: IFeatureProps) => item.name);

                setOpportunitiesFeatureName(selectedOpportunities.join(', '));
            });
    };
    const getSelectedPaymentsMethodsName = async () => {
        const paymentMethods = features.filter((feature) => feature.StationFeatureType === 1);

        await axios
            .post(
                process.env.GET_FEATURE_VALUES || '',
                JSON.stringify({ stationFeatureType: 1 }),
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((response) => response.data)
            .then((data) => {

                const selectedPaymentMethodNames = data.data
                    .filter((item: IFeatureProps) =>
                        paymentMethods.some(paymentMethod => item.rid === Number(paymentMethod.StationFeatureValue)))
                    .map((item: IFeatureProps) => item.name);

                setPaymentFeatureName(selectedPaymentMethodNames.join(', '));
            });
    };
    const getServicePointsDetailsInfo = async (slug: string) => {
        axios
            .post(
                process.env.GET_STATION_INFO_BY_ID || '',
                JSON.stringify({ stationId: Number(slug) }),
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((response) => response.data)
            .then((data) => {
                data.data[0] && setServicePointDetailsInfo(data.data[0]);
            })
            .catch((error) => console.log(error));
    };
    const getServicePointData = async (slug: string) => {
        axios
            .post(
                process.env.GET_STATION_BY_ID || '',
                JSON.stringify({ id: Number(slug) }),
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((response) => response.data)
            .then((data) => {
                data.data && setServicePointData(data.data[0]);
            })
    };
    const getServicePointFeatures = async (slug: string) => {
        axios
            .post(
                process.env.GET_STATION_SELECTED_FEATURES || '',
                JSON.stringify(
                    {
                        featureTypeModel: [
                            {
                                featureType: 1
                            },
                            {
                                featureType: 2
                            },
                            {
                                featureType: 8
                            }
                        ],
                        stationId: slug
                    }
                ),
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((response) => response.data)
            .then((response) => {
                setFeatures(response.data);
                toggleLoadingVisibility(false);
            });
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
                            Servis Noktasi Olanaklari:
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
