import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { CheckboxInDropdown } from '@projects/checkbox-in-dropdown';
import { Label } from '@projects/label';
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
  opportunities,
  stationId,
  setActivePage,
  setPaymentMethods,
  setOpportunities,
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
  const servicePointInformation = useSelector((state: RootState) => {
    return state.servicePointInformation.servicePointInformation;
  });
  const [fourthPageFormData, setFourthPageFormData] = useState<IFormDataProps>({
    [`${formProperties.paymentMethods}`]: paymentMethods || [],
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
    const filteredPaymentMethods = paymentMethods
      .filter((paymentMethod) => paymentMethod.isChecked)
      .map((paymentMethod) => ({
        ...paymentMethod,
        stationId: stationId,
      }));

    return JSON.stringify(filteredPaymentMethods);
  };
  const createOpportunities = async () => {
    await axios
      .post(
        process.env.ADD_STATION_FEATURE || '',
        createOpportunitiesConfigData(),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => response.data)
  };
  const createOpportunitiesConfigData = () => {
    const filteredOpportunities = opportunities
      .filter((opportunity) => opportunity.isChecked)
      .map((opportunity) => ({
        ...opportunity,
        stationId: stationId,
      }));

    return JSON.stringify(filteredOpportunities);
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
        { stationId: stationId },
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
        paymentMethods: fourthPageFormData[`${formProperties.paymentMethods}`],
        parking: fourthPageFormData[`${formProperties.parking}`],
        opportunities: fourthPageFormData[`${formProperties.opportunities}`],
      })
    );

    createServicePointDetails();
    createPaymentMethods();
    createOpportunities();
  };

  useEffect(() => {
    setFourthPageFormData({
      ...fourthPageFormData,
      [`${formProperties.opportunities}`]: opportunities,
    });

    dispatch(setServicePointInformation({
      ...servicePointInformation,
      paymentMethods: fourthPageFormData[`${formProperties.paymentMethods}`],
      parking: fourthPageFormData[`${formProperties.parking}`],
      opportunities: fourthPageFormData[`${formProperties.opportunities}`],
    }));
  }, [opportunities]);


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
            onChange={(paymentMethods) => {
              setPaymentMethods(paymentMethods)
              setFourthPageFormData({
                ...fourthPageFormData,
                [`${formProperties.paymentMethods}`]: paymentMethods,
              });
            }}
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
          <div className={`${formProperties.opportunities}-container`}>
            <Label
              className={`${formProperties.opportunities}-label block mb-2 text-sm font-medium text-gray-900`}
              htmlFor={`${formProperties.opportunities}`}
              labelText={`Servis Noktasi Olanaklari`}
            />
            <CheckboxInDropdown
              className={`${formProperties.opportunities}-input bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4`}
              id={`${formProperties.opportunities}`}
              inputName={`${formProperties.opportunities}`}
              items={opportunities}
              onChange={(opportunities) => {
                setOpportunities(opportunities)
                setFourthPageFormData({
                  ...fourthPageFormData,
                  [`${formProperties.opportunities}`]: opportunities,
                });
              }}
            />
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
