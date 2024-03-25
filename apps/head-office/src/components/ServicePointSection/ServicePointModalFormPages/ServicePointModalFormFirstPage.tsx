import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { Dropdown } from '@projects/dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { toggleServicePointDataUpdated } from '../../../../app/redux/features/isServicePointDataUpdated';
import { setServicePointData } from '../../../../app/redux/features/servicePointData';
import { RootState } from '../../../../app/redux/store';
import { BRAND_PREFIX } from '../../../../src/constants/constants';

interface IFormDataProps {
  [key: string]: boolean | number | string | string[];
};

interface IModalPageInputs {
  activePage: number;
  stationId: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  setStationId: React.Dispatch<React.SetStateAction<number>>;
};

const ServicePointModalFormFirstPage = ({
  activePage,
  stationId,
  setActivePage,
  setStationId,
}: IModalPageInputs) => {
  const dispatch = useDispatch();
  const { formState: { errors }, handleSubmit, register } = useForm();
  const servicePointData = useSelector((state: RootState) => state.servicePointData.servicePointData);
  const [companies, setCompanies] = useState<{ id: number; name: string; rid: null; }[]>([]);
  const [resellers, setResellers] = useState<{ id: number; name: string; rid: null; }[]>([]);
  const formName = ['name', 'reseller', 'company'];
  const hasServicePointDataId = servicePointData.id > 0;
  const hasStationId = stationId !== 0;
  const sectionPrefix = 'service-point';
  const formProperties = {
    name: `${sectionPrefix}-${formName[0]}`,
    reseller: `${sectionPrefix}-${formName[1]}`,
    company: `${sectionPrefix}-${formName[2]}`,
  };
  const [firstPageFormData, setFirstPageFormData] = useState<IFormDataProps>({
    [`${formProperties.name}`]: servicePointData.name || '',
    [`${formProperties.reseller}`]: servicePointData.resellerCompanyId || 1,
    [`${formProperties.company}`]: servicePointData.companyId || 1,
  });

  const createServicePointConfigData = () => ({
    name: firstPageFormData[`${formProperties.name}`],
    resellerCompanyId: firstPageFormData[`${formProperties.reseller}`],
    companyId: firstPageFormData[`${formProperties.company}`],
    isActive: true,
    ...(hasServicePointDataId && { id: servicePointData.id }),
  });
  const getDropdownItems = async (dropdownDataUrl: string) => {
    try {
      await axios
        .get(dropdownDataUrl)
        .then((response) => response.data)
        .then((data) =>
          dropdownDataUrl.indexOf('Companies') > -1
            ? setCompanies(data.data)
            : setResellers(data.data),
        )
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFirstPageFormData({
      ...firstPageFormData,
      [event.target.name]: Number(event.target.value),
    });
  };
  const handleFormSubmit: SubmitHandler<IFormDataProps> = async () => {
    if (stationId !== 0) {
      setActivePage(activePage + 1);

      return;
    }

    handleServicePointOperation();
  };
  const handleServicePointOperation = async () => {
    const actionURL = hasServicePointDataId
      ? process.env.UPDATE_STATION_URL || ''
      : process.env.ADD_STATION_URL || '';
    const actionData = createServicePointConfigData();

    try {
      await axios
        .post(actionURL, actionData, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => response.data)
        .then((data) => {
          if (hasServicePointDataId) {
            setStationId(servicePointData.id);
          } else {
            setStationId(data.data[0].id)
          }

          dispatch(
            setServicePointData({
              ...servicePointData,
              id: servicePointData.id || data.data[0].id,
              name: firstPageFormData[`${formProperties.name}`],
              resellerCompanyId: firstPageFormData[`${formProperties.reseller}`],
              companyId: firstPageFormData[`${formProperties.company}`]
            })
          );
          dispatch(toggleServicePointDataUpdated(true));
          setActivePage(activePage + 1);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (resellers.length === 0 && companies.length === 0) {
      getDropdownItems(process.env.GET_RESELLERS_URL || '');
      getDropdownItems(process.env.GET_COMPANIES_URL || '');
    }
  }, []);

  return (
    companies &&
    resellers && (
      <form
        className={`${BRAND_PREFIX}-modal-form-page-1 ${activePage === 1 ? 'block' : 'hidden'}`}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className={`${formProperties.name}-container`}>
          <Label
            className={`${formProperties.name}-label block mb-2 text-heading`}
            htmlFor={`${formProperties.name}`}
            labelText={`Lokasyon Ismi`}
          >
            <span className="text-md text-error">*</span>
          </Label>
          <Input
            className={`${formProperties.name}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary hover:${
              hasStationId
                ? 'cursor-not-allowed'
                : ''
              }`
            }
            disabled={hasStationId}
            id={`${formProperties.name}`}
            name={`${formProperties.name}`}
            register={
              register(`${formProperties.name}`, {
                minLength: {
                  value: 3,
                  message: 'En az 3 karakter girmelisiniz.',
                },
                required: `Lokasyon Ismi zorunludur.`,
                value: firstPageFormData[`${formProperties.name}`].toString(),
                onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                  setFirstPageFormData({
                    ...firstPageFormData,
                    [event.target.name]: event.target.value,
                  });
                },
              })}
            type={`text`}
          />
          {errors[`${formProperties.name}`]
            && errors[`${formProperties.name}`]?.message
            && (
              <div className={`${formProperties.name}-error-wrapper my-4 font-bold text-error`}>
                <p className={`${formProperties.name}-error-message text-error`}>
                  {errors[`${formProperties.name}`]?.message?.toString()}
                </p>
              </div>
            )}
        </div>
        <div className={`${formProperties.company}-container`}>
          <Label
            className={`${formProperties.company}-label block mb-2 text-heading font-semibold`}
            htmlFor={`${formProperties.company}`}
            labelText={`Isletme`}
          >
            <span className="text-md text-error">*</span>
          </Label>
          <Dropdown
            className={`${formProperties.company}-input border text-text text-sm rounded-lg block w-full focus:ring-primary focus:border-primary p-2.5 mb-4 hover:${
              hasStationId
                ? 'cursor-not-allowed'
                : ''
              }`
            }
            disabled={hasStationId}
            id={`${formProperties.company}`}
            items={companies}
            name={`${formProperties.company}`}
            onChange={handleDropdownChange}
            optionClassName={`hover:bg-primary-lighter hover:text-black`}
            selectedValue={
              hasServicePointDataId
                ? servicePointData.companyId.toString()
                : hasStationId
                  ? servicePointData[`${formProperties.company}`]?.toString()
                  : companies[0]
            }
            value={servicePointData[`${formProperties.company}`]?.toString()}
          />
        </div>
        <div className={`${formProperties.reseller}-container`}>
          <Label
            className={`${formProperties.reseller}-label block mb-2 text-heading font-semibold`}
            htmlFor={`${formProperties.reseller}`}
            labelText={`Bayi`}
          >
            <span className="text-md text-error">*</span>
          </Label>
          <Dropdown
            className={`${formProperties.reseller}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary hover:${
              hasStationId
                ? 'cursor-not-allowed'
                : ''
              }`
            }
            disabled={hasStationId}
            id={`${formProperties.reseller}`}
            items={resellers}
            name={`${formProperties.reseller}`}
            onChange={handleDropdownChange}
            selectedValue={
              hasServicePointDataId
                ? servicePointData.resellerCompanyId.toString()
                : hasStationId
                  ? servicePointData[`${formProperties.reseller}`]?.toString()
                  : resellers[0]
            }
            value={servicePointData[`${formProperties.reseller}`]?.toString()}
          />
        </div>
        <div className={`${sectionPrefix}-buttons-container flex flex-row-reverse`}>
          <Button
            buttonText="Ileri"
            className={`${sectionPrefix}-submit-button bg-primary text-text text-sm rounded-lg block p-2.5`}
            type={`submit`}
          />
        </div>
      </form>
    )
  );
};

export default ServicePointModalFormFirstPage;
