import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button } from "@projects/button";
import { Input } from '@projects/input';
import { RootState } from '../../../app/redux/store';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { setUpdatedServicePoint } from '../../../app/redux/features/selectedServicePoint'
import { CITIES, DISTRICTS } from '../../constants/city_districts';
import './Table.css';

interface IUserProps {
  user: {
    id: number;
    name: string;
    type: string;
    longitude: number;
    latitude: number;
    phone: string;
    address: string;
    city: number;
    district: number;
    opportunities: string;
    freePark: string;
    paymentMethods: string
  }
};

export function Table() {
  const dispatch = useDispatch();
  const isModalVisible = useSelector((state: RootState) => state.isModalVisible);
  const [users, setUsers] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const [selectedRow, setSelectedRow] = useState(0);

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
  const getUpdatedUserInfo = async (event: React.MouseEvent) => {
    const userIdAttr = (event.target as HTMLElement)?.getAttribute('data-user-id');
    const userId = userIdAttr ? parseInt(userIdAttr) : NaN;

    try {
      await axios.post('https://testapideneme.azurewebsites.net/ServicePoint/GetById', ({
        "id": userId
      }))
        .then((response) => response.data)
        .then(response => {
          dispatch(setUpdatedServicePoint(response.data));
          dispatch(toggleModalVisibility(isModalVisible))
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
          "pageNumber": 4,
          "pageSize": 10
        })
      )
        .then((response) => response.data)
        .then(response => {
          setUsers(response.data)
          console.log('response.data', response.data)
        })
        .catch((error) => {
          console.log(error);
        });

    } catch (error) {
      console.error(error);
    }
  };
  const getCity = (rid: number) => {
    return CITIES[rid.toString()];
  };
  const getDistricts = (districtCode: number) => {
    return DISTRICTS[districtCode.toString()];
  };
  // const getPaymentmethods = (paymentMethods: string) => {
  //   const parsedPaymentMethods = JSON.parse(paymentMethods || '[]');

  //   return parsedPaymentMethods.length > 1
  //     ? (
  //       <>
  //         {parsedPaymentMethods.map((paymentMethod: string, index: number) => {
  //           return (
  //             <div key={index}>{paymentMethod}</div>
  //           )
  //         })}
  //       </>
  //     )
  //     : (parsedPaymentMethods).toString();
  // };
  // const getOpportunuties = (opportunuties: string) => {
  //   const parsedOpportunities = JSON.parse(opportunuties);

  //   return parsedOpportunities.length > 1
  //     ? (
  //       <>
  //         {parsedOpportunities.map((opportunity: string, index: number) => {
  //           return (
  //             <div key={index}>{opportunity}</div>
  //           )
  //         })}
  //       </>
  //     )
  //     : String(parsedOpportunities);
  // };

  const createTableRow = ({ user }: IUserProps) => {
    return (
      <Fragment key={user.id}>
        <tr data-user-id={user.id}>
          <td className='px-6 py-3'>{user.name}</td>
          <td className='px-6 py-3'>{user.type}</td>
          <td className='px-6 py-3'>{user.phone}</td>
          <td className='px-6 py-3'>{user.address}</td>
          <td className='px-6 py-3'>{getCity((user.city))}</td>
          <td className='px-6 py-3'>{getDistricts(user.district)}</td>
          <td className="px-6 py-4 items-center ">
            <a data-modal-show="editUserModal" data-user-id={user.id} className="font-medium text-blue-600 cursor-pointer px-4" onClick={getUpdatedUserInfo}>Edit user</a>
            <Button type="button" data-modal-show="editUserModal" className="font-medium text-blue-600" onClick={() => { toggleTableRow(user.id) }}>
              <div dangerouslySetInnerHTML={{ __html: `${user.id === selectedRow ? '&#11205;' : '&#11206;'}` }} />
            </Button>
          </td>
        </tr>
        {user.id === selectedRow && (
          <>
            <tr className='text-xs text-gray-700 uppercase bg-gray-50'>
              <th className='px-6'>Longitude</th>
              <th className='px-6'>Latitude</th>
              <th className='px-6'>Payment Methods</th>
              <th className='px-6'>Free Park</th>
              <th className='px-6'>Opportunuties</th>
              <th className='px-6'> </th>
              <th className='px-6'> </th>
            </tr>
            <tr>
              <td className='px-6 py-3'>{user.longitude}</td>
              <td className='px-6 py-3'>{user.latitude}</td>
              {/* <td className='px-6 py-3'>{getPaymentmethods(user.paymentMethods)}</td> */}
              {/* <td className='px-6 py-3'>{user.freePark ? 'Yes' : 'No'}</td> */}
              {/* <td className='px-6 py-3'>{getOpportunuties(user.opportunities)}</td> */}
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
    if (users.length === 0) {
      getFirstTenUsers();
    }

  }, [selectedRow]);

  return (
    users?.length > 0 &&
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
      <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white w-full">
        <div className="sh-table-actions">
          <Button type="button" onClick={handleClick}>+ Hizmet Noktasi</Button>
        </div>
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 flex items-center ps-3 pointer-events-none px-2 justify-end border-r">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <Input name="search" type="text" id="table-search" className="block p-2 pl-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-40 md:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search users" />

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
            users &&
            users.map((user: { id: number, name: string, type: string, longitude: number, latitude: number, phone: string, address: string, city: number, district: number, paymentMethods: string, freePark: string, opportunities: string }) => {
              return (
                createTableRow({ user })
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
