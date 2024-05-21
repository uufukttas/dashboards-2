import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { FaTrashCan } from 'react-icons/fa6';
import type { IComissionProps } from '../types';
import { Button } from '@projects/button';
import { useDispatch } from 'react-redux';
import { showDialog } from '../../../../app/redux/features/dialogInformation';

const Comissions = ({ slug }: { slug: string }) => {
    const sectionPrefix = 'comission-details';
    const dispatch = useDispatch();
    const [comissionDetails, setComissionDetails] = useState([]);

    const getComissionDetails = async (): Promise<void> => {
        await axios
            .post(
                'https://sharztestapi.azurewebsites.net/ServicePoint/SelectCommisionRate',
                {
                    "stationId": slug
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            ).then((response) => setComissionDetails(response.data.data));
    };

    useEffect(() => {
        getComissionDetails();
    }, []);

    return (
        <>
            <div className={`${sectionPrefix} items-center py-4 w-full`}>
                <div className={`${sectionPrefix}-header-container w-full`}>
                    <div className={`${sectionPrefix}-header w-full flex`}>
                        <div className={`${sectionPrefix}-reseller-container flex justify-between md:items-center flex-col md:flex-row w-full`}>
                            <p className={`${sectionPrefix}-reseller text-lg font-bold w-full`}>Reseller</p>
                        </div>
                        <div className={`${sectionPrefix}-charge-unit-reseller-container flex justify-between md:items-center flex-col md:flex-row w-full`}>
                            <p className={`${sectionPrefix}-charge-unit-reseller text-lg font-bold w-full`}>Cihaz Yatirimcisi</p>
                        </div>
                        <div className={`${sectionPrefix}-breakpoint-container flex justify-between md:items-center flex-col md:flex-row w-full`}>
                            <p className={`${sectionPrefix}-breakpoint text-lg font-bold w-full`}>Kirilimlar</p>
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
                    <div className={`${sectionPrefix}-content w-full`}>
                        <div className={`${sectionPrefix}-info-container flex flex-col justify-between`}>
                            <div className={`${sectionPrefix}-info-item flex justify-between md:items-center flex-col flex-wrap md:flex-row w-full py-4`}>
                                {
                                    comissionDetails.map((comissionDetail: IComissionProps) => {
                                        return (
                                            <div className={`${sectionPrefix}-info-item-value text-lg font-normal flex justify-between w-full py-4`} key={comissionDetail.ID}>
                                                <div className={`${sectionPrefix}-reseller-container flex justify-center md:items-center flex-col md:flex-row `}>
                                                    <p className={`${sectionPrefix}-reseller text-lg font-normal`}>{comissionDetail.OwnerTypeName}</p>
                                                </div>
                                                <div className={`${sectionPrefix}-charge-unit-reseller-container flex justify-center md:items-center flex-col md:flex-row `}>
                                                    <p className={`${sectionPrefix}-charge-unit-reseller text-lg font-normal`}>{comissionDetail.ForInvestor ? 'Evet' : 'Hayir'}</p>
                                                </div>
                                                <div className={`${sectionPrefix}-breakpoint-container flex justify-center md:items-center flex-col md:flex-row `}>
                                                    <p className={`${sectionPrefix}-breakpoint text-lg font-normal`}>{comissionDetail.TariffSubFractionTypeName}</p>
                                                </div>
                                                <div className={`${sectionPrefix}-percent-container flex justify-center md:items-center flex-col md:flex-row `}>
                                                    <p className={`${sectionPrefix}-percent text-lg font-normal`}>{comissionDetail.Rate}</p>
                                                </div>
                                                <div className={`${sectionPrefix}-percent-container flex justify-center md:items-center flex-col md:flex-row `}>
                                                    <Button
                                                        buttonText={""}
                                                        className="bg-secondary rounded-md px-4 py-2 mx-4 text-white"
                                                        id={`permission-delete-button`}
                                                        type={'button'}
                                                        dataAttributes={{ 'comission-id': comissionDetail.RID?.toString() }}
                                                        onClick={() => {
                                                            dispatch(
                                                                showDialog({
                                                                    isVisible: true,
                                                                    actionType: 'deleteServicePointComission',
                                                                    data: comissionDetail.RID
                                                                })
                                                            );
                                                        }}
                                                    >
                                                        <FaTrashCan />
                                                    </Button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Comissions;
