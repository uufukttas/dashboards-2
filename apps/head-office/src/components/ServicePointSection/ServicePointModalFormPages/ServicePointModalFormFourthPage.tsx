import React, { useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@projects/button';
import { Dropdown } from '@projects/dropdown';
import { Label } from '@projects/label';
import { Radio } from '@projects/radio';
import { Checkbox } from '@projects/checkbox';

interface IFormData {
  [key: string]: string | number | boolean | string[];
};

interface IModalPageInputs {
  activePage: number;
  formData: IFormData;
  stationId: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
};

const ServicePointModalFormFourthPage = ({ activePage, formData, stationId, setActivePage, setFormData }: IModalPageInputs) => {
  const { handleSubmit } = useForm();
  const paymentMethods = [
    {
      name: 'Nakit',
      id: 1,
      rid: null
    }, {
      name: 'Kredi Karti',
      id: 2,
      rid: null
    }, {
      name: 'Banka Karti',
      id: 3,
      rid: null
    },
    {
      name: 'Sharz Uygulamasi',
      id: 4,
      rid: null
    }
  ];
  const opportunities = [
    {
      name: 'AVM',
      id: 1,
      rid: null
    }, {
      name: 'Wifi',
      id: 2,
      rid: null
    }, {
      name: 'Otopark',
      id: 3,
      rid: null
    }, {
      name: 'Cocuk Oyun Alani',
      id: 4,
      rid: null
    }, {
      name: 'Engelli Dostu',
      id: 5,
      rid: null
    }, {
      name: 'Klima',
      id: 6,
      rid: null
    }, {
      name: 'Kafe',
      id: 7,
      rid: null
    }, {
      name: 'Restoran',
      id: 8,
      rid: null
    }, {
      name: 'Market',
      id: 9,
      rid: null
    }
  ]
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckedItems({ ...checkedItems, [name.replace('service-point-opportunities-', '')]: checked });
  };

  const createConfigData = () => {
    return ({
      stationId: stationId,
      address: formData['service-point-address'],
      phone1: formData['service-point-phone-number-1'],
      phone2: formData['service-point-phone-number-2'],
      lat: formData['service-point-x-coord'],
      lon: formData['service-point-y-coord'],
      cityId: formData['service-point-city'],
      districtId: formData['service-point-district'],
    });
  }

  const createServicePointDetails = () => {
    axios.post(
      'https://sharztestapi.azurewebsites.net/StationInfo/AddStationInfo',
      JSON.stringify(createConfigData()),
      { headers: { 'Content-Type': 'application/json' } }
    ).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleFormSubmit: SubmitHandler<IFormData> = () => {
    console.log(stationId)
    const selectedItems = Object.keys(checkedItems).filter(key => checkedItems[key]);
    setFormData({ ...formData, ['service-point-opportunities']: selectedItems });
    createServicePointDetails();
  };

  return (
    <form className={`sh-modal-page-4 ${activePage === 4 ? 'block' : 'hidden'}`} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={`service-point-payment-methods-container`}>
        <Label htmlFor={`service-point-payment-methods`} labelText={`Hizmet Noktasi Odeme Yontemleri`} className={`block mb-2 text-sm font-medium text-gray-900`} />
        <Dropdown
          id={`service-point-payment-methods`}
          name={`service-point-payment-methods`}
          className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4`}
          items={paymentMethods}
          onChange={(event) => { setFormData({ ...formData, [event.target.name]: event.target.value }) }}
        />
      </div>
      <div className={`service-point-parking-container`}>
        <div className={`service-point-parking-header`}>
          <h2 className="block mb-2 text-sm font-medium text-gray-900">Hizmet Noktasi Park Yeri</h2>
        </div>
        <div className="service-point-parking-inputs-container flex">
          <div className="service-point-parking-option-container flex w-1/2 items-center mb-4">
            <Label htmlFor={`service-point-parking-yes`} labelText={`Var`} className={`block mb-0 pr-4`} />
            <Radio
              id={`service-point-parking-yes`}
              name={`service-point-parking`}
              className={`text-blue-500 text-sm block`}
              onChange={(event) => { setFormData({ ...formData, [event.target.name]: (event.target.value === 'on' ? true : false) }) }}
            />
          </div>
          <div className="service-point-parking-option-container flex w-1/2 items-center mb-4">
            <Label htmlFor={`service-point-parking-no`} labelText={`Yok`} className={`block mb-0 pr-4`} />
            <Radio
              id={`service-point-parking-no`}
              name={`service-point-parking`}
              className={`text-blue-500 text-sm block`}
              onChange={(event) => { setFormData({ ...formData, [event.target.name]: (event.target.value === 'on' ? false : true) }) }}
            />
          </div>
        </div>
      </div>

      <div className={`service-point-opportunities-container`}>
        <div className={`service-point-opportunities-header`}>
          <h2 className="block mb-2 text-sm font-medium text-gray-900">Hizmet Noktasi Olanaklari</h2>
        </div>
        <div className="service-point-opportunities-inputs-container flex flex-wrap">
          {
            opportunities.map((opportunity, index) => (
              <div className="service-point-opportunities-option-container flex items-center mb-4" key={index}>
                <Label htmlFor={`service-point-opportunities-${opportunity.name}`} labelText={opportunity.name} className={`block mb-0 pr-4`} />
                <Checkbox
                  id={`service-point-opportunities-${opportunity.name}`}
                  name={`service-point-opportunities-${opportunity.name}`}
                  className={`text-blue-500 text-sm block mr-4`}
                  onChange={handleCheckboxChange}
                />
              </div>
            ))
          }
        </div>
      </div>

      <div className={`service-point-buttons-container flex justify-between items-center`}>
        <Button
          buttonText='Geri'
          className={`bg-blue-500 border text-gray-900 text-sm rounded-lg block w-1/4 p-2.5`}
          type={`submit`}
          onClick={() => setActivePage(activePage - 1)}
        />
        <Button
          buttonText='Kaydet'
          className={`bg-blue-500 border text-gray-900 text-sm rounded-lg block w-1/4 p-2.5`}
          type={`submit`}
        />
      </div>
    </form >
  )
};

export default ServicePointModalFormFourthPage;