import React from 'react';
import Link from 'next/link';
import { FaCircleInfo } from 'react-icons/fa6';
import { ITableRowDetailProps } from '../types';

const TableRowDetail: React.FC<ITableRowDetailProps> = ({ tableCellData }: ITableRowDetailProps) => {
    return (
        tableCellData.address && tableCellData.districtId && tableCellData.cityId && tableCellData.phone && (
            < Link className='px-4' href={`/service-points/service-point/${tableCellData.id}`
            }>
                <FaCircleInfo className={`text-blue-700`} />
            </Link >
        )
    );
};

export default TableRowDetail;
