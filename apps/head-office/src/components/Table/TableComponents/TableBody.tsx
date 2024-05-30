import React from 'react';
import TableRow from './TableRow';
import { BRAND_PREFIX } from '../../../constants/constants';
import type { IServicePointInfoProps, ITableBodyProps, IUserDataProps } from '../types';

const TableBody: React.FC<ITableBodyProps> = ({ attributeName, tableData, tableDataCount }: ITableBodyProps) => {
    const fullTableData = [...tableData || []];

    while (fullTableData.length < 10) {
        fullTableData.push({} as IServicePointInfoProps | IUserDataProps);
    };

    return (
        <tbody className={`${BRAND_PREFIX}-table-body bg-white divide-y divide-gray-200 text-black`}>
            {
                tableDataCount > 0 && (
                    fullTableData.map((tableRowData, index) => (
                        <TableRow
                            attributeName={attributeName}
                            tableRowData={tableRowData}
                            index={index}
                            // @ts-expect-error TODO: fix this
                            key={tableRowData?.id || index + 1}
                        />
                    ))
                )
            }
        </tbody>
    );
};

export default TableBody;
