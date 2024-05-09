import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { BRAND_PREFIX } from '../../../constants/constants';
import { setServicePoints } from '../../../../app/redux/features/servicePoints';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';

const TableActions: React.FC = () => {
    const [searchedText, setSearchedText] = useState<string>('');

    const dispatch = useDispatch();

    const getSearchedData = async () => {
        try {
            await axios
                .post(
                    process.env.GET_ALL_SERVICE_POINTS || '',
                    ({
                        'pageNumber': 1,
                        'userCount': 10,
                        'name': searchedText,
                    })
                )
                .then((response) => response.data)
                .then((response) => dispatch(setServicePoints(response.data)))
                .catch((error) => console.log(error));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={`${BRAND_PREFIX}-service-points-table-actions-container flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 w-full md:flex-row border-t border-gray-300 bg-transparent`}>
            <Label className="sr-only" htmlFor="table-search" labelText={`Search`} />
            <div className={`${BRAND_PREFIX}-service-point-search-input-container flex relative w-full mx-2 md:w-1/2 lg:w-1/4`}>
                <div className={`${BRAND_PREFIX}-service-point-search-icon-container absolute inset-y-0 flex items-center pl-5 pointer-events-none justify-end `}>
                    <FaMagnifyingGlass />
                </div>
                <Input
                    className={`${BRAND_PREFIX}-service-point-search-input w-full block p-2 md:mx-2 pl-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-yellow-500 focus:border-yellow-300`}
                    id="table-search-input"
                    name="search"
                    placeholder="Search"
                    type="text"
                    value={searchedText}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchedText(event.target.value)}
                />
                <Button
                    className={`${BRAND_PREFIX}-service-point-search-button right-0 top-0 h-full bg-primary rounded-md font-semibold hover:bg-primary-lighter px-2 py-2`}
                    id={`${BRAND_PREFIX}-service-point-search-button`}
                    type="button"
                    onClick={getSearchedData}
                    buttonText="Ara"
                />
            </div>
            <div className={`${BRAND_PREFIX}-add-service-point-button-container w-full mx-2 md:w-1/2 lg:w-1/4 lg:mx-4`}>
                <Button
                    className={`${BRAND_PREFIX}-add-service-point-button w-full bg-primary rounded-md font-semibold hover:bg-primary-lighter px-2 py-2`}
                    id={`${BRAND_PREFIX}-add-service-point-button`}
                    type="button"
                    onClick={() => dispatch(toggleModalVisibility())}
                >
                    + Servis Noktasi
                </Button>
            </div>
        </div>
    );
};

export default TableActions;
