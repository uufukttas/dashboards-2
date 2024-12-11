import { Button } from '@projects/button';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useGetDeviceBrandsQuery, useGetDeviceModelsQuery } from '../../../../app/api/services/devices/devices.service';
import {
  useAddStationSettingsMutation,
  useGetChargePointFeatureStatusQuery,
  useGetChargePointInvestorsQuery,
  useGetChargeUnitsMutation,
  useGetDeviceCodeMutation,
} from '../../../../app/api/services/service-point-details/servicePointDetails.service';
import useModalManager from '../../../../src/hooks/useModalManager';
import { BRAND_PREFIX } from '../../../constants/constants';
import BaseInput from '../../Base/BaseInput';
import BaseSelect from '../../Base/BaseSelect';
import ModalLayout from '../../Modal/Layouts/ModalLayout';
import type { IChargeUnitAddModalProps, IFormDataProps } from '../types';

const ChargeUnitAddModal: React.FC<IChargeUnitAddModalProps> = ({
  chargePointId = 0,
  stationId,
}: IChargeUnitAddModalProps) => {
  const formName: string[] = [
    'brand-id',
    'model-id',
    'serial-number',
    'is-charge-unit-code-visibility',
    'charge-unit-code',
    'connector-count',
    'ocpp-version',
    'is-free-usage',
    'is-limited-usage',
    'is-roaming',
    'investor',
    'status',
    'access-type',
    'location',
  ];
  const sectionPrefix: string = `${BRAND_PREFIX}-add-charge-unit-modal`;
  const formProperties: IFormDataProps = {
    'brand-id': `${sectionPrefix}-${formName[0]}`,
    'model-id': `${sectionPrefix}-${formName[1]}`,
    'serial-number': `${sectionPrefix}-${formName[2]}`,
    'is-charge-unit-code-visibility': `${sectionPrefix}-${formName[3]}`,
    'charge-unit-code': `${sectionPrefix}-${formName[4]}`,
    'connector-count': `${sectionPrefix}-${formName[5]}`,
    'ocpp-version': `${sectionPrefix}-${formName[6]}`,
    'is-free-usage': `${sectionPrefix}-${formName[7]}`,
    'is-limited-usage': `${sectionPrefix}-${formName[8]}`,
    'is-roaming': `${sectionPrefix}-${formName[9]}`,
    investor: `${sectionPrefix}-${formName[10]}`,
    status: `${sectionPrefix}-${formName[11]}`,
    'access-type': `${sectionPrefix}-${formName[12]}`,
    location: `${sectionPrefix}-${formName[13]}`,
  };
  const initialChargeUnitFormData: { [key: string]: number | string | boolean } = {
    [`${formProperties['access-type']}`]: '1',
    [`${formProperties['serial-number']}`]: '',
    [`${formProperties['brand-id']}`]: 3,
    [`${formProperties['model-id']}`]: 1,
    [`${formProperties['is-charge-unit-code-visibility']}`]: false,
    [`${formProperties['charge-unit-code']}`]: 0,
    [`${formProperties['connector-count']}`]: 1,
    [`${formProperties['is-free-usage']}`]: false,
    [`${formProperties['is-limited-usage']}`]: false,
    [`${formProperties['is-roaming']}`]: false,
    [`${formProperties.investor}`]: 1,
    [`${formProperties.location}`]: '',
    [`${formProperties['ocpp-version']}`]: 1600,
    [`${formProperties.status}`]: '1',
  };
  const form = useForm();
  const [addStationSettings] = useAddStationSettingsMutation();
  const { data: chargePointFeatureStatus } = useGetChargePointFeatureStatusQuery({});
  const { data: investors } = useGetChargePointInvestorsQuery({});
  const [getChargeUnits, { data: chargeUnits }] = useGetChargeUnitsMutation();
  const { data: brands } = useGetDeviceBrandsQuery({});
  const [getDeviceCode] = useGetDeviceCodeMutation();

  const [updatedChargeUnit, setUpdatedChargeUnit] = useState<IFormDataProps>(initialChargeUnitFormData);
  const [chargeUnitFormData, setChargeUnitFormData] = useState<IFormDataProps>(updatedChargeUnit);
  const { data: models, refetch: refetchModels } = useGetDeviceModelsQuery(
    Number(chargeUnitFormData[`${formProperties['brand-id']}`]),
  );
  const { closeModal } = useModalManager();
  const [isvisible, setIsVisible] = useState(false);

  const getChargeUnit = async (): Promise<void> => {
    await getChargeUnits({ body: { stationId, PageNumber: 1, PageSize: 10 } })
      .unwrap()
      .then((chargeUnits) => {
        const updatedChargeUnit = chargeUnits?.find((chargeUnit) => chargeUnit.chargePointId === chargePointId);

        updatedChargeUnit &&
          setUpdatedChargeUnit({
            [`${formProperties['access-type']}`]: updatedChargeUnit.accessType,
            [`${formProperties['serial-number']}`]: updatedChargeUnit.serialNumber,
            [`${formProperties['brand-id']}`]: updatedChargeUnit.brandId,
            [`${formProperties['model-id']}`]: updatedChargeUnit.modelId,
            [`${formProperties['is-charge-unit-code-visibility']}`]: false,
            [`${formProperties['charge-unit-code']}`]: updatedChargeUnit.deviceCode,
            [`${formProperties['connector-count']}`]: updatedChargeUnit.connectorNumber,
            [`${formProperties['is-free-usage']}`]: updatedChargeUnit.isFreePoint,
            [`${formProperties['is-limited-usage']}`]: updatedChargeUnit.limitedUsage,
            [`${formProperties['is-roaming']}`]: updatedChargeUnit.sendRoaming,
            [`${formProperties.investor}`]: updatedChargeUnit.investor,
            [`${formProperties.location}`]: updatedChargeUnit.location,
            [`${formProperties['ocpp-version']}`]: updatedChargeUnit.ocppVersion,
            [`${formProperties.status}`]: updatedChargeUnit.status,
          });
      });
    setIsVisible(true);
  };

  const createRequestData = () => {
    return {
      chargePoint: {
        code: chargeUnitFormData[`${formProperties['charge-unit-code']}`]?.toString() || '',
        ExternalOCPPAdress: null,
        InternalOCPPAdress: null,
        isFreePoint: chargeUnitFormData[`${formProperties['is-free-usage']}`],
        isOnlyDefinedUserCards: chargeUnitFormData[`${formProperties['is-limited-usage']}`],
        ocppVersion: chargeUnitFormData[`${formProperties['ocpp-version']}`],
        ownerType: chargeUnitFormData[`${formProperties.investor}`],
        sendRoaming: chargeUnitFormData[`${formProperties['is-roaming']}`],
        serialNumber: chargeUnitFormData[`${formProperties['serial-number']}`]?.toString() || '',
        stationId,
        stationChargePointModelID: chargeUnitFormData[`${formProperties['model-id']}`],
      },
      chargePointFeatures: [
        {
          stationChargePointFeatureType: 1,
          stationChargePointFeatureTypeValue: chargeUnitFormData[`${formProperties.status}`]?.toString(),
          // ...(features.length > 0 && { id: features[0].id }),
        },
        {
          stationChargePointFeatureType: 2,
          stationChargePointFeatureTypeValue: chargeUnitFormData[`${formProperties['access-type']}`]?.toString(),
          // ...(features.length > 0 && { id: features[1].id }),
        },
        {
          stationChargePointFeatureType: 3,
          stationChargePointFeatureTypeValue: chargeUnitFormData[`${formProperties.location}`],
          // ...(features.length > 0 && { id: features[2].id }),
        },
      ],
      connectorCount: chargeUnitFormData[`${formProperties['connector-count']}`],
    };
  };

  const checkboxElementName = [
    `${formProperties['is-free-usage']}`,
    `${formProperties['is-limited-usage']}`,
    `${formProperties['is-roaming']}`,
    `${formProperties['is-charge-unit-code-visibility']}`,
  ];
  const handleFormSubmit: SubmitHandler<IFormDataProps> = async () => {
    event?.preventDefault();

    if (!chargeUnitFormData[`${formProperties['is-charge-unit-code-visibility']}`]) {
      const { data } = await getDeviceCode({ body: { stationId } });

      //  @ts-ignore
      chargeUnitFormData[`${formProperties['charge-unit-code']}`] = data?.data || '';
    }

    // @ts-ignore
    await addStationSettings({ body: createRequestData() });

    closeModal('addChargeUnitModal');
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setChargeUnitFormData({
      ...chargeUnitFormData,
      // @ts-ignore
      [event.target.name]: checkboxElementName.includes(event.target.name) ? event.target.checked : event.target.value,
    });
  };

  useEffect(() => {
    refetchModels().then((response) => {
      setChargeUnitFormData({
        ...chargeUnitFormData,
        // @ts-ignore
        [`${formProperties['model-id']}`]: response?.data[0].id,
      });
    });
  }, [chargeUnitFormData[`${formProperties['brand-id']}`]]);

  useEffect(() => {
    if (chargePointId) {
      getChargeUnit();
    }
  }, []);

  return (
    <ModalLayout
      className={`${sectionPrefix}-container`}
      contentClassName={`${sectionPrefix}-content flex-col `}
      id={`${sectionPrefix}-container`}
      name={'addChargeUnitModal'}
      title={'Şarj Ünitesi Ekle'}
    >
      <div className={`${sectionPrefix}-form-container relative p-2 bg-white rounded-lg`}>
        <form className={`${sectionPrefix}-form w-full`} onSubmit={form.handleSubmit(handleFormSubmit)}>
          <div className={`${formProperties['brand-id']}-container`}>
            <BaseSelect
              className={`${formProperties['brand-id']}-input flex border text-text text-sm rounded-lg block w-full mb-4 focus:ring-primary focus:border-primary`}
              form={form}
              defaultValue={brands?.[0]?.id}
              id={`${formProperties['brand-id']}`}
              items={brands}
              label={'Şarj Ünitesi Markası'}
              name={`${formProperties['brand-id']}`}
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div className={`${formProperties['model-id']}-container`}>
            <BaseSelect
              className={`${formProperties['model-id']}-input flex border text-text text-sm rounded-lg block w-full mb-4 focus:ring-primary focus:border-primary`}
              form={form}
              //  @ts-ignore
              defaultValue={models?.[0]?.id}
              id={`${formProperties['model-id']}`}
              items={models}
              label={'Şarj Ünitesi Modeli'}
              name={`${formProperties['model-id']}`}
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div className={`${formProperties['is-charge-unit-code-visibility']}-container`}>
            <BaseInput
              form={form}
              id={`${formProperties['is-charge-unit-code-visibility']}`}
              label={'Şarj Ünitesi Kodu Gir'}
              name={`${formProperties['is-charge-unit-code-visibility']}`}
              type="checkbox"
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          {chargeUnitFormData[`${formProperties['is-charge-unit-code-visibility']}`] && (
            <div className={`${formProperties['charge-unit-code']}-container`}>
              <BaseInput
                form={form}
                id={`${formProperties['charge-unit-code']}`}
                label={'Şarj Ünitesi Kodu'}
                name={`${formProperties['charge-unit-code']}`}
                type="text"
                onChange={(event) => handleInputChange(event)}
              />
            </div>
          )}
          <div className={`${formProperties['serial-number']}-container`}>
            <BaseInput
              form={form}
              id={`${formProperties['serial-number']}`}
              label={'Şarj Ünitesi Seri Numarası'}
              name={`${formProperties['serial-number']}`}
              type="text"
              onChange={(event) => handleInputChange(event)}
              rules={{ required: `Seri numarasi zorunludur` }}
            />
          </div>
          {}
          {
            <div className={`${formProperties['connector-count']}-container`}>
              <BaseInput
                form={form}
                id={`${formProperties['connector-count']}`}
                label={`Konnektör Sayısı`}
                name={`${formProperties['connector-count']}`}
                type="number"
                onChange={(event) => handleInputChange(event)}
              />
            </div>
          }
          <div className={`${formProperties['ocpp-version']}-container`}>
            <BaseSelect
              className={`${formProperties['ocpp-version']}-input border text-text text-sm rounded-lg block w-full mb-4 focus:ring-primary focus:border-primary`}
              form={form}
              defaultValue={1600}
              id={`${formProperties['ocpp-version']}`}
              items={[
                { id: 1600, name: 'v1.6' },
                { id: 2100, name: 'v2.1' },
              ]}
              label={`OCPP Versiyonu`}
              name={`${formProperties['ocpp-version']}`}
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div className={`${formProperties.investor}-container`}>
            <BaseSelect
              className={`${formProperties.investor}-input border text-text text-sm rounded-lg block w-full mb-4 focus:ring-primary focus:border-primary`}
              form={form}
              defaultValue={investors?.[0]?.id}
              id={`${formProperties.investor}`}
              items={investors}
              label={`Yatırımcı`}
              name={`${formProperties.investor}`}
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div className={`${formProperties.status}-container`}>
            <BaseSelect
              className={`${formProperties.status}-input border text-text text-sm rounded-lg block w-full mb-4 focus:ring-primary focus:border-primary`}
              form={form}
              defaultValue={chargePointFeatureStatus.statusList?.[0]?.id}
              id={`${formProperties.status}`}
              items={chargePointFeatureStatus?.statusList}
              label={`Durum`}
              name={`${formProperties.status}`}
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div className={`${formProperties['access-type']}-container`}>
            <BaseSelect
              className={`${formProperties['access-type']}-input border text-text text-sm rounded-lg block w-full mb-4 focus:ring-primary focus:border-primary`}
              form={form}
              defaultValue={chargePointFeatureStatus.accessTypeList?.[0]?.id}
              id={`${formProperties['access-type']}`}
              items={chargePointFeatureStatus?.accessTypeList}
              label={`Erisim Tipi`}
              name={`${formProperties['access-type']}`}
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div className={`${formProperties.location}-container`}>
            <BaseInput
              form={form}
              id={`${formProperties.location}`}
              label={`Konum Tarifi`}
              name={`${formProperties.location}`}
              type="text"
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div className={`${sectionPrefix}-options-container flex justify-end`}>
            <div className={`${formProperties['is-free-usage']}-container inline-flex flex-col w-1/3`}>
              <BaseInput
                form={form}
                id={`${formProperties['is-free-usage']}`}
                label={'Ücretsiz Kullanım'}
                name={`${formProperties['is-free-usage']}`}
                type="checkbox"
                onChange={(event) => handleInputChange(event)}
              />
            </div>
            <div className={`${formProperties['is-limited-usage']}-container inline-flex flex-col w-1/3`}>
              <BaseInput
                form={form}
                id={`${formProperties['is-limited-usage']}`}
                label={'Sınırlı Kullanım'}
                name={`${formProperties['is-limited-usage']}`}
                type="checkbox"
                onChange={(event) => handleInputChange(event)}
              />
            </div>
            <div className={`${formProperties['is-roaming']}-container inline-flex flex-col w-1/3`}>
              <BaseInput
                form={form}
                id={`${formProperties['is-roaming']}`}
                label={'Roaming'}
                name={`${formProperties['is-roaming']}`}
                type="checkbox"
                onChange={(event) => handleInputChange(event)}
              />
            </div>
          </div>
          <div className={`${sectionPrefix}-buttons-container flex justify-end`}>
            <Button
              buttonText={'Kaydet'}
              className={`charge-unit-submit-button bg-primary text-white rounded-md px-4 py-2`}
              disabled={false}
              id={`charge-unit-submit-button`}
              type={'submit'}
            />
          </div>
        </form>
      </div>
    </ModalLayout>
  );
};

export default ChargeUnitAddModal;
