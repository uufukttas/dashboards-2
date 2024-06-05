import React from 'react';
import { useSelector } from 'react-redux';
import ComissionItem from './ComissionItem';
import { BRAND_PREFIX } from '../../../../constants/constants';
import { RootState } from '../../../../../app/redux/store';
import type { IComissionDetailProps, IComissionProps } from '../../types';

const Comissions: React.FC<IComissionDetailProps> = ({ slug }: IComissionDetailProps) => {
    const sectionPrefix: string = `${BRAND_PREFIX}-comission-details`;
    const comissions = useSelector((state: RootState) => state.comissionData);

    return (
            <div className={`${sectionPrefix} items-center py-4 w-full`}>
                <div className={`${sectionPrefix}-header-container w-full`}>
                    <div className={`${sectionPrefix}-header w-full flex text-center`}>
                        <div className={`${sectionPrefix}-reseller-container flex justify-between md:items-center flex-col md:flex-row w-full`}>
                            <p className={`${sectionPrefix}-reseller text-lg font-bold w-full`}>Hizmet Nok. / Reseller</p>
                        </div>
                        <div className={`${sectionPrefix}-charge-unit-reseller-container flex justify-between md:items-center flex-col md:flex-row w-full`}>
                            <p className={`${sectionPrefix}-charge-unit-reseller text-lg font-bold w-full`}>Cihaz Yatirimcisi</p>
                        </div>
                        <div className={`${sectionPrefix}-breakpoint-container flex justify-between md:items-center flex-col md:flex-row w-full`}>
                            <p className={`${sectionPrefix}-breakpoint text-lg font-bold w-full`}>Komisyon Türü</p>
                        </div>
                        <div className={`${sectionPrefix}-percent-container flex justify-between md:items-center flex-col md:flex-row w-full `}>
                            <p className={`${sectionPrefix}-percent text-lg font-bold w-full`}>Yuzde Degeri</p>
                        </div>
                        <div className={`${sectionPrefix}-actions-container flex justify-between md:items-center flex-col md:flex-row w-full`}>
                            <p className={`${sectionPrefix}-actions text-lg font-bold w-full`}>Islemler</p>
                        </div>
                    </div>
                </div>
                <hr className={`${sectionPrefix}-header-line w-full`} />
                <div className={`${sectionPrefix}-content-container w-full`}>
                    <div className={`${sectionPrefix}-content w-full flex`}>
                        <div className={`${sectionPrefix}-info-container flex flex-col justify-between w-full`}>
                            <div className={`${sectionPrefix}-info-item flex justify-between md:items-center flex-col flex-wrap md:flex-row w-full py-4`}>
                                {comissions.map((comissionDetail: IComissionProps) => (
                                    <ComissionItem key={comissionDetail.ID} {...comissionDetail} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Comissions;
