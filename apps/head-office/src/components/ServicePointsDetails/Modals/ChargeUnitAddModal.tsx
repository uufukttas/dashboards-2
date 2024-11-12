import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { Checkbox } from '@projects/checkbox';
import { Dropdown } from '@projects/dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { BRAND_PREFIX } from '../../../constants/constants';
import {
  addStationSettingsRequest,
  getChargeUnitDeviceCode,
  getChargeUnitFeatureValuesRequest,
  updateStationSettings
} from '../../../../app/api/servicePointDetails';
import { hideAlert, showAlert } from '../../../../app/redux/features/alertInformation';
import { setChargeUnitData } from '../../../../app/redux/features/chargeUnitData';
import { toggleChargePointDataUpdated } from '../../../../app/redux/features/isChargePointDataUpdated';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { setAddChargeUnit } from '../../../../app/redux/features/setVisibleModal';
import { RootState } from '../../../../app/redux/store';
import type { IFormDataProps, IRequestDataProps, IServicePointDetailsModalProps } from '../types';

const ChargeUnitAddModal = ({ slug }: IServicePointDetailsModalProps) => {
  const formName = ['brands', 'serial-number', 'connector-count', 'ocpp-version', 'is-free-usage', 'is-limited-usage', 'is-roaming', 'investor', 'status', 'access-type', 'location'];
  const sectionPrefix = 'charge-unit';
  const formProperties = {
    brands: `${sectionPrefix}-${formName[0]}`,
    'serial-number': `${sectionPrefix}-${formName[1]}`,
    'connector-count': `${sectionPrefix}-${formName[2]}`,
    'ocpp-version': `${sectionPrefix}-${formName[3]}`,
    'is-free-usage': `${sectionPrefix}-${formName[4]}`,
    'is-limited-usage': `${sectionPrefix}-${formName[5]}`,
    'is-roaming': `${sectionPrefix}-${formName[6]}`,
    investor: `${sectionPrefix}-${formName[7]}`,
    status: `${sectionPrefix}-${formName[8]}`,
    'access-type': `${sectionPrefix}-${formName[9]}`,
    location: `${sectionPrefix}-${formName[10]}`
  };
  const dispatch = useDispatch();
  const { formState: { errors }, handleSubmit, register } = useForm();
  const accessTypeList = useSelector((state: RootState) => state.accessTypeList);
  const brands = useSelector((state: RootState) => state.chargeUnitBrands);
  const chargeUnitData = useSelector((state: RootState) => state.chargeUnitData.chargeUnitData);
  const investors = useSelector((state: RootState) => state.chargeUnitInvestors);
  const statusList = useSelector((state: RootState) => state.statusList);
  const [uniqueBrands, setUniqueBrands] = useState([]);
  const [chargeUnitFormData, setChargeUnitFormData] = useState<IFormDataProps>({
    [`${formProperties['access-type']}`]: chargeUnitData.accessType || '1',
    [`${formProperties['serial-number']}`]: chargeUnitData.serialNumber || '0',
    [`${formProperties.brands}`]: chargeUnitData.brandId || 3,
    [`${formProperties['connector-count']}`]: chargeUnitData.connectorCount || 1,
    [`${formProperties['is-free-usage']}`]: chargeUnitData.isFreeUsage || false,
    [`${formProperties['is-limited-usage']}`]: chargeUnitData.isLimitedUsage || false,
    [`${formProperties['is-roaming']}`]: chargeUnitData.isRoaming || false,
    [`${formProperties.investor}`]: chargeUnitData.investor || 1,
    [`${formProperties.location}`]: chargeUnitData.location || '',
    [`${formProperties['ocpp-version']}`]: chargeUnitData.ocppVersion,
    [`${formProperties.status}`]: chargeUnitData.status || '1',
    ...(chargeUnitData?.code > 0 ? { code: chargeUnitData?.code } : ''),
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const deviceListData = [
    {
      brand: 'Circontrol',
      id: 1,
      name: 'E-Next Elite',
      kw: 22,
      used_kw: 22,
      imageUrl: <img src='https://circontrol.com/wp-content/uploads/2023/03/circontrol-1080x1080-enext-elite-product-1-2048x2048.png' width={75} height={75} />
    }, {
      brand: 'Circontrol',
      id: 2,
      name: 'E-Next Park',
      kw: 22,
      used_kw: 22,
      // imageUrl: 'https://circontrol.com/wp-content/uploads/2023/03/circontrol-1080x1080-enext-park-product.png'
      imageUrl: <img src='https://circontrol.com/wp-content/uploads/2023/03/circontrol-1080x1080-enext-park-product.png' width={75} height={75} />
    }, {
      brand: 'Circontrol',
      id: 3,
      name: 'Raption 100',
      kw: 100,
      used_kw: 100,
      // imageUrl: 'https://circontrol.com/wp-content/uploads/2023/10/R100-300x400-1.png'
      imageUrl: <img src='https://circontrol.com/wp-content/uploads/2023/10/R100-300x400-1.png' width={75} height={75} />
    }, {
      brand: 'HyperCharger',
      id: 4,
      name: 'HYC 50',
      kw: 50,
      used_kw: 50,
      imageUrl: <img src="/HYC_50.png" width={75} height={75} />
    }, {
      brand: 'HyperCharger',
      id: 5,
      name: 'HYC 150',
      kw: 150,
      used_kw: 150,
      imageUrl: <img src="/HYC_150.png" width={75} height={75} />
    }, {
      brand: 'Sinexcel',
      id: 6,
      name: 'SEC 240',
      kw: 240,
      used_kw: 180,
      imageUrl: <img src="https://en.sinexcel.com/evcharger/240w/pic3-1.png?v=1.0" width={75} height={75} />
    }, {
      brand: 'Sinexcel',
      id: 7,
      name: 'SEC 160',
      kw: 160,
      used_kw: 120,
      imageUrl: <img src="/SEC160.png" width={75} height={75} />
    }, {
      brand: 'Sinexcel',
      id: 8,
      name: 'Interstaller',
      kw: 22,
      used_kw: 22,
      imageUrl: <img src='/Interstaller_22.png' width={75} height={75} />
    }
  ];
  const createRequestData = ({ chargePointId, features }: IRequestDataProps) => {
    return ({
      chargePoint: {
        code: chargePointId.toString(),
        ExternalOCPPAdress: null,
        InternalOCPPAdress: null,
        isFreePoint: chargeUnitFormData[`${formProperties['is-free-usage']}`],
        isOnlyDefinedUserCards: chargeUnitFormData[`${formProperties['is-limited-usage']}`],
        ocppVersion: chargeUnitFormData[`${formProperties['ocpp-version']}`],
        ownerType: chargeUnitFormData[`${formProperties.investor}`],
        sendRoaming: chargeUnitFormData[`${formProperties['is-roaming']}`],
        serialNumber: chargeUnitFormData[`${formProperties['serial-number']}`],
        stationId: Number(slug),
        stationChargePointModelID: chargeUnitFormData[`${formProperties.brands}`],
      },
      chargePointFeatures: [
        {
          stationChargePointFeatureType: 1,
          stationChargePointFeatureTypeValue: chargeUnitFormData[`${formProperties.status}`].toString(),
          ...(features.length > 0 && { id: features[0].id }),
        },
        {
          stationChargePointFeatureType: 2,
          stationChargePointFeatureTypeValue: chargeUnitFormData[`${formProperties['access-type']}`].toString(),
          ...(features.length > 0 && { id: features[1].id }),
        }, {
          stationChargePointFeatureType: 3,
          stationChargePointFeatureTypeValue: chargeUnitFormData[`${formProperties.location}`],
          ...(features.length > 0 && { id: features[2].id }),
        }
      ],
      connectorCount: chargeUnitFormData[`${formProperties['connector-count']}`],
    });
  };
  const getChargePointCode = async () => {
    try {
      const response = await getChargeUnitDeviceCode(slug);

      return response;
    } catch (error) {
      return error;
    }
  };
  const getStationFeaturesId = async (chargePointId: string) => {
    try {
      const response = await getChargeUnitFeatureValuesRequest(chargePointId);

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const handleFormSubmit: SubmitHandler<IFormDataProps> = async () => {
    setIsDisabled(true);

    try {
      const chargePointId = chargeUnitData.code ? chargeUnitData.code : await getChargePointCode();
      const features = chargeUnitData.chargePointId ? await getStationFeaturesId(chargeUnitData.chargePointId) : [];

      // const response = (chargeUnitData.code ? await updateStationSettingsRequest() : addStationSettingsRequest())

      let response;

      if (chargeUnitData.code) {
        response = await updateStationSettings(JSON.stringify(createRequestData({ chargePointId, features })), chargePointId.token);
      } else {
        response = await addStationSettingsRequest(JSON.stringify(createRequestData({ chargePointId, features })), chargePointId.token);
      }


      dispatch(
        showAlert({
          message: response?.data.message,
          type: 'success',
        })
      );
      setTimeout(() => dispatch(hideAlert()), 5000);

      dispatch(setAddChargeUnit(false))
      dispatch(
        setChargeUnitData({
          ...chargeUnitData,
          accessType: chargeUnitFormData[`${formProperties['access-type']}`],
          brandId: chargeUnitFormData[`${formProperties.brands}`],
          code: chargePointId,
          connectorCount: chargeUnitFormData[`${formProperties['connector-count']}`],
          location: chargeUnitFormData[`${formProperties.location}`],
          investor: chargeUnitFormData[`${formProperties.investor}`],
          isFreeUsage: chargeUnitFormData[`${formProperties['is-free-usage']}`],
          isLimitedUsage: chargeUnitFormData[`${formProperties['is-limited-usage']}`],
          isRoaming: chargeUnitFormData[`${formProperties['is-roaming']}`],
          ocppVersion: chargeUnitFormData[`${formProperties['ocpp-version']}`],
          serialNumber: chargeUnitFormData[`${formProperties['serial-number']}`],
          status: chargeUnitFormData[`${formProperties.status}`],
        })
      );
      dispatch(toggleModalVisibility(false));
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
        <div className={`${formProperties['serial-number']}-container`}>
          <Label
            className={`${formProperties['serial-number']}-label block mb-2 text-heading font-semibold`}
            htmlFor={`${formProperties['serial-number']}`}
            labelText={`Seri Numarası`}
          >
            <span className="text-md text-error">*</span>
          </Label>
          <Input
            className={`${formProperties['serial-number']}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
            id={`${formProperties['serial-number']}`}
            name={`${formProperties['serial-number']}`}
            register={
              register(
                `${formProperties['serial-number']}`, {
                required: 'Seri numarası zorunludur.',
                minLength: {
                  value: 3,
                  message: 'En az 3 karakter girmelisiniz.',
                },
                value: chargeUnitFormData[`${formProperties['serial-number']}`],
                onChange: (event) => {
                  setChargeUnitFormData({
                    ...chargeUnitFormData,
                    [event.target.name]: event.target.value,
                  });
                }
              }
              )
            }
            type="text"
          />
          {errors[`${formProperties['serial-number']}`] &&
            errors[`${formProperties['serial-number']}`]?.message && (
              <div className={`${formProperties['serial-number']}-error-wrapper my-4 font-bold text-error`}>
                <p className={`${formProperties['serial-number']}-error-message text-error`}>
                  {errors[`${formProperties['serial-number']}`]?.message?.toString()}
                </p>
              </div>
            )}
        </div>
        {
          chargeUnitData.code === '' &&
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
                register(
                  `${formProperties['connector-count']}`, {
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
                  }
                }
                )
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
        }
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
              { id: 1600, name: 'v1.6', rid: null },
              { id: 2100, name: 'v2.1', rid: null },
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
              register(
                `${formProperties.location}`, {
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
              }
              )
            }
            type="text"

          />
          {errors[`${formProperties.location}`] &&
            errors[`${formProperties.location}`]?.message && (
              <div className={`${formProperties.location}-error-wrapper my-4 font-bold text-error`}>
                <p className={`${formProperties.location}-error-message text-error`}>
                  {errors[`${formProperties.location}`]?.message?.toString()}
                </p>
              </div>
            )}
        </div>
        <div className={`${formProperties['is-free-usage']}-container inline-flex flex-col w-1/3`}>
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
        <div className={`${formProperties['is-limited-usage']}-container inline-flex flex-col w-1/3`}>
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
        <div className={`${formProperties['is-roaming']}-container inline-flex flex-col w-1/3`}>
          <h3
            className={`${formProperties['is-roaming']}-label block mb-2 text-heading font-semibold`}
            id={`${formProperties['is-roaming']}`}
          >
            Roaming
          </h3>
          <div className={`${formProperties['is-roaming']}-inputs-container flex`}>
            <div className={`${formProperties['is-roaming']}-option-container flex w-1/2 items-center mb-4`}>
              <Label
                className={`${formProperties['is-roaming']}-label block mb-2 text-heading font-semibold block mb-0 pr-4`}
                htmlFor={`${formProperties['is-roaming']}-yes`}
                labelText={'Var'}
              />
              <Checkbox
                checked={Boolean(chargeUnitFormData[`${formProperties['is-roaming']}`])}
                className={`${formProperties['is-roaming']}-input text-blue-500 text-sm block`}
                id={`${formProperties['is-roaming']}-yes`}
                name={`${formProperties['is-roaming']}`}
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
            className={`charge-unit-submit-button bg-primary text-white rounded-md px-4 py-2`}
            disabled={isDisabled}
            id={`charge-unit-submit-button`}
            type={'submit'}
          />
        </div>
      </form>
    </div>
  );
};

export default ChargeUnitAddModal;
