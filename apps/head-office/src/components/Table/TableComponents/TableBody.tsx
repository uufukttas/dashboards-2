import React, { Fragment } from 'react';
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
    const servicePoints = useSelector((state: RootState) => state.servicePoints.servicePoints);

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
        const servicePointIdAttr = event.currentTarget.getAttribute('data-service-point-id') || '0';
        const servicePointId = Number(servicePointIdAttr);

        try {
            const servicePointData = await getServicePointDataRequest(servicePointId);
            const servicePointInformation = await getServicePointInformationRequest(servicePointId);

            dispatch(setServicePointData(servicePointData.data[0]));
            dispatch(setServicePointInformation(servicePointInformation.data[0]));
        } catch (error) {
            console.error(error);
        };
    };

    return (
        <tbody className={`${BRAND_PREFIX}-service-points-table-body bg-white divide-y divide-gray-200 text-black`}>
            {
                servicePoints.length > 0 &&
                servicePoints.map((servicePoint: IServicePointInfoProps) => {
                    return (
                        <Fragment key={servicePoint.id}>
                            <tr data-service-point-id={servicePoint.id} className='h-[10%]'>
                                <td className="px-4 py-2">
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
                                            {servicePoint.name}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-center">{servicePoint.phone}</td>
                                <td className="px-4 py-2 text-center">{servicePoint.address}</td>
                                <td className="px-4 py-2 text-center">{getCity((servicePoint.cityId))}</td>
                                <td className="px-4 py-2 text-center">{getDistricts(servicePoint.districtId)}</td>

                                <td className="px-4 py-4">
                                    <div className="flex justify-start text-2xl">
                                        <a
                                            className="font-medium text-blue-600 cursor-pointer px-4"
                                            data-modal-show="editUserModal"
                                            data-service-point-id={servicePoint.id}
                                            onClick={getUpdatedServicePointInfo}
                                        >
                                            <FaPen className='text-primary' />
                                        </a>
                                        <a
                                            className="font-medium text-red-600 cursor-pointer px-4"
                                            data-modal-show="deleteUserModal"
                                            data-service-point-id={servicePoint.id}
                                            onClick={deleteServicePointInfo}
                                        >
                                            <FaTrashCan />
                                        </a>
                                        {
                                            servicePoint.phone &&
                                            servicePoint.address &&
                                            servicePoint.cityId &&
                                            servicePoint.districtId && (
                                                <Link
                                                    className='px-4'
                                                    href={`/service-points/service-point/${servicePoint.id}`}
                                                >
                                                    <FaCircleInfo className={`text-blue-700`} />
                                                </Link>
                                            )
                                        }
                                    </div>
                                </td>
                            </tr>
                        </Fragment>
                    );
                })
            }
        </tbody>
    );
};

export default TableBody;
