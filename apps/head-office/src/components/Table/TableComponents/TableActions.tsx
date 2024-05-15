import React from 'react';
import TableRowEdit from './TableRowEdit';
import TableRowDelete from './TableRowDelete';
import TableRowDetail from './TableRowDetail';
import { ITableActionsProps } from '../types';

const TableActions = ({ tableCellData }: ITableActionsProps) => {
    return (
        <>
            <TableRowEdit tableCellDataId={tableCellData.id} />
            <TableRowDelete tableCellDataId={tableCellData.id} />
            <TableRowDetail tableCellData={tableCellData} />
        </>
    )
}

export default TableActions;
