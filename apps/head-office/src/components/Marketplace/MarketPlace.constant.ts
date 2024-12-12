import { IBaseTableColumn } from '../BaseTable/BaseTableInterface';

export const MARKETPLACE_TABLE_COLUMNS: IBaseTableColumn[] = [
  {
    header: 'Ürün Adı',
    accessor: 'productName',
    field: 'productName',
    id: 'productName',
    isRemovable: false,
    type: 'string',
  },
  {
    accessor: 'stockCount',
    field: 'stockCount',
    header: 'Stok Adedi',
    id: 'stockCount',
    isRemovable: false,
    type: 'number',
  },
  {
    header: 'Ürün Fiyatı',
    accessor: 'productPrice',
    field: 'productPrice',
    id: 'productPrice',
    isRemovable: false,
    type: 'number',
  },
  {
    header: 'Kategori',
    accessor: 'productCategory',
    field: 'productCategory',
    id: 'productCategory',
    isRemovable: false,
    type: 'string',
  },
  {
    accessor: 'actions',
    align: 'center',
    field: 'actions',
    header: 'Aksiyonlar',
    id: 'actions',
    isRemovable: false,
    type: 'custom',
  },
];
