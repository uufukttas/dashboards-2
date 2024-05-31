import React from 'react';
import TableRowEdit from './TableRowEdit';
import TableRowDelete from './TableRowDelete';
import TableRowDetail from './TableRowDetail';
import { ITableBodyPlaceholderProps } from '../types';

const TableActions: React.FC<{ tableCellData: ITableBodyPlaceholderProps }> =
    ({ tableCellData }: { tableCellData: ITableBodyPlaceholderProps }) => {
        return (
            <>
                <TableRowEdit tableCellDataId={tableCellData.id} />
                <TableRowDelete tableCellDataId={tableCellData.id} />
                <TableRowDetail tableCellData={tableCellData} />
            </>
        )
    }

export default TableActions;
