import React, { Fragment } from 'react';
import { FaExclamation } from 'react-icons/fa6';
import { Tooltip } from '@projects/tooltip';
import TableActions from './TableActions';
import { BRAND_PREFIX, CITIES, DISTRICTS } from '../../../constants/constants';
import { ITableDataAttributeProps, ITableRowProps } from '../types';

const TableRow: React.FC<ITableRowProps> = ({ attributeName, tableRowData, roleStyles }: ITableRowProps) => {
    const dataAttributes: ITableDataAttributeProps = { [`data-${attributeName}-id`]: tableRowData.id || 0 };
    const convertDateFormat = (date: string): string => {
        const formattedDate = [
            ('0' + new Date(date).getDate()).slice(-2),
            ('0' + (new Date(date).getMonth() + 1)).slice(-2),
            new Date(date).getFullYear()
        ].join('.');

        return formattedDate.includes('NaN') ? '-' : formattedDate;
    };
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
        (condition: string, firstChoose: string, secondChoose: string | React.ReactNode, thirdChoose: string, fourthChoose: string): string | React.ReactNode => {
            if (condition === 'service-point') {
                return firstChoose;
            } else if (condition === 'user-management') {
                return secondChoose;
            } else if (condition === 'tariff-list') {
                return thirdChoose;
            } else if (condition === 'reports-management') {
                return fourthChoose;
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
                        {renderTableCell(attributeName, tableRowData.name || '', `${tableRowData?.name || ''} ${tableRowData?.surName || ''}`, tableRowData.name || 'Tarife Adi', tableRowData.trxNo?.toString() || '0')}
                    </div>
                </div>
            </td>
            <td className="px-4 py-2 text-center">
                {renderTableCell(attributeName, (tableRowData.phone || ''), tableRowData.userName || '', tableRowData.saleUnitPrice?.toString() || '0', tableRowData.station?.toString() || 'Deneme Istasyon')}
            </td>
            <td className="px-4 py-2 text-center">
                {renderTableCell(attributeName, tableRowData.address || '', tableRowData.phoneNumber || '', convertDateFormat(tableRowData.createDate || '') || 'Tarife Tarihi', tableRowData.unitCode?.toString() || '0')}
            </td>
            <td className="px-4 py-2 text-center">
                {
                    renderTableCell(
                        attributeName,
                        getCity(tableRowData.cityId ?? 1),
                        JSON.parse(tableRowData?.roleNames || '[]')
                            .map((role: string, index: number) => {
                                return (
                                    <Fragment key={index}>
                                        {getRolePills(role)}
                                    </Fragment>
                                );
                            }),
                        convertDateFormat(tableRowData.validityBeginDate || '') || new Date().toLocaleDateString(),
                        tableRowData.socketNo?.toString() || '0'
                    )
                }
            </td>
            <td className="px-4 py-2 text-center">
                {renderTableCell(attributeName, getDistricts(tableRowData.districtId ?? 1), tableRowData.lastLoginDate || '', convertDateFormat(tableRowData.validityEndDate || '') || '-', tableRowData.socketType?.toString() || '0')}
            </td>
            {
                attributeName === 'reports-management' && (
                    <>
                        <td className="px-4 py-2 text-center">
                            {tableRowData.startTime || '-'}
                        </td>
                        <td className="px-4 py-2 text-center">

                            {tableRowData.chargeDuration || '-'}
                        </td>
                        <td className="px-4 py-2 text-center">

                            {tableRowData.endTime || '-'}
                        </td>
                        <td className="px-4 py-2 text-center">

                            {tableRowData.unitPrice || '-'}
                        </td>
                        <td className="px-4 py-2 text-center">

                            {tableRowData.kWh || '-'}
                        </td>
                        <td className="px-4 py-2 text-center">

                            {tableRowData.batteryPercentage || '-'}
                        </td>
                        <td className="px-4 py-2 text-center">

                            {tableRowData.priceCalculationTime || '-'}
                        </td>
                        <td className="px-4 py-2 text-center">

                            {tableRowData.totalAmount || '-'}
                        </td>
                        <td className="px-4 py-2 text-center">

                            {tableRowData.totalAmountWithVAT || '-'}
                        </td>
                        <td className="px-4 py-2 text-center">

                            {tableRowData.electricityAmount || '-'}
                        </td>
                        <td className="px-4 py-2 text-center">

                            {tableRowData.servicePrice || '-'}
                        </td>
                        <td className="px-4 py-2 text-center">

                            {tableRowData.servicePointCommission || '-'}
                        </td>
                        <td className="px-4 py-2 text-center">

                            {tableRowData.resellerCommission || '-'}
                        </td>
                        <td className="px-4 py-2 text-center">

                            {tableRowData.userId || '-'}
                        </td>
                        <td className="px-4 py-2 text-center">

                            {tableRowData.bankOrderNo || '-'}
                        </td>
                        <td className="px-4 py-2 text-center">

                            {tableRowData.paidAmount || '-'}
                        </td>
                        <td className="px-4 py-2 text-center">

                            {tableRowData.preChargeAmount || '-'}
                        </td>
                        <td className="px-4 py-2 text-center">

                            {tableRowData.plate || '-'}
                        </td>
                        <td className="px-4 py-2 text-center">

                            {tableRowData.brand || '-'}
                        </td>
                        <td className="px-4 py-2 text-center">

                            {tableRowData.model || '-'}
                        </td>
                    </>
                )
            }
        </tr>
    );
};

export default TableRow;
