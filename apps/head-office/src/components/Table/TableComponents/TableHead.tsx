import React from 'react';
import { BRAND_PREFIX } from '../../../constants/constants';

const TableHead = () => {
    return (
        <thead className={`${BRAND_PREFIX}-service-points-table-head text-xs text-gray-700 uppercase bg-gray-50`}>
            <tr>
                <th scope="col" className="px-6 py-3 text-center">
                    Servis Noktasi
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Telefon No
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Adres
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Il
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Ilce
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Aktif
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Aksiyonlar
                </th>
            </tr>
        </thead>
    );
};

export default TableHead;
