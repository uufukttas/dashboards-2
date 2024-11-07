import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { CheckboxInDropdown } from '@projects/checkbox-in-dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import {
  addStationFeatureRequest,
  addStationInfoRequest,
  getStationFeaturesRequest,
  updateStationInfoRequest
} from '../../../../../app/api/servicePoints';
import { hideAlert, showAlert } from '../../../../../app/redux/features/alertInformation';
import { toggleModalVisibility } from '../../../../../app/redux/features/isModalVisible';
import { toggleServicePointDataUpdated } from '../../../../../app/redux/features/isServicePointDataUpdated';
import { setServicePointInformation } from '../../../../../app/redux/features/servicePointInformation';
import { RootState } from '../../../../../app/redux/store';
import { BRAND_PREFIX } from '../../../../constants/constants';
import { IFeatureProps, IFormDataProps, IModalFourthPageInputsProps } from '../../types';

const ServicePointModalFormFourthPage: React.FC<IModalFourthPageInputsProps> = ({
  activePage,
  paymentMethods,
  opportunities,
  stationId,
  setActivePage,
  setPaymentMethods,
  setOpportunities,
}: IModalFourthPageInputsProps) => {
  const formName = ['payment-methods', 'free-park-count', 'opportunities'];
  const sectionPrefix = 'service-point';
  const formProperties = {
    paymentMethods: `${sectionPrefix}-${formName[0]}`,
    freeParkCount: `${sectionPrefix}-${formName[1]}`,
    opportunities: `${sectionPrefix}-${formName[2]}`,
  };
  const dispatch = useDispatch();
  const { handleSubmit } = useForm();
  const servicePointInformation = useSelector((state: RootState) => {
    return state.servicePointInformation.servicePointInformation;
  });
  const [fourthPageFormData, setFourthPageFormData] = useState<IFormDataProps>({
    [`${formProperties.paymentMethods}`]: paymentMethods || [],
    [`${formProperties.freeParkCount}`]: servicePointInformation.freeParkCount || 0,
    [`${formProperties.opportunities}`]: opportunities || [],
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const createConfigData = () => ({
    address: servicePointInformation.address,
    addressDetail: servicePointInformation.addressDetail,
    phone1: servicePointInformation.phone1,
    phone2: servicePointInformation.phone2,
    lat: servicePointInformation.lat,
    lon: servicePointInformation.lon,
    cityId: servicePointInformation.cityId,
    districtId: servicePointInformation.districtId,
    ...(servicePointInformation?.id > 0 ? { id: servicePointInformation?.id } : { stationId: stationId })
  });
  const createParkingConfigData = () => {
    return [
      {
        id: 0,
        rid: 0,
        name: `${formProperties.freeParkCount}`,
        stationId: stationId,
        stationFeatureType: 8,
        stationFeatureValue: Number(fourthPageFormData[`${formProperties.freeParkCount}`]),
        isDeleted: false
      }
    ]
  };
  const createPaymentMethodsConfigData = (): Promise<IFeatureProps[] | []> => {
    return new Promise((resolve) => {
      if (paymentMethods.length === 0) {
        resolve([]);
      } else {
        const filteredPaymentMethods = paymentMethods
          .filter(paymentMethod => paymentMethod.isChecked)
          .map(paymentMethod => ({
            ...paymentMethod,
            stationId: stationId,
            id: null,
            name: '',
            rid: null,
            stationFeatureType: 1,
            stationFeatureValue: Number(paymentMethod.stationFeatureValue),
            isDeleted: false
          }));
        resolve(filteredPaymentMethods);
      }
    });
  };
  const createOpportunitiesConfigData = (): Promise<IFeatureProps[] | []> => {
    return new Promise((resolve, reject) => {
      if (opportunities.length === 0) {
        resolve([]);
      } else {
        const filteredOpportunities = opportunities
          .filter(opportunity => opportunity.isChecked)
          .map(opportunity => ({
            ...opportunity,
            stationId: stationId,
            stationFeatureType: 2,
            stationFeatureValue: Number(opportunity.stationFeatureValue),
            isDeleted: false
          }));
        resolve(filteredOpportunities);
      }
    });
  };
  const createServicePointDetails = async () => {
    const actionData = (createConfigData());

    let response;
    if (servicePointInformation?.id > 0) {
      response = await updateStationInfoRequest(actionData);
    } else {
      response = await addStationInfoRequest(actionData);
    }

    dispatch(toggleModalVisibility(false));
    dispatch(
      showAlert({
        message: response?.message,
        type: 'success',
      })
    );

    setTimeout(() => {
      dispatch(hideAlert());
    }, 5000);

    dispatch(toggleServicePointDataUpdated(true));
  };
  const getSelectedStationFeatures = async () => {
    const response = await getStationFeaturesRequest(stationId);

    const selectedPaymentMethods = response.filter((feature: IFeatureProps) => feature.stationFeatureType === 1);


    const updatedPaymentMethods = paymentMethods.map((paymentMethod: IFeatureProps) => {
      const isChecked = selectedPaymentMethods.some((selectedPaymentMethod: IFeatureProps) => {
        return paymentMethod.stationFeatureValue === Number(selectedPaymentMethod.stationFeatureValue);
      });

      return {
        ...paymentMethod,
        isChecked: isChecked || paymentMethod.isChecked
      };
    });

    setPaymentMethods(updatedPaymentMethods);

    const selectedOpportunities = response.filter((feature: IFeatureProps) => feature.stationFeatureType === 2);

    const updatedOpportunities = opportunities.map((opportunity: IFeatureProps) => {
      const isChecked = selectedOpportunities.some((selectedOpportunity: IFeatureProps) => {
        return opportunity.stationFeatureValue === Number(selectedOpportunity.stationFeatureValue);
      });

      return {
        ...opportunity,
        isChecked: isChecked || opportunity.isChecked
      };
    });

    setOpportunities(updatedOpportunities);

    setFourthPageFormData({
      ...fourthPageFormData,
      [`${formProperties.paymentMethods}`]: selectedPaymentMethods,
      [`${formProperties.opportunities}`]: selectedOpportunities,
    });
  };
  const getStationParkingFeatures = async () => {
    const response = await getStationFeaturesRequest(stationId);
    const parkingCount = response
      .filter((feature: IFeatureProps) => feature.stationFeatureType === 8)[0].stationFeatureValue;

    setFourthPageFormData({
      ...fourthPageFormData,
      [`${formProperties.freeParkCount}`]: parkingCount,
    });
  };
  const handleFormSubmit: SubmitHandler<IFormDataProps> = () => {
    setIsDisabled(true);
    dispatch(
      setServicePointInformation({
        ...servicePointInformation,
        paymentMethods: fourthPageFormData[`${formProperties.paymentMethods}`],
        freeParkCount: fourthPageFormData[`${formProperties.freeParkCount}`],
        opportunities: fourthPageFormData[`${formProperties.opportunities}`],
      })
    );

    createServicePointDetails();

    Promise.all([
      createPaymentMethodsConfigData(),
      createOpportunitiesConfigData(),
      createParkingConfigData()
    ]).then(([filteredPaymentMethods, filteredOpportunities, freeParkCount]) => {
      if (filteredPaymentMethods && filteredOpportunities) {
        setStationFeatures([
          ...filteredPaymentMethods,
          ...filteredOpportunities,
          ...freeParkCount
        ]);
      } else {
        console.error('One of the arrays is empty or undefined');
      }
    })
      .catch(error => console.error('Error in Promise.all:', error));
  };
  const setStationFeatures = async (featuresData: IFeatureProps[]) => {
    const response = await addStationFeatureRequest(JSON.stringify(featuresData));

    console.log('response', response);
  };

  useEffect(() => {
    setFourthPageFormData({
      ...fourthPageFormData,
      [`${formProperties.opportunities}`]: opportunities,
    });

    dispatch(setServicePointInformation({
      ...servicePointInformation,
      paymentMethods: fourthPageFormData[`${formProperties.paymentMethods}`],
      freeParkCount: fourthPageFormData[`${formProperties.freeParkCount}`],
      opportunities: fourthPageFormData[`${formProperties.opportunities}`],
    }));
  }, [opportunities]);

  useEffect(() => {
    getSelectedStationFeatures();
    getStationParkingFeatures();
  }, []);

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
            className={`${formProperties.paymentMethods}-input bg-gray-50 border rounded-lg block w-full mb-4 border-gray-300 text-sm text-gray-900`}
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
        <div className={`${formProperties.freeParkCount}-container`}>
          <Label
            className={`${formProperties.freeParkCount}-block mb-2 text-heading font-semibold`}
            htmlFor={`${formProperties.freeParkCount}`}
            labelText={`Ucretsiz arac park sayisi`} />
          <Input
            className={`${formProperties.freeParkCount}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4`}
            id={`${formProperties.freeParkCount}`}
            name={`${formProperties.freeParkCount}`}
            value={fourthPageFormData[`${formProperties.freeParkCount}`]?.toString() || ''}
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
              labelText={`İstasyon Olanaklari`}
            />
            <CheckboxInDropdown
              className={`${formProperties.opportunities}-input bg-gray-50 border rounded-lg block w-full mb-4 border-gray-300 text-sm text-gray-900`}
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
            disabled={isDisabled}
            id={`${sectionPrefix}-submit-button`}
            type={`submit`}
          />
        </div>
      </form >
    )
  )
};

export default ServicePointModalFormFourthPage;
