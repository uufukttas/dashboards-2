import React, { Dispatch, useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { Checkbox } from '@projects/checkbox';
import { Dropdown } from '@projects/dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { BRAND_PREFIX } from '../../constants/constants';
import { toggleChargePointDataUpdated } from '../../../app/redux/features/isChargePointDataUpdated';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';

interface IAccessTypeProps {
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
interface ServicePointDetailsModalProps {
  slug: string;
  brands: IBrandsProps[];
  investors: IInvestorsProps[];
  accessTypeList: IAccessTypeProps[];
  statusList: IStatusListProps[];
  setConnectorCount: Dispatch<React.SetStateAction<number>>;
};
interface IFormDataProps {
  [key: string]: boolean | number | string;
};
interface IInvestorsProps {
  id: number,
  name: string,
  rid: null;
};
interface IStatusListProps {
  id: number;
  name: string;
  rid: null;
};

const ServicePointDetailsModal = ({ accessTypeList, brands, investors, slug, statusList, setConnectorCount }: ServicePointDetailsModalProps) => {
  const formName = ['brands', 'connector-count', 'ocpp-version', 'is-free-usage', 'is-limited-usage', 'investor', 'status', 'access-type', 'location'];
  const sectionPrefix = 'charge-unit';
  const formProperties = {
    brands: `${sectionPrefix}-${formName[0]}`,
    'connector-count': `${sectionPrefix}-${formName[1]}`,
    'ocpp-version': `${sectionPrefix}-${formName[2]}`,
    'is-free-usage': `${sectionPrefix}-${formName[3]}`,
    'is-limited-usage': `${sectionPrefix}-${formName[4]}`,
    investor: `${sectionPrefix}-${formName[5]}`,
    status: `${sectionPrefix}-${formName[6]}`,
    'access-type': `${sectionPrefix}-${formName[7]}`,
    location: `${sectionPrefix}-${formName[8]}`
  };
  const dispatch = useDispatch();
  const { formState: { errors }, handleSubmit, register } = useForm();
  const [chargeUnitFormData, setChargeUnitFormData] = useState<IFormDataProps>({
    [`${formProperties.brands}`]: 1,
    [`${formProperties['connector-count']}`]: 0,
    [`${formProperties['ocpp-version']}`]: 1,
    [`${formProperties['is-free-usage']}`]: false,
    [`${formProperties['is-limited-usage']}`]: false,
    [`${formProperties.investor}`]: 1,
    [`${formProperties.status}`]: '1',
    [`${formProperties['access-type']}`]: '1',
    [`${formProperties.location}`]: ''
  });

  const createRequestData = (chargePointId: number) => {
    return ({
      "connectorCount": chargeUnitFormData[`${formProperties['connector-count']}`],
      "chargePoint": {
        "code": chargePointId.toString(),
        "stationId": Number(slug),
        "stationChargePointModelID": chargeUnitFormData[`${formProperties.brands}`],
        "ocppVersion": chargeUnitFormData[`${formProperties['ocpp-version']}`],
        "isFreePoint": chargeUnitFormData[`${formProperties['is-free-usage']}`],
        "isOnlyDefinedUserCards": chargeUnitFormData[`${formProperties['is-limited-usage']}`],
        "ownerType": chargeUnitFormData[`${formProperties.investor}`],
        "sendRoaming": false,
        "InternalOCPPAdress": null,
        "ExternalOCPPAdress": null
      },
      "chargePointFeatures": [
        {
          "stationChargePointFeatureType": 1,
          "stationChargePointFeatureTypeValue": chargeUnitFormData[`${formProperties.status}`]
        },
        {
          "stationChargePointFeatureType": 2,
          "stationChargePointFeatureTypeValue": chargeUnitFormData[`${formProperties['access-type']}`]
        }
      ]
    });
  };

  const getChargePointId = async () => {
    const response = await axios.post(
      'https://sharztestapi.azurewebsites.net/Values/GetDeviceCode',
      JSON.stringify({ "stationID": Number(slug) }),
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  };

  const handleFormSubmit: SubmitHandler<IFormDataProps> = async () => {
    try {
      const chargePointId = await getChargePointId();
  
      await axios.post(
        'https://sharztestapi.azurewebsites.net/ServicePoint/AddStationSettings',
        JSON.stringify(createRequestData(chargePointId)),
        { headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${chargePointId.token}` 
        } }
      );
  
      dispatch(toggleModalVisibility());
      dispatch(toggleChargePointDataUpdated(true));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`${BRAND_PREFIX}-${sectionPrefix}-modal-form-container relative p-6 bg-white rounded-lg`}>
      <form
        className={`${BRAND_PREFIX}-add-${sectionPrefix}-form w-full`}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className={`${formProperties.brands}-container`}>
          <Label
            className={`${formProperties.brands}-label block mb-2 text-heading font-semibold`}
            htmlFor={`${formProperties.brands}`}
            labelText={`Şarj Ünitesi Markası`}
          >
            <span className="text-md text-error">*</span>
          </Label>
          <Dropdown
            className={`${formProperties.brands}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
            id={`${formProperties.brands}`}
            items={brands}
            name={`${formProperties.brands}`}
            onChange={(event) => {
              setChargeUnitFormData({
                ...chargeUnitFormData,
                [event.target.name]: Number(event.target.value),
              });
            }}
            value={chargeUnitFormData[`${formProperties.brands}`]?.toString()}
          />
        </div>
        <div className={`${formProperties['connector-count']}-container`}>
          <Label
            className={`${formProperties['connector-count']}-label block mb-2 text-heading font-semibold`}
            htmlFor={`${formProperties['connector-count']}`}
            labelText={`Konnektör Sayısı`}
          >
            <span className="text-md text-error">*</span>
          </Label>
          <Input
            className={`${formProperties['connector-count']}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
            id={`${formProperties['connector-count']}`}
            name={`${formProperties['connector-count']}`}
            register={
              register(`${formProperties['connector-count']}`, {
                required: 'Konnektör sayısı zorunludur.',
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: 'Konnektör sayısı en az 1 olmalıdır.'
                },
                max: {
                  value: 4,
                  message: 'Konnektör sayısı en fazla 4 olmalıdır.'
                },
                value:
                  chargeUnitFormData[`${formProperties['connector-count']}`]
                    ? chargeUnitFormData[`${formProperties['connector-count']}`].toString()
                    : '',
                onChange: (event) => {
                  setChargeUnitFormData({
                    ...chargeUnitFormData,
                    [event.target.name]: Number(event.target.value),
                  });
                  setConnectorCount(Number(event.target.value));
                }
              })
            }
            type="number"
          />
          {errors[`${formProperties['connector-count']}`]
            && errors[`${formProperties['connector-count']}`]?.message
            && (
              <div className={`${formProperties['connector-count']}-error-wrapper my-4 font-bold text-error`}>
                <p className={`${formProperties['connector-count']}-error-message text-error`}>
                  {errors[`${formProperties['connector-count']}`]?.message?.toString()}
                </p>
              </div>
            )}
        </div>
        <div className={`${formProperties['ocpp-version']}-container`}>
          <Label
            className={`${formProperties['ocpp-version']}-label block mb-2 text-heading font-semibold`}
            htmlFor={`${formProperties['ocpp-version']}`}
            labelText={`OCPP Versiyonu`}
          >
            <span className="text-md text-error">*</span>
          </Label>
          <Dropdown
            className={`${formProperties['ocpp-version']}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
            id={`${formProperties['ocpp-version']}`}
            items={[
              { id: 1, name: 'v1.6', rid: null },
              { id: 2, name: 'v2.1', rid: null },
            ]}
            name={`${formProperties['ocpp-version']}`}
            onChange={(event) => {
              setChargeUnitFormData({
                ...chargeUnitFormData,
                [event.target.name]: Number(event.target.value),
              });
            }}
            value={chargeUnitFormData[`${formProperties['ocpp-version']}`]?.toString()}
          />
        </div>
        <div className={`${formProperties.investor}-container`}>
          <Label
            className={`${formProperties.investor}-label block mb-2 text-heading font-semibold`}
            htmlFor={`${formProperties.investor}`}
            labelText={`Yatırımcı`}
          >
            <span className="text-md text-error">*</span>
          </Label>
          <Dropdown
            className={`${formProperties.investor}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
            id={`${formProperties.investor}`}
            items={investors}
            name={`${formProperties.investor}`}
            onChange={(event) => {
              setChargeUnitFormData({
                ...chargeUnitFormData,
                [event.target.name]: Number(event.target.value),
              });
            }}
            value={chargeUnitFormData[`${formProperties.investor}`]?.toString()}
          />
        </div>
        <div className={`${formProperties.status}-container`}>
          <Label
            className={`${formProperties.status}-label block mb-2 text-heading font-semibold`}
            htmlFor={`${formProperties.status}`}
            labelText={`Durum`}
          >
            <span className="text-md text-error">*</span>
          </Label>
          <Dropdown
            className={`${formProperties.status}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
            id={`${formProperties.status}`}
            items={statusList}
            name={`${formProperties.status}`}
            onChange={(event) => {
              setChargeUnitFormData({
                ...chargeUnitFormData,
                [event.target.name]: event.target.value,
              });
            }}
            value={chargeUnitFormData[`${formProperties.status}`]?.toString()}
          />
        </div>
        <div className={`${formProperties['access-type']}-container`}>
          <Label
            className={`${formProperties['access-type']}-label block mb-2 text-heading font-semibold`}
            htmlFor={`${formProperties['access-type']}`}
            labelText={`Erisim Tipi`}
          >
            <span className="text-md text-error">*</span>
          </Label>
          <Dropdown
            className={`${formProperties['access-type']}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
            id={`${formProperties['access-type']}`}
            items={accessTypeList}
            name={`${formProperties['access-type']}`}
            onChange={(event) => {
              setChargeUnitFormData({
                ...chargeUnitFormData,
                [event.target.name]: event.target.value,
              });
            }}
            value={chargeUnitFormData[`${formProperties['access-type']}`]?.toString()}
          />
        </div>
        <div className={`${formProperties.location}-container`}>
          <Label
            className={`${formProperties.location}-label block mb-2 text-heading font-semibold`}
            htmlFor={`${formProperties.location}`}
            labelText={`Konum Tarifi`}
          >
            <span className="text-md text-error">*</span>
          </Label>
          <Input
            className={`${formProperties.location}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
            id={`${formProperties.location}`}
            name={`${formProperties.location}`}
            register={
              register(`${formProperties.location}`, {
                required: 'Şarj Ünitesi Konumu zorunludur.',
                minLength: {
                  value: 3,
                  message: 'En az 3 karakter girmelisiniz.',
                },
                value: chargeUnitFormData[`${formProperties.location}`],
                onChange: (event) => {
                  setChargeUnitFormData({
                    ...chargeUnitFormData,
                    [event.target.name]: event.target.value,
                  });
                }
              })
            }
            type="text"

          />
          {errors[`${formProperties.location}`]
            && errors[`${formProperties.location}`]?.message
            && (
              <div className={`${formProperties.location}-error-wrapper my-4 font-bold text-error`}>
                <p className={`${formProperties.location}-error-message text-error`}>
                  {errors[`${formProperties.location}`]?.message?.toString()}
                </p>
              </div>
            )}
        </div>
        <div className={`${formProperties['is-free-usage']}-container inline-flex flex-col w-1/2`}>
          <h3
            className={`${formProperties['is-free-usage']}-label block mb-2 text-heading font-semibold`}
            id={`${formProperties['is-free-usage']}`}
          >
            Ücretsiz Kullanım
          </h3>
          <div className={`${formProperties['is-free-usage']}-input-container flex`}>
            <div className={`${formProperties['is-free-usage']}-option-container flex w-1/2 items-center mb-4`}>
              <Label
                className={`${formProperties['is-free-usage']}-label block mb-2 text-heading font-semibold block mb-0 pr-4`}
                htmlFor={`${formProperties['is-free-usage']}-yes`}
                labelText={'Var'}
              />
              <Checkbox
                checked={Boolean(chargeUnitFormData[`${formProperties['is-free-usage']}`])}
                className={`${formProperties['is-free-usage']}-input text-blue-500 text-sm block`}
                id={`${formProperties['is-free-usage']}-yes`}
                name={`${formProperties['is-free-usage']}`}
                onChange={(event) => {
                  setChargeUnitFormData({
                    ...chargeUnitFormData,
                    [event.target.name]: event.target.checked,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className={`${formProperties['is-limited-usage']}-container inline-flex flex-col w-1/2`}>
          <h3
            className={`${formProperties['is-limited-usage']}-label block mb-2 text-heading font-semibold`}
            id={`${formProperties['is-limited-usage']}`}
          >
            Sınırlı Kullanım
          </h3>
          <div className={`${formProperties['is-limited-usage']}-inputs-container flex`}>
            <div className={`${formProperties['is-limited-usage']}-option-container flex w-1/2 items-center mb-4`}>
              <Label
                className={`${formProperties['is-limited-usage']}-label block mb-2 text-heading font-semibold block mb-0 pr-4`}
                htmlFor={`${formProperties['is-limited-usage']}-yes`}
                labelText={'Var'}
              />
              <Checkbox
                checked={Boolean(chargeUnitFormData[`${formProperties['is-limited-usage']}`])}
                className={`${formProperties['is-limited-usage']}-input text-blue-500 text-sm block`}
                id={`${formProperties['is-limited-usage']}-yes`}
                name={`${formProperties['is-limited-usage']}`}
                onChange={(event) => {
                  setChargeUnitFormData({
                    ...chargeUnitFormData,
                    [event.target.name]: event.target.checked,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className={`${sectionPrefix}-buttons-container flex justify-end`}>
          <Button
            buttonText={'Kaydet'}
            className={`${formProperties}-submit-button bg-primary text-white rounded-md px-4 py-2`}
            type={'submit'}
          />
        </div>
      </form>
    </div>
  );
};

export default ServicePointDetailsModal;
