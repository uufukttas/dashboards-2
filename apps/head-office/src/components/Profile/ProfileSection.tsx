import React, { useEffect, useState } from 'react';
import { BRAND_PREFIX } from '../../constants/constants';
import Card from '../Card/Card';
import { FaUser } from 'react-icons/fa6';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { Button } from '@projects/button';
import { addResourceText, getColors } from '../../../app/api/profile/';

const ProfileSection: React.FC = () => {
    const profilePagePrefix: string = `${BRAND_PREFIX}-profile`;
    const colorNames = ['Ana', 'Ikincil', 'Alternatif', 'Ikincil Yedek'];
    const [pageColors, setPageColors] = useState(['#000', '#000', '#000', '#000']);
    const [brandColors, setBrandColors] = useState([]);

    const getBrandColors = async () => {
        const response = await getColors(colorNames);

        setBrandColors(response.data);

        brandColors.map((color: { resourceKey: string; value: string }, index: number) => {
            setPageColors(pageColors.map((item, i) => i === index
                ? color.value
                : item
            ));
        });
    };

    const setNewColors = () => {
        setPageColors(brandColors.map((color: { resourceKey: string; value: string }) => color.value));
    };

    const inforCardBody = (
        <div className={`${profilePagePrefix}-info-container flex justify-between items-center`}>
            <div className={`${profilePagePrefix}-image-container text-black w-1/3 text-center`}>
                <div className={`${profilePagePrefix}-background-image w-1/6 h-1/6 rounded border-2 border-black`}>
                    <FaUser className='text-6xl p-2' />
                </div>
            </div>
            <div className={`${profilePagePrefix}-name-containertext-black w-1/3 text-2xl text-center`}>
                <h2 className={`${profilePagePrefix}-name font-bold`}>John Doe</h2>
            </div>
            <div className={`${profilePagePrefix}-other-info-container text-black w-1/3 text-right`}>
                <p className={`${profilePagePrefix}-other-info`}>john@doe.com</p>
                <p className={`${profilePagePrefix}-other-info`}>055512345678</p>
                <p className={`${profilePagePrefix}-other-info`}>Admin</p>
            </div>
        </div>
    );

    const passwordCardBody = (
        <div className={`${profilePagePrefix}-password-container flex justify-between items-center`}>
            <form className='flex items-end justify-between w-full'>
                <div className={`${profilePagePrefix}-password-input-container w-1/3`}>
                    <Label
                        className={`${profilePagePrefix}-password-label block mb-2 text-heading font-semibold px-2`}
                        htmlFor={`${profilePagePrefix}-password-input`}
                        labelText='Yeni Sifre'
                    />
                    <Input
                        className={`${profilePagePrefix}-password-input border text-text text-sm rounded-lg block w-full p-2.5 focus:ring-primary focus:border-primary`}
                        id={`${profilePagePrefix}-password-input`}
                        name={`${profilePagePrefix}-password-input`}
                        type='password'
                    />
                </div>
                <div className={`${profilePagePrefix}-password-submit-button-container w-1/3`}>
                    <Button
                        className={`${profilePagePrefix}-password-submit-button w-full p-2 bg-primary text-white rounded-lg`}
                        id={`${profilePagePrefix}-password-submit-button`}
                        type='submit'
                    >
                        Sifreyi Degistir
                    </Button>
                </div>
            </form>
        </div>
    );

    const handleColorsSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

    const chooseColorsCardBody = (
        <div className={`${profilePagePrefix}-colors-container flex justify-between items-center`}>
            <form className='flex justify-between w-full flex-col' onSubmit={handleColorsSubmit}>
                {
                    pageColors.map((color, index) => {
                        return (
                            <div key={index} className={`${profilePagePrefix}-color-input-container w-full`}>
                                <div className='flex justify-between items-center w-full'>
                                    <Label
                                        className={`${profilePagePrefix}-color-label block mb-2 text-heading font-normal w-1/2`}
                                        htmlFor={`${profilePagePrefix}-${index}-input`}
                                        labelText={`${colorNames[index]} Renk`}
                                    />
                                    <Input
                                        className={`${profilePagePrefix}-color-input border-black rounded-lg w-1/2`}
                                        id={`${profilePagePrefix}-${index}-input`}
                                        name={`${profilePagePrefix}-${color}-input`}
                                        value={pageColors[index]}
                                        type='color'
                                        placeholder={`${color.charAt(0).toUpperCase() + color.slice(1)}`}
                                        onChange={(e) => {
                                            setPageColors(pageColors.map((item, i) => i === index
                                                ? e.target.value
                                                : item
                                            ))
                                        }}
                                    />
                                </div>
                                <Label
                                    className={`${profilePagePrefix}-color-label block mb-2 text-heading font-extrabold`}
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

    const lastLoginCardBody = (
        <div className={`${profilePagePrefix}-last-login-container flex justify-between items-center`}>
            <p className={`${profilePagePrefix}-last-login-text text-heading`}>Son Giris: 01.01.2021</p>
        </div>
    );

    useEffect(() => {
        getBrandColors();
    }, []);

    useEffect(() => {
        setNewColors();
    }, [brandColors]);

    return (
        <div className={`${profilePagePrefix}-container flex justify-between items-start flex-col`}>
            <div className={`${profilePagePrefix}-summary-card-container w-full`}>
                <Card
                    className={`${profilePagePrefix}-summary-card`}
                    cardBody={inforCardBody}
                />
            </div>
            <div className={`${profilePagePrefix}-summary-card-container mt-8 flex w-full`}>
                <div className='flex justify-between items-start flex-col w-1/2 mr-2'>
                    <div className={`${profilePagePrefix}-password-card-container w-full mt-8`}>
                        <Card
                            className={`${profilePagePrefix}-password-card`}
                            cardBody={passwordCardBody}
                        />
                    </div>
                    <div className={`${profilePagePrefix}-colors-card-container w-full mt-8`}>
                        <Card
                            className={`${profilePagePrefix}-colors-card`}
                            cardBody={chooseColorsCardBody}
                        />
                    </div>
                </div>
                <div className={`${profilePagePrefix}-last-login-card-container w-1/2 mt-8 ml-2`}>
                    <Card
                        className={`${profilePagePrefix}-last-login-card`}
                        cardBody={lastLoginCardBody}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
