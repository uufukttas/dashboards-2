import React, { useEffect, useState } from 'react';
import { CITIES, DISTRICTS } from '../../../../src/constants/constants';
import axios from 'axios';

interface IServiceDetailsContentProps {
    slug: string;
};
interface IServicePointsDetailsInfoProps {
    id: number;
    stationId: number;
    address: string;
    phone1: string;
    phone2: string;
    lat: number;
    lon: number;
    cityId: number;
    districtId: number;
};

const initialServicePointsDetailsInfoStateValue = {
    id: 0,
    stationId: 0,
    address: '',
    phone1: '',
    phone2: '',
    lat: 0,
    lon: 0,
    cityId: 0,
    districtId: 0,
};

const ServicePointDetailsContent = ({ slug }: IServiceDetailsContentProps) => {
    const [servicePointDetailsInfo, setServicePointDetailsInfo] =
        useState<IServicePointsDetailsInfoProps>(
            initialServicePointsDetailsInfoStateValue
        );

    const getSelectedCity = (cityId: number) => {
        return CITIES[cityId?.toString()];
    };
    const getSelectedDistrict = (districtId: number) => {
        return DISTRICTS[districtId?.toString()];
    };
    const getServicePointsDetailsInfo = async (slug: string) => {
        axios
            .post(
                'https://sharztestapi.azurewebsites.net/StationInfo/GetByStationId',
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
        <div className="service-point-details-content py-8">
            <div className="service-point-details-info">
                <div className="service-point-details-info-item flex justify-start md:items-center flex-col md:flex-row">
                    <p className="service-point-details-info-item-label text-lg font-bold md:w-1/12 text-text">
                        Adres:
                    </p>
                    <p className="service-point-details-info-item-value text-lg font-normal text-text">
                        {servicePointDetailsInfo.address}
                    </p>
                </div>
                <div className="service-point-details-info-item flex justify-start md:items-center flex-col md:flex-row">
                    <p className="service-point-details-info-item-label text-lg font-bold w-1/12 text-text">
                        Telefon:
                    </p>
                    <p className="service-point-details-info-item-value text-lg font-normal text-text">
                        {servicePointDetailsInfo.phone1}
                    </p>
                </div>
                {servicePointDetailsInfo.phone2 && (
                    <div className="service-point-details-info-item flex justify-start md:items-center flex-col md:flex-row">
                        <p className="service-point-details-info-item-label text-lg font-bold w-1/12 text-text">
                            Telefon 2:
                        </p>
                        <p className="service-point-details-info-item-value text-lg text-text">
                            {servicePointDetailsInfo.phone2}
                        </p>
                    </div>
                )}
                <div className="service-point-details-info-item flex justify-start md:items-center flex-col md:flex-row">
                    <p className="service-point-details-info-item-label text-lg font-bold w-1/12 text-text">
                        Il:
                    </p>
                    <p className="service-point-details-info-item-value text-lg font-normal text-text">
                        {getSelectedCity(servicePointDetailsInfo.cityId)}
                    </p>
                </div>
                <div className="service-point-details-info-item flex justify-start md:items-center flex-col md:flex-row">
                    <p className="service-point-details-info-item-label text-lg font-bold w-1/12 text-text">
                        Ilce:
                    </p>
                    <p className="service-point-details-info-item-value text-lg font-normal text-text">
                        {getSelectedDistrict(servicePointDetailsInfo.districtId)}
                    </p>
                </div>
                <div className="service-point-details-info-item flex justify-start md:items-center flex-col md:flex-row">
                    <p className="service-point-details-info-item-label text-lg font-bold w-1/12 text-text">
                        Konum:
                    </p>
                    <p className="service-point-details-info-item-value text-lg font-normal text-text">
                        {servicePointDetailsInfo.lat} - {servicePointDetailsInfo.lon}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ServicePointDetailsContent;
