import React from 'react';
import { BRAND_PREFIX } from '../../constants/constants';

const TableHead = () => {
    return (
        <thead className={`${BRAND_PREFIX}-service-points-table-head text-xs text-gray-700 uppercase bg-gray-50`}>
            <tr>
                <th scope="col" className="px-6 py-3">
                    Lokasyon
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
                <th scope="col" className="px-6 py-3 flex justify-center">
                    Aksiyonlar
                </th>
            </tr>
        </thead>
    );
};

export default TableHead;
