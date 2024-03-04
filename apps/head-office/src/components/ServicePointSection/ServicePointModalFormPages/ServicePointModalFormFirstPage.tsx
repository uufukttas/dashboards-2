import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { Dropdown } from '@projects/dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { RootState } from '../../../../app/redux/store';
import { setUpdatedServicePointData } from '../../../../app/redux/features/updatedServicePointData';

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

const ServicePointModalFormFirstPage = ({ activePage, formData, stationId, setActivePage, setFormData, setStationId }: IModalPageInputs) => {
  const prefixSP = 'sh-service-point';
  const formProperties = ['service-point-name', 'service-point-reseller', 'service-point-company'];
  const isModalVisible = useSelector((state: RootState) => state.isModalVisible);
  const updatedServicePointData = useSelector((state: RootState) => state.updatedServicePointData.updatedServicePointData);
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
    }

    // dispatch(setUpdatedServicePointData(requestData));

    return requestData;
  };

  const getCompanies = async () => {
    try {
      await axios.get(
        process.env.GET_COMPANIES_URL || ''
      )
        .then((response) => response.data)
        .then((data) => setCompanies(data.data));
    } catch (error) {
      console.log(error);
    };
  };

  const getResellers = async () => {
    try {
      await axios.get(
        process.env.GET_RESELLERS_URL || ''
      )
        .then((response) => response.data)
        .then((data) => setResellers(data.data));
    } catch (error) {
      console.log(error);
    };
  };

  const handleFormSubmit: SubmitHandler<IFormDataProps> = async () => {
    if (stationId !== 0) {
      setActivePage(activePage + 1);
      return;
    }

    handleServicePointOperation();
  };

  const handleServicePointOperation = async () => {
    const operationURL = updatedServicePointData.id > 0 ? process.env.UPDATE_STATION_URL || '' : process.env.ADD_STATION_URL || '';
    const opeartionData = createServicePointConfigData();

    try {
      await axios.post(
        operationURL,
        opeartionData,
        { headers: { 'Content-Type': 'application/json' } })
        .then(response => { return response.data; })
        .then(data => {
          if (updatedServicePointData.id === 0) {
            setStationId(data.data[0].id);
          } else {
            dispatch(setUpdatedServicePointData(formData));
          }
          setActivePage(activePage + 1);
        })
        .catch(error => { console.error(error); }
        )
    } catch (error) {
      console.error(error);
    };

    console.log('formData', formData)
  };

  useEffect(() => {
    if (resellers.length === 0 && companies.length === 0) {
      getResellers();
      getCompanies();
    }

  }, [resellers, companies, updatedServicePointData, isModalVisible]);

  console.log('formData[`${formProperties[0]}`]', formData[`${formProperties[0]}`])
  return (
    resellers && companies &&
    <form className={`sh-modal-form-page-1 ${activePage === 1 ? 'block' : 'hidden'}`} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={`${prefixSP}-name-container`}>
        <Label className={`${prefixSP}-name-label block mb-2 text-sm font-medium text-gray-900`} htmlFor={`${formProperties[0]}`} labelText={`Hizmet Noktasi Ismi`}>
          <span className="text-md text-error">*</span>
        </Label>
        <Input
          className={`${prefixSP}-name-input bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4 hover:${stationId !== 0 ? 'cursor-not-allowed' : ''}`}
          disabled={stationId !== 0}
          id={`${prefixSP}-name`}
          name={`${formProperties[0]}`}
          register={register(`${formProperties[0]}`, {
            minLength: { value: 3, message: 'En az 3 karakter girmelisiniz.' },
            required: `Hizmet Noktasi Ismi zorunludur.`,
            value: formData[`${formProperties[0]}`],
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
        <Label className={`${prefixSP}-reseller-label block mb-2 text-sm font-medium text-gray-900`} htmlFor={`${formProperties[1]}`} labelText={`Hizmet Noktasi Bayi`} />
        <Dropdown
          className={`${prefixSP}-reserller-input bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4 hover:${stationId !== 0 ? 'cursor-not-allowed' : ''}`}
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
        <Label className={`${prefixSP}-company-label block mb-2 text-sm font-medium text-gray-900`} htmlFor={`${formProperties[2]}`} labelText={`Hizmet Noktasi Sirketi`} />
        <Dropdown
          className={`${prefixSP}-company-input bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4 hover:${stationId !== 0 ? 'cursor-not-allowed' : ''}`}
          disabled={stationId !== 0}
          id={`${formProperties[2]}`}
          items={companies}
          name={`${formProperties[2]}`}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => { setFormData(({ ...formData, [event.target.name]: event.target.value })); }}
          selectedValue={updatedServicePointData.id > 0 ? updatedServicePointData['companyId'].toString() : (stationId !== 0 ? formData[`${formProperties[2]}`]?.toString() : '')}
          value={formData[`${formProperties[2]}`]?.toString()}
        />
      </div>
      <div className={`${prefixSP}-buttons-container`}>
        <Button
          buttonText='Ileri'
          className={`${prefixSP}-submit-button bg-blue-500 border text-gray-900 text-sm rounded-lg block w-full p-2.5`}
          type={`submit`}
        />
      </div>
    </form>
  );
};

export default ServicePointModalFormFirstPage;
