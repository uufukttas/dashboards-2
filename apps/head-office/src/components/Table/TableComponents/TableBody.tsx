import React, { Fragment } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaPen, FaTrashCan, FaCircleInfo } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { BRAND_PREFIX, CITIES, DISTRICTS } from '../../../constants/constants';
import { showDialog } from '../../../../app/redux/features/dialogInformation';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { setServicePointData } from '../../../../app/redux/features/servicePointData';
import { setServicePointInformation } from '../../../../app/redux/features/servicePointInformation';
import { RootState } from '../../../../app/redux/store';
import type { IServicePointInfoProps, ITableProps } from '../types';

const TableBody = ({ servicePoints }: ITableProps) => {
    const dispatch = useDispatch();
    const isModalVisible = useSelector((state: RootState) => state.isModalVisible.isModalVisible);

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
    const getUpdatedServicePointsInfo = async (event: React.MouseEvent<HTMLAnchorElement>) => {
        const servicePointIdAttr = event.currentTarget.getAttribute('data-service-point-id') || '0';
        const servicePointId = Number(servicePointIdAttr);

        try {
            await axios
                .post(
                    process.env.GET_STATION_BY_ID || '',
                    ({ 'id': servicePointId })
                )
                .then((response) => response.data)
                .then(response => {
                    dispatch(toggleModalVisibility(isModalVisible));
                    dispatch(setServicePointData(response.data[0]));
                })
                .catch((error) => console.log(error));

            await axios
                .post(
                    process.env.GET_STATION_INFO_BY_ID || '',
                    ({ 'stationId': servicePointId })
                )
                .then((response) => response.data)
                .then(response => dispatch(setServicePointInformation(response.data[0])))
                .catch((error) => console.log(error));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <tbody className={`${BRAND_PREFIX}-table-body bg-white divide-y divide-gray-200 text-black`}>
            {
                servicePoints &&
                servicePoints.map((servicePoint: IServicePointInfoProps) => {
                    return (
                        <Fragment key={servicePoint.id}>
                            <tr data-service-point-id={servicePoint.id}>
                                <td className="px-6 py-3 text-center">{servicePoint.name}</td>
                                <td className="px-6 py-3 text-center">{servicePoint.phone}</td>
                                <td className="px-6 py-3 text-center">{servicePoint.address}</td>
                                <td className="px-6 py-3 text-center">{getCity((servicePoint.cityId))}</td>
                                <td className="px-6 py-3 text-center">{getDistricts(servicePoint.districtId)}</td>
                                <td className="px-6 py-3 text-center">
                                    <div className={`${BRAND_PREFIX}-service-point-status-container flex justify-center`}>
                                        {
                                            (
                                                servicePoint.phone &&
                                                servicePoint.address &&
                                                servicePoint.cityId &&
                                                servicePoint.districtId
                                            )
                                                ? <div className='bg-green-500 rounded-full h-4 w-4 mx-2'></div>
                                                : <div className='bg-red-500 rounded-full h-4 w-4 mx-2'></div>

                                        }
                                    </div>
                                </td>
                                <td className="px-6 py-4 items-center w-full flex">
                                    <a
                                        className="font-medium text-blue-600 cursor-pointer px-2"
                                        data-modal-show="editUserModal"
                                        data-service-point-id={servicePoint.id}
                                        onClick={getUpdatedServicePointsInfo}
                                    >
                                        <FaPen className='text-primary' />
                                    </a>
                                    <a
                                        className="font-medium text-red-600 cursor-pointer px-2"
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
                                            <Link className='px-2' href={`/service-points/service-point/${servicePoint.id}`}>
                                                <FaCircleInfo className={`text-blue-700`} />
                                            </Link>
                                        )
                                    }
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
