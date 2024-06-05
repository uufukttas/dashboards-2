import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ComissionItem from './ComissionItem';
import { getComissionDetails } from '../../../../../app/api/servicePointDetails';
import { setComissionData } from '../../../../../app/redux/features/comissionData';
import { toggleComissionListUpdate } from '../../../../../app/redux/features/isComissionListUpdated';
import { RootState } from '../../../../../app/redux/store';
import { BRAND_PREFIX } from '../../../../constants/constants';
import type { IComissionDetailProps, IComissionProps } from '../../types';

const Comissions: React.FC<IComissionDetailProps> = ({ slug }: IComissionDetailProps) => {
    const sectionPrefix: string = `${BRAND_PREFIX}-comission-details`;
    const dispatch = useDispatch();
    const comissions = useSelector((state: RootState) => state.comissionData);
    const isComissionListUpdated =
        useSelector((state: RootState) => state.isComissionListUpdated.isComissionListUpdated);

    const getComissionsDetails = async (): Promise<void | null> => {
        const comissionResponse = await getComissionDetails(slug);

        if (!comissionResponse.success) {
            console.error('Error getting comission details', comissionResponse.error);
        }

        dispatch(setComissionData(comissionResponse.data));
    };

    useEffect(() => {
        if (isComissionListUpdated) {
            getComissionsDetails();
        }

        dispatch(toggleComissionListUpdate(false));
    }, [isComissionListUpdated])

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
