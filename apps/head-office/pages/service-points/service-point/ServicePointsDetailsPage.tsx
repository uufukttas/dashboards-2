import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../../src/components/Card/Card';
import { CITIES, DISTRICTS } from '../../../src/constants/city_districts';

interface IServicePointsDetailsPageProps {
    slug: string;
}

interface IServicePointsDetailsProps {
    name: string;
    id: string;
    resellerId: string;
    companyId: string;
    resellerName: string;
    companyName: string;
    isActive: boolean;
    isDeleted: boolean;
};

interface IServicePointsDetailsInfoProps {
    "ID": number;
    "StationID": number;
    "Address": string;
    "Phone1": string;
    "Phone2": string;
    "Lat": number;
    "Lon": number;
    "CityID": number;
    "DistrictID": number;
}

const initialServicePointsDetailsStateValue = {
    name: '',
    id: '',
    resellerId: '',
    companyId: '',
    resellerName: '',
    companyName: '',
    isActive: true,
    isDeleted: false,
};

const initialServicePointsDetailsInfoStateValue = {
    "ID": 0,
    "StationID": 0,
    "Address": "",
    "Phone1": "",
    "Phone2": "",
    "Lat": 0,
    "Lon": 0,
    "CityID": 0,
    "DistrictID": 0
}

const ServicePointsDetailsPage = ({ slug }: IServicePointsDetailsPageProps) => {
    const [servicePointDetails, setServicePointDetails] = useState<IServicePointsDetailsProps>(initialServicePointsDetailsStateValue);
    const [servicePointDetailsInfo, setServicePointDetailsInfo] = useState<IServicePointsDetailsInfoProps>(initialServicePointsDetailsInfoStateValue);

    const getServicePointsDetails = async (slug: string) => {
        axios.post(
            'https://sharztestapi.azurewebsites.net/ServicePoint/GetStationById',
            { id: slug[0] },
            { headers: { 'Content-Type': 'application/json' } }
        )
            .then(response => response.data)
            .then(data => setServicePointDetails(data.data[0]))
            .catch(error => console.log(error));
    };

    const getServicePointsDetailsInfo = async (slug: string) => {
        axios.post(
            'https://sharztestapi.azurewebsites.net/StationInfo/GetByStationId',
            JSON.stringify({ stationId: Number(slug[0]) }),
            { headers: { 'Content-Type': 'application/json' } }
        )
            .then(response => response.data)
            .then(data => setServicePointDetailsInfo(data.data[0]))
            .catch(error => console.log(error));
    };

    const getSelectedCity = (cityId: number) => {
        return CITIES[16];
    };

    const getSelectedDistrict = (districtId: number) => {
        return DISTRICTS[districtId?.toString()];
    };

    const cardBody = (
        <>
            <div className='w-full flex itemse-center justify-between'>
                <div className='flex justify-center items-baseline'>
                    <p className='px-2'>Servis Noktasinin Ismi: </p>
                    <h1 className='text-2xl'>{servicePointDetails.name}</h1>
                </div>
                <div className='flex items-center justify-center flex-col'>
                    <div className='flex items-center '>
                        <h3 className='px-2'>Durum</h3>
                        {
                            servicePointDetails.isActive
                                ? <div className='bg-green-500 rounded-full h-4 w-4 mx-2'></div>
                                : <div className='bg-red-500 rounded-full h-4 w-4 mx-2'></div>
                        }
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex justify-center items-baseline'>
                    <p className='px-2'>Servis Noktasinin Sirketi: </p>
                    <h1 className='text-2xl'>{servicePointDetails.companyName}</h1>
                </div>
                <div className='flex justify-center items-baseline'>
                    <p className='px-2'>Sehir </p>
                    <h1 className='text-2xl'>{getSelectedCity(servicePointDetailsInfo.CityID)}</h1>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex justify-center items-baseline'>
                    <p className='px-2'>Servis Noktasinin Bayisi: </p>
                    <h1 className='text-2xl'>{servicePointDetails.resellerName}</h1>
                </div>
                <div className='flex justify-center items-baseline'>
                    <p className='px-2'>Ilce </p>
                    <h1 className='text-2xl'>{getSelectedDistrict(servicePointDetailsInfo.DistrictID)}</h1>
                </div>
            </div>

        </>
    );

    useEffect(() => {
        getServicePointsDetails(slug[0]);
        getServicePointsDetailsInfo(slug[0]);
    }, [slug])

    return (
        servicePointDetailsInfo.CityID !== 0 && servicePointDetailsInfo.DistrictID !== 0 &&
        <div className='w-full'>
            <Card cardBodyChildren={cardBody} className='my-5' />
        </div>
    )
}

export default ServicePointsDetailsPage;
