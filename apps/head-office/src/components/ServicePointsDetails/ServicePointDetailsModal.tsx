import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { BRAND_PREFIX } from '../../constants/constants';
import { Button } from '@projects/button';
import { Checkbox } from '@projects/checkbox';
import { Dropdown } from '@projects/dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { RootState } from '../../../app/redux/store';

interface IAccessTypeProps {
  id: number;
  name: string;
  rid: null;
};

interface IStatusListProps {
  id: number;
  name: string;
  rid: null;
};

interface IBrandsProps {
  id: number,
  name: string,
  isDeleted: boolean;
  rid: null;
};

interface IInvestorsProps {
  id: number,
  name: string,
  rid: null;
};
interface IChargeUnitsForm {
  slug: string;
  brands: IBrandsProps[];
  investors: IInvestorsProps[];
  accessTypeList: IAccessTypeProps[];
  statusList: IStatusListProps[];
}

interface IChargeUnitFormProps {
  brand: string;
  ocppVersion: string;
  isFree: boolean;
  isLimited: boolean;
  investor: string;
  status: string;
  accessType: string;
  location: string;
}

const initialChargeUnitFormDataState = {
  brand: '',
  ocppVersion: '',
  isFree: false,
  isLimited: false,
  investor: '',
  status: '',
  accessType: '',
  location: '',
};

