import React from 'react';
import Link from 'next/link';
import { FaCircleInfo, FaExclamation, FaPen, FaTrashCan } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { BRAND_PREFIX, CITIES, DISTRICTS } from '../../../constants/constants';
import { getServicePointDataRequest, getServicePointInformationRequest } from '../../../../app/api/servicePoints';
import { showDialog } from '../../../../app/redux/features/dialogInformation';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { setServicePointData } from '../../../../app/redux/features/servicePointData';
import { setServicePointInformation } from '../../../../app/redux/features/servicePointInformation';
import { RootState } from '../../../../app/redux/store';
import type { IServicePointInfoProps } from '../types';

const TableBody: React.FC = () => {
    const dispatch = useDispatch();
    const servicePointsCount = useSelector((state: RootState) => state.servicePoints.count);
    const servicePointsData = useSelector((state: RootState) => state.servicePoints.servicePoints);

    const deleteServicePointInfo = async (event: React.MouseEvent<HTMLAnchorElement>) => {
        dispatch(
            showDialog({
                actionType: 'delete',
                data: parseInt(event.currentTarget.getAttribute('data-service-point-id') || '0')
            })
        );
    };
    const getCity = (rid: number) => (CITIES[rid?.toString()] || '');
    const getDistricts = (districtCode: number) => (DISTRICTS[districtCode?.toString()] || '');
    const getUpdatedServicePointInfo = async (event: React.MouseEvent<HTMLAnchorElement>) => {
        const servicePointId = Number(event.currentTarget.getAttribute('data-service-point-id') || '0');

        try {
            const servicePointData = await getServicePointDataRequest(servicePointId);
            const servicePointInformation = await getServicePointInformationRequest(servicePointId);

            dispatch(setServicePointData(servicePointData.data[0]));
            dispatch(setServicePointInformation(servicePointInformation.data[0]));
            dispatch(toggleModalVisibility(false));
        } catch (error) {
            console.error(error);
        };
    };

    return (
        <tbody className={`${BRAND_PREFIX}-service-points-table-body bg-white divide-y divide-gray-200 text-black`}>
            {
                servicePointsCount > 0 &&
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(((index: number) => {
                    return (
                        <tr className='h-[10%]' data-service-point-id={servicePointsData[index]?.id || 0} key={servicePointsData[index]?.id || index + 1}>
                            <td className="px-4 py-2">
                                {
                                    servicePointsData[index]?.name && (
                                        <div className={`${BRAND_PREFIX}-service-point-item-information-container h-full flex items-center`}>
                                            <div className={`${BRAND_PREFIX}-service-point-status-container`}>
                                                {
                                                    // TODO: We change this column to show the status of the service point from charge units
                                                    <div className='text-red-500 text-2xl'>
                                                        <FaExclamation />
                                                    </div>
                                                }
                                            </div>
                                            <div className={`${BRAND_PREFIX}-service-point-name`}>
                                                {servicePointsData[index]?.name || ''}
                                            </div>
                                        </div>
                                    )
                                }
                            </td>
                            <td className="px-4 py-2 text-center">{servicePointsData[index]?.phone || ''}</td>
                            <td className="px-4 py-2 text-center">{servicePointsData[index]?.address || ''}</td>
                            <td className="px-4 py-2 text-center">{getCity((servicePointsData[index]?.cityId)) || ''}</td>
                            <td className="px-4 py-2 text-center">{getDistricts(servicePointsData[index]?.districtId) || ''}</td>
                            <td className="px-4 py-4">
                                {
                                    servicePointsData[index]?.name && (
                                        <div className="flex justify-start text-2xl">
                                            <a
                                                className="font-medium text-blue-600 cursor-pointer px-4"
                                                data-modal-show="editUserModal"
                                                data-service-point-id={servicePointsData[index]?.id || 0}
                                                onClick={getUpdatedServicePointInfo}
                                            >
                                                <FaPen className='text-primary' />
                                            </a>
                                            <a
                                                className="font-medium text-red-600 cursor-pointer px-4"
                                                data-modal-show="deleteUserModal"
                                                data-service-point-id={servicePointsData[index]?.id || 0}
                                                onClick={deleteServicePointInfo}
                                            >
                                                <FaTrashCan />
                                            </a>
                                            {
                                                servicePointsData[index]?.address &&
                                                servicePointsData[index]?.districtId &&
                                                servicePointsData[index]?.cityId &&
                                                servicePointsData[index]?.phone && (
                                                    <Link
                                                        className='px-4'
                                                        href={`/service-points/service-point/${servicePointsData[index]?.id || 0}`}
                                                    >
                                                        <FaCircleInfo className={`text-blue-700`} />
                                                    </Link>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </td>
                        </tr>
                    );
                }))
            }
        </tbody>
    );
};

export default TableBody;
