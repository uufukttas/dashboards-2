import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CITIES, DISTRICTS } from '../../../constants/constants';
import type { IServiceDetailsContentProps, IServicePointsDetailsInfoProps } from '../types';

const initialServicePointsDetailsInfoStateValue = {
    address: '',
    cityId: 0,
    districtId: 0,
    id: 0,
    lat: 0,
    lon: 0,
    phone1: '',
    phone2: '',
    stationId: 0,
};

const ServicePointDetailsContent = ({ slug }: IServiceDetailsContentProps) => {
    const sectionPrefix = 'service-point-details';
    const [servicePointDetailsInfo, setServicePointDetailsInfo] =
        useState<IServicePointsDetailsInfoProps>(
            initialServicePointsDetailsInfoStateValue
        );

    const getSelectedCity = (cityId: number) => CITIES[cityId?.toString()];
    const getSelectedDistrict = (districtId: number) => DISTRICTS[districtId?.toString()];
    const getServicePointsDetailsInfo = async (slug: string) => {
        axios
            .post(
                process.env.GET_STATION_INFO_BY_ID || '',
                JSON.stringify({ stationId: Number(slug) }),
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((response) => response.data)
            .then((data) => setServicePointDetailsInfo(data.data[0]))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getServicePointsDetailsInfo(slug);
    }, []);

    return (
        <div className={`${sectionPrefix}-content py-8 text-text`}>
            <div className={`${sectionPrefix}-info-container`}>
                <div className={`${sectionPrefix}-info-item flex justify-start md:items-center flex-col md:flex-row`}>
                    <p className={`${sectionPrefix}-info-item-label text-lg font-bold md:w-1/12`}>
                        Adres:
                    </p>
                    <p className={`${sectionPrefix}-info-item-value text-lg font-normal`}>
                        {servicePointDetailsInfo.address}
                    </p>
                </div>
                <div className={`${sectionPrefix}-info-item flex justify-start md:items-center flex-col md:flex-row`}>
                    <p className={`${sectionPrefix}-info-item-label text-lg font-bold w-1/12`}>
                        Telefon:
                    </p>
                    <p className={`${sectionPrefix}-info-item-value text-lg font-normal`}>
                        {servicePointDetailsInfo.phone1}
                    </p>
                </div>
                {
                    servicePointDetailsInfo.phone2 && (
                        <div className={`${sectionPrefix}-info-item flex justify-start md:items-center flex-col md:flex-row`}>
                            <p className={`${sectionPrefix}-info-item-label text-lg font-bold w-1/12`}>
                                Telefon 2:
                            </p>
                            <p className={`${sectionPrefix}-info-item-value text-lg`}>
                                {servicePointDetailsInfo.phone2}
                            </p>
                        </div>
                    )
                }
                <div className={`${sectionPrefix}-info-item flex justify-start md:items-center flex-col md:flex-row`}>
                    <p className={`${sectionPrefix}-info-item-label text-lg font-bold w-1/12`}>
                        Il:
                    </p>
                    <p className={`${sectionPrefix}-info-item-value text-lg font-normal`}>
                        {getSelectedCity(servicePointDetailsInfo.cityId)}
                    </p>
                </div>
                <div className={`${sectionPrefix}-info-item flex justify-start md:items-center flex-col md:flex-row`}>
                    <p className={`${sectionPrefix}-info-item-label text-lg font-bold w-1/12`}>
                        Ilce:
                    </p>
                    <p className={`${sectionPrefix}-info-item-value text-lg font-normal`}>
                        {getSelectedDistrict(servicePointDetailsInfo.districtId)}
                    </p>
                </div>
                <div className={`${sectionPrefix}-info-item flex justify-start md:items-center flex-col md:flex-row`}>
                    <p className={`${sectionPrefix}-info-item-label text-lg font-bold w-1/12`}>
                        Konum:
                    </p>
                    <p className={`${sectionPrefix}-info-item-value text-lg font-normal`}>
                        {servicePointDetailsInfo.lat} - {servicePointDetailsInfo.lon}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ServicePointDetailsContent;
