import React from 'react';
import Card from '../../Card/Card';
import { BRAND_PREFIX } from '../../../constants/constants';
import type { IServicePointDetailsHeaderProps } from '../types';

const ServicePointDetailsHeader: React.FC<IServicePointDetailsHeaderProps> = ({
    servicePointDetailsName, servicePointDetailsStatus
}: IServicePointDetailsHeaderProps) => {
    const sectionPreifx = 'service-point-details-page';
    const servicePointHeader = (
        <div className={`${BRAND_PREFIX}-${sectionPreifx}-header w-full flex items-center justify-between`}>
            <div className={`${BRAND_PREFIX}-${sectionPreifx}-header-left flex`}>
                <h1 className={`${BRAND_PREFIX}-${sectionPreifx}-title text-2xl font-bold text-heading`}>
                    {servicePointDetailsName}
                </h1>
            </div>
            <div className={`${BRAND_PREFIX}-${sectionPreifx}-header-right flex`}>
                <div className={`${BRAND_PREFIX}-${sectionPreifx}-status text-sm font-bold`}>
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
        <Card cardBody={servicePointHeader} className='my-5 lg:mx-0' />
    );
};

export default ServicePointDetailsHeader;
