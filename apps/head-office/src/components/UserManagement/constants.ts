const userManagementTableFilteredDropdownItems = [{
    id: 1,
    isChecked: false,
    name: 'Isim/Soyisim',
    rid: null,
    stationFeatureType: 0,
    stationFeatureValue: 0,
}, {
    id: 2,
    isChecked: false,
    name: 'Kullanici Adi',
    rid: null,
    stationFeatureType: 0,
    stationFeatureValue: 0,
}, {
    id: 3,
    isChecked: false,
    name: 'Telefon',
    rid: null,
    stationFeatureType: 0,
    stationFeatureValue: 0,
}, {
    id: 4,
    isChecked: false,
    name: 'Rol',
    rid: null,
    stationFeatureType: 0,
    stationFeatureValue: 0,
}];
const userManagementTableHeadData = ['Isim/Soyisim', 'Kullanici Adi', 'Telefon', 'Rol', 'Son Giris', 'Aksiyonlar'];
const initialUserManagementDataValues = {
    roles: [],
    userId: 0,
    userName: '',
    email: '',
    phoneNumber: '',
    name: '',
    surname: '',
};
export { initialUserManagementDataValues, userManagementTableFilteredDropdownItems, userManagementTableHeadData };