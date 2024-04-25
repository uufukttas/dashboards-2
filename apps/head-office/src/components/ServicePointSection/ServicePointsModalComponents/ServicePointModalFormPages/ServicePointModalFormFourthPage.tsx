import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { Checkbox } from '@projects/checkbox';
import { Dropdown } from '@projects/dropdown';
import { Label } from '@projects/label';
import { Radio } from '@projects/radio';
import { hideAlert, showAlert } from '../../../../../app/redux/features/alertInformation';
import { toggleModalVisibility } from '../../../../../app/redux/features/isModalVisible';
import { toggleServicePointDataUpdated } from '../../../../../app/redux/features/isServicePointDataUpdated';
import { setServicePointInformation } from '../../../../../app/redux/features/servicePointInformation';
import { RootState } from '../../../../../app/redux/store';
import { PAYMENT_METHODS, OPPORTUNITIES, BRAND_PREFIX } from '../../../../constants/constants';
import { IFormDataProps, IModalFourthPageInputsProps } from '../../types';

const ServicePointModalFormFourthPage: React.FC<IModalFourthPageInputsProps> = ({
  activePage,
  stationId,
  setActivePage
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
  const isModalVisible = useSelector((state: RootState) => state.isModalVisible.isModalVisible);
  const servicePointInformation = useSelector((state: RootState) => {
    return state.servicePointInformation.servicePointInformation;
  });
  const [isSelectboxOpen, setIsSelectboxOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [fourthPageFormData, setFourthPageFormData] = useState<IFormDataProps>({
    [`${formProperties.paymentMethods}`]: servicePointInformation?.paymentMethods || '1',
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
        dispatch(toggleModalVisibility(isModalVisible));
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
  };
  const handleOptionChange = (value: string) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };
  const replacetoDash = (value: string) => value.replace(/\s+/g, '-').toLowerCase();
  const toggleDropdown = () => setIsSelectboxOpen(!isSelectboxOpen);

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

    console.log('selectedOptions', selectedOptions)
  }, [selectedOptions]);

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
                {OPPORTUNITIES.map(opportunity => (
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
                ))}
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
};

export default ServicePointModalFormFourthPage;
