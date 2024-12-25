import { Button } from '@projects/button';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import BaseInput from '../../Base/BaseInput';
import BaseSelect from '../../Base/BaseSelect';
import ModalLayout from '../../Modal/Layouts/ModalLayout';
import {
  useAddComissionMutation,
  useGetChargePointInvestorsQuery,
  useGetFractionTypeQuery,
} from '../../../../app/api/services/service-point-details/servicePointDetails.service';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import useModalManager from '../../../../src/hooks/useModalManager';
import { ICommissionFeaturesProps, IStationIdProps } from '../types';
import EventManager from 'apps/head-office/src/managers/Event.manager';

const ComissionModal: React.FC<IStationIdProps> = ({ stationId }: IStationIdProps) => {
  const sectionPrefix: string = `${BRAND_PREFIX}-add-comission-modal`;
  const form = useForm();
  const [addComission] = useAddComissionMutation();
  const { data: tariffFractionList } = useGetFractionTypeQuery({});
  const { data: investors } = useGetChargePointInvestorsQuery({});
  const [comissionFeatures, setComissionFeatures] = useState<ICommissionFeaturesProps>({
    isResellerForServicePoint: false,
    rate: '0',
    reseller: investors?.data?.[0].id,
    tariffFraction: tariffFractionList?.data?.[0].id,
    time: new Date().getTime(),
  });
  const { closeModal } = useModalManager();

  const getInvestors = (): void => (comissionFeatures.reseller = investors?.data?.[0].id);
  const handleFormSubmit = async (): Promise<void> => {
    await addComission({
      body: {
        ownerType: comissionFeatures.reseller || 1,
        forInvestor: comissionFeatures.isResellerForServicePoint,
        tariffSubFractionTypeID: comissionFeatures.tariffFraction,
        rate: Number(comissionFeatures.rate),
        stationId,
        isActive: true,
      },
    });

    EventManager.emit('comission-updated', {});
    closeModal('addComissionModal');
  };

  useEffect(() => {
    getInvestors();
  }, []);

  return (
    <ModalLayout
      className={`${sectionPrefix}-container`}
      contentClassName={`${sectionPrefix}-content flex-col `}
      id={`${sectionPrefix}-container`}
      name={'addComissionModal'}
      title={'Komisyon Ekle'}
    >
      <div className={`${sectionPrefix}-form-container relative p-6 bg-white rounded-lg`}>
        <form className={`${sectionPrefix}-form w-full`} onSubmit={form.handleSubmit(handleFormSubmit)}>
          <div className={`${sectionPrefix}-name-container`}>
            <BaseSelect
              className={`${sectionPrefix}-comission-name border text-text text-sm rounded-lg block w-full mb-4 focus:ring-primary focus:border-primary`}
              form={form}
              id={`${sectionPrefix}-comission-name`}
              name={`${sectionPrefix}-comission-name`}
              items={investors}
              defaultValue={comissionFeatures.reseller}
              label="Lokasyon sahibi cihaz yatirimcisi"
              optionLabel='name'
              optionValue='id'
              onChange={(event) => {
                setComissionFeatures({
                  ...comissionFeatures,
                  reseller: Number(event.target.value),
                });
              }}
            />
          </div>
          <div className={`${sectionPrefix}-rate`}>
            <BaseInput
              containerClassName={`${sectionPrefix}-rate text-text text-sm rounded-lg block w-2/3 focus:ring-primary focus:border-primary`}
              form={form}
              id={`${sectionPrefix}-rate`}
              label="Komisyon Degeri"
              name={`${sectionPrefix}-rate`}
              type={'number'}
              onChange={(event) => {
                setComissionFeatures({
                  ...comissionFeatures,
                  rate: event.target.value,
                });
              }}
            />
          </div>
          <div className={`${sectionPrefix}-is-investor-reseller flex flex-row justify-between`}>
            <BaseInput
              containerClassName={`${sectionPrefix}-is-investor-reseller text-text text-sm rounded-lg block w-2/3 focus:ring-primary focus:border-primary flex`}
              form={form}
              id={`${sectionPrefix}-is-investor-reseller`}
              label="Lokasyon sahibi cihaz yatirimcisi mi?"
              name={`${sectionPrefix}-is-investor-reseller`}
              type={'checkbox'}
              onChange={(event) => {
                setComissionFeatures({
                  ...comissionFeatures,
                  isResellerForServicePoint: event.target.checked,
                });
              }}
            />
          </div>
          <div className={`${sectionPrefix}-tariff-fraction-list-container`}>
            <BaseSelect
              containerClassName={`${sectionPrefix}-tariff-fraction-list text-text text-sm rounded-lg block w-full focus:ring-primary focus:border-primary`}
              form={form}
              id={`${sectionPrefix}-tariff-fraction-list`}
              name={`${sectionPrefix}-tariff-fraction-list`}
              items={tariffFractionList}
              onChange={(event) => {
                setComissionFeatures({
                  ...comissionFeatures,
                  tariffFraction: Number(event.target.value),
                });
              }}
              defaultValue={comissionFeatures.tariffFraction}
              label="Tarife fraksiyonu"
              optionLabel='name'
              optionValue='id'
            />
          </div>
          <div className={`${sectionPrefix}-start-time-container flex flex-row justify-between`}>
            <BaseInput
              containerClassName={`${sectionPrefix}-start-time text-text text-sm rounded-lg block w-2/3 focus:ring-primary focus:border-primary`}
              form={form}
              id={`${sectionPrefix}-start-time`}
              name={`${sectionPrefix}-start-time`}
              type={'datetime-local'}
              onChange={(event) => {
                setComissionFeatures({
                  ...comissionFeatures,
                  time: Number(event.target.value),
                });
              }}
            />
          </div>
          <div className={`${sectionPrefix}-action-button-container flex flex-row justify-between`}>
            <Button
              buttonText="Kaydet"
              className={`${sectionPrefix}-submit-button bg-primary text-white w-full py-2.5 rounded-lg`}
              id="addComissionButton"
              type="submit"
            />
          </div>
        </form>
      </div>
    </ModalLayout>
  );
};

export default ComissionModal;
