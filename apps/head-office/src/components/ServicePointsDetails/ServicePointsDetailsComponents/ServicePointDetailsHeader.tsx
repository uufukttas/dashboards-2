import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../../Card/Card';
import { BRAND_PREFIX } from '../../../constants/constants';
import { RootState } from '../../../../app/redux/store';

const ServicePointDetailsHeader: React.FC = () => {
    const sectionPreifx: string = `${BRAND_PREFIX}-service-point-details-page`;
    const servicePointData = useSelector((state: RootState) => state.servicePointData.servicePointData);

    const servicePointHeader: React.ReactNode = (
        <div className={`${sectionPreifx}-header w-full flex items-center justify-between`}>
            <div className={`${sectionPreifx}-header-left flex`}>
                <h1 className={`${sectionPreifx}-title text-2xl font-bold text-heading`}>
                    {servicePointData.name}
                </h1>
            </div>
            <div className={`${sectionPreifx}-header-right flex`}>
            </div>
        </div>
    );

    return (
        <Card cardBody={servicePointHeader} className='my-5 lg:mx-0 min-h-[96px] p-8' />
    );
};

export default ServicePointDetailsHeader;
