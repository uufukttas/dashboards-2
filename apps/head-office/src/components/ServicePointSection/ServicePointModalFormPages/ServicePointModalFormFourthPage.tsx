import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { Checkbox } from '@projects/checkbox';
import { Dropdown } from '@projects/dropdown';
import { Label } from '@projects/label';
import { Radio } from '@projects/radio';
import { showAlert } from '../../../../app/redux/features/alertInformation';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { setServicePointInformation } from '../../../../app/redux/features/servicePointInformation';
import { RootState } from '../../../../app/redux/store';
import { PAYMENT_METHODS, OPPORTUNITIES, BRAND_PREFIX } from '../../../../src/constants/constants';

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
  const formName = ['payment-methods', 'parking', 'opportunities'];
  const sectionPrefix = 'service-point';
  const formProperties = {
    paymentMethods: `${sectionPrefix}-${formName[0]}`,
    parking: `${sectionPrefix}-${formName[1]}`,
    opportunities: `${sectionPrefix}-${formName[2]}`,
  };
  const isModalVisible = useSelector((state: RootState) => state.isModalVisibleReducer.isModalVisible);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const servicePointInformation = useSelector((state: RootState) => {
    return state.servicePointInformation.servicePointInformation;
  });
  const [fourthPageFormData, setFourthPageFormData] = useState<IFormData>({
    [`${formProperties.paymentMethods}`]: servicePointInformation?.paymentMethods || '1',
    [`${formProperties.parking}`]: servicePointInformation?.parking || false,
    [`${formProperties.opportunities}`]: servicePointInformation?.opportunities || [],
  });
  const dispatch = useDispatch();
  const { handleSubmit } = useForm();

  const createConfigData = () => ({
    address: servicePointInformation.address,
    phone1: servicePointInformation.phone1,
    phone2: servicePointInformation.phone2,
    lat: servicePointInformation.lat,
    lon: servicePointInformation.lon,
    cityId: servicePointInformation.cityId,
    districtId: servicePointInformation.districtId,
    ...(servicePointInformation?.id > 0 ? { id: servicePointInformation?.id } : { stationId: stationId })
  });

  const createServicePointDetails = () => {
    const actionURL = servicePointInformation?.id > 0
      ? process.env.UPDATE_STATION_INFO_URL || ''
      : process.env.ADD_STATION_INFO_URL || '';
    const actionData = (createConfigData());

    axios.post(
      actionURL,
      actionData,
      { headers: { 'Content-Type': 'application/json' } }
    ).then((response) => response.data)
      .then(data => {
        dispatch(toggleModalVisibility(isModalVisible));
        dispatch(showAlert({
          message: data.message,
          type: 'success',
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setCheckedItems(prevState => ({
      ...prevState,
      [name.replace(`${sectionPrefix}-${formName[2]}-`, '')]: checked
    }));
  };

  const handleFormSubmit: SubmitHandler<IFormData> = () => {
    dispatch(setServicePointInformation({
      ...servicePointInformation,
      paymentMethods: fourthPageFormData[`${formProperties.paymentMethods}`].toString(),
      parking: fourthPageFormData[`${formProperties.parking}`],
      opportunities: Object.keys(checkedItems).filter(key => checkedItems[key])
    }));

    createServicePointDetails();
  };

  const replacetoDash = (value: string) => {
    value = value.replace(/\s+/g, '-').toLowerCase();

    return value;
  };

  useEffect(() => {
    setFourthPageFormData({
      ...fourthPageFormData,
      [`${formProperties.opportunities}`]: Object.keys(checkedItems).filter(key => checkedItems[key])
    });

    dispatch(setServicePointInformation({
      ...servicePointInformation,
      paymentMethods: fourthPageFormData[`${formProperties.paymentMethods}`].toString(),
      parking: fourthPageFormData[`${formProperties.parking}`],
      opportunities: Object.keys(checkedItems).filter(key => checkedItems[key])
    }))
  }, [checkedItems]);

  return (
    <form
      className={`${BRAND_PREFIX}-modal-page-4 ${activePage === 4 ? 'block' : 'hidden'}`}
      onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={`${formProperties.paymentMethods}-container`}>
        <Label
          className={`${formProperties.paymentMethods}-label block mb-2 text-sm font-medium text-gray-900`}
          htmlFor={`${formProperties.paymentMethods}`}
          labelText={`Odeme Yontemleri`}
        />
        <Dropdown
          className={`${formProperties.paymentMethods}-input bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4`}
          id={`${formProperties.paymentMethods}`}
          items={PAYMENT_METHODS}
          name={`${formProperties.paymentMethods}`}
          selectedValue={fourthPageFormData[`${formProperties.paymentMethods}`]?.toString()}
          value={fourthPageFormData[`${formProperties.paymentMethods}`]?.toString()}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
            setFourthPageFormData(({
              ...fourthPageFormData,
              [event.target.name]: event.target.value
            }));
          }}
        />
      </div>
      <div className={`${formProperties.parking}-container`}>
        <div className={`${formProperties.parking}-header`}>
          <h3 className={`${formProperties.parking}-text block mb-2 text-sm font-semibold text-gray-900`}>
            Park Yeri
          </h3>
        </div>
        <div className={`${formProperties.parking}-inputs-container flex`}>
          <div className={`${formProperties.parking}-option-container flex w-1/2 items-center mb-4`}>
            <Label
              className={`${formProperties.parking}-yes-label block mb-0 pr-4`}
              htmlFor={`${formProperties.parking}-yes`}
              labelText={`Var`} />
            <Radio
              className={`${formProperties.parking}-input text-blue-500 text-sm block`}
              id={`${formProperties.parking}-yes`}
              name={`${formProperties.parking}`}
              onChange={(event) => {
                setFourthPageFormData({
                  ...fourthPageFormData,
                  [event.target.name]: (event.target.value === 'on' ? true : false)
                });
              }}
            />
          </div>
          <div className={`${formProperties.parking}-option-container flex w-1/2 items-center mb-4`}>
            <Label
              className={`block mb-0 pr-4`}
              htmlFor={`${formProperties.parking}-no`}
              labelText={`Yok`}
            />
            <Radio
              className={`${formProperties.parking}-input text-blue-500 text-sm block`}
              id={`${formProperties.parking}-no`}
              name={`${formProperties.parking}`}
              onChange={(event) => {
                setFourthPageFormData({
                  ...fourthPageFormData,
                  [event.target.name]: (event.target.value === 'on' ? false : true)
                })
              }}
            />
          </div>
        </div>
      </div>

      <div className={`${formProperties.opportunities}-container`}>
        <div className={`${formProperties.opportunities}-header`}>
          <h3 className="block mb-2 text-sm font-semibold text-gray-900">Lokasyon Olanaklari</h3>
        </div>
        <div className={`${formProperties.opportunities}-inputs-container flex flex-wrap`}>
          {
            OPPORTUNITIES.map((opportunity, index) => (
              <div
                className={`${formProperties.opportunities}-option-container flex items-center mb-4`}
                key={index}>
                <Label
                  className={`block mb-0 pr-4`}
                  htmlFor={`${formProperties.opportunities}-${replacetoDash(opportunity.name)}`}
                  labelText={opportunity.name}
                />
                <Checkbox
                  className={`text-blue-500 text-sm block mr-4`}
                  id={`${formProperties.opportunities}-${replacetoDash(opportunity.name)}`}
                  name={`${formProperties.opportunities}-${replacetoDash(opportunity.name)}`}
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
          buttonText={servicePointInformation?.id > 0 ? 'Guncelle' : 'Kaydet'}
          className={`${sectionPrefix}-submit-button  bg-primary text-text text-sm rounded-lg block p-2.5`}
          type={`submit`}
        />
      </div>
    </form >
  )
};

export default ServicePointModalFormFourthPage;
