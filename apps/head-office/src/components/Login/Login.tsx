import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '@projects/card';
import { Dropdown } from '@projects/dropdown';
import CardBody from './LoginCardComponents/CardBody';
import CardFooter from './LoginCardComponents/CardFooter';
import CardHeader from './LoginCardComponents/CardHeader';
import { BRAND_PREFIX } from '../../constants/constants';
import { setSelectedLanguage } from '../../../app/redux/features/languages';
import { RootState } from '../../../app/redux/store';
import { IDropdownItemProps } from './types';
import './Login.css';

const Login: React.FC = () => {
    const loginPrefix: string = `${BRAND_PREFIX}-login`;
    const dispatch = useDispatch();
    const languageList: IDropdownItemProps[] = useSelector((state: RootState) => state.languages.languages);

    return (
        <div
            className={`${loginPrefix}-side-container flex flex-col justify-between w-full xl:w-1/4 px-8 py-4 h-screen`}
        >
            <div className={`${loginPrefix}-language-option-container flex justify-end`}>
                <Dropdown
                    className={`${loginPrefix}-language-dropdown block w-1/2 p-2.5 border rounded-lg text-text text-sm focus:ring-primary focus:border-primary`}
                    id={`${loginPrefix}-language-dropdown`}
                    items={languageList}
                    name={`${loginPrefix}-language-dropdown`}
                    onChange={(event) => dispatch(setSelectedLanguage(Number(event.target.value)))}
                />
            </div>
            <div className={`${loginPrefix}-card-form-container`}>
                <Card
                    BRAND_PREFIX={BRAND_PREFIX}
                    containerClassName={`w-full p-8 bg-white`}
                >
                    <>
                        <CardHeader />
                        <CardBody />
                        <CardFooter />
                    </>
                </Card>
            </div>
            <div className={`${loginPrefix}-footer-container`}>
                <p className={`${loginPrefix}-footer`}></p>
            </div>
        </div>
    );
};

export default Login;
