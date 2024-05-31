import React from 'react';
import { BRAND_PREFIX } from '../../../constants/constants';
import type { ITableHeadProps } from '../types';

const TableHead: React.FC<ITableHeadProps> = ({ tableHeadData }: ITableHeadProps) => {
    const tableHeadPrefix: string = `${BRAND_PREFIX}-table-head`;

    return (
        <thead className={`${tableHeadPrefix} text-xs text-gray-700 uppercase bg-gray-50`}>
            <tr>
                {
                    tableHeadData.map((tableHeadItem: string, index: number) => (
                        <th className="px-6 py-3 text-center" key={index} scope="col" >
                            {tableHeadItem}
                        </th>
                    ))
                }
            </tr>
        </thead>
    );
};

export default TableHead;
