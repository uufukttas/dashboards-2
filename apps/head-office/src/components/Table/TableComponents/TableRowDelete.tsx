import React from 'react';
import { FaTrashCan } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { showDialog } from '../../../../app/redux/features/dialogInformation';

const TableRowDelete: React.FC<{ tableCellDataId: number }> = ({ tableCellDataId }: { tableCellDataId: number }) => {
    const dispatch = useDispatch();
    const deleteServicePointInfo = async (event: React.MouseEvent<HTMLAnchorElement>) => {
        dispatch(
            showDialog({
                actionType: 'delete',
                data: parseInt(event.currentTarget.getAttribute('data-service-point-id') || '0')
            })
        );
    };
    return (
        <a className="font-medium text-red-600 cursor-pointer px-4"
            data-service-point-id={tableCellDataId || 0} onClick={(event) => deleteServicePointInfo(event)}>
            <FaTrashCan />
        </a>
    );
};

export default TableRowDelete;
