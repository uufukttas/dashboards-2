import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button } from "@projects/button";
import { Input } from '@projects/input';
import { RootState } from '../../../app/redux/store';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { setUpdatedServicePoint } from '../../../app/redux/features/selectedServicePoint'
import { CITIES, DISTRICTS } from '../../constants/city_districts';
import './Table.css';

export interface TableProps { }

interface IUserProps {
  user: {
    Id: number;
    Name: string;
    Title: string;
    Longitude: number;
    Latitude: number;
    PhoneNumbers: string;
    Address: string;
    City: number;
    District: number;
    Opportunities: string;
    FreePark: string;
    PaymentMethods: string
  }
};

export function Table(props: TableProps) {
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
      await axios.post('https://testapideneme.azurewebsites.net/ServicePoint/GetAllPoints', ({
        "pageNumber": 3,
        "pageSize": 10
      })).then((response) => response.data).then(response => setUsers(response.data)).catch((error) => {
        console.log(error);
      });

    } catch (error) {
      console.error(error);
    }
  };

  const setPhoneNumbers = (phoneNumbers: string) => {
    const parsedPhoneNumbers = JSON.parse(phoneNumbers);

    return parsedPhoneNumbers.length > 1
      ? (<><div>{parsedPhoneNumbers[0]}</div><div>{parsedPhoneNumbers[1]}</div></>)
      : String(parsedPhoneNumbers);
  };

  const getCity = (plateCode: number) => {
    return CITIES[plateCode];
  };

  const getDistricts = (districtCode: number) => {
    const districtCodeString = String(districtCode);
    return DISTRICTS[districtCodeString as keyof typeof DISTRICTS];
  };

  const getPaymentmethods = (paymentMethods: string) => {
    const parsedPaymentMethods = JSON.parse(paymentMethods);

    return parsedPaymentMethods.length > 1
      ? (
        <>
          {parsedPaymentMethods.map((paymentMethod: string, index: number) => {
            return (
              <div key={index}>{paymentMethod}</div>
            )
          })}
        </>
      )
      : String(parsedPaymentMethods);
  };

  const getOpportunuties = (opportunuties: string) => {
    const parsedOpportunities = JSON.parse(opportunuties);

    return parsedOpportunities.length > 1
      ? (
        <>
          {parsedOpportunities.map((opportunity: string, index: number) => {
            return (
              <div key={index}>{opportunity}</div>
            )
          })}
        </>
      )
      : String(parsedOpportunities);
  };

  const createTableRow = ({ user }: IUserProps) => {
    return (
      <>
        <tr data-userId={user.Id}>
          <td className='px-6 py-3'>{user.Name}</td>
          <td className='px-6 py-3'>{user.Title}</td>
          <td className='px-6 py-3'>{setPhoneNumbers(user.PhoneNumbers)}</td>
          <td className='px-6 py-3'>{user.Address}</td>
          <td className='px-6 py-3'>{getCity((user.City))}</td>
          <td className='px-6 py-3'>{getDistricts(user.District)}</td>
          <td className="px-6 py-4 items-center ">
            <a data-modal-show="editUserModal" data-user-id={user.Id} className="font-medium text-blue-600 cursor-pointer px-4" onClick={getUpdatedUserInfo}>Edit user</a>
            <Button type="button" data-modal-show="editUserModal" className="font-medium text-blue-600" onClick={() => { toggleTableRow(user.Id) }}>
              <div dangerouslySetInnerHTML={{ __html: `${user.Id === selectedRow ? '&#11205;' : '&#11206;'}` }} />
            </Button>
          </td>
        </tr>
        {user.Id === selectedRow && (
          <>
            <tr className='text-xs text-gray-700 uppercase bg-gray-50'>
              <th className='px-6 py-3'>Longitude</th>
              <th className='px-6 py-3'>Latitude</th>
              <th className='px-6 py-3'>Payment Methods</th>
              <th className='px-6 py-3'>Free Park</th>
              <th className='px-6 py-3'>Opportunuties</th>
              <th className='px-6 py-3'> </th>
              <th className='px-6 py-3'> </th>
            </tr>
            <tr>
              <td className='px-6 py-3'>{user.Longitude}</td>
              <td className='px-6 py-3'>{user.Latitude}</td>
              <td className='px-6 py-3'>{getPaymentmethods(user.PaymentMethods)}</td>
              <td className='px-6 py-3'>{user.FreePark ? 'Yes' : 'No'}</td>
              <td className='px-6 py-3'>{getOpportunuties(user.Opportunities)}</td>
            </tr>
          </>
        )}
        <td colSpan={8} style={{ height: "2px", backgroundColor: "#ececec" }}></td>
      </>
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
          <Input name="search" type="text" id="table-search" className="block p-2 pl-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search users" />

        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 shadow-custom">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Position
            </th>
            <th scope="col" className="px-6 py-3">
              Phone Numbers
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Il
            </th>
            <th scope="col" className="px-6 py-3">
              Ilce
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {
            users &&
            users.map((user: { Id: number, Name: string, Title: string, Longitude: number, Latitude: number, PhoneNumbers: string, Address: string, City: number, District: number, PaymentMethods: string, FreePark: string, Opportunities: string }) => {
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
