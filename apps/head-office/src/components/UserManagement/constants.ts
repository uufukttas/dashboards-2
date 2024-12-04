import { IBaseTableColumn } from '../BaseTable/BaseTableInterface';
import { IRolesStyleProps } from "./types";

const roleStyles: IRolesStyleProps = {
    Admin: { backgroundColor: 'bg-red-300', textColor: 'text-red-800', borderColor: 'border-red-300' },
    Employee: { backgroundColor: 'bg-green-300', textColor: 'text-green-800', borderColor: 'border-green-300' },
    User: { backgroundColor: 'bg-blue-300', textColor: 'text-blue-800', borderColor: 'border-blue-300' },
    Manager: { backgroundColor: 'bg-purple-300', textColor: 'text-purple-800', borderColor: 'border-purple-300' },
    Super: { backgroundColor: 'bg-yellow-300', textColor: 'text-yellow-800', borderColor: 'border-yellow-300' },
    Default: { backgroundColor: 'bg-gray-300', textColor: 'text-gray-800', borderColor: 'border-gray-300' }
};
const userManagementTableFilteredDropdownItems = [{
    id: 1,
    isChecked: true,
    name: 'İsim/Soyisim',
    rid: null,
    stationFeatureType: 0,
    stationFeatureValue: 0,
}, {
    id: 2,
    isChecked: false,
    name: 'Kullanıcı Adı',
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
const userManagementTableHeadData: IBaseTableColumn[] = [
  {
    accessor: 'name',
    align: 'left',
    field: 'name',
    header: 'İsim/Soyisim',
    id: 'name',
    isRemovable: true,
    type: 'string'
  },
  {
    accessor: 'userName',
    align: 'left',
    field: 'userName',
    header: 'Kullanıcı Adı',
    id: 'userName',
    isRemovable: true,
    type: 'string'
  },
  {
    accessor: 'roleNames',
    align: 'left',
    field: 'roleNames',
    header: 'Rol',
    id: 'roleNames',
    isRemovable: true,
    type: 'string'
  },
  {
    accessor: 'lastLoginDate',
    align: 'left',
    field: 'lastLoginDate',
    header: 'Son Giriş',
    id: 'lastLoginDate',
    isRemovable: true,
    type: 'date'
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
const initialUserManagementDataValues = {
    roles: [],
    userId: 0,
    userName: '',
    email: '',
    phoneNumber: '',
    name: '',
    surname: '',
};
export {
  initialUserManagementDataValues,
  roleStyles,
  userManagementTableFilteredDropdownItems,
  userManagementTableHeadData
};
