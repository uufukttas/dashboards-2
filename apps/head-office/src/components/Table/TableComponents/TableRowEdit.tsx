import React from 'react';
import { FaPen } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { getServicePointDataRequest, getServicePointInformationRequest } from '../../../../app/api/servicePoints';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { setServicePointData } from '../../../../app/redux/features/servicePointData';
import { setServicePointInformation } from '../../../../app/redux/features/servicePointInformation';
import { ITableDataAttributeProps, ITableRowEditProps } from '../types';

const TableRowEdit: React.FC<ITableRowEditProps> = ({ attributeName, tableCellData }: ITableRowEditProps) => {
    const dataAttributes: ITableDataAttributeProps = {
        [`data-${attributeName}-id`]: tableCellData?.id || tableCellData.userId,
    };
    const isComponentVisible: boolean = typeof (tableCellData.id || tableCellData.userId) === 'number';
    const dispatch = useDispatch();

    const getUpdatedServicePointInfo = async (event: React.MouseEvent<HTMLAnchorElement>): Promise<void> => {
        const servicePointId = Number(event.currentTarget.getAttribute('data-service-point-id') || '0');

        try {
            const servicePointData = await getServicePointDataRequest(servicePointId);
            const servicePointInformation = await getServicePointInformationRequest(servicePointId);

            dispatch(setServicePointData(servicePointData.data[0] || {}));
            dispatch(setServicePointInformation(servicePointInformation.data[0] || {}));
            dispatch(toggleModalVisibility(true));
        } catch (error) {
            console.error(error);
        };
    };
    const getUpdatedUserInfo = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        const userId = Number(event.currentTarget.getAttribute('data-user-management-id') || '0');

        console.log('userId', userId)
        dispatch(toggleModalVisibility(true));
    };

    return (
        isComponentVisible && (
            <a className="font-medium text-blue-600 cursor-pointer px-4"
                {...dataAttributes}
                onClick={(event) => {
                    attributeName.indexOf('service-point') > -1
                        ? getUpdatedServicePointInfo(event)
                        : getUpdatedUserInfo(event)
                }}
            >
                <FaPen className='text-primary' />
            </a>
        )
    );
};

export default TableRowEdit;
