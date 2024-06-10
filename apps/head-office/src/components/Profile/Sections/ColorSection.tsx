import React, { useEffect, useState } from 'react';
import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { addResourceText, getColors } from '../../../../app/api/profile';
import { BRAND_PREFIX } from '../../../../src/constants/constants';

const ColorSection: React.FC = () => {
    const colorNames: string[] = ['Ana', 'Ikincil', 'Alternatif', 'Ikincil Yedek'];
    const profilePagePrefix: string = `${BRAND_PREFIX}-profile`;
    const [brandColors, setBrandColors] = useState<[]>([]);
    const [pageColors, setPageColors] = useState<string[]>(['#000', '#000', '#000', '#000']);

    const getBrandColors = async (): Promise<void> => {
        const response = await getColors(colorNames);

        setBrandColors(response.data);

        brandColors.map((color: { resourceKey: string; value: string }, index: number) => {
            setPageColors(
                pageColors.map((item, i) => i === index
                    ? color.value
                    : item
                )
            );
        });
    };
    const handleColorsSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        const colors = pageColors.map((color, index) => {
            return {
                resourceKey: colorNames[index],
                value: color
            };
        });
        const response = await addResourceText(colors);

        console.log('response', response)
    };
    const setNewColors = (): void => {
        setPageColors(
            brandColors.map((color: { resourceKey: string; value: string }) => color.value)
        );
    };

    useEffect(() => {
        getBrandColors();
    }, []);

    useEffect(() => {
        setNewColors();
    }, [brandColors]);

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
                                <div className={`${profilePagePrefix}-color-input-container flex justify-between items-center w-full`}>
                                    <Label
                                        className={`${profilePagePrefix}-color-label block mb-2 text-heading font-normal w-1/2`}
                                        htmlFor={`${profilePagePrefix}-${index}-input`}
                                        labelText={`${colorNames[index]} Renk`}
                                    />
                                    <Input
                                        className={`${profilePagePrefix}-color-input border-black rounded-lg w-1/2`}
                                        id={`${profilePagePrefix}-${index}-input`}
                                        name={`${profilePagePrefix}-${color}-input`}
                                        placeholder={`${color.charAt(0).toUpperCase() + color.slice(1)}`}
                                        type='color'
                                        value={pageColors[index]}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setPageColors(pageColors.map((item, i) => i === index
                                                ? event.target.value
                                                : item
                                            ))
                                        }}
                                    />
                                </div>
                                <Label
                                    className={`${profilePagePrefix}-color-name-label block mb-2 text-heading font-extrabold`}
                                    htmlFor={`${profilePagePrefix}-${color}-input`}
                                    labelText={`Renk: ${pageColors[index]}`}
                                />
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
