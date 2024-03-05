import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { Dropdown } from '@projects/dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { setUpdatedServicePointData } from '../../../../app/redux/features/updatedServicePointData';
import { RootState } from '../../../../app/redux/store';

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
  const formProperties = ['service-point-name', 'service-point-reseller', 'service-point-company'];
  const prefixSP = 'sh-service-point';
  const updatedServicePointData = useSelector((state: RootState) => {
    return state.updatedServicePointData.updatedServicePointData;
  });
  const [companies, setCompanies] = useState<{ id: number; name: string; rid: null; }[]>([]);
  const [resellers, setResellers] = useState<{ id: number; name: string; rid: null; }[]>([]);
  const { formState: { errors }, handleSubmit, register } = useForm();
  const dispatch = useDispatch();

  const createServicePointConfigData = () => {
    const requestData = {
      name: formData[`${formProperties[0]}`],
      resellerCompanyId: Number(formData[`${formProperties[1]}`]),
      companyId: Number(formData[`${formProperties[2]}`]),
      isActive: true,
    };

    if (updatedServicePointData.id > 0) {
      return {
        id: updatedServicePointData.id,
        ...requestData,
      };
    };

    return requestData;
  };

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
        .catch(error => { console.error(error); }
        )
    } catch (error) {
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
        [`${formProperties[0]}`]: updatedServicePointData.name,
        [`${formProperties[1]}`]: updatedServicePointData.resellerCompanyId,
        [`${formProperties[2]}`]: updatedServicePointData.companyId,
      });
    }
  }, []);

  return (
    companies && resellers &&
    <form className={`sh-modal-form-page-1 ${activePage === 1 ? 'block' : 'hidden'}`} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={`${prefixSP}-name-container`}>
        <Label className={`${prefixSP}-name-label block mb-2 text-heading font-semibold`} htmlFor={`${formProperties[0]}`} labelText={`Hizmet Noktasi Ismi`}>
          <span className="text-md text-error">*</span>
        </Label>
        <Input
          className={`${prefixSP}-name-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 hover:${stationId !== 0 ? 'cursor-not-allowed' : ''}`}
          disabled={stationId !== 0}
          id={`${prefixSP}-name`}
          name={`${formProperties[0]}`}
          register={
            register(`${formProperties[0]}`, {
              minLength: {
                value: 3,
                message: 'En az 3 karakter girmelisiniz.'
              },
              required: `Hizmet Noktasi Ismi zorunludur.`,
              value: updatedServicePointData.id > 0 ? updatedServicePointData.name : formData[`${formProperties[0]}`],
              onChange: (event: React.ChangeEvent<HTMLInputElement>): void => { setFormData(({ ...formData, [event.target.name]: event.target.value })) }
            })}
          type={`text`}
        />
        {
          errors[`${formProperties[0]}`] && errors[`${formProperties[0]}`]?.message && (
            <div className={`${prefixSP}-name-error-wrapper my-4 font-bold text-error`}>
              <p className={`${prefixSP}-name-error-message`}>
                {(errors[`${formProperties[0]}`]?.message?.toString())}
              </p>
            </div>
          )
        }
      </div>
      <div className={`${prefixSP}-reseller-container`}>
        <Label className={`${prefixSP}-reseller-label block mb-2 text-heading font-semibold`} htmlFor={`${formProperties[1]}`} labelText={`Hizmet Noktasi Bayi`}>
          <span className="text-md text-error">*</span>
        </Label>
        <Dropdown
          className={`${prefixSP}-reserller-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 hover:${stationId !== 0 ? 'cursor-not-allowed' : ''}`}
          disabled={stationId !== 0}
          id={`${formProperties[1]}`}
          items={resellers}
          name={`${formProperties[1]}`}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => { setFormData(({ ...formData, [event.target.name]: event.target.value })); }}
          selectedValue={updatedServicePointData.id > 0 ? updatedServicePointData['resellerCompanyId'].toString() : (stationId !== 0 ? formData[`${formProperties[1]}`]?.toString() : '')}
          value={formData[`${formProperties[1]}`]?.toString()}
        />
      </div>
      <div className={`${prefixSP}-company-container`}>
        <Label className={`${prefixSP}-company-label block mb-2 text-heading font-semibold`} htmlFor={`${formProperties[2]}`} labelText={`Hizmet Noktasi Sirketi`}>
          <span className="text-md text-error">*</span>
        </Label>
        <Dropdown
          className={`${prefixSP}-company-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 hover:${stationId !== 0 ? 'cursor-not-allowed' : ''}`}
          disabled={stationId !== 0}
          id={`${formProperties[2]}`}
          items={companies}
          name={`${formProperties[2]}`}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => { setFormData(({ ...formData, [event.target.name]: event.target.value })); }}
          selectedValue={updatedServicePointData.id > 0 ? updatedServicePointData['companyId'].toString() : (stationId !== 0 ? formData[`${formProperties[2]}`]?.toString() : '')}
          value={formData[`${formProperties[2]}`]?.toString()}
        />
      </div>
      <div className={`${prefixSP}-buttons-container flex flex-row-reverse`}>
        <Button
          buttonText='Sonraki'
          className={`${prefixSP}-submit-button bg-primary text-text text-sm rounded-lg block p-2.5`}
          type={`submit`}
        />
      </div>
    </form>
  );
};

export default ServicePointModalFormFirstPage;
