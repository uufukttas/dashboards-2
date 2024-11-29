import { IBaseTableColumn } from '../BaseTable/BaseTableInterface';

export const NOTIFICATION_TABLE_COLUMNS: IBaseTableColumn[] = [
  {
    header: 'Bildirim Tipi',
    accessor: 'notificationType',
    field: 'notificationType',
    id: 'notificationType',
    isRemovable: false,
    type: 'string',
  },
  {
    header: 'Kategori',
    accessor: 'category',
    field: 'category',
    id: 'category',
    isRemovable: false,
    type: 'string',
  },
  {
    header: 'Başlık',
    accessor: 'title',
    field: 'title',
    id: 'title',
    isRemovable: false,
    type: 'string',
  },
  {
    header: 'İçerik',
    accessor: 'content',
    field: 'content',
    id: 'content',
    isRemovable: false,
    type: 'string',
  },
  {
    header: 'Başlangıç Tarihi',
    accessor: 'startedDate',
    field: 'startedDate',
    id: 'startedDate',
    isRemovable: false,
    type: 'date'
  },
  {
    header: 'İşlem Tarihi',
    accessor: 'processedDate',
    field: 'processedDate',
    id: 'processedDate',
    isRemovable: false,
    type: 'date'
  },
  {
    header: 'Oluşturulma Tarihi',
    accessor: 'createdDate',
    field: 'createdDate',
    id: 'createdDate',
    isRemovable: false,
    type: 'date'
  },
  {
    header: 'Teslim Durumu',
    accessor: 'isDelivery',
    field: 'isDelivery',
    id: 'isDelivery',
    isRemovable: false,
    type: 'boolean'
  },
  {
    header: 'Teslim Tarihi',
    accessor: 'deliveryDate',
    field: 'deliveryDate',
    id: 'deliveryDate',
    isRemovable: false,
    type: 'date'
  },
  {
    header: 'Teslim Mesaj ID',
    accessor: 'deliveryMessageID',
    field: 'deliveryMessageID',
    id: 'deliveryMessageID',
    isRemovable: false,
    type: 'number'
  },
  {
    header: 'Teslim Denemesi',
    accessor: 'deliveryAttemps',
    field: 'deliveryAttemps',
    id: 'deliveryAttemps',
    isRemovable: false,
    type: 'number'
  }
];
