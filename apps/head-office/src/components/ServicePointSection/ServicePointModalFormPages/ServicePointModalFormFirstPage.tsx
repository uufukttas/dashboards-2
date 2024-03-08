import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { Dropdown } from '@projects/dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { toggleAlertVisibility } from '../../../../app/redux/features/isAlertVisible';
import { setUpdatedServicePointData } from '../../../../app/redux/features/updatedServicePointData';
import { RootState } from '../../../../app/redux/store';
import { BRAND_PREFIX } from '../../../../src/constants/constants';

interface IFormDataProps {
  [key: string]: boolean | number | string | string[];
};

interface IModalPageInputs {
  activePage: number;
  formData: IFormDataProps;
  stationId: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  setFormData: React.Dispatch<React.SetStateAction<IFormDataProps>>;
  setStationId: React.Dispatch<React.SetStateAction<number>>;
};

const ServicePointModalFormFirstPage = ({
  activePage,
  formData,
  stationId,
  setActivePage,
  setFormData,
  setStationId
}: IModalPageInputs) => {
  const formProperties = ['name', 'reseller', 'company'];
  const sectionPrefix = 'service-point';
  const updatedServicePointData = useSelector((state: RootState) => {
    return state.updatedServicePointData.updatedServicePointData
  });
  const [companies, setCompanies] = useState<{ id: number; name: string; rid: null; }[]>([]);
  const [resellers, setResellers] = useState<{ id: number; name: string; rid: null; }[]>([]);
  const { formState: { errors }, handleSubmit, register } = useForm();
  const dispatch = useDispatch();

  const createServicePointConfigData = () => ({
    name: formData[`${sectionPrefix}-${formProperties[0]}`],
    resellerCompanyId: Number(formData[`${sectionPrefix}-${formProperties[1]}`]) || resellers[0].id,
    companyId: Number(formData[`${sectionPrefix}-${formProperties[2]}`]) || companies[0].id,
    isActive: true,
    ...(updatedServicePointData.id > 0 && { id: updatedServicePointData.id })
  });

  const getDropdownItems = async (dropdownDataUrl: string) => {
    try {
      await axios.get(
        dropdownDataUrl
      )
        .then((response) => response.data)
        .then((data) => dropdownDataUrl.indexOf('Companies') > -1 ? setCompanies(data.data) : setResellers(data.data));
    } catch (error) {
      console.log(error)
    }
  };

  const handleFormSubmit: SubmitHandler<IFormDataProps> = async () => {
    if (stationId !== 0) {
      setActivePage(activePage + 1);
      return;
    }

    handleServicePointOperation();
  };

  const handleServicePointOperation = async () => {
    const actionURL = updatedServicePointData.id > 0
      ? process.env.UPDATE_STATION_URL || ''
      : process.env.ADD_STATION_URL || '';
    const actionData = createServicePointConfigData();

    try {
      await axios.post(
        actionURL,
        actionData,
        { headers: { 'Content-Type': 'application/json' } })
        .then(response => response.data)
        .then(data => {
          updatedServicePointData.id === 0
            ? setStationId(data.data[0].id)
            : dispatch(setUpdatedServicePointData(formData));

          setActivePage(activePage + 1);
        })
        .catch(error => { dispatch(toggleAlertVisibility(true)); console.error(error); }
        )
    } catch (error) {
      dispatch(toggleAlertVisibility(true));
      console.error(error);
    };
  };

  useEffect(() => {
    if (resellers.length === 0 && companies.length === 0) {
      getDropdownItems(process.env.GET_RESELLERS_URL || '');
      getDropdownItems(process.env.GET_COMPANIES_URL || '');
    }

    if (updatedServicePointData.id > 0) {
      setFormData({
        ...formData,
        stationId: updatedServicePointData.id,
        [`${sectionPrefix}-${formProperties[0]}`]: updatedServicePointData.name,
        [`${sectionPrefix}-${formProperties[1]}`]: updatedServicePointData.resellerCompanyId,
        [`${sectionPrefix}-${formProperties[2]}`]: updatedServicePointData.companyId,
      });
    }
  }, []);

  return (
    companies && resellers &&
    <form className={`${BRAND_PREFIX}-modal-form-page-1 ${activePage === 1 ? 'block' : 'hidden'}`}
      onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={`${sectionPrefix}-${formProperties[0]}-container`}>
        <Label
          className={`${sectionPrefix}-${formProperties[0]}-label block mb-2 text-heading font-semibold`}
          htmlFor={`${sectionPrefix}-${formProperties[0]}`}
          labelText={`Hizmet Noktasi Ismi`}>
          <span className="text-md text-error">*</span>
        </Label>
        <Input
          className={`${sectionPrefix}-${formProperties[0]}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 hover:${stationId !== 0 ? 'cursor-not-allowed' : ''}`}
          disabled={stationId !== 0}
          id={`${sectionPrefix}-${formProperties[0]}`}
          name={`${sectionPrefix}-${formProperties[0]}`}
          register={
            register(`${sectionPrefix}-${formProperties[0]}`, {
              minLength: {
                value: 3,
                message: 'En az 3 karakter girmelisiniz.'
              },
              required: `Hizmet Noktasi Ismi zorunludur.`,
              value: updatedServicePointData.id > 0
                ? updatedServicePointData.name
                : formData[`${sectionPrefix}-${formProperties[0]}`],
              onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                setFormData(({ ...formData, [event.target.name]: event.target.value }))
              }
            })}
          type={`text`}
        />
        {
          errors[`${sectionPrefix}-${formProperties[0]}`]
          && errors[`${sectionPrefix}-${formProperties[0]}`]?.message
          && (
            <div className={`${sectionPrefix}-${formProperties[0]}-error-wrapper my-4 font-bold text-error`}>
              <p className={`${sectionPrefix}-${formProperties[0]}-error-message`}>
                {(errors[`${sectionPrefix}-${formProperties[0]}`]?.message?.toString())}
              </p>
            </div>
          )
        }
      </div>
      <div className={`${sectionPrefix}-${formProperties[1]}-container`}>
        <Label
          className={`${sectionPrefix}-${formProperties[1]}-label block mb-2 text-heading font-semibold`}
          htmlFor={`${sectionPrefix}-${formProperties[1]}`}
          labelText={`Hizmet Noktasi Bayi`}>
          <span className="text-md text-error">*</span>
        </Label>
        <Dropdown
          className={`${sectionPrefix}-${formProperties[1]}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 hover:${stationId !== 0 ? 'cursor-not-allowed' : ''}`}
          disabled={stationId !== 0}
          id={`${sectionPrefix}-${formProperties[1]}`}
          items={resellers}
          name={`${sectionPrefix}-${formProperties[1]}`}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
            setFormData(({ ...formData, [event.target.name]: event.target.value }));
          }}
          selectedValue={updatedServicePointData.id > 0
            ? updatedServicePointData['resellerCompanyId'].toString()
            : (stationId !== 0 ? formData[`${sectionPrefix}-${formProperties[1]}`]?.toString() : resellers[0])}
          value={formData[`${sectionPrefix}-${formProperties[1]}`]?.toString()}
        />
      </div>
      <div className={`${sectionPrefix}-${formProperties[2]}-container`}>
        <Label
          className={`${sectionPrefix}-${formProperties[2]}-label block mb-2 text-heading font-semibold`}
          htmlFor={`${sectionPrefix}-${formProperties[2]}`}
          labelText={`Hizmet Noktasi Sirketi`}>
          <span className="text-md text-error">*</span>
        </Label>
        <Dropdown
          className={`${sectionPrefix}-${formProperties[2]}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 hover:${stationId !== 0 ? 'cursor-not-allowed' : ''}`}
          disabled={stationId !== 0}
          id={`${sectionPrefix}-${formProperties[2]}`}
          items={companies}
          name={`${sectionPrefix}-${formProperties[2]}`}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
            setFormData(({ ...formData, [event.target.name]: event.target.value }));
          }}
          selectedValue={updatedServicePointData.id > 0
            ? updatedServicePointData['companyId'].toString()
            : (stationId !== 0 ? formData[`${sectionPrefix}-${formProperties[2]}`]?.toString() : companies[0])}
          value={formData[`${sectionPrefix}-${formProperties[2]}`]?.toString()}
        />
      </div>
      <div className={`${sectionPrefix}-buttons-container flex flex-row-reverse`}>
        <Button
          buttonText='Ileri'
          className={`${sectionPrefix}-submit-button bg-primary text-text text-sm rounded-lg block p-2.5`}
          type={`submit`}
        />
      </div>
    </form>
  );
};

export default ServicePointModalFormFirstPage;
