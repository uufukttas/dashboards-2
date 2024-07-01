import React from 'react';
import { Input } from '@projects/input';
import { BRAND_PREFIX } from '../../../constants/constants';
import type { ITableHeadProps } from '../types';

const TableHead: React.FC<ITableHeadProps> = ({ attributeName, tableHeadData }: ITableHeadProps) => {
    const tableHeadPrefix: string = `${BRAND_PREFIX}-table-head`;

    const renderFilterInputs = () => {
        return (
            <>
                <Input
                    className="border text-text text-sm rounded-lg block w-20 p-2.5 mb-4 focus:ring-primary focus:border-primary"
                    id="filter-input"
                    name="filter-input"
                    type="text"
                />
                <Input
                    className="hidden border text-text text-sm rounded-lg block w-20 p-2.5 mb-4 focus:ring-primary focus:border-primary"
                    id="filter-input"
                    name="filter-input"
                    type="text"
                />
            </>
        )
    };

    return (
        <thead className={`${tableHeadPrefix} text-xs text-gray-700 uppercase bg-gray-50`}>
            <tr>
                {
                    tableHeadData.map((tableHeadItem: string, index: number) => (
                        <th className="px-6 py-3 text-center" key={index} scope="col" >
                            {tableHeadItem}
                            {
                                attributeName === 'reports-management' && (
                                    renderFilterInputs()
                                )
                            }
                        </th>
                    ))
                }
            </tr>
        </thead>
    );
};

export default TableHead;
