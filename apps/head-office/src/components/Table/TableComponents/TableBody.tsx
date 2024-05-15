import React from 'react';
import Link from 'next/link';
import { FaCircleInfo, FaExclamation, FaPen, FaTrashCan } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { BRAND_PREFIX, CITIES, DISTRICTS } from '../../../constants/constants';
import { getServicePointDataRequest, getServicePointInformationRequest } from '../../../../app/api/servicePoints';
import { showDialog } from '../../../../app/redux/features/dialogInformation';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { setServicePointData } from '../../../../app/redux/features/servicePointData';
import { setServicePointInformation } from '../../../../app/redux/features/servicePointInformation';
import type { IServicePointInfoProps } from '../types';

interface IUserDataProps {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string[];
    status: string;
    address?: string;
    cityId?: number;
    districtId?: number;
};

interface ITableBodyProps {
    tableData: IServicePointInfoProps[] | IUserDataProps[];
    tableDataCount: number;
};

const TableBody: React.FC<ITableBodyProps> = ({ tableData, tableDataCount }: ITableBodyProps) => {
    const dispatch = useDispatch();

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
                tableDataCount > 0 &&
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(((index: number) => {
                    return (
                        <tr className='h-[10%]' data-service-point-id={tableData[index]?.id || 0} key={tableData[index]?.id || index + 1}>
                            <td className="px-4 py-2">
                                {
                                    tableData[index]?.name && (
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
                                                {tableData[index]?.name || ''}
                                            </div>
                                        </div>
                                    )
                                }
                            </td>
                            {
                                tableData[index]?.phone &&
                                tableData[index]?.address &&
                                tableData[index]?.cityId &&
                                tableData[index]?.districtId && (
                                    <>
                                        <td className="px-4 py-2 text-center">{tableData[index].phone || ''}</td>
                                        <td className="px-4 py-2 text-center">{tableData[index].address || ''}</td>
                                        <td className="px-4 py-2 text-center">{getCity(tableData[index].cityId ?? 0) || ''}</td>
                                        <td className="px-4 py-2 text-center">{getDistricts(tableData[index].districtId ?? 0) || ''}</td>
                                        <td className="px-4 py-4">
                                            {
                                                tableData[index]?.name && (
                                                    <div className="flex justify-start text-2xl">
                                                        <a
                                                            className="font-medium text-blue-600 cursor-pointer px-4"
                                                            data-modal-show="editUserModal"
                                                            data-service-point-id={tableData[index]?.id || 0}
                                                            onClick={getUpdatedServicePointInfo}
                                                        >
                                                            <FaPen className='text-primary' />
                                                        </a>
                                                        <a
                                                            className="font-medium text-red-600 cursor-pointer px-4"
                                                            data-modal-show="deleteUserModal"
                                                            data-service-point-id={tableData[index]?.id || 0}
                                                            onClick={deleteServicePointInfo}
                                                        >
                                                            <FaTrashCan />
                                                        </a>
                                                        {
                                                            tableData[index]?.address &&
                                                            tableData[index]?.districtId &&
                                                            tableData[index]?.cityId &&
                                                            tableData[index]?.phone && (
                                                                <Link
                                                                    className='px-4'
                                                                    href={`/service-points/service-point/${tableData[index]?.id || 0}`}
                                                                >
                                                                    <FaCircleInfo className={`text-blue-700`} />
                                                                </Link>
                                                            )
                                                        }
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </>
                                )
                            }
                            {
                                (tableData[index])?.email &&
                                (tableData[index])?.role &&
                                (tableData[index])?.status && (
                                    <>
                                        <td className="px-4 py-2 text-center">{(tableData[index] as IUserDataProps).email || tableData[index].phone}</td>
                                        <td className="px-4 py-2 text-center flex w-full flex-wrap">
                                            {
                                                (tableData[index] as IUserDataProps).role.map((role: string, index: number) => (
                                                    <div className={`border rounded text-bold px-2 mx-2 my-2 w-[100px] ${role === 'Admin'
                                                        ? 'bg-green-300 text-green-800 border-green-300'
                                                        : (role === 'Employee'
                                                            ? 'bg-yellow-300 text-yellow-800 border-yellow-300'
                                                            : (role === 'User'
                                                                ? 'bg-blue-300 text-blue-800 border-blue-300'
                                                                : 'bg-red-300 text-red-800 border-red-300'))}`} key={index}>{role}</div>
                                                ))
                                            }

                                        </td>
                                        <td className="px-4 py-2 text-center">{(tableData[index] as IUserDataProps).status || ''}</td>
                                        <td className="px-4 py-4">
                                            {
                                                tableData[index]?.name && (
                                                    <div className="flex justify-start text-2xl">
                                                        <a
                                                            className="font-medium text-blue-600 cursor-pointer px-4"
                                                            data-modal-show="editUserModal"
                                                            data-service-point-id={tableData[index]?.id || 0}
                                                            onClick={getUpdatedServicePointInfo}
                                                        >
                                                            <FaPen className='text-primary' />
                                                        </a>
                                                        <a
                                                            className="font-medium text-red-600 cursor-pointer px-4"
                                                            data-modal-show="deleteUserModal"
                                                            data-service-point-id={tableData[index]?.id || 0}
                                                            onClick={deleteServicePointInfo}
                                                        >
                                                            <FaTrashCan />
                                                        </a>
                                                        {
                                                            tableData[index]?.address &&
                                                            tableData[index]?.districtId &&
                                                            tableData[index]?.cityId &&
                                                            tableData[index]?.phone && (
                                                                <Link
                                                                    className='px-4'
                                                                    href={`/service-points/service-point/${tableData[index]?.id || 0}`}
                                                                >
                                                                    <FaCircleInfo className={`text-blue-700`} />
                                                                </Link>
                                                            )
                                                        }
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </>
                                )
                            }
                        </tr>
                    );
                }))
            }
        </tbody>
    );
};

export default TableBody;
