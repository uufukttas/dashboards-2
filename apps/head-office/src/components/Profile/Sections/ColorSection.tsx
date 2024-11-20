import React, { useEffect, useState } from 'react';
import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { updateColors } from '../../../../app/api/profile';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../app/redux/store';
import {
  hideAlert,
  showAlert,
} from '../../../../app/redux/features/alertInformation';
import { useGetKeyByListMutation } from '../../../../app/api/services/static/static.service';

const ColorSection: React.FC = () => {
  const colorNames: string[] = ['Primary', 'Secondary', 'Alternate', 'Backup'];
  const [getColors, { data: pageColors }] = useGetKeyByListMutation();
  const dispatch = useDispatch<AppDispatch>();

  const profilePagePrefix: string = `${BRAND_PREFIX}-profile`;

  const handleColorSubmitSuccess = () => {
    dispatch(
      showAlert({
        message: 'İşlem basariyla gerceklestirildi',
        type: 'success',
      })
    );
  };

  const handleColorSubmitError = () => {
    dispatch(showAlert({ message: 'İşlem basarisiz oldu', type: 'error' }));
  };

  const handleColorsSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    updateColors(setColorRequestData())
      .then(() => {
        console.log('Colors updated successfully');

        handleColorSubmitSuccess();
      })
      .catch(() => {
        handleColorSubmitError();
      });

    setTimeout(() => dispatch(hideAlert()), 600);
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  const setColorRequestData = () => {
    const payload = pageColors?.map((color) => {
      return {
        resourceKey: color.resourceKey,
        value: color.value,
        id: color.id,
      };
    });

    return payload;
  };

  useEffect(() => {
    getColors({
      body: {
        resourceKeyList: ['Alternate', 'Backup', 'Primary', 'Secondary'],
      },
    });
  }, []);

  return (
    <div
      className={`${profilePagePrefix}-colors-form-container flex justify-between items-center h-full`}
    >
      <form
        className={`${profilePagePrefix}-colors-form flex justify-between w-full h-full flex-col`}
        onSubmit={handleColorsSubmit}
      >
        <div
          className={`${profilePagePrefix}-colors-form-header flex flex-col w-full block mb-2 text-heading font-semibold px-2`}
        >
          Renkler
        </div>
        <div
          className={`${profilePagePrefix}-colors-form-content flex flex-col w-full h-full justify-evenly`}
        >
          {pageColors?.map((color, index) => {
            return (
              <div
                key={index}
                className={`${profilePagePrefix}-colors-container w-full flex`}
              >
                <Label
                  className={`${profilePagePrefix}-color-label block mb-2 text-heading font-normal w-1/2`}
                  htmlFor={`${profilePagePrefix}-${index}-input`}
                  labelText={`${colorNames[index]} Renk: ${pageColors[index].value}`}
                />
                <div
                  className={`${profilePagePrefix}-color-input-container flex justify-between items-center w-full`}
                >
                  <Input
                    className={`${profilePagePrefix}-color-input border-black rounded-lg w-full`}
                    id={`${profilePagePrefix}-${index}-input`}
                    name={`${profilePagePrefix}-${color}-input`}
                    placeholder={`${
                      color.value.charAt(0).toUpperCase() + color.value.slice(1)
                    }`}
                    type="color"
                    value={pageColors[index].value}
                    dataAttributes={{ 'data-color-id': color.id.toString() }}
                    onChange={(event) => {
                      const newColors = [...pageColors];
                      newColors[index].value = event.target.value;
                      // setPageColors(newColors);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div
          className={`${profilePagePrefix}-colors-form-footer flex justify-end w-full`}
        >
          <Button
            className={`${profilePagePrefix}-color-submit-button w-1/3 p-2 bg-primary text-white rounded-lg`}
            id={`${profilePagePrefix}-color-submit-button`}
            type="submit"
          >
            Renkleri Kaydet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ColorSection;
