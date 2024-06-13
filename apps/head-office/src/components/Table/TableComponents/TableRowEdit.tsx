import React from 'react';
import { FaPen } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { getServicePointDataRequest, getServicePointInformationRequest } from '../../../../app/api/servicePoints';
import { getUserRequest } from '../../../../app/api/userManagements';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { setServicePointData } from '../../../../app/redux/features/servicePointData';
import { setServicePointInformation } from '../../../../app/redux/features/servicePointInformation';
import { setUserData } from '../../../../app/redux/features/userData';
import { ITableDataAttributeProps, ITableRowEditProps } from '../types';

const TableRowEdit: React.FC<ITableRowEditProps> = ({ attributeName, tableCellData }: ITableRowEditProps) => {
    const dataAttributes: ITableDataAttributeProps = { [`data-${attributeName}-id`]: tableCellData.id };
    const isComponentVisible: boolean = tableCellData.id > 0 && attributeName !== 'tariff-list';
    const dispatch = useDispatch();

    const getUpdatedServicePointInfo = async (event: React.MouseEvent<HTMLAnchorElement>): Promise<void> => {
        const servicePointId: number = Number(event.currentTarget.getAttribute('data-service-point-id') || '0');
        const servicePointData = await getServicePointDataRequest(servicePointId);
        const servicePointInformation = await getServicePointInformationRequest(servicePointId);

        dispatch(setServicePointData(servicePointData.data[0] || {}));
        dispatch(setServicePointInformation(servicePointInformation.data[0] || {}));
        dispatch(toggleModalVisibility(true));
    };
    const getUpdatedUserInfo = async (event: React.MouseEvent<HTMLAnchorElement>): Promise<void> => {
        const userId = Number(event.currentTarget.getAttribute('data-user-management-id') || '0');
        const userData = await getUserRequest(userId);

        dispatch(setUserData(userData));
        dispatch(toggleModalVisibility(true));
    };

    return (
        isComponentVisible && (
            <a className="font-medium text-blue-600 cursor-pointer px-4 hover:scale-125 transition-transform duration-300 ease-in-out"
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
