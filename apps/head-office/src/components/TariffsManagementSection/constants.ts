import { IBaseTableColumn } from '../BaseTable/BaseTableInterface';

const tariffsTableHeadData: IBaseTableColumn[] = [
    {
        id: 'name',
        field: 'name',
        header: 'Tarife Adı',
        accessor: 'name',
        type: 'string',
        isRemovable: true,
    },
    {
        id: 'saleUnitPrice',
        field: 'saleUnitPrice',
        header: 'Tarife Fiyatı',
        accessor: 'saleUnitPrice',
        type: 'number',
        isRemovable: true,
    },
    {
        id: 'kwRange',
        field: 'kwRange',
        header: 'Min-Max KW Aralığı',
        accessor: 'kwRange',
        type: 'string',
        isRemovable: true,
    },
    {
        id: 'createDate',
        field: 'createDate',
        header: 'Kayit Tarihi',
        accessor: 'createDate',
        type: 'date',
        isRemovable: true,
    },
    {
        id: 'validityBeginDate',
        field: 'validityBeginDate',
        header: 'Aktif Tarihi',
        accessor: 'validityBeginDate',
        type: 'date',
        isRemovable: true,
    },
    {
        id: 'validityEndDate',
        field: 'validityEndDate',
        header: 'Pasif Tarihi',
        accessor: 'validityEndDate',
        type: 'date',
        isRemovable: true,
    },
    {
        id: 'actions',
        field: 'actions',
        header: 'İşlemler',
        accessor: 'actions',
        type: 'custom',
        isRemovable: false,
    },
];

export { tariffsTableHeadData };
