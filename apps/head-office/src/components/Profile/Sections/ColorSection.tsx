import React, { useEffect, useState } from 'react';
import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { getColors, updateColors } from '../../../../app/api/profile';
import { BRAND_PREFIX } from '../../../../src/constants/constants';

const ColorSection: React.FC = () => {
    const colorNames: string[] = ['Primary', 'Secondary', 'Alternate', 'Backup'];
    const profilePagePrefix: string = `${BRAND_PREFIX}-profile`;
    const [pageColors, setPageColors] = useState<{ value: string; resourceKey: string; id: number }[]>([]);

    const getBrandColors = async (): Promise<void> => {
        const response = await getColors(colorNames);

        response.data.map((color: { value: string; resourceKey: string; id: number }) => {
            setPageColors((prev) => [...prev, { value: color.value, resourceKey: color.resourceKey, id: color.id }]);
        });
    };
    const handleColorsSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        const response = await updateColors(setColorRequestData());

        console.log('response', response)
    };
    const setColorRequestData = () => {
        const payload = pageColors.map((color) => {
            return {
                resourceKey: color.resourceKey,
                value: color.value,
                id: color.id
            };
        });

        return payload;
    };

    useEffect(() => {
        getBrandColors();
    }, []);

    return (
        <div className={`${profilePagePrefix}-colors-form-container flex justify-between items-center`}>
            <form
                className={`${profilePagePrefix}-colors-form flex justify-between w-full flex-col`}
                onSubmit={handleColorsSubmit}
            >
                {
                    pageColors.map((color, index) => {
                        return (
                            <div key={index} className={`${profilePagePrefix}-colors-container w-full`}>
                                <Label
                                    className={`${profilePagePrefix}-color-label block mb-2 text-heading font-normal w-1/2`}
                                    htmlFor={`${profilePagePrefix}-${index}-input`}
                                    labelText={`${colorNames[index]} Renk`}
                                />
                                <div className={`${profilePagePrefix}-color-input-container flex justify-between items-center w-full`}>
                                    <Label
                                        className={`${profilePagePrefix}-color-name-label block mb-2 text-heading font-extrabold`}
                                        htmlFor={`${profilePagePrefix}-${color}-input`}
                                        labelText={`Renk: ${pageColors[index].value}`}
                                    />
                                    <Input
                                        className={`${profilePagePrefix}-color-input border-black rounded-lg w-1/2`}
                                        id={`${profilePagePrefix}-${index}-input`}
                                        name={`${profilePagePrefix}-${color}-input`}
                                        placeholder={`${color.value.charAt(0).toUpperCase() + color.value.slice(1)}`}
                                        type='color'
                                        value={pageColors[index].value}
                                        dataAttributes={{ 'data-color-id': color.id.toString() }}
                                        onChange={(event) => {
                                            const newColors = [...pageColors];
                                            newColors[index].value = event.target.value;
                                            setPageColors(newColors);
                                        }}
                                    />
                                </div>

                            </div>
                        );
                    })
                }
                <Button
                    className={`${profilePagePrefix}-color-submit-button w-1/3 p-2 bg-primary text-white rounded-lg`}
                    id={`${profilePagePrefix}-color-submit-button`}
                    type='submit'
                >
                    Renkleri Kaydet
                </Button>
            </form>
        </div>
    );
};

export default ColorSection;
