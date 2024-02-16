import { useDispatch, useSelector } from 'react-redux';
import { Button } from "@projects/button";
import { RootState } from '../../../app/redux/store';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './Table.css'
import { setUpdatedServicePoint } from '../../../app/redux/features/selectedServicePoint'

export interface TableProps { }

export function Table(props: TableProps) {
  const isModalVisible = useSelector((state: RootState) => state.isModalVisible);
  const updatedServicePoint = useSelector((state: RootState) => state.updatedServicePointReducer.updatedServicePoint);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([])

  const handleClick = (e: React.MouseEvent) => {
    dispatch(toggleModalVisibility(isModalVisible))
  }
  const [isHidden, setIsHidden] = useState(true);
  const toggleTableRow = () => {
    setIsHidden(!isHidden);
  }


  const getUpdatedUserInfo = async (event: React.MouseEvent) => {
    const userIdAttr = (event.target as HTMLElement)?.getAttribute('data-user-id');
    const userId = userIdAttr ? parseInt(userIdAttr) : NaN;

    try {
      await axios.post('https://testapideneme.azurewebsites.net/ServicePoint/GetById', ({
        "id": userId
      })).then((response) => response.data).then(response => dispatch(setUpdatedServicePoint(response.data))).catch((error) => {
        console.log(error);
      });

    } catch (error) {
      console.error(error);
    }

    typeof updatedServicePoint?.id !== 'undefined' && dispatch(toggleModalVisibility(isModalVisible));
  }

  const getFirstTenUsers = async () => {
    try {
      await axios.post('https://testapideneme.azurewebsites.net/ServicePoint/GetAllPoints', ({
        "pageNumber": 2,
        "pageSize": 10
      })).then((response) => response.data).then(response => setUsers(response.data)).catch((error) => {
        console.log(error);
      });

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFirstTenUsers();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
      <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white w-full">
        <div className="sh-table-actions">
          <Button type="button" onClick={handleClick}>+ Hizmet Noktasi</Button>
        </div>
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="text" id="table-search-users" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search htmlFor users" />
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 shadow-custom">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Position
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
            <th scope="col" className="px-6 py-3">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {
            users &&
            users.map((user: { Id: number, Name: string, Title: string, Longitude: number, Latitude: number }, index: number) => {
              return (
                <>
                  <tr key={index}>
                    <td className='p-4'>
                      <div className="flex items-center">
                        <input id="checkbox-table-search-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                        <label htmlFor="checkbox-table-search-3" className="sr-only">checkbox</label>
                      </div>
                    </td>
                    <td className='px-6 py-3'>
                      <div className="flex items-center">
                        {user.Name}
                      </div>
                    </td>
                    <td className='px-6 py-3'>{user.Title}</td>
                    <td className='px-6 py-3'>{user.Longitude}</td>
                    <td className='px-6 py-3'>{user.Latitude}</td>
                    <td className="px-6 py-4">
                      <a data-modal-show="editUserModal" data-user-id={user.Id} className="font-medium text-blue-600  hover:underline" onClick={getUpdatedUserInfo}>Edit user</a>
                    </td>
                    <td className="px-6 py-4">
                      <Button type="button" data-modal-show="editUserModal" className="font-medium text-blue-600" onClick={() => { toggleTableRow() }}>&#11206;</Button>
                    </td>
                  </tr>
                  <tr key={`${index}- ${user.Id}`} className={`row ${isHidden ? 'hidden-row' : ''}`}>
                    <td className='px-6 py-3'>
                      <div className="flex items-center">
                        {user.Name}
                      </div>
                    </td>
                    <td className='px-6 py-3'>{user.Title}</td>
                    <td className='px-6 py-3'>{user.Longitude}</td>
                    <td className='px-6 py-3'>{user.Latitude}</td>
                  </tr>
                </>
              )
            })
          }
        </tbody>
      </table>
      {/* <div id="editUserModal" tabIndex={-1} aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative w-full max-w-2xl max-h-full">
        <form className="relative bg-white rounded-lg shadow ">
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">
              Edit user
            </h3>
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="editUserModal">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-900 ">First Name</label>
                <input type="text" name="first-name" id="first-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Bonnie" required />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-gray-900 ">Last Name</label>
                <input type="text" name="last-name" id="last-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Green" required />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="example@company.com" required />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="phone-number" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                <input type="number" name="phone-number" id="phone-number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="e.g. +(12)3456 789" required />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900">Department</label>
                <input type="text" name="department" id="department" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Development" required />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900">Company</label>
                <input type="number" name="company" id="company" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="123456" required />
              </div>
            </div>
          </div>
          <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b ">
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save all</button>
          </div>
        </form>
      </div>
    </div> */}
    </div>
  );
}

export default Table;
