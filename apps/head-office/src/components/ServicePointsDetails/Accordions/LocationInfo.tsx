import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { CITIES, DISTRICTS } from '../../../constants/constants';
import { toggleLoadingVisibility } from '../../../../app/redux/features/isLoadingVisible';
import type { IServiceDetailsContentProps, IServicePointsDetailsInfoProps, IServicePointsDetailsProps } from '../types';

const ServicePointDetailsContent: React.FC<IServiceDetailsContentProps> = ({ slug }: IServiceDetailsContentProps) => {
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
    const [servicePointDetailsInfo, setServicePointDetailsInfo] =
        useState<IServicePointsDetailsInfoProps>(
            initialServicePointsDetailsInfoStateValue
        );
    const [servicePointData, setServicePointData] = useState<IServicePointsDetailsProps>(initialServicePointDataValue);
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
            .then((data) => {
                data.data[0] && setServicePointDetailsInfo(data.data[0]);
                dispatch(toggleLoadingVisibility(false));
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

    useEffect(() => {
        getServicePointsDetailsInfo(slug);
        getServicePointData(slug);
    }, []);

    return (
        <div className={`${sectionPrefix}-content py-8 text-text`}>
            <div className={`${sectionPrefix}-info-container flex justify-between`}>
                <div className={`${sectionPrefix}-left-info-container flex flex-col w-1/2`}>
                    <div className={`${sectionPrefix}-info-item flex justify-start md:items-center flex-col md:flex-row`}>
                        <p className={`${sectionPrefix}-info-item-label text-lg font-bold`}>
                            Adres:
                        </p>
                        <p className={`${sectionPrefix}-info-item-value text-lg font-normal px-2`}>
                            {servicePointDetailsInfo.address}
                        </p>
                    </div>
                    <div className={`${sectionPrefix}-info-item flex justify-start md:items-center flex-col md:flex-row`}>
                        <p className={`${sectionPrefix}-info-item-label text-lg font-bold `}>
                            Telefon:
                        </p>
                        <p className={`${sectionPrefix}-info-item-value text-lg font-normal px-2`}>
                            {servicePointDetailsInfo.phone1}
                        </p>
                    </div>
                    {
                        servicePointDetailsInfo.phone2 && (
                            <div className={`${sectionPrefix}-info-item flex justify-start md:items-center flex-col md:flex-row`}>
                                <p className={`${sectionPrefix}-info-item-label text-lg font-bold `}>
                                    Telefon 2:
                                </p>
                                <p className={`${sectionPrefix}-info-item-value text-lg px-2`}>
                                    {servicePointDetailsInfo.phone2}
                                </p>
                            </div>
                        )
                    }
                    <div className={`${sectionPrefix}-info-item flex justify-start md:items-center flex-col md:flex-row`}>
                        <p className={`${sectionPrefix}-info-item-label text-lg font-bold `}>
                            Il:
                        </p>
                        <p className={`${sectionPrefix}-info-item-value text-lg font-normal px-2`}>
                            {getSelectedCity(servicePointDetailsInfo.cityId)}
                        </p>
                    </div>
                    <div className={`${sectionPrefix}-info-item flex justify-start md:items-center flex-col md:flex-row`}>
                        <p className={`${sectionPrefix}-info-item-label text-lg font-bold `}>
                            Ilce:
                        </p>
                        <p className={`${sectionPrefix}-info-item-value text-lg font-normal px-2`}>
                            {getSelectedDistrict(servicePointDetailsInfo.districtId)}
                        </p>
                    </div>
                    <div className={`${sectionPrefix}-info-item flex justify-start md:items-center flex-col md:flex-row`}>
                        <p className={`${sectionPrefix}-info-item-label text-lg font-bold `}>
                            Konum:
                        </p>
                        <p className={`${sectionPrefix}-info-item-value text-lg font-normal px-2`}>
                            {servicePointDetailsInfo.lat} - {servicePointDetailsInfo.lon}
                        </p>
                    </div>
                </div>
                <div className={`${sectionPrefix}-right-info-container flex flex-col w-1/2`}>
                    <div className={`${sectionPrefix}-info-item flex justify-start md:items-center flex-col md:flex-row`}>
                        <p className={`${sectionPrefix}-info-item-label text-lg font-bold`}>
                            Sirket:
                        </p>
                        <p className={`${sectionPrefix}-info-item-value text-lg font-normal px-2`}>
                            {servicePointData.companyName}
                        </p>
                    </div>
                    <div className={`${sectionPrefix}-info-item flex justify-start md:items-center flex-col md:flex-row`}>
                        <p className={`${sectionPrefix}-info-item-label text-lg font-bold`}>
                            Bayi:
                        </p>
                        <p className={`${sectionPrefix}-info-item-value text-lg font-normal px-2`}>
                            {servicePointData.resellerName}
                        </p>
                    </div>
                    <div className={`${sectionPrefix}-info-item flex justify-start md:items-center flex-col md:flex-row`}>
                        <p className={`${sectionPrefix}-info-item-label text-lg font-bold`}>
                            Odeme Yontemleri:
                        </p>
                        <p className={`${sectionPrefix}-info-item-value text-lg font-normal px-2`}>
                            {/* {servicePointDetailsInfo.resellerName} */}
                        </p>
                    </div>
                    <div className={`${sectionPrefix}-info-item flex justify-start md:items-center flex-col md:flex-row`}>
                        <p className={`${sectionPrefix}-info-item-label text-lg font-bold`}>
                            Park Yeri:
                        </p>
                        <p className={`${sectionPrefix}-info-item-value text-lg font-normal px-2`}>
                            {/* {servicePointDetailsInfo.resellerName} */}
                        </p>
                    </div>
                    <div className={`${sectionPrefix}-info-item flex justify-start md:items-center flex-col md:flex-row`}>
                        <p className={`${sectionPrefix}-info-item-label text-lg font-bold`}>
                            Servis Noktasi Olanaklari:
                        </p>
                        <p className={`${sectionPrefix}-info-item-value text-lg font-normal px-2`}>
                            {/* {servicePointDetailsInfo.resellerName} */}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicePointDetailsContent;
