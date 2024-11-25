import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTableFilterMeta } from 'primereact/datatable';
import { IBaseTableColumn } from '../BaseTable/BaseTableInterface';

const initialServicePointDataValues = {
  id: 0,
  isActive: true,
  isDeleted: false,
  name: '',
  companyId: 0,
  companyName: '',
  resellerCompanyId: 0,
  resellerName: '',
};
const initialServicePointInformationValue = {
  address: '',
  addressDetail: '',
  cityId: 0,
  districtId: 0,
  freePark: false,
  id: 0,
  lon: 0,
  lat: 0,
  name: '',
  opportunities: [],
  paymentMethods: '1',
  phone1: '',
  phone2: '',
  type: '',
};
const servicePointTableFilteredDropdownItems = [
  {
    id: 1,
    isChecked: true,
    name: 'İstasyon Adı',
    rid: null,
    stationFeatureType: 0,
    stationFeatureValue: 0,
  },
  {
    id: 2,
    isChecked: false,
    name: 'Telefon',
    rid: null,
    stationFeatureType: 0,
    stationFeatureValue: 0,
  },
  {
    id: 3,
    isChecked: false,
    name: 'Adres',
    rid: null,
    stationFeatureType: 0,
    stationFeatureValue: 0,
  },
  {
    id: 4,
    isChecked: false,
    name: 'İl',
    rid: null,
    stationFeatureType: 0,
    stationFeatureValue: 0,
  },
  {
    id: 5,
    isChecked: false,
    name: 'İlçe',
    rid: null,
    stationFeatureType: 0,
    stationFeatureValue: 0,
  },
];

const servicePointTableHeadData: IBaseTableColumn[] = [
  {
    accessor: 'name',
    align: 'left',
    field: 'İstasyon Adı',
    header: 'İstasyon Adı',
    id: 'name',
    isRemovable: true,
    type: 'string',
  },
  {
    accessor: 'phone',
    align: 'left',
    field: 'Telefon',
    header: 'Telefon',
    id: 'phone',
    isRemovable: true,
    type: 'string',
  },
  {
    accessor: 'address',
    align: 'left',
    field: 'Adres',
    header: 'Adres',
    id: 'address',
    isRemovable: true,
    type: 'string',
  },
  {
    accessor: 'city',
    align: 'left',
    field: 'İl',
    header: 'İl',
    id: 'city',
    isRemovable: true,
    type: 'string',
  },
  {
    accessor: 'district',
    align: 'left',
    field: 'İlçe',
    header: 'İlçe',
    id: 'district',
    isRemovable: true,
    type: 'string',
  },
  {
    accessor: 'actions',
    align: 'right',
    field: 'İşlemler',
    header: 'İşlemler',
    id: 'actions',
    isRemovable: false,
    type: 'custom',
  },
];

const servicePointTableDefaultFilters: DataTableFilterMeta = {
  address: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  cityId: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  districtId: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  global: {
    value: null,
    matchMode: FilterMatchMode.CONTAINS,
  },
  name: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.IN }],
  },
  phoneNumber: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
};


export {
  initialServicePointDataValues,
  initialServicePointInformationValue,
  servicePointTableDefaultFilters,
  servicePointTableFilteredDropdownItems,
  servicePointTableHeadData
};

