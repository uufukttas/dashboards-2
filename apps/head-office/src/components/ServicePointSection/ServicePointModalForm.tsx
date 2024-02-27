import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { Checkbox } from '@projects/checkbox';
import { Dropdown } from '@projects/dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { Radio } from '@projects/radio';
import { Textarea } from '@projects/textarea';
import { servicePointModalInputs } from './ServicePointModalFormInputs';
import ServicePointModalFormFirstPage from './ServicePointModalFormFirstPage';
import ServicePointModalFormSecondPage from './ServicePointModalFormSecondPage';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { RootState } from '../../../app/redux/store';

const ServicePointModalForm = () => {
  const isModalVisible = useSelector((state: RootState) => state.isModalVisibleReducer.isModalVisible);
  const updatedServicePoint = useSelector((state: RootState) => state.updatedServicePointReducer.updatedServicePoint);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [activePage, setActivePage] = useState(0);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();
  const { formState: { errors }, handleSubmit, register } = useForm();

  const createRequestData = () => {
    return ({
      "name": formData['service-point-name'],
      "title": formData['service-point-property'],
      "phoneNumbers": [formData['service-point-number1'], formData['service-point-number2']],
      "address": formData['service-point-address'],
      "city": Number(formData['service-point-city']) || 1,
      "district": Number(formData['service-point-district']) || 1,
      "paymentMethods": [formData['service-point-payment-methods']],
      "freePark": formData['service-point-parking'] === 'true' ? true : false,
      "opportunities": [formData['service-point-opportunity']],
      "longitude": Number(formData['service-point-x-coor']),
      "latitude": Number(formData['service-point-y-coor']),
    });
  };
  const createServicePoint = () => {
    const data = JSON.stringify(createRequestData());

    axios.post(
      (process.env.ADD_SERVICE_POINT || ''),
      data, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => {
        dispatch(toggleModalVisibility(isModalVisible));
      })
      .catch((error) => {
        // TODO: Logging on the backend side
        console.log(error);
      });
  };
  const getCities = async () => {
    try {
      const cityResponse = await axios.get(
        process.env.CITY_URL || ''
      ).then((response) => response.data);

      setCities(cityResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getDistricts = async () => {
    try {
      const districtResponse = await axios.post(
        process.env.DISTRICT_URL || '',
        { 'plateNumber': Number(formData['service-point-city']) }
      ).then((response) => response.data);

      setDistricts(districtResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  const updateServicePoint = () => {
    const data = JSON.stringify({ ...createRequestData(), "id": updatedServicePoint.id });

    axios.post(
      process.env.UPDATE_SERVICE_POINT || '',
      data,
      {
        headers: { 'Content-Type': 'application/json' }
      })
      .then((response) => {
        dispatch(toggleModalVisibility(isModalVisible));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getDropdownItems = (input: { id: string; extra: { items: string[]; } }, cities: string[], districts: string[]): string[] => {
    switch (input.id) {
      case 'service-point-city':
        return cities;
      case 'service-point-district':
        return districts;
      default:
        return input.extra.items;
    };
  };
  const getClickHandler = (inputId: string, setActivePage: (page: number) => void, activePage: number) => {
    switch (true) {
      case inputId.indexOf('next') > -1:
        return () => setActivePage(activePage + 1);
      case inputId.indexOf('prev') > -1:
        return () => setActivePage(activePage - 1);
      case inputId.indexOf('submit') > -1:
        return () => { };
      default:
        return () => { }; // Varsayılan olarak boş bir fonksiyon döndür
    }
  };
  useEffect(() => {
    if (activePage === 2) {
      getCities();
    }

    if (formData['service-point-city']) {
      getDistricts();
    }
  }, [activePage]);

  return (
    <div className="service-point-create-form-wrapper">
      {/* <form onSubmit={handleSubmit(Object.keys(updatedServicePoint).length > 0 ? updateServicePoint : createServicePoint)}> */}
      <div className="service-point-create-modal-fieldset-container relative p-4 bg-white rounded-lg sm:p-5 max-h-[650px]">
        {/* {servicePointModalInputs.map((modalPageInputs, modalPageIndex) => { */}
        {/* return ( */}
        <>
          {/* <ServicePointModalFormFirstPage
            activePage={0}
          /> */}
          <ServicePointModalFormSecondPage
            activePage={0}
          />
          {/* {
                  modalPageIndex === 0 &&
                  <fieldset key={modalPageIndex} className={`sh-modal-page-${modalPageIndex} ${activePage === 0 ? 'block' : 'hidden'}`} onSubmit={getClickHandler(modalPageInputs[3].id, setActivePage, activePage)}>
                    <div className={`${modalPageInputs[0].name}-container`}>
                      <Label htmlFor={modalPageInputs[0].name} labelText={modalPageInputs[0].label} className={modalPageInputs[0].labelClassName}>
                        <span className="text-md text-error">*</span>
                      </Label>
                      <Input
                        ariaInvalid={modalPageInputs[0].required}
                        id={modalPageInputs[0].id}
                        name={modalPageInputs[0].name}
                        className={modalPageInputs[0].inputClassName}
                        type={modalPageInputs[0].type}
                        placeholder={modalPageInputs[0].placeholder}
                        register={register(modalPageInputs[0].name.toLowerCase(), {
                          minLength: { value: 3, message: 'Minimum length is 3.' },
                          required: `${modalPageInputs[0].label} is required.`,
                          onChange: (event) => { setFormData({ ...formData, [modalPageInputs[0].name]: event.currentTarget.value }) }
                        })}
                        value={formData[modalPageInputs[0].name] || ''}
                      />
                      {errors[modalPageInputs[0].name.toLowerCase()] && errors[modalPageInputs[0].name.toLowerCase()]?.message && (
                        <div className={`${modalPageInputs[0].name.toLowerCase()}-error-wrapper my-4 font-bold text-error`}>
                          <p className={`${modalPageInputs[0].name.toLowerCase()}-error-message`}>
                            {(errors[modalPageInputs[0].name]?.message?.toString())}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className={`${modalPageInputs[1].name}-container`}>
                      <Label htmlFor={modalPageInputs[1].name} labelText={modalPageInputs[1].label} className={modalPageInputs[1].labelClassName} />
                      <Dropdown
                        id={modalPageInputs[1].label}
                        name={modalPageInputs[1].name}
                        className={modalPageInputs[1].inputClassName}
                        items={getDropdownItems(modalPageInputs[1], cities, districts)}
                        register={register(modalPageInputs[1].name.toLowerCase(), {
                          required: `${modalPageInputs[1]} is required.`,
                          value: formData[modalPageInputs[1].name],
                          onChange: (event) => { setFormData({ ...formData, [modalPageInputs[1].name]: event.target.value }) },
                        })}
                      />
                    </div>
                    <div className={`${modalPageInputs[2].name}-container`}>
                      <Label htmlFor={modalPageInputs[2].name} labelText={modalPageInputs[2].label} className={modalPageInputs[2].labelClassName} />
                      <Dropdown
                        id={modalPageInputs[2].label}
                        name={modalPageInputs[2].name}
                        className={modalPageInputs[2].inputClassName}
                        items={getDropdownItems(modalPageInputs[2], cities, districts)}
                        register={register(modalPageInputs[2].name.toLowerCase(), {
                          required: `${modalPageInputs[2]} is required.`,
                          onChange: (event) => { setFormData({ ...formData, [modalPageInputs[2].name]: event.target.value }) },
                          value: formData[modalPageInputs[2].name]
                        })}
                      />
                    </div>
                    <div className={`${modalPageInputs[3].name}-container flex justify-end`}>
                      <Button
                        buttonText={modalPageInputs[3].label}
                        className={modalPageInputs[3].inputClassName}
                        id={modalPageInputs[3].id}
                        type={'submit'}
                      />
                    </div>
                  </fieldset>
                }
                {
                  modalPageIndex === 1 &&
                  <fieldset key={modalPageIndex} className={`sh-modal-page-${modalPageIndex} ${activePage === 1 ? 'block' : 'hidden'}`}>
                    <div className={`${modalPageInputs[0].name}-container`}>
                      <Label htmlFor={modalPageInputs[0].name} labelText={modalPageInputs[0].label} className={modalPageInputs[0].labelClassName} />
                      <Dropdown
                        id={modalPageInputs[0].label}
                        name={modalPageInputs[0].name}
                        className={modalPageInputs[0].inputClassName}
                        items={getDropdownItems(modalPageInputs[0], cities, districts)}
                        register={register(modalPageInputs[0].name.toLowerCase(), {
                          required: `${modalPageInputs[0]} is required.`,
                          onChange: (event) => { setFormData({ ...formData, [modalPageInputs[0].name]: event.target.value }) },
                          value: formData[modalPageInputs[0].name]
                        })}
                      />
                      {errors[modalPageInputs[0].name.toLowerCase()] && errors[modalPageInputs[0].name.toLowerCase()]?.message && (
                        <div className={`${modalPageInputs[0].name.toLowerCase()}-error-wrapper my-4 font-bold text-error`}>
                          <p className={`${modalPageInputs[0].name.toLowerCase()}-error-message`}>
                            {(errors[modalPageInputs[0].name]?.message?.toString())}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className={`${modalPageInputs[1].name}-container`}>
                      <Label htmlFor={modalPageInputs[1].name} labelText={modalPageInputs[1].label} className={modalPageInputs[1].labelClassName} />
                      <Input
                        ariaInvalid={modalPageInputs[1].required}
                        id={modalPageInputs[1].id}
                        name={modalPageInputs[1].name}
                        className={modalPageInputs[1].inputClassName}
                        type={modalPageInputs[1].type}
                        placeholder={modalPageInputs[1].placeholder}
                        register={register(modalPageInputs[1].name.toLowerCase(), {
                          required: `${modalPageInputs[1]} is required.`,
                          onChange: (event) => { setFormData({ ...formData, [modalPageInputs[1].name]: event.target.value }) },
                        })}
                        value={formData[modalPageInputs[1].name]}
                      />
                    </div>
                    <div className={`${modalPageInputs[2].name}-container`}>
                      <Label htmlFor={modalPageInputs[2].name} labelText={modalPageInputs[2].label} className={modalPageInputs[2].labelClassName} />
                      <Input
                        ariaInvalid={modalPageInputs[2].required}
                        id={modalPageInputs[2].id}
                        name={modalPageInputs[2].name}
                        className={modalPageInputs[2].inputClassName}
                        type={modalPageInputs[2].type}
                        placeholder={modalPageInputs[2].placeholder}
                        register={register(modalPageInputs[2].name.toLowerCase(), {
                          required: `${modalPageInputs[2]} is required.`,
                          onChange: (event) => { setFormData({ ...formData, [modalPageInputs[2].name]: event.target.value }) },
                        })}
                        value={formData[modalPageInputs[2].name]}
                      />
                    </div>
                    <div className={`${modalPageInputs[3].name}-container`}>
                      <Label htmlFor={modalPageInputs[3].name} labelText={modalPageInputs[2].label} className={modalPageInputs[2].labelClassName} />
                      <Textarea
                        id={modalPageInputs[3].label}
                        name={modalPageInputs[3].name}
                        className={modalPageInputs[3].inputClassName}
                        placeholder={modalPageInputs[3].placeholder}
                        register={register(modalPageInputs[3].name.toLowerCase(), {
                          required: `${modalPageInputs[3]} is required.`,
                          onChange: (event) => { setFormData({ ...formData, [modalPageInputs[3].name]: event.target.value }) },
                          value: formData[modalPageInputs[3].name]
                        })}
                      />
                    </div>
                    <div key={`${modalPageIndex}`} className={`${modalPageInputs[4].name}-container`}>
                      <Button
                        buttonText={modalPageInputs[4].label}
                        className={modalPageInputs[4].inputClassName}
                        type={'button'}
                        onClick={getClickHandler(modalPageInputs[4].id, setActivePage, activePage)}
                      />
                    </div>
                    <div key={`${modalPageIndex}`} className={`${modalPageInputs[5].name}-container`}>
                      <Button
                        buttonText={modalPageInputs[5].label}
                        className={modalPageInputs[5].inputClassName}
                        type={'button'}
                        onClick={getClickHandler(modalPageInputs[5].id, setActivePage, activePage)}
                      />
                    </div>
                  </fieldset>
                }
                {
                  modalPageIndex === 2 &&
                  <fieldset key={modalPageIndex} className={`sh-modal-page-${modalPageIndex} ${activePage === 2 ? 'block' : 'hidden'}`}>
                    <div className={`${modalPageInputs[0].name}-container`}>
                      <Label htmlFor={modalPageInputs[0].name} labelText={modalPageInputs[0].label} className={modalPageInputs[0].labelClassName} />
                      <Input
                        ariaInvalid={modalPageInputs[0].required}
                        id={modalPageInputs[0].id}
                        name={modalPageInputs[0].name}
                        className={modalPageInputs[0].inputClassName}
                        type={modalPageInputs[0].type}
                        placeholder={modalPageInputs[0].placeholder}
                        register={register(modalPageInputs[0].name.toLowerCase(), {
                          minLength: { value: 3, message: 'Minimum length is 3.' },
                          required: `${modalPageInputs[0].label} is required.`,
                          onChange: (event) => { setFormData({ ...formData, [modalPageInputs[0].name]: event.currentTarget.value }) }
                        })}
                        value={formData[modalPageInputs[0].name] || ''}
                      />
                      {errors[modalPageInputs[0].name.toLowerCase()] && errors[modalPageInputs[0].name.toLowerCase()]?.message && (
                        <div className={`${modalPageInputs[0].name.toLowerCase()}-error-wrapper my-4 font-bold text-error`}>
                          <p className={`${modalPageInputs[0].name.toLowerCase()}-error-message`}>
                            {(errors[modalPageInputs[0].name]?.message?.toString())}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className={`${modalPageInputs[1].name}-container`}>
                      <Label htmlFor={modalPageInputs[1].name} labelText={modalPageInputs[1].label} className={modalPageInputs[1].labelClassName} />
                      <Input
                        ariaInvalid={modalPageInputs[1].required}
                        id={modalPageInputs[1].id}
                        name={modalPageInputs[1].name}
                        className={modalPageInputs[1].inputClassName}
                        type={modalPageInputs[1].type}
                        placeholder={modalPageInputs[1].placeholder}
                        register={register(modalPageInputs[1].name.toLowerCase(), {
                          required: `${modalPageInputs[1]} is required.`,
                          onChange: (event) => { setFormData({ ...formData, [modalPageInputs[1].name]: event.target.value }) },
                        })}
                        value={formData[modalPageInputs[1].name]}
                      />
                    </div>
                    <div key={`${modalPageIndex}`} className={`${modalPageInputs[2].name}-container`}>
                      <Button
                        buttonText={modalPageInputs[2].label}
                        className={modalPageInputs[2].inputClassName}
                        type={'button'}
                        onClick={getClickHandler(modalPageInputs[2].id, setActivePage, activePage)}
                      />
                    </div>
                    <div key={`${modalPageIndex}`} className={`${modalPageInputs[3].name}-container`}>
                      <Button
                        buttonText={modalPageInputs[3].label}
                        className={modalPageInputs[3].inputClassName}
                        type={'button'}
                        onClick={getClickHandler(modalPageInputs[3].id, setActivePage, activePage)}
                      />
                    </div>
                  </fieldset>
                }
                {
                  modalPageIndex === 3 &&
                  <fieldset key={modalPageIndex} className={`sh-modal-page-${modalPageIndex} ${activePage === 3 ? 'block' : 'hidden'}`}>
                    <div className={`${modalPageInputs[0].name}-container`}>
                      <Label htmlFor={modalPageInputs[0].name} labelText={modalPageInputs[0].label} className={modalPageInputs[0].labelClassName} />
                      <Dropdown
                        id={modalPageInputs[0].label}
                        name={modalPageInputs[0].name}
                        className={modalPageInputs[0].inputClassName}
                        items={getDropdownItems(modalPageInputs[0], cities, districts)}
                        register={register(modalPageInputs[0].name.toLowerCase(), {
                          required: `${modalPageInputs[0]} is required.`,
                          onChange: (event) => { setFormData({ ...formData, [modalPageInputs[0].name]: event.target.value }) },
                          value: formData[modalPageInputs[0].name]
                        })}
                      />
                      {errors[modalPageInputs[0].name.toLowerCase()] && errors[modalPageInputs[0].name.toLowerCase()]?.message && (
                        <div className={`${modalPageInputs[0].name.toLowerCase()}-error-wrapper my-4 font-bold text-error`}>
                          <p className={`${modalPageInputs[0].name.toLowerCase()}-error-message`}>
                            {(errors[modalPageInputs[0].name]?.message?.toString())}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className={`${modalPageInputs[1].name}-container`}>
                      <Label htmlFor={modalPageInputs[1].name} labelText={modalPageInputs[1].label} className={modalPageInputs[1].labelClassName} />
                      <Dropdown
                        id={modalPageInputs[1].label}
                        name={modalPageInputs[1].name}
                        className={modalPageInputs[1].inputClassName}
                        items={getDropdownItems(modalPageInputs[1], cities, districts)}
                        register={register(modalPageInputs[1].name.toLowerCase(), {
                          required: `${modalPageInputs[1]} is required.`,
                          onChange: (event) => { setFormData({ ...formData, [modalPageInputs[1].name]: event.target.value }) },
                          value: formData[modalPageInputs[1].name]
                        })}
                      />
                    </div>

                    <div className={`${modalPageInputs[2].name}-container`}>
                      <Label htmlFor={modalPageInputs[2].name} labelText={modalPageInputs[2].label} className={modalPageInputs[2].labelClassName} />
                      <Dropdown
                        id={modalPageInputs[2].label}
                        name={modalPageInputs[2].name}
                        className={modalPageInputs[2].inputClassName}
                        items={getDropdownItems(modalPageInputs[2], cities, districts)}
                        register={register(modalPageInputs[2].name.toLowerCase(), {
                          required: `${modalPageInputs[2]} is required.`,
                          onChange: (event) => { setFormData({ ...formData, [modalPageInputs[2].name]: event.target.value }) },
                          value: formData[modalPageInputs[2].name]
                        })}
                      />
                    </div>

                    <div className={`${modalPageInputs[3].name}-container`}>
                      <Label htmlFor={modalPageInputs[3].name} labelText={modalPageInputs[3].label} className={modalPageInputs[3].labelClassName} />
                      <Radio
                        id={modalPageInputs[3].label}
                        name={modalPageInputs[3].name}
                        className={modalPageInputs[3].inputClassName}
                        register={register(modalPageInputs[3].name.toLowerCase(), {
                          required: `${modalPageInputs[3]} is required.`,
                          onChange: (event) => { setFormData({ ...formData, [modalPageInputs[3].name]: event.target.value }) },
                          value: formData[modalPageInputs[3].name]
                        })}
                      />
                    </div>

                    <div className={`${modalPageInputs[4].name}-container`}>
                      <Label htmlFor={modalPageInputs[4].name} labelText={modalPageInputs[4].label} className={modalPageInputs[4].labelClassName} />
                      <Checkbox
                        id={modalPageInputs[4].label}
                        name={modalPageInputs[4].name}
                        className={modalPageInputs[4].inputClassName}
                        register={register(modalPageInputs[4].name.toLowerCase(), {
                          required: `${modalPageInputs[4]} is required.`,
                          onChange: (event) => { setFormData({ ...formData, [modalPageInputs[4].name]: event.target.value }) },
                          value: formData[modalPageInputs[4].name]
                        })}
                      />
                    </div>

                    <div key={`${modalPageIndex}`} className={`${modalPageInputs[5].name}-container`}>
                      <Button
                        buttonText={modalPageInputs[5].label}
                        className={modalPageInputs[5].inputClassName}
                        type={'button'}
                        onClick={getClickHandler(modalPageInputs[5].id, setActivePage, activePage)}
                      />
                    </div>
                    <div key={`${modalPageIndex}`} className={`${modalPageInputs[6].name}-container`}>
                      <Button
                        buttonText={modalPageInputs[6].label}
                        className={modalPageInputs[6].inputClassName}
                        type={'submit'}
                        onClick={getClickHandler(modalPageInputs[6].id, setActivePage, activePage)}
                      />
                    </div>
                  </fieldset>
                } */}
        </>
        {/* ) */}
        {/* })} */}
      </div>
      {/* </form> */}
    </div>
  );
};

export default ServicePointModalForm;
