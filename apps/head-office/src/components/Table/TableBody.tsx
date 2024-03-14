import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { InfoIcon, PenIcon, TrashIcon } from '@projects/icons';
import { BRAND_PREFIX, CITIES, DISTRICTS } from '../../constants/constants';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { setServicePointData } from '../../../app/redux/features/servicePointData';
import { setServicePointInformation } from '../../../app/redux/features/servicePointInformation';
import { RootState } from '../../../app/redux/store';

interface IServicePointInfoProps {
    servicePoint: {
        id: number;
        name: string;
        type?: string | null | undefined;
        longitude: number;
        latitude: number;
        phone?: string | null | undefined;
        address: string;
        cityId: number;
        districtId: number;
        opportunities?: string[] | null | undefined;
        freePark?: string | null | undefined;
        paymentMethods?: string[] | null | undefined;
    };
};

const TableBody = () => {
    const dispatch = useDispatch();
    const isModalVisible = useSelector((state: RootState) => state.isModalVisible);
    const [isHidden, setIsHidden] = useState(true);
    const [servicePoints, setServicePoints] = useState([]);
    const [selectedRow, setSelectedRow] = useState(0);

    const createTableRow = ({ servicePoint }: IServicePointInfoProps) => {
        return (
            <Fragment key={servicePoint.id}>
                <tr data-service-point-id={servicePoint.id}>
                    <td className="px-6 py-3">{decodeURIComponent(servicePoint.name)}</td>
                    <td className="px-6 py-3">{servicePoint.phone}</td>
                    <td className="px-6 py-3">{decodeURIComponent(servicePoint.address)}</td>
                    <td className="px-6 py-3">{getCity((servicePoint.cityId))}</td>
                    <td className="px-6 py-3">{getDistricts(servicePoint.districtId)}</td>
                    <td className="px-6 py-4 items-center w-full justify-center flex">
                        <a
                            className="font-medium text-blue-600 cursor-pointer px-2"
                            data-modal-show="editUserModal"
                            data-service-point-id={servicePoint.id}
                            onClick={getUpdatedServicePointsInfo}
                        >
                            <PenIcon />
                        </a>
                        <a
                            className="font-medium text-red-600 cursor-pointer px-2"
                            data-modal-show="deleteUserModal"
                            data-service-point-id={servicePoint.id}
                            onClick={deleteServicePointInfo}
                        >
                            <TrashIcon />
                        </a>
                        <Link className='px-2' href={`/service-points/service-point/${servicePoint.id}`}>
                            <InfoIcon />
                        </Link>
                        <Button
                            className="font-medium text-blue-600 px-2"
                            type="button"
                            onClick={() => { toggleTableRow(servicePoint.id) }}
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
                {servicePoint.id === selectedRow && (
                    <>
                        <tr className='bg-gray-50 second-table-head-row'>
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
                        </tr>
                    </>
                )}
                <tr >
                    <td className='row-line' colSpan={8} style={{ height: "2px", backgroundColor: "#ececec" }}></td>
                </tr>
            </Fragment>
        )
    };
    const deleteServicePointInfo = async (event: React.MouseEvent<HTMLAnchorElement>) => {
        const servicePointIdAttr = event.currentTarget.getAttribute('data-service-point-id');
        const servicePointId = servicePointIdAttr ? parseInt(servicePointIdAttr) : NaN;

        try {
            await axios.post(
                process.env.DELETE_STATION_URL || '', ({
                    'id': servicePointId
                }))
                .then((response) => response.data)
                .then(response => console.log(response))
                .catch((error) => console.log(error));
        } catch (error) {
            console.error(error);
        }
    };
    const getCity = (rid: number) => {
        return (CITIES[rid?.toString()] || '');
    };
    const getDistricts = (districtCode: number) => {
        return (DISTRICTS[districtCode?.toString()] || '');
    };
    const getFirstTenUsers = async () => {
        try {
            await axios.post(
                (process.env.GET_ALL_SERVICE_POINTS || ''),
                ({
                    'pageNumber': 1,
                    // TODO : Change the page size parameter to the userCountPerPage
                    'pageSize': 10
                })
            )
                .then((response) => response.data)
                .then(response => {
                    setServicePoints(response.data);
                    dispatch(toggleLoadingVisibility(false));
                })
                .catch((error) => console.log(error));

        } catch (error) {
            console.error(error);
        }
    };
    const getUpdatedServicePointsInfo = async (event: React.MouseEvent<HTMLAnchorElement>) => {
        const servicePointIdAttr = event.currentTarget.getAttribute('data-service-point-id') || '0';
        const servicePointId = parseInt(servicePointIdAttr);

        try {
            await axios.post(
                process.env.GET_STATION_BY_ID || '', ({
                    'id': servicePointId
                }))
                .then((response) => response.data)
                .then(response => {
                    dispatch(toggleModalVisibility(isModalVisible));
                    dispatch(setServicePointData(response.data[0]));
                })
                .catch((error) => console.log(error));

            await axios.post(
                process.env.GET_STATION_INFO_BY_ID || '', ({
                    'stationId': servicePointId
                }))
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

    useEffect(() => {
        getFirstTenUsers();
    }, []);

    return (
        <tbody className={`${BRAND_PREFIX}-table-body bg-white divide-y divide-gray-200 text-black`}>
            {
                servicePoints &&
                servicePoints.map((servicePoint) => {
                    return (
                        createTableRow({ servicePoint })
                    );
                })
            }
        </tbody>
    );
};

export default TableBody;
