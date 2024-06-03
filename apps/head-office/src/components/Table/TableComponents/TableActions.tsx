import React from 'react';
import TableRowEdit from './TableRowEdit';
import TableRowDelete from './TableRowDelete';
import TableRowDetail from './TableRowDetail';
import { ITableRowProps } from '../types';

const TableActions: React.FC<ITableRowProps> = ({ attributeName, tableRowData }: ITableRowProps) => {
    return (
        <>
            <TableRowEdit attributeName={attributeName} tableCellData={tableRowData} />
            <TableRowDelete tableCellDataId={tableRowData.id} />
            <TableRowDetail tableCellData={tableRowData} />
        </>
    )
}

export default TableActions;
