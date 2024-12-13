import { IBaseTableColumn } from '../BaseTable/BaseTableInterface';

export const FEEDBACKS_TABLE_COLUMNS: IBaseTableColumn[] = [
  {
    header: 'Feedback Sahibi',
    accessor: 'feedbackOwner',
    field: 'feedbackOwner',
    id: 'feedbackOwner',
    isRemovable: false,
    type: 'string',
    className: ''
  },
  {
    accessor: 'feedbackHeader',
    field: 'feedbackHeader',
    header: 'Feedback Başlığı',
    id: 'feedbackHeader',
    isRemovable: false,
    type: 'string',
    className: ''
  },
  {
    header: 'Feedback İçeriği',
    accessor: 'feedbackContent',
    field: 'feedbackContent',
    id: 'feedbackContent',
    isRemovable: false,
    type: 'string',
    className: ''
  },
  {
    accessor: 'actions',
    align: 'center',
    field: 'actions',
    header: 'Aksiyon',
    id: 'actions',
    isRemovable: false,
    type: 'custom',
    className: ''
  },
];
