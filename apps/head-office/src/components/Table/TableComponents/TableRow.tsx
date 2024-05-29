import React, { Fragment } from 'react';
import { FaExclamation } from 'react-icons/fa6';
import { Tooltip } from '@projects/tooltip';
import TableActions from './TableActions';
import { BRAND_PREFIX, CITIES, DISTRICTS } from '../../../constants/constants';
import {
    IRolesStyleProps,
    IServicePointInfoProps,
    ITableDataAttributeProps,
    ITableRowProps,
    IUserDataProps
} from '../types';

const TableRow = ({ attributeName, tableRowData, index }: ITableRowProps) => {
    {/* @ts-expect-error TODO: fix this */ }
    const dataAttributes: ITableDataAttributeProps = { [`data-${attributeName}-id`]: tableRowData?.id || 0 };
    const roleStyles: IRolesStyleProps = {
        Admin: { backgroundColor: 'bg-red-300', textColor: 'text-red-800', borderColor: 'border-red-300' },
        Employee: { backgroundColor: 'bg-green-300', textColor: 'text-green-800', borderColor: 'border-green-300' },
        User: { backgroundColor: 'bg-blue-300', textColor: 'text-blue-800', borderColor: 'border-blue-300' },
        Manager: { backgroundColor: 'bg-purple-300', textColor: 'text-purple-800', borderColor: 'border-purple-300' },
        Super: { backgroundColor: 'bg-yellow-300', textColor: 'text-yellow-800', borderColor: 'border-yellow-300' },
        Default: { backgroundColor: 'bg-gray-300', textColor: 'text-gray-800', borderColor: 'border-gray-300' }
    };

    const getCity = (rid: number): string => (CITIES[rid?.toString()] || '');
    const getDistricts = (districtCode: number): string => (DISTRICTS[districtCode?.toString()] || '');
    const getRolePills = (role: string, index?: number): React.ReactNode => {
        const { backgroundColor, textColor, borderColor } = roleStyles[role] || roleStyles.Default;

        return (
            <div
                className={`border rounded text-bold px-2 mx-2 my-2 w-[100px] ${backgroundColor} ${textColor} ${borderColor}`}
                key={index}
            >
                {role}
            </div>
        );
    };
    const renderTableDataInfo = (tableCellData: IServicePointInfoProps | IUserDataProps): React.ReactNode => {
        // @ts-expect-error TODO: fix this
        return tableCellData.name
            ? (
                <>
                    {/* @ts-expect-error TODO: fix this */}
                    <td className="px-4 py-2 text-center">{tableCellData.phone || ''}</td>
                    {/* @ts-expect-error TODO: fix this */}
                    <td className="px-4 py-2 text-center">{tableCellData.address || ''}</td>
                    {/* @ts-expect-error TODO: fix this */}
                    <td className="px-4 py-2 text-center">{getCity(tableCellData.cityId ?? 0) || ''}</td>
                    {/* @ts-expect-error TODO: fix this */}
                    <td className="px-4 py-2 text-center">{getDistricts(tableCellData.districtId ?? 0) || ''}</td>
                    <td className="px-4 py-4">
                        <div className="flex justify-start text-2xl">
                            {/* @ts-expect-error TODO: fix this */}
                            <TableActions tableCellData={tableCellData} />
                        </div>
                    </td>
                </>
            ) : (
                <>
                    {/* @ts-expect-error TODO: fix this */}
                    <td className="px-4 py-2 text-center">{tableCellData.userName}</td>
                    {/* @ts-expect-error TODO: fix this */}
                    <td className="px-4 py-2 text-center">{tableCellData.phone || ''}</td>
                    <td className="px-4 py-2 text-center w-full flex flex-wrap justify-center">
                        {
                            /* @ts-expect-error TODO: fix this */
                            JSON.parse(tableCellData?.roleNames || '[]').map((role: string, index: number) => {
                                return (
                                    <Fragment key={index}>
                                        {getRolePills(role)}
                                    </Fragment>
                                )
                            })
                        }
                    </td>
                    {/* @ts-expect-error TODO: fix this */}
                    <td className="px-4 py-2 text-center">{tableCellData.lastLoginDate || 'null'}</td>
                    <td className="px-4 py-4 text-center">
                        <div className="flex justify-start text-2xl">
                            {
                                /* @ts-expect-error TODO: fix this */
                                tableCellData.roleNames && (
                                    /* @ts-expect-error TODO: fix this */
                                    <TableActions tableCellData={tableCellData} />
                                )
                            }
                        </div>
                    </td>
                </>
            );
    };

    return (
        /* @ts-expect-error TODO: fix this */
        <tr className='h-[10%]' key={tableRowData?.id || index + 1} {...dataAttributes}>
            <td className="px-4 py-2">
                {
                    /* @ts-expect-error TODO: fix this */
                    tableRowData.name
                        ? (
                            <div className={`${BRAND_PREFIX}-table-body-item-information-container h-full flex items-center`}>
                                <div className={`${BRAND_PREFIX}-table-body-item-status text-red-500 text-2xl`}>
                                    <Tooltip text="Istasyonda problem var!">
                                        <FaExclamation />
                                    </Tooltip>
                                </div>
                                <div className={`${BRAND_PREFIX}-item-information-name`}>
                                    {/* @ts-expect-error TODO: fix this */}
                                    {tableRowData.name}
                                </div>
                            </div>
                            /* @ts-expect-error TODO: fix this */
                        ) : <div className="text-center">{tableRowData.name}</div>}
            </td>
            {
                renderTableDataInfo(tableRowData)
            }
        </tr>
    );
};

export default TableRow;
