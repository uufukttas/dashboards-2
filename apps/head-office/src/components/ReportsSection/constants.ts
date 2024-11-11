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
    field: 'username',
    header: 'Kullanıcı ID',
    isRemovable: true,
  },
  {
    field: 'phoneNumber',
    header: 'Cep Telefonu',
    isRemovable: true,
  },
  {
    field: 'city',
    header: 'Şehir',
    isRemovable: true,
  },
  {
    field: 'district',
    header: 'İlçe',
    isRemovable: true,
  },
  {
    field: 'customerType',
    header: 'Müşteri Tipi',
    isRemovable: true,
  },
  {
    field: 'title',
    header: 'Ünvan',
    isRemovable: true,
  },
  {
    field: 'nationalIdOrTaxNumber',
    header: 'TCKN/VKN',
    isRemovable: true,
  },
  {
    field: 'address',
    header: 'Adres',
    isRemovable: true,
  },
  {
    field: 'licensePlate',
    header: 'Plaka',
    isRemovable: true,
  },
  {
    field: 'vehicleBrand',
    header: 'Araç Markası',
    isRemovable: true,
  },
  {
    field: 'vehicleModel',
    header: 'Araç Modeli',
    isRemovable: true,
  },
  {
    field: 'emailAddress',
    header: 'İlçe',
    isRemovable: true,
  },
  {
    field: 'rfCardId',
    header: 'RF Kartları',
    isRemovable: true,
  },
  {
    field: 'totalTransactionCount',
    header: 'Toplam İşlem Adedi',
    isRemovable: true,
  },
  {
    field: 'totalConsumption',
    header: 'Toplam Tüketim',
    isRemovable: true,
  },
  {
    field: 'totalAmount',
    header: 'Toplam Tutar',
    isRemovable: true,
  },
  {
    field: 'debtBalance',
    header: 'Borç Bakiyesi',
    isRemovable: true,
  },
  {
    field: 'membershipDate',
    header: 'Üyelik Tarihi',
    isRemovable: true,
  },
  {
    field: 'lastChargeDate',
    header: 'Son Şarj Tarihi',
    isRemovable: true,
  },
  {
    field: 'lastLoginDate',
    header: 'Son Giriş Tarihi',
    isRemovable: true,
  },
  {
    field: 'lastChargeDate',
    header: 'Son Şarj Tarihi',
    isRemovable: true,
  },
];

export const StationStatusReportsTableHeadData: Array<ITableHeadData> = [
  {
    field: 'operatorName',
    header: 'Operatör Adı',
    isRemovable: true,
  },
  {
    field: 'resellerName',
    header: 'Reseller Adı',
    isRemovable: true,
  },
  {
    field: 'stationName',
    header: 'İstasyon Adı',
    isRemovable: true,
  },
  {
    field: 'stationOwner',
    header: 'İstasyon Sahibi',
    isRemovable: true,
  },
  {
    field: 'city',
    header: 'Şehir',
    isRemovable: true,
  },
  {
    field: 'district',
    header: 'İlçe',
    isRemovable: true,
  },
  {
    field: 'unitCode',
    header: 'Ünite Kodu',
    isRemovable: true,
  },
  {
    field: 'brand',
    header: 'Marka',
    isRemovable: true,
  },
  {
    field: 'model',
    header: 'Model',
    isRemovable: true,
  },
  {
    field: 'connectorNumber',
    header: 'Konnektor No',
    isRemovable: true,
  },
  {
    field: 'managementPageStatus',
    header: 'Yönetim Sayfası Durum',
    isRemovable: true,
  },
  {
    field: 'mobileAppStatus',
    header: 'Mobil Uygulama Durum',
    isRemovable: true,
  },
  {
    field: 'connectorStatus',
    header: 'Konnektör Durum',
    isRemovable: true,
  },
  {
    field: 'lastCommunicationTime',
    header: 'Son İletişim Zamanı',
    isRemovable: true,
  },
  {
    field: 'lastChargeStatus',
    header: 'Son Şarj Durumu',
    isRemovable: true,
  },
  {
    field: 'lastChargeStartTime',
    header: 'Son Şarj Başlama Zamanı',
    isRemovable: true,
  },
  {
    field: 'lastChargeKWh',
    header: 'Son Şarj KWh',
    isRemovable: true,
  },
  {
    field: 'connectorPower',
    header: 'Konnektör Gücü',
    isRemovable: true,
  },
  {
    field: 'connectorType',
    header: 'Konnektör Tipi',
    isRemovable: true,
  },
  {
    field: 'energyUnitPrice',
    header: 'Enerji Birim Fiyatı',
    isRemovable: true,
  },
  {
    field: 'tariff',
    header: 'Tarife',
    isRemovable: true,
  },
  {
    field: 'epdkCode',
    header: 'EPDK Kodu',
    isRemovable: true,
  },
  {
    field: 'workingRate',
    header: 'Çalışma Oranı',
    isRemovable: true,
  },
  {
    field: 'chargingRate',
    header: 'Şarj Etme Oranı',
    isRemovable: true,
  },
];

export const StationAlarmReportsTableHeadData: Array<ITableHeadData> = [
  {
    field: 'trxNo',
    header: 'Trx No',
    isRemovable: true,
  },
  {
    field: 'locationName',
    header: 'Lokasyon Adı',
    isRemovable: true,
  },
  {
    field: 'unitCode',
    header: 'Ünite Kodu',
    isRemovable: true,
  },
  {
    field: 'socketCode',
    header: 'Soket No',
    isRemovable: true,
  },
  {
    field: 'socketPower',
    header: 'Soket Gücü',
    isRemovable: true,
  },
  {
    field: 'startAt',
    header: 'Şarj Başlangıç',
    isRemovable: true,
  },
  {
    field: 'totalTime',
    header: 'Şarj Süresi',
    isRemovable: true,
  },
  {
    field: 'endAt',
    header: 'Şarj Bitiş',
    isRemovable: true,
  },
  {
    field: 'kwh',
    header: 'kWh',
    isRemovable: true,
  },
  {
    field: 'averageKWH',
    header: 'Ort kW',
    isRemovable: true,
  },
  {
    field: 'totalAmountWithoutKDV',
    header: 'Toplam Tutar',
    isRemovable: true,
  },
];


export const StationPaymentReportsHeadData: Array<ITableHeadData> = [
  {
    field: 'userName',
    header: 'Kullanıcı Adı',
    isRemovable: true,
  },
  {
    field: 'phoneNumber',
    header: 'Cep Telefonu',
    isRemovable: true,
  },
  {
    field: 'orderNumber',
    header: 'Sipariş No',
    isRemovable: true,
  },
  {
    field: 'processType',
    header: 'İşlem Sebebi',
    isRemovable: true,
  },
  {
    field: 'processStatus',
    header: 'İşlem Durumu',
    isRemovable: true,
  },
  {
    field: 'trxId',
    header: 'Trx ID',
    isRemovable: true,
  },
]

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
