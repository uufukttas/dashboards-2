import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@projects/button';
import { Dropdown } from '@projects/dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';

interface IFormDataProps {
  [key: string]: string | number;
};

interface IModalPageInputs {
  activePage: number;
  stationId: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  setStationId: React.Dispatch<React.SetStateAction<number>>;
};

const ServicePointModalFormFirstPage = ({ activePage, stationId, setActivePage, setStationId }: IModalPageInputs) => {
  const [companies, setCompanies] = useState<{ id: number; name: string; rid: null; }[]>([]);
  const [formData, setFormData] = useState<IFormDataProps>({});
  const [resellers, setResellers] = useState<{ id: number; name: string; rid: null; }[]>([]);
  const { formState: { errors }, handleSubmit, register } = useForm();

  const createServicePointConfigData = () => {
    return ({
      name: formData['service-point-name'],
      resellerCompanyId: formData['service-point-reseller'],
      companyId: formData['service-point-company'],
    });
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

    try {
      await axios.post(
        process.env.ADD_STATION_URL || '',
        JSON.stringify(createServicePointConfigData()), {
        headers: { 'Content-Type': 'application/json' }
      })
        .then((response) => { return response.data })
        .then((data) => {
          setStationId(data.data[0].id);
          setActivePage(activePage + 1);
        });
    } catch (error) {
      console.log(error);
    };
  };

  useEffect(() => {
    if (resellers.length === 0 && companies.length === 0) {
      getResellers();
      getCompanies();
    }

    if (formData['service-point-reseller'] === undefined || formData['service-point-company'] === undefined) {
      setFormData({ ...formData, 'service-point-reseller': resellers[0]?.id, 'service-point-company': companies[0]?.id });
    }
    console.log('stationId', stationId)
  }, [resellers, companies]);

  return (
    resellers && companies &&
    <form className={`sh-modal-page-1 ${activePage === 1 ? 'block' : 'hidden'}`} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={`service-point-name-container`}>
        <Label htmlFor={`service-point-name`} labelText={`Hizmet Noktasi Ismi`} className={`block mb-2 text-sm font-medium text-gray-900`}>
          <span className="text-md text-error">*</span>
        </Label>
        <Input
          disabled={stationId !== 0}
          id={`service-point-name`}
          name={`service-point-name`}
          className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4 hover:${stationId !== 0 ? 'cursor-not-allowed' : ''}`}
          type={`text`}
          register={register(`service-point-name`, {
            minLength: { value: 3, message: 'En az 3 karakter girmelisiniz.' },
            required: `Hizmet Noktasi Ismi zorunludur.`,
            value: formData['service-point-name'],
            onChange: (event: React.ChangeEvent<HTMLInputElement>): void => { setFormData(({ ...formData, [event.target.name]: event.target.value })) }
          })}
        />
        {
          errors['service-point-name'] && errors['service-point-name']?.message && (
            <div className={`service-point-name-error-wrapper my-4 font-bold text-error`}>
              <p className={`service-point-name-error-message`}>
                {(errors['service-point-name']?.message?.toString())}
              </p>
            </div>
          )
        }
      </div>
      <div className={`service-point-reseller-container`}>
        <Label htmlFor={`service-point-reseller`} labelText={`Hizmet Noktasi Bayi`} className={`block mb-2 text-sm font-medium text-gray-900`} />
        <Dropdown
          disabled={stationId !== 0}
          id={`service-point-reseller`}
          name={`service-point-reseller`}
          className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4 hover:${stationId !== 0 ? 'cursor-not-allowed' : ''}`}
          items={resellers}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => { setFormData(({ ...formData, [event.target.name]: event.target.value })); }}
          value={formData['service-point-reseller']}
        />
      </div>
      <div className={`service-point-company-container`}>
        <Label htmlFor={`service-point-company`} labelText={`Hizmet Noktasi Sirketi`} className={`block mb-2 text-sm font-medium text-gray-900`} />
        <Dropdown
          disabled={stationId !== 0}
          id={`service-point-company`}
          name={`service-point-company`}
          className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4 hover:${stationId !== 0 ? 'cursor-not-allowed' : ''}`}
          items={companies}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => { setFormData(({ ...formData, [event.target.name]: event.target.value })); }}
          value={formData['service-point-company']}
        />
      </div>
      <div className={`service-point-buttons-container`}>
        <Button
          buttonText='Ileri'
          className={`bg-blue-500 border text-gray-900 text-sm rounded-lg block w-full p-2.5`}
          type={`submit`}
        />
      </div>
    </form>
  )
};

export default ServicePointModalFormFirstPage;
