import React from 'react';
import { FaTrashCan } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { showDialog } from '../../../../app/redux/features/dialogInformation';
import { ITableDataAttributeProps, ITableRowDeleteProps } from '../types';

const TableRowDelete: React.FC<ITableRowDeleteProps> = ({ attributeName, tableCellDataId }: ITableRowDeleteProps) => {
    const isComponentVisible: boolean = tableCellDataId > 0;
    const dataAttributes: ITableDataAttributeProps = { [`data-${attributeName}-id`]: tableCellDataId };
    const dispatch = useDispatch();
    const deleteServicePointInfo = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        dispatch(
            showDialog({
                actionType: 'delete',
                data: parseInt(event.currentTarget.getAttribute('data-service-point-id') || '0')
            })
        );
    };
    const deleteTariffRequest = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        dispatch(
            showDialog({
                actionType: 'delete',
                data: parseInt(event.currentTarget.getAttribute('data-tariff-list-id') || '0')
            })
        );
    };
    const deleteUserRequest = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        dispatch(
            showDialog({
                actionType: 'delete',
                data: parseInt(event.currentTarget.getAttribute('data-user-management-id') || '0')
            })
        );
    };

    return (
        isComponentVisible && (
            <a
                className="font-medium text-red-600 cursor-pointer px-4 hover:scale-125 transition-transform duration-300 ease-in-out"
                onClick={(event) => {
                    if (attributeName === 'service-point') {
                        deleteServicePointInfo(event)
                    } else if (attributeName === 'user-management') {
                        deleteUserRequest(event)
                    } else if (attributeName === 'tariff-list') {
                        deleteTariffRequest(event)
                    }
                }}
                {...dataAttributes}
            >
                <FaTrashCan />
            </a>
        )
    );
};

export default TableRowDelete;
