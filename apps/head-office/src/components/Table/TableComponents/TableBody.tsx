import React from 'react';
import TableRow from './TableRow';
import { BRAND_PREFIX } from '../../../constants/constants';
import { ITableBodyPlaceholderProps, ITableBodyProps } from '../types';

const TableBody: React.FC<ITableBodyProps> = ({
    attributeName,
    roleStyles,
    tableData,
    tableDataCount,
    tablePlaceholderInitialValue,
}: ITableBodyProps) => {
    const fullTableData: ITableBodyPlaceholderProps[] | [] = tableData && tableData.length > 0
        ? [...tableData]
        : [];
    const placeholder: ITableBodyPlaceholderProps = tablePlaceholderInitialValue;
    const requiredRows: number = 10;
    const filledTableData: ITableBodyPlaceholderProps[] = Array.from({ length: requiredRows }, (_, index) => {
        return fullTableData[index] || placeholder
    });

    return (
        <tbody className={`${BRAND_PREFIX}-table-body bg-white divide-y divide-gray-200 text-black`}>
            {
                tableDataCount > 0 && filledTableData.map((tableRowData, index) => (
                    <TableRow
                        attributeName={attributeName}
                        tableRowData={tableRowData}
                        key={tableRowData.id || index}
                        roleStyles={roleStyles}
                    />
                ))
            }
        </tbody>
    );
};

export default TableBody;
