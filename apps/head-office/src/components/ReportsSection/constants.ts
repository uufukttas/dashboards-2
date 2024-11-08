import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTableFilterMeta } from 'primereact/datatable';
import { ITableHeadData } from './types';

export const AllReportsTableHeadData: Array<ITableHeadData> = [
  {
    field: 'trxId',
    header: 'İşlem ID',
    isRemovable: true,
  },
  {
    field: 'batteryBeginningPercent',
    header: 'Başlangıç Batarya Yüzdesi',
    isRemovable: true,
  },
  {
    field: 'batteryPercent',
    header: 'Batarya Yüzdesi',
    isRemovable: true,
  },
  {
    field: 'batteryPercentDesc',
    header: 'Batarya Yüzdesi Açıklama',
    isRemovable: true,
  },
  {
    field: 'chargeProcessElapsedTime',
    header: 'Şarj Süresi',
    isRemovable: true,
  },
  {
    field: 'chargingStatus',
    header: 'Şarj Durumu',
    isRemovable: true,
  },
  {
    field: 'chargingStatusMessage',
    header: 'Şarj Durumu Mesajı',
    isRemovable: true,
  },
  {
    field: 'commissionResellerPrice',
    header: 'Bayi Komisyon Fiyatı',
    isRemovable: true,
  },
  {
    field: 'commissionServicePointPrice',
    header: 'Hizmet Noktası Komisyon Fiyatı',
    isRemovable: true,
  },
  {
    field: 'companyID',
    header: 'Şirket ID',
    isRemovable: true,
  },
  {
    field: 'consumerCompanyID',
    header: 'Tüketici Şirket ID',
    isRemovable: true,
  },
  {
    field: 'energyUsed',
    header: 'Kullanılan Enerji',
    isRemovable: true,
  },
  {
    field: 'finishDate',
    header: 'Bitiş Tarihi',
    isRemovable: true,
  },
  {
    field: 'meterFinishDate',
    header: 'Sayaç Bitiş Tarihi',
    isRemovable: true,
  },
  {
    field: 'meterStartDate',
    header: 'Sayaç Başlangıç Tarihi',
    isRemovable: true,
  },
  {
    field: 'priceENRJ',
    header: 'ENRJ Fiyatı',
    isRemovable: true,
  },
  {
    field: 'priceSRV',
    header: 'SRV Fiyatı',
    isRemovable: true,
  },
  {
    field: 'resellerCompanyID',
    header: 'Bayi Şirket ID',
    isRemovable: true,
  },
  {
    field: 'startDate',
    header: 'Başlangıç Tarihi',
    isRemovable: true,
  },
  {
    field: 'stationChargePointCode',
    header: 'İstasyon Şarj Noktası Kodu',
    isRemovable: true,
  },
  {
    field: 'stationChargePointConnectorTypeName',
    header: 'Şarj Noktası Bağlayıcı Tip Adı',
    isRemovable: true,
  },
  {
    field: 'stationConnectorConnectorNr',
    header: 'Bağlayıcı Numarası',
    isRemovable: true,
  },
  {
    field: 'stationConnectorID',
    header: 'Bağlayıcı ID',
    isRemovable: true,
  },
  {
    field: 'stationID',
    header: 'İstasyon ID',
    isRemovable: true,
  },
  {
    field: 'stationName',
    header: 'İstasyon Adı',
    isRemovable: true,
  },
  {
    field: 'totalAmount',
    header: 'Toplam Tutar',
    isRemovable: true,
  },
  {
    field: 'totalAmountWithOutKDV',
    header: 'KDV Hariç Toplam Tutar',
    isRemovable: true,
  },
  {
    field: 'unitPrice',
    header: 'Birim Fiyat',
    isRemovable: true,
  },
];

export const UsersReportsTableHeadData: Array<ITableHeadData> = [
  {
    field: 'id',
    header: 'ID',
    isRemovable: false,
  },
  {
    field: 'name',
    header: 'İsim',
    isRemovable: false,
  },
  {
    field: 'surname',
    header: 'Soyad',
    isRemovable: false,
  },
  {
    field: 'phone',
    header: 'Telefon',
    isRemovable: false,
  },
];

export const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  trxId: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  batteryBeginningPercent: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  batteryPercent: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  batteryPercentDesc: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  chargeProcessElapsedTime: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  chargingStatus: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  chargingStatusMessage: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  commissionResellerPrice: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  commissionServicePointPrice: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  companyID: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  consumerCompanyID: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  energyUsed: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  finishDate: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
  },
  meterFinishDate: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
  },
  meterStartDate: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
  },
  priceENRJ: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  priceSRV: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  resellerCompanyID: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  startDate: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
  },
  stationChargePointCode: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  stationChargePointConnectorTypeName: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  stationConnectorConnectorNr: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  stationConnectorID: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  stationID: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  stationName: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  totalAmount: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  totalAmountWithOutKDV: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  unitPrice: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
};
