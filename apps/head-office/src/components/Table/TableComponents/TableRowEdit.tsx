import React from 'react';
import { FaPen } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { getServicePointDataRequest, getServicePointInformationRequest } from '../../../../app/api/servicePoints';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { setServicePointData } from '../../../../app/redux/features/servicePointData';
import { setServicePointInformation } from '../../../../app/redux/features/servicePointInformation';

const TableRowEdit: React.FC<{ tableCellDataId: number }> = ({ tableCellDataId }: { tableCellDataId: number }) => {
    const dispatch = useDispatch();

    const getUpdatedServicePointInfo = async (event: React.MouseEvent<HTMLAnchorElement>) => {
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

    return (
        <a className="font-medium text-blue-600 cursor-pointer px-4" 
            data-service-point-id={tableCellDataId || 0} onClick={(event) => getUpdatedServicePointInfo(event)}>
            <FaPen className='text-primary' />
        </a>
    )
};

export default TableRowEdit;
