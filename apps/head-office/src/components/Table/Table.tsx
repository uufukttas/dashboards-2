import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "@projects/button";
import { PenIcon, TrashIcon } from '@projects/icons';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { setUpdatedServicePointData } from '../../../app/redux/features/updatedServicePointData';
import { setUpdatedServicePointInfoData } from '../../../app/redux/features/updatedServicePointInfoData';
import { RootState } from '../../../app/redux/store';
import { CITIES, DISTRICTS } from '../../constants/city_districts';
import './Table.css';

interface IServicePointInfoProps {
  servicePoint: {
    id: number;
    name: string;
    type?: string | null | undefined;
    longitude: number;
    latitude: number;
    phone?: string | null | undefined;
    address?: string | null | undefined;
    cityId: number;
    districtId: number;
    opportunities?: string[] | null | undefined;
    freePark?: string | null | undefined;
    paymentMethods?: string[] | null | undefined;
  };
};

interface IServicePointProps {
  id: number;
  name: string;
  address: string;
  phone: string;
  cityId: number;
  districtId: number;
  longtitude: number;
  latitude: number;
  isActive: boolean;
}

export function Table() {
  const isModalVisible = useSelector((state: RootState) => state.isModalVisible);
  const [servicePoints, setServicePoints] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const [selectedRow, setSelectedRow] = useState(0);
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent) => {
    dispatch(toggleModalVisibility(isModalVisible))
  };
  const toggleTableRow = (id: number) => {
    setIsHidden(!isHidden);

    if (selectedRow !== id) {
      setSelectedRow(id);
      return;
    }

    if (!isHidden) {
      setSelectedRow(0);
      return;
    }

    setSelectedRow(id);
  };
  const getUpdatedServicePointsInfo = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    const servicePointIdAttr = event.currentTarget.getAttribute('data-service-point-id');
    const servicePointId = servicePointIdAttr ? parseInt(servicePointIdAttr) : NaN;

    try {
      await axios.post(
        process.env.GET_STATION_BY_ID || '', ({
          "id": servicePointId
        }))
        .then((response) => response.data)
        .then(response => {
          dispatch(toggleModalVisibility(isModalVisible));
          dispatch(setUpdatedServicePointData(response.data[0]));
        })
        .catch((error) => {
          console.log(error);
        });

      await axios.post(
        process.env.GET_STATION_INFO_BY_ID || '', ({
          "stationId": servicePointId
        }))
        .then((response) => response.data)
        .then(response => {
          dispatch(setUpdatedServicePointInfoData(response.data[0]));
        })
        .catch((error) => {
          console.log(error);
        });

    } catch (error) {
      console.error(error);
    }
  };
  const getFirstTenUsers = async () => {
    try {
      await axios.post(
        (process.env.GET_ALL_SERVICE_POINTS || ''),
        ({
          "pageNumber": 45,
          "pageSize": 10
        })
      )
        .then((response) => response.data)
        .then(response => {
          const filteredArr = response.data.filter((servicePoint: IServicePointProps) => servicePoint.isActive);
          setServicePoints(filteredArr);
        })
        .catch((error) => {
          console.log(error);
        });

    } catch (error) {
      console.error(error);
    }
  };
  const getCity = (rid: number) => {
    return CITIES[rid?.toString()];
  };
  const getDistricts = (districtCode: number) => {
    return DISTRICTS[districtCode?.toString()];
  };
  const deleteServicePointInfo = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    const servicePointIdAttr = event.currentTarget.getAttribute('data-service-point-id');
    const servicePointId = servicePointIdAttr ? parseInt(servicePointIdAttr) : NaN;

    try {
      await axios.post(
        process.env.DELETE_STATION_URL || '', ({
          "id": servicePointId
        }))
        .then((response) => response.data)
        .then(response => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

    } catch (error) {
      console.error(error);
    }
  }

  const createTableRow = ({ servicePoint }: IServicePointInfoProps) => {
    return (
      <Fragment key={servicePoint.id}>
        <tr data-service-point-id={servicePoint.id}>
          <td className='px-6 py-3'>{servicePoint.name}</td>
          <td className='px-6 py-3'>{servicePoint.type}</td>
          <td className='px-6 py-3'>{servicePoint.phone}</td>
          <td className='px-6 py-3'>{servicePoint.address}</td>
          <td className='px-6 py-3'>{getCity((servicePoint.cityId))}</td>
          <td className='px-6 py-3'>{getDistricts(servicePoint.districtId)}</td>
          <td className="px-6 py-4 items-center flex">
            <a data-modal-show="editUserModal" data-service-point-id={servicePoint.id} className="font-medium text-blue-600 cursor-pointer px-4" onClick={getUpdatedServicePointsInfo}>
              <PenIcon />
            </a>
            <a data-modal-show="deleteUserModal" data-service-point-id={servicePoint.id} className="font-medium text-red-600 cursor-pointer px-4" onClick={deleteServicePointInfo}>
              <TrashIcon />
            </a>
            <Button type="button" data-modal-show="editUserModal" className="font-medium text-blue-600" onClick={() => { toggleTableRow(servicePoint.id) }}>
              <div dangerouslySetInnerHTML={{ __html: `${servicePoint.id === selectedRow ? '&#11205;' : '&#11206;'}` }} />
            </Button>
          </td>
        </tr>
        {servicePoint.id === selectedRow && (
          <>
            <tr className='bg-gray-50'>
              <th className='px-6'>Longitude</th>
              <th className='px-6'>Latitude</th>
              <th className='px-6'>Payment Methods</th>
              <th className='px-6'>Free Park</th>
              <th className='px-6'>Opportunuties</th>
              <th className='px-6'> </th>
              <th className='px-6'> </th>
            </tr>
            <tr>
              <td className='px-6 py-3'>{servicePoint.longitude}</td>
              <td className='px-6 py-3'>{servicePoint.latitude}</td>
            </tr>
          </>
        )}
        <tr>
          <td colSpan={8} style={{ height: "2px", backgroundColor: "#ececec" }}></td>
        </tr>
      </Fragment>
    )
  };

  useEffect(() => {
    if (servicePoints.length === 0) {
      getFirstTenUsers();
    }
  }, [selectedRow]);

  return (
    servicePoints?.length > 0 &&
    <div className="sh-table-container relative overflow-x-auto shadow-md sm:rounded-lg max-w-[330px] md:max-w-full w-full">
      <div className="sh-table-wrapper flex flex-col items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white w-full md:flex-row">
        <div className="sh-table-actions w-4/5 md:w-1/6">
          <Button className={`sh-add-service-point-button-container w-full`} type="button" onClick={handleClick}>+ Hizmet Noktasi</Button>
        </div>
        <Label className="sr-only" htmlFor="table-search" labelText={`Search`} />
        <div className="sh-service-point-search-input-container relative w-4/5 md:w-1/6 mx-2">
          <div className="sh-service-point-search-icon-container absolute inset-y-0 flex items-center ps-3 pointer-events-none pl-3 pr-2 justify-end border-r">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <Input className="sh-service-point-search-input w-full block p-2 md:mx-2 pl-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" id="table-search-input" name="search" placeholder="Search users" type="text" />
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 shadow-custom">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Servis Noktasi
            </th>
            <th scope="col" className="px-6 py-3">
              Tip
            </th>
            <th scope="col" className="px-6 py-3">
              Telefon No
            </th>
            <th scope="col" className="px-6 py-3">
              Adres
            </th>
            <th scope="col" className="px-6 py-3">
              Il
            </th>
            <th scope="col" className="px-6 py-3">
              Ilce
            </th>
            <th scope="col" className="px-6 py-3">
              Aksiyonlar
            </th>
          </tr>
        </thead>
        <tbody>
          {
            servicePoints &&
            servicePoints.map((servicePoint) => {
              return (
                createTableRow({ servicePoint })
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default Table;
