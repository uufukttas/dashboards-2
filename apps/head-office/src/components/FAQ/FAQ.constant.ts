import { IBaseTableColumn } from '../BaseTable/BaseTableInterface';

export const FAQS_TABLE_COLUMNS: IBaseTableColumn[] = [
  {
    header: 'Soru',
    accessor: 'question',
    field: 'question',
    id: 'question',
    isRemovable: false,
    type: 'string',
  },
  {
    accessor: 'answer',
    field: 'answer',
    header: 'Cevap',
    id: 'answer',
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
    accessor: 'actions',
    align: 'center',
    field: 'actions',
    header: 'Aksiyonlar',
    id: 'actions',
    isRemovable: false,
    type: 'custom',
  },
];
