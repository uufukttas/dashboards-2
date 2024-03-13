import React from 'react'
import Card from '../Card/Card'

interface IServicePointDetailsHeaderProps {
    servicePointDetailsName: string;
    servicePointDetailsStatus: boolean;
};

const ServicePointDetailsHeader = ({
    servicePointDetailsName, servicePointDetailsStatus
}: IServicePointDetailsHeaderProps) => {
    const servicePointHeader = (
        <div className="sh-service-point-details-page-header w-full flex items-center justify-between">
            <div className="sh-service-point-details-page-header-left flex">
                <h1 className="sh-service-point-details-page-title text-2xl font-bold">
                    {decodeURI(servicePointDetailsName)}
                </h1>
            </div>
            <div className="sh-service-point-details-page-header-right flex">
                <div className='sh-service-point-details-page-status text-sm font-bold'>
                    {
                        servicePointDetailsStatus
                            ? <div className='bg-green-500 rounded-full h-4 w-4 mx-2'></div>
                            : <div className='bg-secondary rounded-full h-4 w-4 mx-2'></div>
                    }
                </div>
            </div>
        </div>
    );

    return (
        <div className='w-full'>
            <Card cardBodyChildren={servicePointHeader} className='my-5' />
        </div>
    );
};

export default ServicePointDetailsHeader;