const ServicePointDetailsModal = ({ slug, brands, accessTypeList, investors, statusList }: IChargeUnitsForm) => {
  const dispatch = useDispatch();
  const isModalVisible = useSelector((state: RootState) => state.isModalVisibleReducer.isModalVisible);
  const [chargeUnitFormData, setChargeUnitFormData] = useState<IChargeUnitFormProps>(initialChargeUnitFormDataState);

  const createRequestData = () => {
    const requestData = {
      chargePoint: {
        code: '',
        stationId: Number(slug),
        stationChargePointModelID: Number(chargeUnitFormData.brand),
        ocppVersion: chargeUnitFormData.ocppVersion === 'v1.6' ? 1600 : 2100,
        isFreePoint: chargeUnitFormData.isFree,
        isOnlyDefinedUserCards: chargeUnitFormData.isLimited,
        ownerType: Number(chargeUnitFormData.investor),
        sendRoaming: false,
        InternalOCPPAdress: null,
        ExternalOCPPAdress: null,
      },
      chargePointFeatures: [
        {
          stationChargePointFeatureType: 1,
          stationChargePointFeatureTypeValue: chargeUnitFormData.status,
        },
        {
          stationChargePointFeatureType: 2,
          stationChargePointFeatureTypeValue: chargeUnitFormData.accessType,
        },
      ],
    };

    return requestData;
  };

  const handleSubmit = () => {
    const data = JSON.stringify(createRequestData());

    axios
      .post(
        'https://sharztestapi.azurewebsites.net/ServicePoint/AddStationSettings',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => dispatch(toggleModalVisibility(isModalVisible)))
      .catch((error) => console.log(error));
  };

  return (
    <div className="charge-units-modal-form-container relative p-6 bg-white rounded-lg ">
      <form
        className={`${BRAND_PREFIX}-modal-form`}
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <div className={`charge-units-container`}>
          <Label
            className="charge-units-brand-label block mb-2 text-heading font-semibold"
            htmlFor={'charge-units-brand'}
            labelText={'Şarj Ünitesi Markasi'}
          />
          <Dropdown
            className="border text-text text-sm rounded-lg block w-full p-2.5 mb-4"
            id={'charge-units-brand'}
            items={brands}
            name="charge-units-brand"
            onChange={(event) => {
              setChargeUnitFormData({
                ...chargeUnitFormData,
                brand: event.target.value,
              });
            }}
          />
        </div>
        <div className="charge-units-ocpp-version-container">
          <Label
            className="charge-units-ocpp-version-label block mb-2 text-heading font-semibold"
            htmlFor={'charge-units-ocpp-version'}
            labelText={'OCPP Versiyon'}
          />
          <Dropdown
            className="border text-text text-sm rounded-lg block w-full p-2.5 mb-4"
            id={'charge-units-ocpp-version'}
            items={[
              { id: 1, name: 'v1.6', rid: null },
              { id: 2, name: 'v2.1', rid: null },
            ]}
            name="charge-units-ocpp-version"
            onChange={(event) => {
              setChargeUnitFormData({
                ...chargeUnitFormData,
                ocppVersion: event.target.value,
              });
            }}
          />
        </div>
        <div
          className={`charge-units-free-usage-container inline-flex flex-col w-1/2`}
        >
          <h3
            className="charge-units-free-usage-label block mb-2 text-heading font-semibold"
            id={'charge-units-free-usage'}
          >
            Ücretsiz Kullanım
          </h3>
          <div className="charge-units-free-usage-inputs-container flex">
            <div className="charge-units-free-usage-option-container flex w-1/2 items-center mb-4">
              <Label
                className="charge-units-is-free-label block mb-2 text-heading font-semibold block mb-0 pr-4"
                htmlFor={'charge-units-is-free-yes'}
                labelText={'Var'}
              />
              <Checkbox
                className="charge-units-is-free text-blue-500 text-sm block"
                id={'charge-units-is-free-yes'}
                name={'charge-units-is-free'}
                onChange={(event) => {
                  setChargeUnitFormData({
                    ...chargeUnitFormData,
                    isFree: event.target.checked,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="charge-units-limited-usage-container inline-flex flex-col w-1/2">
          <h3
            className="charge-units-limited-usage-label block mb-2 text-heading font-semibold"
            id={'charge-units-limited-usage'}
          >
            Sınırlı Kullanım
          </h3>
          <div className="charge-units-limited-usage-inputs-container flex">
            <div className="charge-units-limited-usage-option-container flex w-1/2 items-center mb-4">
              <Label
                className="charge-units-is-limited-label block mb-2 text-heading font-semibold block mb-0 pr-4"
                htmlFor={'charge-units-is-limited-yes'}
                labelText={'Var'}
              />
              <Checkbox
                className="charge-units-is-limited text-blue-500 text-sm block"
                id={'charge-units-is-limited-yes'}
                name={'charge-units-is-limited'}
                onChange={(event) => {
                  setChargeUnitFormData({
                    ...chargeUnitFormData,
                    isLimited: event.target.checked,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="charge-units-investor-container">
          <Label
            className="charge-units-investor-label block mb-2 text-heading font-semibold"
            htmlFor={'charge-units-investor'}
            labelText={'Yatırımcı'}
          />
          <Dropdown
            className="border text-text text-sm rounded-lg block w-full p-2.5 mb-4"
            id={'charge-units-investor '}
            items={investors}
            name="charge-units-investor"
            onChange={(event) => {
              setChargeUnitFormData({
                ...chargeUnitFormData,
                investor: event.target.value,
              });
            }}
          />
        </div>
        <div className="charge-units-status-container">
          <Label
            className="charge-units-status-label block mb-2 text-heading font-semibold"
            htmlFor={'charge-units-status'}
            labelText={'Durum'}
          />
          <Dropdown
            className="border text-text text-sm rounded-lg block w-full p-2.5 mb-4"
            id={'charge-units-status'}
            items={statusList}
            name="charge-units-status"
            onChange={(event) => {
              setChargeUnitFormData({
                ...chargeUnitFormData,
                status: event.target.value,
              });
            }}
          />
        </div>
        <div className="charge-units-access-type-container">
          <Label
            className="charge-units-access-type-label block mb-2 text-heading font-semibold"
            htmlFor={'charge-units-access-type'}
            labelText={'Erisim Tipi'}
          />
          <Dropdown
            className="border text-text text-sm rounded-lg block w-full p-2.5 mb-4"
            id={'charge-units-access-type'}
            items={accessTypeList}
            name="charge-units-access-type"
            onChange={(event) => {
              setChargeUnitFormData({
                ...chargeUnitFormData,
                accessType: event.target.value,
              });
            }}
          />
        </div>
        <div className="charge-units-location-container">
          <Label
            className="charge-units-location-label block mb-2 text-heading font-semibold"
            htmlFor={'charge-units-location'}
            labelText={'Konum Tarifi'}
          />
          <Input
            className="border text-text text-sm rounded-lg block w-full p-2.5 mb-4"
            id={'charge-units-location'}
            name={'charge-units-location'}
            type="text"
            value={chargeUnitFormData.location}
            onChange={(event) => {
              setChargeUnitFormData({
                ...chargeUnitFormData,
                location: event.target.value,
              });
            }}
          />
        </div>
        <div className="charge-units-button-container flex justify-end">
          <Button
            buttonText={'Kaydet'}
            className="bg-primary text-white rounded-md px-4 py-2"
            type={'submit'}
          />
        </div>
      </form>
    </div>
  );
};

export default ServicePointDetailsModal;
