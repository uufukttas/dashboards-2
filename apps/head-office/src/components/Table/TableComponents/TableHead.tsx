import React from 'react';
import { BRAND_PREFIX } from '../../../constants/constants';

const TableHead: React.FC = () => {
    return (
        <thead className={`${BRAND_PREFIX}-service-points-table-head text-xs text-gray-700 uppercase bg-gray-50`}>
            <tr>
                <th scope="col" className="px-6 py-3 text-center">
                    Servis Noktasi
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Telefon
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
                    Islemler
                </th>
            </tr>
        </thead>
    );
};

export default TableHead;
