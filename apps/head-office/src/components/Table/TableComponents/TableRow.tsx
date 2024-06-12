import React, { Fragment } from 'react';
import { FaExclamation } from 'react-icons/fa6';
import { Tooltip } from '@projects/tooltip';
import TableActions from './TableActions';
import { BRAND_PREFIX, CITIES, DISTRICTS } from '../../../constants/constants';
import { ITableDataAttributeProps, ITableRowProps } from '../types';

const TableRow: React.FC<ITableRowProps> = ({ attributeName, tableRowData, roleStyles }: ITableRowProps) => {
    const dataAttributes: ITableDataAttributeProps = { [`data-${attributeName}-id`]: tableRowData.id || 0 };
    const getCity = (rid: number): string => (CITIES[rid?.toString()] || '');
    const getDistricts = (districtCode: number): string => (DISTRICTS[districtCode?.toString()] || '');
    const getRolePills = (role: string, index?: number): React.ReactNode => {
        const { backgroundColor, borderColor, textColor } = roleStyles[role] || roleStyles.Default;

        return (
            <div
                className={`border rounded text-bold px-2 mx-2 my-2 w-[100px] ${backgroundColor} ${textColor} ${borderColor}`}
                key={index}
            >
                {role}
            </div>
        );
    };

    const renderTableCell =
        (condition: string, firstChoose: string, secondChoose: string | React.ReactNode): string | React.ReactNode => {
            if (condition === 'service-point') {
                return firstChoose;
            } else {
                return secondChoose;
            }
        };

    return (
        <tr className='h-[10%]' key={tableRowData.id} {...dataAttributes}>
            <td className="px-4 py-2 text-center">
                <div className={`${BRAND_PREFIX}-table-body-item-information-container h-full flex items-center`}>
                    {
                        attributeName === 'service-point' && tableRowData.name && (
                            <div className={`${BRAND_PREFIX}-table-body-item-status text-red-500 text-2xl`}>
                                <Tooltip text="Istasyonda problem var!">
                                    <FaExclamation />
                                </Tooltip>
                            </div>
                        )
                    }
                    <div className={`${BRAND_PREFIX}-item-information-name px-6`}>
                        {`${`${tableRowData?.name || ''} ${tableRowData?.surName || ''}` || ''}`}
                    </div>
                </div>
            </td>
            <td className="px-4 py-2 text-center">{
                renderTableCell(attributeName, (tableRowData.phone || ''), tableRowData.userName || '')
            }
            </td>
            <td className="px-4 py-2 text-center">
                {
                    renderTableCell(attributeName, tableRowData.address || '', tableRowData.phoneNumber || '')
                }
            </td>
            <td className="px-4 py-2 text-center">
                {
                    renderTableCell(
                        attributeName,
                        getCity(tableRowData.cityId ?? 1), JSON.parse(tableRowData?.roleNames || '[]')
                            .map((role: string, index: number) => {
                                return (
                                    <Fragment key={index}>
                                        {getRolePills(role)}
                                    </Fragment>
                                );
                            })
                    )
                }
            </td>
            <td className="px-4 py-2 text-center">
                {
                    renderTableCell(attributeName, getDistricts(tableRowData.districtId ?? 1), tableRowData.lastLoginDate || '')
                }
            </td>
            <td className="px-4 py-4 text-center">
                <div className="flex justify-center text-2xl">
                    <TableActions attributeName={attributeName} tableRowData={tableRowData} />
                </div>
            </td>
        </tr>
    );
};

export default TableRow;
