import { Button } from '@projects/button';
import { Checkbox } from '@projects/checkbox';
import { Dropdown } from '@projects/dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getTariffFractionTypeRequest } from '../../../../app/api/servicePointDetails';
import {
  useAddComissionMutation,
  useGetChargePointInvestorsQuery,
} from '../../../../app/api/services/service-point-details/servicePointDetails.service';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import ModalLayout from '../../Modal/Layouts/ModalLayout';
import useModalManager from 'apps/head-office/src/hooks/useModalManager';

const ComissionModal = ({ stationId }: { stationId: number }) => {
  const sectionPrefix = 'comission-details';
  const form = useForm();
  const [comissionFeatures, setComissionFeatures] = useState<{
    resller: number;
    isResellerForServicePoint: boolean;
    tariffFraction: number;
    rate: number;
  }>({
    resller: 0,
    isResellerForServicePoint: false,
    tariffFraction: 0,
    rate: 0,
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [tariffFractionList, setTariffFractionList] = useState([]);
  const { data: investors } = useGetChargePointInvestorsQuery({});
  const {closeModal} = useModalManager();

  const [addComission] = useAddComissionMutation();

  const getInvestors = async () => {
    comissionFeatures.resller = investors?.data[0].id;
  };

  const getTariffFraction = async () => {
    const tariffFraction = await getTariffFractionTypeRequest();

    setTariffFractionList(tariffFraction);
    comissionFeatures.tariffFraction = tariffFraction[0].id;
  };

  const handleFormSubmit = async () => {
    setIsDisabled(true);

    const response = await addComission({
      body: {
        ownerType: comissionFeatures.resller,
        forInvestor: comissionFeatures.isResellerForServicePoint,
        tariffSubFractionTypeID: comissionFeatures.tariffFraction,
        rate: comissionFeatures.rate,
        stationId,
        isActive: true,
      },
    });

    closeModal('addComissionModal');
  };

  useEffect(() => {
    getInvestors();
    getTariffFraction();
  }, []);

  return (
    <ModalLayout
      className={`${sectionPrefix}-container`}
      contentClassName={`${sectionPrefix}-content flex-col `}
      id={`${sectionPrefix}-container`}
      name={'addComissionModal'}
      title={'Komisyon Ekle'}
    >
      <div className={`${BRAND_PREFIX}-${sectionPrefix}-modal-form-container relative p-6 bg-white rounded-lg`}>
        <form
          className={`${BRAND_PREFIX}-add-${sectionPrefix}-form w-full`}
          onSubmit={form.handleSubmit(handleFormSubmit)}
        >
          <div className={`${sectionPrefix}-container`}>
            <Label
              className={`${sectionPrefix}-label block mb-2 text-heading font-semibold`}
              htmlFor={``}
              labelText={`İstasyon Komisyon Tanimlama`}
            >
              <span className="text-md text-error">*</span>
            </Label>
            <Dropdown
              className="border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary"
              id="comission-details-service-point"
              name="comission-details-service-point"
              items={investors}
              onChange={(event) => {
                setComissionFeatures({
                  ...comissionFeatures,
                  resller: Number(event.target.value),
                });
              }}
              value={comissionFeatures.resller}
            />

            <div className="flex flex-row justify-between">
              <Label
                className={`${sectionPrefix}-label block mb-2 text-heading font-semibold w-2/3`}
                htmlFor={``}
                labelText={`Cihaz Yatirimcisi mi?`}
              >
                <span className="text-md text-error">*</span>
              </Label>
              <Checkbox
                className="border text-text text-sm rounded-lg block p-2.5 mb-4 focus:ring-primary focus:border-primary"
                id={`${sectionPrefix}-is-reseller`}
                name={`${sectionPrefix}-is-reseller`}
                onChange={(event) => {
                  setComissionFeatures({
                    ...comissionFeatures,
                    isResellerForServicePoint: event.target.checked,
                  });
                }}
                checked={comissionFeatures.isResellerForServicePoint}
              />
            </div>
            <Label
              className={`${sectionPrefix}-label block mb-2 text-heading font-semibold`}
              htmlFor={``}
              labelText={`Alt Kirilmlari seciniz`}
            />
            <Dropdown
              className=" border text-text text-sm rounded-lg w-full block p-2.5 mb-4 focus:ring-primary focus:border-primary"
              id="comission-details-service-point"
              name="comission-details-service-point"
              items={tariffFractionList}
              onChange={(event) => {
                setComissionFeatures({
                  ...comissionFeatures,
                  tariffFraction: Number(event.target.value),
                });
              }}
            />
            <Label
              className={`${sectionPrefix}-label block mb-2 text-heading font-semibold`}
              htmlFor={``}
              labelText={`Yuzde`}
            />
            <Input
              className={`${sectionPrefix}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
              id={`${sectionPrefix}-datetime`}
              name={`${sectionPrefix}-datetime`}
              type="number"
              value={comissionFeatures.rate.toString()}
              onChange={(event) => {
                setComissionFeatures({
                  ...comissionFeatures,
                  rate: Number(event.target.value),
                });
              }}
            />
            <Button
              buttonText="Kaydet"
              className={`-button bg-primary text-white w-full py-2.5 rounded-lg`}
              disabled={isDisabled}
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
