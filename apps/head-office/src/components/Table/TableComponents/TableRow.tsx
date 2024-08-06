import React, { Fragment } from 'react';
import { FaExclamation } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from '@projects/tooltip';
import TableActions from './TableActions';
import { BRAND_PREFIX } from '../../../constants/constants';
import { getDistrictsRequest } from '../../../../app/api/servicePoints';
import { setDistricts } from '../../../../app/redux/features/setCityInformation';
import { RootState } from '../../../../app/redux/store';
import type { ITableDataAttributeProps, ITableRowProps } from '../types';

const TableRow: React.FC<ITableRowProps> = ({ attributeName, tableRowData, roleStyles }: ITableRowProps) => {
    const dataAttributes: ITableDataAttributeProps = { [`data-${attributeName}-id`]: tableRowData.id || 0 };
    const dispatch = useDispatch();
    const { cities, districts } = useSelector((state: RootState) => state.setCityInformation);

    const convertDateFormat = (date: string): string => {
        const formattedDate = [
            ('0' + new Date(date).getDate()).slice(-2),
            ('0' + (new Date(date).getMonth() + 1)).slice(-2),
            new Date(date).getFullYear()
        ].join('.');

        return formattedDate.includes('NaN') ? '-' : formattedDate;
    };
    const getCity = (rid: number): string => cities[rid - 1]?.name || '';
    // const getDistricts = (districtCode: number): string => (districts[districtCode] || '');
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
    const renderTableCell = (
        condition: string,
        firstChoose: string,
        secondChoose: string | React.ReactNode,
        thirdChoose: string, fourthChoose: string
    ): string | React.ReactNode => {
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
                        {
                            renderTableCell(
                                attributeName,
                                tableRowData.name || '',
                                `${tableRowData?.name || ''} ${tableRowData?.surName || ''}`,
                                tableRowData.name || '',
                                tableRowData.trxId?.toString() || '')
                        }
                    </div>
                </div>
            </td>
            <td className="px-4 py-2 text-center">
                {
                    renderTableCell(
                        attributeName,
                        (tableRowData.phone || ''),
                        tableRowData.userName || '',
                        tableRowData.saleUnitPrice?.toString() || '',
                        tableRowData.stationName?.toString() || '')
                }
            </td>
            <td className="px-4 py-2 text-center">
                {
                    renderTableCell(
                        attributeName,
                        tableRowData.address || '',
                        tableRowData.phoneNumber || '',
                        `${tableRowData.minKW}kW - ${tableRowData.maxKW}kW` || '',
                        tableRowData.stationChargePointCode?.toString() || '')}
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
                        convertDateFormat(tableRowData.createDate || '') || 'Tarife Tarihi',
                        tableRowData.stationConnectorConnectorNr?.toString() || ''
                    )
                }
            </td>
            <td className="px-4 py-2 text-center">
                {
                    renderTableCell(
                        attributeName,
                        // getDistricts(tableRowData.districtId ?? 1),
                        tableRowData.lastLoginDate || '',
                        convertDateFormat(tableRowData.validityBeginDate || '') || new Date().toLocaleDateString(),
                        tableRowData.stationChargePointConnectorTypeName?.toString() || '')
                }
            </td>
            {
                attributeName === 'tariff-list' && (
                    <td className="px-4 py-2 text-center">
                        {
                            renderTableCell(
                                attributeName,
                                // getDistricts(tableRowData.districtId ?? 1),
                                tableRowData.lastLoginDate || '',
                                convertDateFormat(tableRowData.validityEndDate || '') || new Date().toLocaleDateString(),
                                tableRowData.stationChargePointConnectorTypeName?.toString() || '')
                        }
                    </td>
                )
            }
            {
                attributeName === 'reports-management' && (
                    <>
                        <td className="px-4 py-2 text-center">
                            {
                                (
                                    <div className="date-time-container flex flex-col">
                                        <span>{tableRowData.startDate ? new Date(tableRowData.startDate).toLocaleDateString() : ''}</span>
                                        <span>{tableRowData.startDate ? new Date(tableRowData.startDate).toLocaleTimeString() : ''}</span>
                                    </div>
                                )
                                || '-'
                            }
                        </td>
                        <td className="px-4 py-2 text-center">
                            {tableRowData.chargeProcessElapsedTime}
                        </td>
                        <td className="px-4 py-2 text-center">
                            {
                                (
                                    <div className="date-time-container flex flex-col">
                                        <span>{tableRowData.finishDate ? new Date(tableRowData.finishDate).toLocaleDateString() : ''}</span>
                                        <span>{tableRowData.finishDate ? new Date(tableRowData.finishDate).toLocaleTimeString() : ''}</span>
                                    </div>
                                )
                                || '-'
                            }                        </td>
                        <td className="px-4 py-2 text-center">
                            {tableRowData.unitPrice}
                        </td>
                        <td className="px-4 py-2 text-center">
                            {tableRowData.kWh}
                        </td>
                        <td className="px-4 py-2 text-center">
                            {tableRowData.batteryBeginningPercent && `${tableRowData.batteryBeginningPercent || ''} % ${tableRowData.batteryPercent || ''}`}
                        </td>
                        <td className="px-4 py-2 text-center">
                            {tableRowData.totalAmountWithOutKDV}
                        </td>
                        <td className="px-4 py-2 text-center">
                            {tableRowData.totalAmount}
                        </td>
                        <td className="px-4 py-2 text-center">
                            {tableRowData.servicePrice}
                        </td>
                        <td className="px-4 py-2 text-center">
                            {tableRowData.commissionServicePointPrice}
                        </td>
                        <td className="px-4 py-2 text-center">
                            {tableRowData.commissionResellerPrice}
                        </td>
                        <td className="px-4 py-2 text-center">
                            {tableRowData.userId}
                        </td>
                        <td className="px-4 py-2 text-center">
                            {tableRowData.bankOrderNo}
                        </td>
                        <td className="px-4 py-2 text-center">
                            {tableRowData.paidAmount}
                        </td>
                        <td className="px-4 py-2 text-center">
                            {tableRowData.preChargeAmount}
                        </td>
                        <td className="px-4 py-2 text-center">
                            {tableRowData.plate}
                        </td>
                        <td className="px-4 py-2 text-center">
                            {tableRowData.brand}
                        </td>
                        <td className="px-4 py-2 text-center">
                            {tableRowData.model}
                        </td>
                    </>
                )
            }
            {
                attributeName !== 'reports-management' && (
                    <td className="px-4 py-4 text-center">
                        <div className="flex justify-center text-2xl">
                            <TableActions attributeName={attributeName} tableRowData={tableRowData} />
                        </div>
                    </td>
                )
            }
        </tr>
    );
};

export default TableRow;
