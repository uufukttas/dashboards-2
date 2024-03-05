import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { Dropdown } from '@projects/dropdown';
import { Label } from '@projects/label';
import { Radio } from '@projects/radio';
import { Checkbox } from '@projects/checkbox';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { RootState } from '../../../../app/redux/store';
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
  const formProperties = ['service-point-payment-methods', 'service-point-parking', 'service-point-opportunities'];
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
  const prefixSP = 'sh-service-point';
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
  ];
  const isModalVisible = useSelector((state: RootState) => state.isModalVisibleReducer.isModalVisible);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const updatedServicePointInfoData = useSelector((state: RootState) => state.updatedServicePointInfoData.updatedServicePointInfoData);
  const dispatch = useDispatch();
  const { handleSubmit } = useForm();


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
      process.env.ADD_STATION_INFO_URL || '',
      JSON.stringify(createConfigData()),
      { headers: { 'Content-Type': 'application/json' } }
    ).then((response) => {
      console.log(response);
      dispatch(toggleModalVisibility(isModalVisible));
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckedItems({ ...checkedItems, [name.replace('service-point-opportunities-', '')]: checked });
  };
  const handleFormSubmit: SubmitHandler<IFormData> = () => {
    console.log(stationId)
    const selectedItems = Object.keys(checkedItems).filter(key => checkedItems[key]);
    setFormData({ ...formData, ['service-point-opportunities']: selectedItems });
    createServicePointDetails();
  };

  useEffect(() => {
    if (updatedServicePointInfoData.id > 0) {
      setFormData({
        ['service-point-payment-methods']: updatedServicePointInfoData.paymentMethods,
        ['service-point-parking']: updatedServicePointInfoData.parking,
        ['service-point-opportunities']: updatedServicePointInfoData.opportunities
      });
    }
  }, []);

  return (
    <form className={`sh-modal-page-4 ${activePage === 4 ? 'block' : 'hidden'}`} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={`${prefixSP}-payment-methods-container`}>
        <Label className={`${prefixSP}-payment-methods-label block mb-2 text-sm font-medium text-gray-900`} htmlFor={`service-point-payment-methods`} labelText={`Hizmet Noktasi Odeme Yontemleri`} />
        <Dropdown
          className={`${prefixSP}-payment-methods-input bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4`}
          id={`service-point-payment-methods`}
          items={paymentMethods}
          name={`service-point-payment-methods`}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => { setFormData(({ ...formData, [event.target.name]: event.target.value })); }}
          selectedValue={formData['service-point-payment-methods']?.toString()}
          value={formData[`service-point-payment-methods`]?.toString()}
        />
      </div>
      <div className={`${prefixSP}-parking-container`}>
        <div className={`${prefixSP}-parking-header`}>
          <h2 className={`${prefixSP}-parking-text block mb-2 text-sm font-medium text-gray-900`}>Hizmet Noktasi Park Yeri</h2>
        </div>
        <div className={`${prefixSP}-parking-inputs-container flex`}>
          <div className={`${prefixSP}-parking-option-container flex w-1/2 items-center mb-4`}>
            <Label className={`${prefixSP}-parking-yes-label block mb-0 pr-4`} htmlFor={`${prefixSP}-parking-yes`} labelText={`Var`}  />
            <Radio
              className={`${prefixSP}-parking-input text-blue-500 text-sm block`}
              id={`${prefixSP}-parking-yes`}
              name={`${prefixSP}-parking`}
              onChange={(event) => { setFormData({ ...formData, [event.target.name]: (event.target.value === 'on' ? true : false) }) }}
            />
          </div>
          <div className={`${prefixSP}-parking-option-container flex w-1/2 items-center mb-4`}>
            <Label htmlFor={`${prefixSP}-parking-no`} labelText={`Yok`} className={`block mb-0 pr-4`} />
            <Radio
              className={`${prefixSP}-parking-input text-blue-500 text-sm block`}
              id={`${prefixSP}-parking-no`}
              name={`${prefixSP}-parking`}
              onChange={(event) => { setFormData({ ...formData, [event.target.name]: (event.target.value === 'on' ? false : true) }) }}
            />
          </div>
        </div>
      </div>

      <div className={`${prefixSP}-opportunities-container`}>
        <div className={`${prefixSP}-opportunities-header`}>
          <h2 className="block mb-2 text-sm font-medium text-gray-900">Hizmet Noktasi Olanaklari</h2>
        </div>
        <div className={`${prefixSP}-opportunities-inputs-container flex flex-wrap`}>
          {
            opportunities.map((opportunity, index) => (
              <div className={`${prefixSP}-opportunities-option-container flex items-center mb-4`} key={index}>
                <Label htmlFor={`${prefixSP}-opportunities-${opportunity.name}`} labelText={opportunity.name} className={`block mb-0 pr-4`} />
                <Checkbox
                  id={`${prefixSP}-opportunities-${opportunity.name}`}
                  name={`${prefixSP}-opportunities-${opportunity.name}`}
                  className={`text-blue-500 text-sm block mr-4`}
                  onChange={handleCheckboxChange}
                />
              </div>
            ))
          }
        </div>
      </div>

      <div className={`${prefixSP}-buttons-container flex justify-between items-center`}>
        <Button
          buttonText='Geri'
          className={`${prefixSP}-next-button  bg-primary text-text text-sm rounded-lg block p-2.5`}
          type={`submit`}
          onClick={() => setActivePage(activePage - 1)}
        />
        <Button
          buttonText='Kaydet'
          className={`${prefixSP}-submit-button  bg-primary text-text text-sm rounded-lg block p-2.5`}
          type={`submit`}
        />
      </div>
    </form >
  )
};

export default ServicePointModalFormFourthPage;