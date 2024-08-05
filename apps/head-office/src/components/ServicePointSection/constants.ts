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
const servicePointTableFilteredDropdownItems = [{
    id: 1,
    isChecked: true,
    name: 'Istasyon Adi',
    rid: null,
    stationFeatureType: 0,
    stationFeatureValue: 0,
},{
    id: 2,
    isChecked: false,
    name: 'Telefon',
    rid: null,
    stationFeatureType: 0,
    stationFeatureValue: 0,
}, {
    id: 3,
    isChecked: false,
    name: 'Adres',
    rid: null,
    stationFeatureType: 0,
    stationFeatureValue: 0,
}, {
    id: 4,
    isChecked: false,
    name: 'Il',
    rid: null,
    stationFeatureType: 0,
    stationFeatureValue: 0,
}, {
    id: 5,
    isChecked: false,
    name: 'Ilce',
    rid: null,
    stationFeatureType: 0,
    stationFeatureValue: 0,
}];
const servicePointTableHeadData = [
    'Istasyon Adi',
    'Telefon',
    'Adres',
    'Il',
    'Ilce',
    'Islemler',
];

export {
    initialServicePointDataValues,
    initialServicePointInformationValue,
    servicePointTableFilteredDropdownItems,
    servicePointTableHeadData,
};
