import React from 'react';
import TableRow from './TableRow';
import { BRAND_PREFIX } from '../../../constants/constants';
import { ITableBodyPlaceholderProps, ITableBodyProps } from '../types';

const TableBody = ({ attributeName, tableData, tableDataCount }: ITableBodyProps) => {
    const fullTableData: ITableBodyPlaceholderProps[] | [] = tableData && tableData.length > 0
        ? [...tableData]
        : [];
    const placeholder: ITableBodyPlaceholderProps = {
        address: '',
        cityId: 0,
        districtId: 0,
        name: '',
        phone: '',
    };
    const requiredRows: number = 10;
    const filledTableData: ITableBodyPlaceholderProps[] = Array.from(
        { length: requiredRows },
        (_, index) => fullTableData[index] || placeholder
    );

    return (
        <tbody className={`${BRAND_PREFIX}-table-body bg-white divide-y divide-gray-200 text-black`}>
            {
                tableDataCount > 0 && filledTableData.map((tableRowData, index) => (
                    <TableRow
                        attributeName={attributeName}
                        tableRowData={tableRowData}
                        index={index}
                        key={tableRowData?.id || index + 1}
                    />
                ))
            }
        </tbody>
    );
};

export default TableBody;
