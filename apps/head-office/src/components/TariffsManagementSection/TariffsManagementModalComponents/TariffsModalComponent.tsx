import { Tariff } from 'apps/head-office/app/api/services/tarrifs/tarrif.interface';
import { useCreateTariffMutation } from 'apps/head-office/app/api/services/tarrifs/tarrif.service';
import useModalManager from 'apps/head-office/src/hooks/useModalManager';
import { isNil } from 'lodash';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaCircleInfo } from 'react-icons/fa6';
import BaseInput from '../../Base/BaseInput';
import ModalLayout from '../../Modal/Layouts/ModalLayout';
import { IModalLayoutButtonProps } from '../../Modal/Layouts/ModalLayout.interface';
import { BRAND_PREFIX } from 'apps/head-office/src/constants/constants';
import { Button } from '@projects/button';

interface TariffsModalComponentProps {
  tariffData?: Tariff;
  onAddTariff?: () => void;
}

const TariffsModalComponent: React.FC<TariffsModalComponentProps> = ({ tariffData, onAddTariff }) => {
  // const hasTariffDataId: boolean = !isNil(tariffData?.id) && tariffData?.id > 0;
  const [addTariffRequest] = useCreateTariffMutation();
  const { closeModal } = useModalManager();
  const form = useForm({
    defaultValues: {
      name: tariffData?.name || '',
      min: tariffData?.minKW || '',
      max: tariffData?.maxKW || '',
      price: tariffData?.saleUnitPrice || '',
      vat: '20',
      serviceRevenue: false,
      energyCost: true,
      isDateSelected: !isNil(tariffData?.validityBeginDate) ? true : false,
      startDate: tariffData?.validityBeginDate || '',
      endDate: tariffData?.validityEndDate || '',
    },
  });
  const { handleSubmit } = form;

  const handleFormSubmit = (data: any) => {
    const requestData = {
      tariff: {
        name: data.name,
        validityBeginDate: data.startDate,
        validityEndDate: data.endDate,
        minKW: data.min,
        maxKW: data.max,
        saleUnitPrice: data.price,
      },
      subfraction: [
        {
          tariffSubFractionType: 11,
          subFractionValue: data.serviceRevenue ? 1 : 0,
        },
        {
          tariffSubFractionType: 8,
          subFractionValue: data.vat,
        },
        {
          tariffSubFractionType: 1,
          subFractionValue: data.energyCost ? 1 : 0,
        },
      ],
    };

    addTariffRequest({
      body: requestData,
    })
      .unwrap()
      .then(() => {
        onAddTariff?.();
        closeModal('addTariff');
      })
  };

  const buttons: IModalLayoutButtonProps[] = [
    {
      key: 'submitButton',
      label: 'Kaydet',
      onClick: () => handleSubmit(handleFormSubmit)(),
    },
  ];

  return (
    <ModalLayout name="addTariff" title="Tarife Ekle" buttons={buttons} footerVisible>
      <form className={''} onSubmit={handleSubmit(handleFormSubmit)}>
        <div className={`flex flex-col gap-4`}>
          <BaseInput
            id="name"
            name="name"
            form={form}
            label="Tarife Adı"
            placeholder="Tarife Adı"
            rules={{ required: 'Tarife Adı zorunlu' }}
            type='text'
          />
          <div className="flex flex-row gap-4">
            <BaseInput
              id="min"
              form={form}
              name="min"
              label="Enerji Minimum Aralığı"
              placeholder="Enerji Minimum Aralığı"
              rules={{ required: 'Minimum Aralik zorunlu' }}
              type="number"
              containerClassName="w-1/2"
            />
            <BaseInput
              id="max"
              name="max"
              form={form}
              label="Enerji Maximum Aralığı"
              placeholder="Enerji Maximum Aralığı"
              rules={{ required: 'Maximum Aralik zorunlu' }}
              type="number"
              containerClassName="w-1/2"
            />
          </div>
        </div>
        <div className={`w-full flex flex-row gap-4`}>
          <BaseInput
            id="price"
            name="price"
            form={form}
            label="Fiyat (KDV Dahil)"
            placeholder="Fiyat (KDV Dahil)"
            rules={{ required: 'Fiyat zorunlu' }}
            containerClassName="w-1/2"
            type="text"
          />
          <BaseInput
            id="vat"
            name="vat"
            form={form}
            label="KDV"
            placeholder="KDV"
            rules={{ required: 'KDV zorunlu' }}
            containerClassName="w-1/2"
            type="text"
          />
        </div>
        <div className={`w-full`}>
          <div className={`w-full items-center flex`}>
            <BaseInput
              id="serviceRevenue"
              name="serviceRevenue"
              form={form}
              label="Hizmet Geliri raporlansın mı?"
              type="checkbox"
              inputClassName="cursor-pointer"
            />
          </div>
          <div className={`w-full items-center flex flex-col`}>
            <div className="w-full flex">
              <BaseInput
                id="energyCost"
                name="energyCost"
                form={form}
                label="Birim Enerji Maliyeti raporlansın mı?"
                type="checkbox"
                inputClassName="cursor-pointer"
              />
            </div>
            <div>
              {
                <div className="error text-red flex items-center justify-between ">
                  <FaCircleInfo className="w-1/12" />
                  <p className="w-11/12">
                    İşaretlenmediği takdirde enerji maliyeti bilgisi raporlama ekranında gösterilmeyecektir
                  </p>
                </div>
              }
            </div>
          </div>
          <BaseInput
            id="isDateSelected"
            name="isDateSelected"
            form={form}
            label="Tarih ayarı var mı?"
            type="checkbox"
            inputClassName="cursor-pointer"
          />
        </div>
        {form.watch('isDateSelected') && (
          <div className={`flex gap-4`}>
            <div className={`w-1/2`}>
              <BaseInput
                id="startDate"
                name="startDate"
                form={form}
                label="Baslangıç Tarihi"
                type="date"
                rules={{ required: 'Baslangıç Tarihi zorunlu' }}
                inputClassName="cursor-pointer"
              />
            </div>
            <div className={`w-1/2`}>
              <BaseInput
                id="endDate"
                name="endDate"
                form={form}
                label="Bitiş Tarihi"
                type="date"
                rules={{ required: 'Bitiş Tarihi zorunlu' }}
                inputClassName="cursor-pointer"
              />
            </div>
          </div>
        )}
        <div className={`${BRAND_PREFIX}-tariffs-management-modal-buttons-container flex flex-row gap-4`}>
          <Button
            className={`${BRAND_PREFIX}-tariffs-management-modal-buttons-container-button bg-primary text-white text-sm rounded-lg block p-2.5`}
            id="addTariff"
            type="button"
            buttonText="Tarife Ekle"
            onClick={() => handleSubmit(handleFormSubmit)()}
          />
        </div>
      </form>
    </ModalLayout>
  );
};

export default TariffsModalComponent;
