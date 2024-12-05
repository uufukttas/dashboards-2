import { Button } from '@projects/button';
import { Checkbox } from '@projects/checkbox';
import { Dropdown } from '@projects/dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getChargePointInvestors, getTariffFractionTypeRequest } from '../../../../app/api/servicePointDetails';
import { hideAlert, showAlert } from '../../../../app/redux/features/alertInformation';
import { toggleComissionListUpdate } from '../../../../app/redux/features/isComissionListUpdated';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { setAddComission } from '../../../../app/redux/features/setVisibleModal';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import { useAddComissionMutation } from 'apps/head-office/app/api/services/service-point-details/servicePointDetails.service';

const ComissionModal = ({ slug }: { slug: number }) => {
  const dispatch = useDispatch();
  const sectionPrefix = 'comission-details';
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
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
  const [investorList, setInvestorList] = useState([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [tariffFractionList, setTariffFractionList] = useState([]);

  const [addComission] = useAddComissionMutation();

  const getInvestors = async () => {
    const investors = await getChargePointInvestors();

    setInvestorList(investors.data);
    comissionFeatures.resller = investors.data[0].id;
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
        stationId: slug.toString(),
        isActive: true,
      },
    });

    dispatch(
      showAlert({
        alertType: 'success',
        message: 'İstasyon komisyon bilgileri basariyla eklendi.',
      }),
    );
    dispatch(toggleModalVisibility(false));
    setTimeout(() => {
      dispatch(hideAlert());
    }, 5000);
    dispatch(toggleComissionListUpdate(true));
    dispatch(setAddComission(false));
  };

  useEffect(() => {
    getInvestors();
    getTariffFraction();
  }, []);

  return (
    <div className={`${BRAND_PREFIX}-${sectionPrefix}-modal-form-container relative p-6 bg-white rounded-lg`}>
      <form className={`${BRAND_PREFIX}-add-${sectionPrefix}-form w-full`} onSubmit={handleSubmit(handleFormSubmit)}>
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
            items={investorList}
            onChange={(event) => {
              setComissionFeatures({
                ...comissionFeatures,
                resller: Number(event.target.value),
              });
            }}
            value={comissionFeatures.resller.toString()}
          />
          {errors[`${sectionPrefix}`] && errors[`${sectionPrefix}`]?.message && (
            <div className={`${sectionPrefix}-error-wrapper my-4 font-bold text-error`}>
              <p className={`${sectionPrefix}-error-message text-error`}>
                {errors[`${sectionPrefix}`]?.message?.toString()}
              </p>
            </div>
          )}
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
  );
};

export default ComissionModal;
