import { IBasetableColumn } from '../BaseTable/BaseTableInterface';

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

const servicePointTableHeadData: IBasetableColumn[] = [
  {
    id: 'name',
    Header: 'İstasyon Adı',
    accessor: 'name',
    align: 'left',
  },
  {
    id: 'phone',
    Header: 'Telefon',
    accessor: 'phone',
    align: 'left',
  },
  {
    id: 'address',
    Header: 'Adres',
    accessor: 'address',
    align: 'left',
  },
  {
    id: 'cityId',
    Header: 'İl',
    accessor: 'cityId',
    align: 'left',
  },
  {
    id: 'districtId',
    Header: 'İlçe',
    accessor: 'districtId',
    align: 'left',
  },
  {
    id: 'actions',
    Header: 'İşlemler',
    accessor: 'actions',
    align: 'center',
  },
];

export {
  initialServicePointDataValues,
  initialServicePointInformationValue,
  servicePointTableFilteredDropdownItems,
  servicePointTableHeadData
};

