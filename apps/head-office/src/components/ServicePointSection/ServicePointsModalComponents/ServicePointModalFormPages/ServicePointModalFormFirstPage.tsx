import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { Dropdown } from '@projects/dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { toggleServicePointDataUpdated } from '../../../../../app/redux/features/isServicePointDataUpdated';
import { setServicePointData } from '../../../../../app/redux/features/servicePointData';
import { RootState } from '../../../../../app/redux/store';
import { BRAND_PREFIX } from '../../../../constants/constants';
import { ICompanyProps, IFormDataProps, IModalFirstPageInputsProps } from '../../types';
import { addStationRequest, getCompaniesRequest, getResellersRequest, updateStationRequest } from '../../../../../app/api/servicePoints';

const ServicePointModalFormFirstPage: React.FC<IModalFirstPageInputsProps> = ({
  activePage,
  stationId,
  setActivePage,
  setStationId,
}: IModalFirstPageInputsProps) => {
  const formName: string[] = ['name', 'reseller', 'company'];
  const hasStationId: boolean = stationId !== 0;
  const sectionPrefix: string = 'service-point';
  const formProperties = {
    name: `${sectionPrefix}-${formName[0]}`,
    reseller: `${sectionPrefix}-${formName[1]}`,
    company: `${sectionPrefix}-${formName[2]}`,
  };
  const dispatch = useDispatch();
  const { formState: { errors }, handleSubmit, register } = useForm();
  const servicePointData = useSelector((state: RootState) => state.servicePointData.servicePointData);
  const [companies, setCompanies] = useState<ICompanyProps[] | []>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [resellers, setResellers] = useState<ICompanyProps[] | []>([]);
  const hasServicePointDataId: boolean = servicePointData.id > 0;
  const [firstPageFormData, setFirstPageFormData] = useState<IFormDataProps>({
    [`${formProperties.name}`]: servicePointData.name || '',
    [`${formProperties.reseller}`]: servicePointData.resellerCompanyId || 1,
    [`${formProperties.company}`]: servicePointData.companyId || 1,
  });

  const createServicePointConfigData = (): IFormDataProps => ({
    name: firstPageFormData[`${formProperties.name}`],
    resellerCompanyId: firstPageFormData[`${formProperties.reseller}`],
    companyId: firstPageFormData[`${formProperties.company}`],
    isActive: true,
    ...(hasServicePointDataId && { id: servicePointData.id }),
  });
  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFirstPageFormData({
      ...firstPageFormData,
      [event.target.name]: Number(event.target.value),
    });
  };
  const handleFormSubmit: SubmitHandler<IFormDataProps> = async () => {
    setIsDisabled(true);

    if (stationId !== 0) {
      setActivePage(activePage + 1);

      return;
    };

    handleServicePointOperation();
  };
  const handleServicePointOperation = async () => {
    let response;
    const actionData = createServicePointConfigData();

    if (hasServicePointDataId) {
      response = await updateStationRequest(actionData);
      setStationId(servicePointData.id);
    } else {
      response = await addStationRequest(actionData);
      setStationId(response.data[0].id);
    }

    dispatch(
      setServicePointData({
        ...servicePointData,
        id: servicePointData.id || response.data[0].id,
        name: firstPageFormData[`${formProperties.name}`],
        resellerCompanyId: firstPageFormData[`${formProperties.reseller}`],
        companyId: firstPageFormData[`${formProperties.company}`]
      })
    );
    dispatch(toggleServicePointDataUpdated(true));
    setActivePage(activePage + 1);
  };
  const getDropdownData = async () => {
    try {
      if (resellers.length === 0 && companies.length === 0) {
        const resellers = await getResellersRequest();
        const companies = await getCompaniesRequest();

        setResellers(resellers);
        setCompanies(companies);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDropdownData();
  }, []);

  return (
    companies.length > 0 &&
    resellers.length > 0 && (
      <form
        className={`${BRAND_PREFIX}-modal-form-page-1 ${activePage === 1 ? 'block' : 'hidden'}`}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className={`${formProperties.name}-container`}>
          <Label
            className={`${formProperties.name}-label block mb-2 text-heading`}
            htmlFor={`${formProperties.name}`}
            labelText={`Istasyon Ismi`}
          >
            <span className="text-md text-error">*</span>
          </Label>
          <Input
            className={`${formProperties.name}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary hover:${hasStationId
              ? 'cursor-not-allowed'
              : ''
              }`
            }
            disabled={hasStationId}
            id={`${formProperties.name}`}
            name={`${formProperties.name}`}
            register={
              register(`${formProperties.name}`, {
                minLength: {
                  value: 3,
                  message: 'En az 3 karakter girmelisiniz.',
                },
                required: `Istasyon Ismi zorunludur.`,
                value: firstPageFormData[`${formProperties.name}`].toString(),
                onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                  setFirstPageFormData({
                    ...firstPageFormData,
                    [event.target.name]: event.target.value,
                  });
                },
              })}
            type={`text`}
          />
          {errors[`${formProperties.name}`]
            && errors[`${formProperties.name}`]?.message
            && (
              <div className={`${formProperties.name}-error-wrapper my-4 font-bold text-error`}>
                <p className={`${formProperties.name}-error-message text-error`}>
                  {errors[`${formProperties.name}`]?.message?.toString()}
                </p>
              </div>
            )}
        </div>
        <div className={`${formProperties.company}-container`}>
          <Label
            className={`${formProperties.company}-label block mb-2 text-heading font-semibold`}
            htmlFor={`${formProperties.company}`}
            labelText={`Sirket`}
          >
            <span className="text-md text-error">*</span>
          </Label>
          <Dropdown
            className={`${formProperties.company}-input border text-text text-sm rounded-lg block w-full focus:ring-primary focus:border-primary p-2.5 mb-4 hover:${hasStationId
              ? 'cursor-not-allowed'
              : ''
              }`
            }
            disabled={hasStationId}
            id={`${formProperties.company}`}
            items={companies}
            name={`${formProperties.company}`}
            onChange={handleDropdownChange}
            optionClassName={`hover:bg-primary-lighter hover:text-black`}
            selectedValue={
              hasServicePointDataId
                ? servicePointData.companyId.toString()
                : hasStationId
                  ? servicePointData[`${formProperties.company}`]?.toString()
                  : companies[0]
            }
            value={servicePointData[`${formProperties.company}`]?.toString()}
          />
        </div>
        <div className={`${formProperties.reseller}-container`}>
          <Label
            className={`${formProperties.reseller}-label block mb-2 text-heading font-semibold`}
            htmlFor={`${formProperties.reseller}`}
            labelText={`Bayi`}
          >
            <span className="text-md text-error">*</span>
          </Label>
          <Dropdown
            className={`${formProperties.reseller}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary hover:${hasStationId
              ? 'cursor-not-allowed'
              : ''
              }`
            }
            disabled={hasStationId}
            id={`${formProperties.reseller}`}
            items={resellers}
            name={`${formProperties.reseller}`}
            onChange={handleDropdownChange}
            selectedValue={
              hasServicePointDataId
                ? servicePointData.resellerCompanyId.toString()
                : hasStationId
                  ? servicePointData[`${formProperties.reseller}`]?.toString()
                  : resellers[0]
            }
            value={servicePointData[`${formProperties.reseller}`]?.toString()}
          />
        </div>
        <div className={`${sectionPrefix}-buttons-container flex flex-row-reverse`}>
          <Button
            buttonText="Ileri"
            className={`${sectionPrefix}-submit-button bg-primary text-text text-sm rounded-lg block p-2.5`}
            disabled={isDisabled}
            id={`${sectionPrefix}-submit-button`}
            type={`submit`}
          />
        </div>
      </form>
    )
  );
};

export default ServicePointModalFormFirstPage;
