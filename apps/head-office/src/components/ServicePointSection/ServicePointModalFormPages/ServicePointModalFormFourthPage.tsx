import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { Checkbox } from '@projects/checkbox';
import { Dropdown } from '@projects/dropdown';
import { Label } from '@projects/label';
import { Radio } from '@projects/radio';
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

const ServicePointModalFormFourthPage = ({
  activePage,
  formData,
  stationId,
  setActivePage,
  setFormData
}: IModalPageInputs) => {
  const brandPRefix = 'sh';
  const formProperties = ['payment-methods', 'parking', 'opportunities'];
  const sectionPrefix = 'service-point';
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
  ];
  const isModalVisible = useSelector((state: RootState) => state.isModalVisibleReducer.isModalVisible);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const updatedServicePointInfoData = useSelector((state: RootState) => {
    return state.updatedServicePointInfoData.updatedServicePointInfoData
  });
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
      dispatch(toggleModalVisibility(isModalVisible));
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setCheckedItems({ ...checkedItems, [name.replace(`${sectionPrefix}-${formProperties[2]}-`, '')]: checked });
  };
  const handleFormSubmit: SubmitHandler<IFormData> = () => {
    const selectedItems = Object.keys(checkedItems).filter(key => checkedItems[key]);

    setFormData({ ...formData, [`${sectionPrefix}-${formProperties[2]}`]: selectedItems });
    createServicePointDetails();
  };

  const replacetoDash = (value: string) => {
    value = value.replace(/\s+/g, '-').toLowerCase();

    return value;
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
    <form
      className={`${brandPRefix}-modal-page-4 ${activePage === 4 ? 'block' : 'hidden'}`}
      onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={`${sectionPrefix}-${formProperties[0]}-container`}>
        <Label
          className={`${sectionPrefix}-${formProperties[0]}-label block mb-2 text-sm font-medium text-gray-900`}
          htmlFor={`${sectionPrefix}-${formProperties[0]}`}
          labelText={`Hizmet Noktasi Odeme Yontemleri`}
        />
        <Dropdown
          className={`${sectionPrefix}-${formProperties[0]}-input bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4`}
          id={`${sectionPrefix}-${formProperties[0]}`}
          items={paymentMethods}
          name={`${sectionPrefix}-${formProperties[0]}`}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
            setFormData(({ ...formData, [event.target.name]: event.target.value }));
          }}
          selectedValue={formData[`${sectionPrefix}-${formProperties[0]}`]?.toString()}
          value={formData[`${sectionPrefix}-${formProperties[0]}`]?.toString()}
        />
      </div>
      <div className={`${sectionPrefix}-${formProperties[1]}-container`}>
        <div className={`${sectionPrefix}-${formProperties[1]}-header`}>
          <h2 className={`${sectionPrefix}-${formProperties[1]}-text block mb-2 text-sm font-medium text-gray-900`}>
            Hizmet Noktasi Park Yeri
          </h2>
        </div>
        <div className={`${sectionPrefix}-${formProperties[1]}-inputs-container flex`}>
          <div className={`${sectionPrefix}-${formProperties[1]}-option-container flex w-1/2 items-center mb-4`}>
            <Label
              className={`${sectionPrefix}-${formProperties[1]}-yes-label block mb-0 pr-4`}
              htmlFor={`${sectionPrefix}-${formProperties[1]}-yes`}
              labelText={`Var`} />
            <Radio
              className={`${sectionPrefix}-${formProperties[1]}-input text-blue-500 text-sm block`}
              id={`${sectionPrefix}-${formProperties[1]}-yes`}
              name={`${sectionPrefix}-${formProperties[1]}`}
              onChange={(event) => {
                setFormData({ ...formData, [event.target.name]: (event.target.value === 'on' ? true : false) });
              }}
            />
          </div>
          <div className={`${sectionPrefix}-${formProperties[1]}-option-container flex w-1/2 items-center mb-4`}>
            <Label
              className={`block mb-0 pr-4`}
              htmlFor={`${sectionPrefix}-${formProperties[1]}-no`}
              labelText={`Yok`}
            />
            <Radio
              className={`${sectionPrefix}-${formProperties[1]}-input text-blue-500 text-sm block`}
              id={`${sectionPrefix}-${formProperties[1]}-no`}
              name={`${sectionPrefix}-${formProperties[1]}`}
              onChange={(event) => {
                setFormData({ ...formData, [event.target.name]: (event.target.value === 'on' ? false : true) })
              }}
            />
          </div>
        </div>
      </div>

      <div className={`${sectionPrefix}-${formProperties[2]}-container`}>
        <div className={`${sectionPrefix}-${formProperties[2]}-header`}>
          <h2 className="block mb-2 text-sm font-medium text-gray-900">Hizmet Noktasi Olanaklari</h2>
        </div>
        <div className={`${sectionPrefix}-${formProperties[2]}-inputs-container flex flex-wrap`}>
          {
            opportunities.map((opportunity, index) => (
              <div
                className={`${sectionPrefix}-${formProperties[2]}-option-container flex items-center mb-4`}
                key={index}>
                <Label
                  className={`block mb-0 pr-4`}
                  htmlFor={`${sectionPrefix}-${formProperties[2]}-${replacetoDash(opportunity.name)}`}
                  labelText={opportunity.name}
                />
                <Checkbox
                  className={`text-blue-500 text-sm block mr-4`}
                  id={`${sectionPrefix}-${formProperties[2]}-${replacetoDash(opportunity.name)}`}
                  name={`${sectionPrefix}-${formProperties[2]}-${replacetoDash(opportunity.name)}`}
                  onChange={handleCheckboxChange}
                />
              </div>
            ))
          }
        </div>
      </div>

      <div className={`${sectionPrefix}-buttons-container flex justify-between items-center`}>
        <Button
          buttonText='Geri'
          className={`${sectionPrefix}-next-button  bg-primary text-text text-sm rounded-lg block p-2.5`}
          type={`submit`}
          onClick={() => setActivePage(activePage - 1)}
        />
        <Button
          buttonText='Kaydet'
          className={`${sectionPrefix}-submit-button  bg-primary text-text text-sm rounded-lg block p-2.5`}
          type={`submit`}
        />
      </div>
    </form >
  )
};

export default ServicePointModalFormFourthPage;
