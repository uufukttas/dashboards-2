import React from 'react';
import Link from 'next/link';
import { FaCircleInfo } from 'react-icons/fa6';
import { IServicePointInfoProps, IUserDataProps } from '../types';

const TableRowDetail: React.FC<{ tableCellData: IServicePointInfoProps | IUserDataProps }> = ({ tableCellData }) => {
    return (
        tableCellData.address && tableCellData.districtId && tableCellData.cityId && tableCellData.phone && (
            <Link className='px-4' href={`/service-points/service-point/${tableCellData.id}`}>
                <FaCircleInfo className={`text-blue-700`} />
            </Link>
        )
    );
};

export default TableRowDetail;
