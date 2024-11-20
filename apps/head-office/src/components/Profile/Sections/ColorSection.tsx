import React, { useEffect, useState } from 'react';
import { isNil } from 'lodash';
import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import { useGetKeyByListMutation, useUpdatedKeyListMutation } from '../../../../app/api/services/static/static.service';
import { ResourceKey } from '../../../../app/api/services/static/static.interface';

const ColorSection: React.FC = () => {
  const colorNames: string[] = ['Primary', 'Secondary', 'Alternate', 'Backup'];
  const profilePagePrefix: string = `${BRAND_PREFIX}-profile`;
  const [getColors, { data: pageColors }] = useGetKeyByListMutation();
  const [colors, setColors] = useState(pageColors);
  const [updateKeyList] = useUpdatedKeyListMutation();


  const handleColorsSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    colors &&
      updateKeyList({
        body: colors.map((color) => {
          return {
            resourceKey: color.resourceKey,
            value: color.value,
            id: color.id,
          };
        }) as Array<ResourceKey>,
      });

    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  useEffect(() => {
    getColors({
      body: {
        resourceKeyList: ['Alternate', 'Backup', 'Primary', 'Secondary'],
      },
    }).unwrap().then((response) => {
      setColors(response);
    });
  }, []);

  return (
    <div className={`${profilePagePrefix}-colors-form-container flex justify-between items-center h-full`}>
      <form
        className={`${profilePagePrefix}-colors-form flex justify-between w-full h-full flex-col`}
        onSubmit={handleColorsSubmit}
      >
        <div
          className={`${profilePagePrefix}-colors-form-header flex flex-col w-full block mb-2 text-heading font-semibold px-2`}
        >
          Renkler
        </div>
        <div className={`${profilePagePrefix}-colors-form-content flex flex-col w-full h-full justify-evenly`}>
          {
            colors && pageColors &&
            pageColors.map((color, index) => {
              return (
                <div key={index} className={`${profilePagePrefix}-colors-container w-full flex`}>
                  <Label
                    className={`${profilePagePrefix}-color-label block mb-2 text-heading font-normal w-1/2`}
                    htmlFor={`${profilePagePrefix}-${index}-input`}
                    labelText={`${colorNames[index]} Renk: ${colors[index].value}`}
                  />
                  <div
                    className={`${profilePagePrefix}-color-input-container flex justify-between items-center w-full`}
                  >
                    <Input
                      className={`${profilePagePrefix}-color-input border-black rounded-lg w-full`}
                      id={`${profilePagePrefix}-${index}-input`}
                      name={`${profilePagePrefix}-${color.resourceKey.toLocaleLowerCase()}-input`}
                      placeholder={`${color.value.charAt(0).toUpperCase() + color.value.slice(1)}`}
                      type="color"
                      value={(colors && colors[index].value)}
                      dataAttributes={{ 'data-color-id': color.id.toString() }}
                      onChange={(event) => {
                        const newColors = [...colors];

                        if (!isNil(newColors[index])) {
                          newColors[index] = {
                            ...newColors[index],
                            value: event.currentTarget.value || event.target.value,
                          };

                          setColors(newColors);
                        }
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>

        <div className={`${profilePagePrefix}-colors-form-footer flex justify-end w-full`}>
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
