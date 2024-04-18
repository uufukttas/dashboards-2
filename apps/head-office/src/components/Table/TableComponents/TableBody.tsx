import React, { Fragment, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaPen, FaTrashCan, FaCircleInfo } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
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
    const [isHidden, setIsHidden] = useState(true);
    const [selectedRow, setSelectedRow] = useState(0);

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
    const toggleTableRow = (id: number) => {
        setIsHidden(!isHidden);

        if (selectedRow !== id) {
            setSelectedRow(id);

            return;
        };

        if (!isHidden) {
            setSelectedRow(0);

            return;
        };

        setSelectedRow(id);
    };

    return (
        <tbody className={`${BRAND_PREFIX}-table-body bg-white divide-y divide-gray-200 text-black`}>
            {
                servicePoints &&
                servicePoints.map((servicePoint: IServicePointInfoProps) => {
                    return (
                        <Fragment key={servicePoint.id}>
                            <tr data-service-point-id={servicePoint.id}>
                                <td className="px-6 py-3">{servicePoint.name}</td>
                                <td className="px-6 py-3">{servicePoint.phone}</td>
                                <td className="px-6 py-3">{servicePoint.address}</td>
                                <td className="px-6 py-3">{getCity((servicePoint.cityId))}</td>
                                <td className="px-6 py-3">{getDistricts(servicePoint.districtId)}</td>
                                <td className="px-6 py-4 items-center w-full justify-center flex">
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
                                    <Link className='px-2' href={`/service-points/service-point/${servicePoint.id}`}>
                                        <FaCircleInfo className={`text-blue-700`} />
                                    </Link>
                                    <Button
                                        className="font-medium px-2 "
                                        id={`toggle-row-${servicePoint.id}`}
                                        type="button"
                                        onClick={() => toggleTableRow(servicePoint.id)}
                                    >
                                        <div
                                            className='text-lg'
                                            dangerouslySetInnerHTML={{
                                                __html: `${servicePoint.id === selectedRow ? '&#11205;' : '&#11206;'}`,
                                            }}
                                        />
                                    </Button>
                                </td>
                            </tr>
                            {
                                servicePoint.id === selectedRow && (
                                    <>
                                        <tr className={`bg-gray-50 second-table-head-row text-xs uppercase text-gray-700`}>
                                            <th className='px-6'>Longitude</th>
                                            <th className='px-6'>Latitude</th>
                                            <th className='px-6'>Payment Methods</th>
                                            <th className='px-6'>Free Park</th>
                                            <th className='px-6'>Opportunuties</th>
                                            <th className='px-6'> </th>
                                        </tr>
                                        <tr>
                                            <td className='px-6 py-3'>{servicePoint.longitude}</td>
                                            <td className='px-6 py-3'>{servicePoint.latitude}</td>
                                            <td className='px-6 py-3'>{servicePoint.latitude}</td>
                                            <td className='px-6 py-3'>{servicePoint.latitude}</td>
                                            <td className='px-6 py-3'>{servicePoint.latitude}</td>
                                        </tr>
                                    </>
                                )
                            }
                        </Fragment>
                    );
                })
            }
        </tbody>
    );
};

export default TableBody;
