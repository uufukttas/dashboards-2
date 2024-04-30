import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { CheckboxInDropdown } from '@projects/checkbox-in-dropdown';
import { Label } from '@projects/label';
import { Radio } from '@projects/radio';
import { hideAlert, showAlert } from '../../../../../app/redux/features/alertInformation';
import { toggleModalVisibility } from '../../../../../app/redux/features/isModalVisible';
import { toggleServicePointDataUpdated } from '../../../../../app/redux/features/isServicePointDataUpdated';
import { setServicePointInformation } from '../../../../../app/redux/features/servicePointInformation';
import { RootState } from '../../../../../app/redux/store';
import { BRAND_PREFIX } from '../../../../constants/constants';
import { IFeatureProps, IFormDataProps, IModalFourthPageInputsProps } from '../../types';
import { Input } from '@projects/input';

const ServicePointModalFormFourthPage: React.FC<IModalFourthPageInputsProps> = ({
  activePage,
  paymentMethods,
  stationId,
  setActivePage,
  setPaymentMethods,
}: IModalFourthPageInputsProps) => {
  const formName = ['payment-methods', 'parking', 'opportunities'];
  const sectionPrefix = 'service-point';
  const formProperties = {
    paymentMethods: `${sectionPrefix}-${formName[0]}`,
    parking: `${sectionPrefix}-${formName[1]}`,
    opportunities: `${sectionPrefix}-${formName[2]}`,
  };
  const dispatch = useDispatch();
  const { handleSubmit } = useForm();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const servicePointInformation = useSelector((state: RootState) => {
    return state.servicePointInformation.servicePointInformation;
  });
  const [isSelectboxOpen, setIsSelectboxOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<string[]>([]);
  const [fourthPageFormData, setFourthPageFormData] = useState<IFormDataProps>({
    [`${formProperties.paymentMethods}`]: selectedPaymentMethods || [],
    [`${formProperties.parking}`]: servicePointInformation?.parking || false,
    [`${formProperties.opportunities}`]: servicePointInformation?.opportunities || [],
  });

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
  const createPaymentMethods = async () => {
    await axios
      .post(
        process.env.ADD_STATION_FEATURE || '',
        createPaymentMethodsConfigData(),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => response.data)
  };
  const createPaymentMethodsConfigData = () => {
    const configData = selectedPaymentMethods.map((paymentMethod) => ({
      stationId: 65834,
      stationFeatureType: 1,
      stationFeatureValue: Number(paymentMethod),
      isDeleted: false
    }));

    return JSON.stringify(configData);
  };
  const createServicePointDetails = () => {
    const actionURL = servicePointInformation?.id > 0
      ? process.env.UPDATE_STATION_INFO_URL || ''
      : process.env.ADD_STATION_INFO_URL || '';
    const actionData = (createConfigData());

    axios
      .post(
        actionURL,
        actionData,
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => response.data)
      .then(data => {
        dispatch(toggleModalVisibility());
        dispatch(
          showAlert({
            message: data.message,
            type: 'success',
          })
        );

        setTimeout(() => {
          dispatch(hideAlert());
        }, 5000);

        dispatch(toggleServicePointDataUpdated(true));
      })
      .catch((error) => console.log(error));
  };
  const getStationFeatures = async () => {
    await axios
      .post(
        process.env.GET_STATION_FEATURES || '',
        { stationId: 65834 },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => response.data)
      .then(data => {
        const choosedPaymentMethods = data.data.filter((feature: IFeatureProps) => feature.stationFeatureType === 1);

        paymentMethods.map((method) => {
          choosedPaymentMethods.map((choosedMethod: IFeatureProps) => {
            if (method.stationFeatureValue === Number(choosedMethod.stationFeatureValue)) {
              method.isChecked = method.isChecked || true;
            }
          })
        });

        setPaymentMethods(paymentMethods);
      })
  };
  const handleFormSubmit: SubmitHandler<IFormDataProps> = () => {
    dispatch(
      setServicePointInformation({
        ...servicePointInformation,
        paymentMethods: fourthPageFormData[`${formProperties.paymentMethods}`].toString(),
        parking: fourthPageFormData[`${formProperties.parking}`],
        opportunities: selectedOptions
      })
    );

    createServicePointDetails();
    createPaymentMethods();
  };
  const handleOptionChange = (newItems: IFeatureProps[]) => {
    // if (selectedOptions.includes(event.target.value)) {
    //   event.target.name.includes('payment-methods')
    //     ? setSelectedPaymentMethods(selectedPaymentMethods.filter(option => option !== event.target.value))
    //     : setSelectedOptions(selectedOptions.filter(option => option !== event.target.value));
    // } else {
    //   event.target.name.includes('payment-methods')
    //     ? setSelectedPaymentMethods([...selectedPaymentMethods, event.target.value])
    //     : setSelectedOptions([...selectedOptions, event.target.value]);
    // }

    setPaymentMethods(newItems);
  };
  const toggleDropdown = () => setIsSelectboxOpen(!isSelectboxOpen);


  const changeCheckedValue = (value: number) => {
    paymentMethods.map((method) => {
      if (method.stationFeatureValue === Number(value)) {
        method.isChecked = !method.isChecked;
      }
    });

    setPaymentMethods(paymentMethods);
  }

  useEffect(() => {
    setFourthPageFormData({
      ...fourthPageFormData,
      [`${formProperties.opportunities}`]: selectedOptions
    });

    dispatch(setServicePointInformation({
      ...servicePointInformation,
      paymentMethods: fourthPageFormData[`${formProperties.paymentMethods}`].toString(),
      parking: fourthPageFormData[`${formProperties.parking}`],
      opportunities: selectedOptions,
    }));
  }, [selectedOptions]);


  useEffect(() => {
    getStationFeatures();
  }, [paymentMethods]);

  return (
    paymentMethods.length === 0 ? null : (
      <form
        className={`${BRAND_PREFIX}-modal-page-4 ${activePage === 4 ? 'block' : 'hidden'}`}
        onSubmit={handleSubmit(handleFormSubmit)}>
        <div className={`${formProperties.paymentMethods}-container mb-4`}>
          <Label
            className={`${formProperties.paymentMethods}-label block mb-2 text-sm font-medium text-gray-900`}
            htmlFor={`${formProperties.paymentMethods}`}
            labelText={`Odeme Yontemleri`}
          />
          <CheckboxInDropdown
            className={`${formProperties.paymentMethods}-input bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4`}
            id={`${formProperties.paymentMethods}`}
            inputName={`${formProperties.paymentMethods}`}
            items={paymentMethods}
            onChange={(paymentMethods) => handleOptionChange(paymentMethods)}
          />
        </div>
        <div className={`${formProperties.parking}-container`}>
          <Label
            className={`${formProperties.parking}-block mb-2 text-heading font-semibold`}
            htmlFor={`${formProperties.parking}`}
            labelText={`Ucretsiz arac park sayisi`} />
          <Input
            className={`${formProperties.parking}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4`}
            id={`${formProperties.parking}`}
            name={`${formProperties.parking}`}
            type='number'
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setFourthPageFormData({
                ...fourthPageFormData,
                [event.target.name]: event.target.value,
              });
            }}
          />
        </div>
        <div className={`${formProperties.opportunities}-container`}>
          <div className={`${formProperties.opportunities}-header`}>
            <h2 className="block mb-2 text-sm font-semibold text-gray-900">Servis Noktasi Olanaklari</h2>
          </div>
          <div className={`${formProperties.opportunities}-selectbox-container flex flex-wrap text-sm`}>
            <div className={`${formProperties.opportunities}-selectbox w-full relative text-gray-900`} ref={dropdownRef}>
              <Button
                className={`${formProperties.opportunities}-selectbox-button w-full focus:ring-primary justify-between border rounded-md flex items-center px-2 py-2 border-gray-500`}
                id={`${formProperties.opportunities}-selectbox-button`}
                type='button'
                onClick={toggleDropdown}>
                Secim yapiniz
                <div
                  className='arrow-icon text-lg text-gray-900'
                  dangerouslySetInnerHTML={{
                    __html: `${isSelectboxOpen ? '&#11205;' : '&#11206;'}`,
                  }}
                />
              </Button>
              {isSelectboxOpen && (
                <div className={`${formProperties.opportunities}-menu w-full flex flex-col absolute bg-white border rounded-md py-2 text-gray-900 border-gray-500`}>
                  {/* {OPPORTUNITIES.map(opportunity => (
                  <div
                    className={`${formProperties.opportunities}-menu-item flex items-center py-1`}
                    key={opportunity.name}>
                    <Checkbox
                      className='mx-2'
                      id={`${formProperties.opportunities}-${replacetoDash(opportunity.name)}`}
                      name={`${formProperties.opportunities}-${replacetoDash(opportunity.name)}`}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOptionChange(event.target.name)}
                    />
                    <Label
                      className='px-2'
                      htmlFor={`${formProperties.opportunities}-${replacetoDash(opportunity.name)}`}
                      labelText={opportunity.name}
                    />
                  </div>
                ))} */}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={`${sectionPrefix}-buttons-container flex justify-between items-center mt-4`}>
          <Button
            buttonText='Geri'
            className={`${sectionPrefix}-prev-button bg-primary text-text text-sm rounded-lg block p-2.5`}
            id={`${sectionPrefix}-prev-button`}
            type={`submit`}
            onClick={() => setActivePage(activePage - 1)}
          />
          <Button
            buttonText={servicePointInformation?.id > 0 ? 'Guncelle' : 'Kaydet'}
            className={`${sectionPrefix}-submit-button bg-primary text-text text-sm rounded-lg block p-2.5`}
            id={`${sectionPrefix}-submit-button`}
            type={`submit`}
          />
        </div>
      </form >
    )
  )
};

export default ServicePointModalFormFourthPage;
