import React from 'react';
import { FaTrashCan } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { showDialog } from '../../../../app/redux/features/dialogInformation';
import { ITableRowDeleteProps } from '../types';

const TableRowDelete: React.FC<ITableRowDeleteProps> = ({ tableCellDataId }: ITableRowDeleteProps) => {
    const isComponentVisible: boolean = typeof tableCellDataId === 'number';
    const dispatch = useDispatch();
    const deleteServicePointInfo = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        dispatch(
            showDialog({
                actionType: 'delete',
                data: parseInt(event.currentTarget.getAttribute('data-service-point-id') || '0')
            })
        );
    };

    return (
        isComponentVisible && (
            <a className="font-medium text-red-600 cursor-pointer px-4"
                data-service-point-id={tableCellDataId || 0} onClick={(event) => deleteServicePointInfo(event)}>
                <FaTrashCan />
            </a>
        )
    );
};

export default TableRowDelete;
