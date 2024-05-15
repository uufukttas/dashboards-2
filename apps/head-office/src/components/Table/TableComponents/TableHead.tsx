import React from 'react';
import { BRAND_PREFIX } from '../../../constants/constants';

const TableHead: React.FC<{tableHeadData: string[]}> = ({ tableHeadData }: { tableHeadData: string[] }) => {
    const tableHeadPrefix = `${BRAND_PREFIX}-table-head`

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
